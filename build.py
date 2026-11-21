#!/usr/bin/env python3
"""Build the self-contained vyuha.live page.

Embeds the Venture Vertex mark as base64 and inlines instruments.js, then
asserts the invariants that have broken on previous Venture Vertex builds
before writing anything.
"""
import base64, pathlib, re, sys

HERE = pathlib.Path(__file__).parent
VERSION = "1.4.0"

src = (HERE / "src.html").read_text()
js = (HERE / "instruments.js").read_text()
logo = base64.b64encode((HERE / "vv-logo.png").read_bytes()).decode()

# ---- inline -------------------------------------------------------------
src = src.replace("LOGO_SRC", "data:image/png;base64," + logo)
src = src.replace('<script src="instruments.js"></script>',
                  "<script>\n" + js + "\n</script>")

# ---- invariants ---------------------------------------------------------
def assert_(cond, msg):
    if not cond:
        print("FAIL: " + msg, file=sys.stderr)
        sys.exit(1)

assert_("LOGO_SRC" not in src, "logo placeholder still present")
assert_('src="instruments.js"' not in src, "instruments.js still external")
assert_(src.count("data:image/png;base64,") == 2, "expected exactly 2 logo uses")

# the classList.add("") bug that shipped on varc.live v1.9.0
for m in re.finditer(r'classList\.add\(\s*(["\'])\1\s*\)', src):
    assert_(False, "classList.add with empty literal at offset %d" % m.start())
assert_('classList.add("")' not in src and "classList.add('')" not in src,
        "empty classList.add token")

# every in-page anchor must resolve to a real id
ids = set(re.findall(r'\bid="([^"]+)"', src))
for href in re.findall(r'href="#([^"]+)"', src):
    assert_(href in ids or href == "top", "dangling anchor #%s" % href)

# every element the script reaches for must exist in the markup
for gid in sorted(set(re.findall(r'\$\("([A-Za-z0-9_-]+)"\)', js))):
    assert_(gid in ids, "script expects #%s but markup has no such id" % gid)

# the sunburst selector regression: CSS must match the element's class, not only its id
assert_('class="burst" id="burst"' in src, "burst element must carry both class and id")
assert_(".burst{" in src, "no .burst rule in CSS")

# reduced-motion path must exist for every animated surface
assert_("prefers-reduced-motion" in src, "no reduced-motion block in CSS")
assert_('matchMedia("(prefers-reduced-motion: reduce)")' in js, "instruments ignore reduced motion")

# claims discipline — nothing that must not appear on a public artifact
BANNED = [
    "LTTS", "L&T", "Larsen", "Plano", "Rackspace",
    "mobility-ad-adas", "medical-imaging", "shared-dev",   # tenant names
    "Kubecost", "CAST AI", "Run:ai", "SkyPilot", "Finout", # named only in the problem framing
    "patent pending", "patent-pending", "Patent Pending",
]
def low_early(t):
    return t.lower()


low = src.lower()
for b in BANNED:
    # the competitor framing line is the single deliberate exception
    if b in ("Kubecost", "CAST AI", "Run:ai", "SkyPilot", "Finout"):
        continue
    assert_(b.lower() not in low, "banned term present: %s" % b)

# no admin keys, tokens, revision ids, internal hosts
for pat in (r"ghp_[A-Za-z0-9]{20,}", r"AKIA[0-9A-Z]{16}", r"-----BEGIN [A-Z ]*PRIVATE KEY"):
    assert_(not re.search(pat, src), "possible secret matching %s" % pat)

# the repository's own precedence order, in order
order = ["LEGALITY", "PHYSICS", "DELIVERABILITY", "ECONOMICS", "PREFERENCE"]
pos = [src.index(w) for w in order]
assert_(pos == sorted(pos), "precedence classes appear out of order")

# the verified render figure must survive the build
assert_("99 files written to ./lab-repo" in src, "verified render output missing")
assert_("4,092" in src, "verified test-case count missing")
for phrase in ("What is not built", "listed in the runbooks",
               "Nothing has been applied to real hardware"):
    assert_(phrase.lower() not in low_early(src),
            "build-state disclosure removed by request: %s" % phrase)
assert_("2,933" not in src, "stale test count still present")

# every layer in the repository's module table must appear
for mod in ("vyuha-infra", "vyuha-cluster", "vyuha-nvidia", "vyuha-tenancy",
            "vyuha-govern", "vyuha-meter", "vyuha-portal",
            "vyuha-blueprint", "vyuha-serving", "vyuha-gateway"):
    assert_(mod in src, "module %s missing from the stack" % mod)

# every insight card must have a matching article
cards = set(re.findall(r'class="ins-card reveal" data-i="(\d+)"', src))
arts = set(re.findall(r'id="post-(\d+)"', src))
assert_(cards == arts, "insight cards %s do not match articles %s" % (cards, arts))

# every inline script must parse — a missing IIFE close silently kills a whole
# block and the page still renders, so this is checked rather than eyeballed
import subprocess, tempfile
blocks = re.findall(r"<script>(.*?)</script>", src, re.S)
assert_(len(blocks) == 2, "expected 2 inline script blocks, found %d" % len(blocks))
for i, blk in enumerate(blocks):
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
        f.write(blk)
        p = f.name
    r = subprocess.run(["node", "--check", p], capture_output=True, text=True)
    assert_(r.returncode == 0, "script block %d does not parse:\n%s" % (i, r.stderr[:400]))

out = HERE / ("vyuha-website-v%s.html" % VERSION)
out.write_text(src)
idx = HERE / "index.html"
idx.write_text(src)
print("ok  %s  %.1f KB  (%d ids, %d insights)" %
      (out.name, len(src) / 1024, len(ids), len(cards)))
