"""Take screenshots of sub-pages."""
import time
from patchright.sync_api import sync_playwright

BASE = "/Users/anh/Downloads/ai-website-cloner-template-master"
DESIGN_REF = f"{BASE}/docs/design-references"

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        pages = [
            ("r1s", "http://localhost:3000/r1s"),
            ("r2", "http://localhost:3000/r2"),
            ("account", "http://localhost:3000/account"),
            ("support", "http://localhost:3000/support"),
        ]

        for name, url in pages:
            page.goto(url, wait_until="networkidle", timeout=15000)
            time.sleep(2)
            page.screenshot(path=f"{DESIGN_REF}/page-{name}.png", full_page=False)
            print(f"Captured {name}")

        browser.close()

if __name__ == "__main__":
    run()
