# jules-scratch/verification/verify_registration.py
from playwright.sync_api import sync_playwright
import time

def run(playwright):
    time.sleep(5) # Add a 5-second delay
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3000/auth/register")
    page.screenshot(path="jules-scratch/verification/registration_page.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
