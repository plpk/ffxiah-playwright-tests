# FFXIAH.com Playwright Testing

## Overview
This repository contains automated end-to-end tests for FFXIAH.com using Playwright. These tests validate core website functionality, ensuring the site works correctly across different scenarios and viewport sizes.

## Test Structure

The test suite (`ffxiah-comprehensive.spec.js`) contains multiple tests that validate different aspects of the website:

### Core Functionality Tests
- **Homepage Navigation**: Validates that the homepage loads correctly with all main navigation elements
- **Search Functionality**: Tests the site's search feature using various test terms
- **Item Detail Pages**: Ensures item pages display correctly with all relevant information
- **Category Browsing**: Tests the ability to browse items by category
- **Server Selection**: Validates the ability to view data for different game servers

### UI and Experience Tests
- **Responsiveness**: Tests the site's UI across desktop, tablet, and mobile viewports
- **Advanced Search**: Validates advanced search features and filters
- **Item Comparison**: Tests the item comparison functionality (if available)
- **Error Handling**: Checks how the site handles invalid URLs
- **Authentication**: Verifies the existence of login/register functionality
- **Performance**: Measures page load times for key sections of the website

## Test Data

The tests use predefined test data:
- Item names like "Mandau", "Peacock Charm", and "Evasion Torque"
- Search terms including "fire crystal", "platinum", and "beehive chip"
- A list of FFXI game servers to test server-specific functionality

## Running the Tests

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test ffxiah-comprehensive.spec.js

# Run with UI mode for debugging
npx playwright test ffxiah-comprehensive.spec.js --ui
