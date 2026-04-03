# FFXIAH.com Playwright End-to-End Test Suite

[![Playwright](https://img.shields.io/badge/Playwright-Test_Suite-green?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-100%25-yellow?logo=javascript&logoColor=white)](https://github.com/plpk/ffxiah-playwright-tests)

Automated end-to-end test suite for [FFXIAH.com](https://www.ffxiah.com), a production website serving the Final Fantasy XI community for over 20 years. Set up with Microsoft Playwright to validate core functionality across browsers and viewport sizes.

## Why This Exists

FFXIAH.com is a real production site with an active user base, not a demo or tutorial project. This test suite was set up to validate critical user paths across the site, covering everything from search and navigation to responsiveness and performance baselines. The site owner is a longtime colleague, making this a real-world collaboration on a live product.

## Test Coverage

The comprehensive test suite (`ffxiah-comprehensive.spec.js`) validates 11 areas:

**Core Functionality**
- **Homepage Navigation** · Validates page load and presence of all main navigation elements
- **Search** · Tests search functionality with multiple query terms (items, materials, common drops)
- **Item Detail Pages** · Verifies item pages render correctly with all relevant data fields
- **Category Browsing** · Tests item browsing by category hierarchy
- **Server Selection** · Validates data display across different FFXI game servers

**UI & Experience**
- **Responsive Design** · Tests layout integrity across desktop (1280px), tablet (768px), and mobile (375px) viewports
- **Advanced Search** · Validates filter and advanced search features
- **Item Comparison** · Tests comparison functionality where available
- **Error Handling** · Verifies graceful handling of invalid URLs and 404 scenarios
- **Authentication UI** · Confirms login/register elements are present and accessible
- **Performance** · Measures page load times for key sections against baseline thresholds

## Development Approach

This test suite was set up using AI coding assistants to write the test scripts while I directed the process: identifying which user paths to test, structuring the test categories, selecting appropriate test data from the game's ecosystem, and validating results against the live site. The achievement is QA methodology and testing against a real production system.

## Test Data

Tests use domain-specific data drawn from the game's ecosystem:

- **Items:** Mandau, Peacock Charm, Evasion Torque
- **Search terms:** fire crystal, platinum, beehive chip
- **Servers:** A representative set of active FFXI game servers

## Running the Tests

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test ffxiah-comprehensive.spec.js

# Run with interactive UI mode for debugging
npx playwright test ffxiah-comprehensive.spec.js --ui

# Run a specific test by name
npx playwright test ffxiah-comprehensive.spec.js -g "Homepage Navigation"
```

## Project Structure

```
ffxiah-playwright-tests/
├── ffxiah-comprehensive.spec.js   # Full test suite
├── playwright.config.json          # Playwright configuration
└── README.md
```

## Tech Stack

- **Test Framework:** [Microsoft Playwright](https://playwright.dev/)
- **Language:** JavaScript
- **Target:** Production website (ffxiah.com)

## Author

**Louis Kunasek** · [GitHub](https://github.com/plpk) · [LinkedIn](https://www.linkedin.com/in/LouisKunasek) · Louis.Kunasek@outlook.com
