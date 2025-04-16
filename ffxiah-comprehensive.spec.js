// ffxiah-comprehensive.spec.js
const { test, expect } = require('@playwright/test');

// Test data for search and item checking
const testItems = [
  { name: 'Mandau', category: 'Weapons' },
  { name: 'Peacock Charm', category: 'Armor' },
  { name: 'Evasion Torque', category: 'Armor' }
];

const testSearches = ['fire crystal', 'platinum', 'beehive chip'];

// Server list to test navigation between servers
const servers = [
  'Asura', 'Bahamut', 'Bismarck', 'Carbuncle', 'Cerberus', 
  'Fenrir', 'Lakshmi', 'Leviathan', 'Odin', 'Phoenix',
  'Quetzalcoatl', 'Ragnarok', 'Shiva', 'Siren', 'Sylph', 'Valefor'
];

test.describe('FFXIAH.com Comprehensive Tests', () => {
  // Setup for all tests in this file
  test.beforeEach(async ({ page }) => {
    // Set default timeout for all actions to handle potentially slow responses
    page.setDefaultTimeout(30000);
    
    // Navigate to the website and accept any cookies or popups if they exist
    await page.goto('https://www.ffxiah.com');
    
    // Handle any cookies banner or initial popups if they exist
    try {
      const cookieBanner = page.locator('.cookie-banner, #cookie-consent, .gdpr-banner').first();
      if (await cookieBanner.isVisible({ timeout: 3000 })) {
        await cookieBanner.locator('button:has-text("Accept"), button:has-text("OK")').click();
      }
    } catch (error) {
      // No cookie banner found, continue with test
      console.log('No cookie banner detected');
    }
  });

  test('Homepage loads with main navigation', async ({ page }) => {
    // Verify the page title contains FFXIAH
    await expect(page).toHaveTitle(/FFXIAH/);
    
    // Verify main navigation elements
    const mainNav = page.locator('nav, .main-nav, #global-nav');
    await expect(mainNav).toBeVisible();
    
    // Verify important navigation links exist
    const navLinks = await page.locator('nav a, .main-nav a, #global-nav a').allTextContents();
    
    // Check for key sections - these should be available in the navigation
    const expectedSections = ['Items', 'Search', 'Categories', 'AH', 'Database'];
    for (const section of expectedSections) {
      expect(navLinks.some(link => link.includes(section))).toBeTruthy();
    }
    
    // Check for main content area
    const mainContent = page.locator('#content, .main-content, main');
    await expect(mainContent).toBeVisible();
    
    // Verify recent activity or featured items section exists
    const recentActivity = page.locator('.recent-activity, .featured-items, .popular-items');
    await expect(recentActivity).toBeVisible();
    
    // Take a screenshot of the homepage
    await page.screenshot({ path: 'screenshots/ffxiah-homepage.png', fullPage: true });
  });

  test('Search functionality works correctly', async ({ page }) => {
    // Test the search form
    const searchInput = page.locator('input[type="text"][name*="search"], #search-input');
    await expect(searchInput).toBeVisible();
    
    // Try multiple search terms
    for (const searchTerm of testSearches) {
      // Clear previous search if needed
      await searchInput.click();
      await searchInput.fill('');
      
      // Enter new search term
      await searchInput.fill(searchTerm);
      
      // Press Enter or click search button
      try {
        const searchButton = page.locator('button[type="submit"], input[type="submit"], .search-button');
        if (await searchButton.isVisible({ timeout: 2000 })) {
          await searchButton.click();
        } else {
          await searchInput.press('Enter');
        }
      } catch (error) {
        // If no button is found, just press Enter
        await searchInput.press('Enter');
      }
      
      // Wait for results page to load
      await page.waitForLoadState('networkidle');
      
      // Verify search results container exists
      const resultsContainer = page.locator('.search-results, #search-results, .results');
      await expect(resultsContainer).toBeVisible();
      
      // Verify search term appears on the page
      const pageContent = await page.textContent('body');
      expect(pageContent.toLowerCase()).toContain(searchTerm.toLowerCase());
      
      // Take a screenshot of search results
      await page.screenshot({ path: `screenshots/search-${searchTerm.replace(/\s+/g, '-')}.png`, fullPage: true });
    }
  });

  test('Item detail pages load correctly', async ({ page }) => {
    for (const item of testItems) {
      // Search for the item
      const searchInput = page.locator('input[type="text"][name*="search"], #search-input');
      await searchInput.click();
      await searchInput.fill('');
      await searchInput.fill(item.name);
      
      try {
        const searchButton = page.locator('button[type="submit"], input[type="submit"], .search-button');
        if (await searchButton.isVisible({ timeout: 2000 })) {
          await searchButton.click();
        } else {
          await searchInput.press('Enter');
        }
      } catch (error) {
        await searchInput.press('Enter');
      }
      
      // Wait for search results
      await page.waitForLoadState('networkidle');
      
      // Click on the first result that matches our item name
      const itemLink = page.locator(`a:text-is("${item.name}"), a:text("${item.name}")`).first();
      await itemLink.click();
      
      // Wait for item page to load
      await page.waitForLoadState('networkidle');
      
      // Verify the item name appears on the page
      const itemHeading = page.locator('h1, h2, .item-name');
      await expect(itemHeading).toContainText(item.name);
      
      // Verify important sections of the item page exist
      const itemDetails = page.locator('.item-details, #item-info, .item-data');
      await expect(itemDetails).toBeVisible();
      
      // Check for price history chart if it exists
      const priceHistory = page.locator('.price-history, #price-chart, .history-graph');
      if (await priceHistory.isVisible({ timeout: 5000 })) {
        console.log(`Price history found for ${item.name}`);
      }
      
      // Check for server prices if they exist
      const serverPrices = page.locator('.server-prices, .ah-prices, #prices');
      if (await serverPrices.isVisible({ timeout: 5000 })) {
        console.log(`Server prices found for ${item.name}`);
      }
      
      // Take a screenshot of the item page
      await page.screenshot({ path: `screenshots/item-${item.name.replace(/\s+/g, '-')}.png`, fullPage: true });
    }
  });

  test('Category browsing functionality', async ({ page }) => {
    // Go to categories section - adjusting selector based on actual site structure
    const categoriesLink = page.locator('a:text-is("Categories"), a:text("Categories"), a:has-text("Categories")').first();
    await categoriesLink.click();
    
    // Wait for categories page to load
    await page.waitForLoadState('networkidle');
    
    // Verify categories container exists
    const categoriesContainer = page.locator('.categories, #categories, .category-list');
    await expect(categoriesContainer).toBeVisible();
    
    // Click on a specific category (Weapons or Armor are usually present)
    const categoryToTest = 'Weapons';
    const specificCategory = page.locator(`a:text-is("${categoryToTest}"), a:text("${categoryToTest}"), a:has-text("${categoryToTest}")`).first();
    await specificCategory.click();
    
    // Wait for category page to load
    await page.waitForLoadState('networkidle');
    
    // Verify items are displayed for the category
    const itemsList = page.locator('.items-list, #items, .category-items');
    await expect(itemsList).toBeVisible();
    
    // Verify the category name appears on the page
    const pageText = await page.textContent('body');
    expect(pageText).toContain(categoryToTest);
    
    // Take a screenshot of the category page
    await page.screenshot({ path: `screenshots/category-${categoryToTest.toLowerCase()}.png`, fullPage: true });
  });

  test('Server selection and data filtering', async ({ page }) => {
    // Test a couple of random servers, not all of them to keep the test shorter
    const serversToTest = servers.slice(0, 3);
    
    for (const server of serversToTest) {
      // Look for server selection dropdown or link
      try {
        // Try dropdown first
        const serverDropdown = page.locator('select#server, .server-select');
        if (await serverDropdown.isVisible({ timeout: 2000 })) {
          await serverDropdown.selectOption(server);
        } else {
          // Try direct link
          const serverLink = page.locator(`a:text-is("${server}"), a[href*="${server.toLowerCase()}"]`).first();
          await serverLink.click();
        }
        
        // Wait for page to update with server data
        await page.waitForLoadState('networkidle');
        
        // Verify server name appears on the page
        const pageText = await page.textContent('body');
        expect(pageText).toContain(server);
        
        // Take a screenshot of the server-specific page
        await page.screenshot({ path: `screenshots/server-${server.toLowerCase()}.png`, fullPage: true });
      } catch (error) {
        console.log(`Could not select server ${server}: ${error.message}`);
      }
    }
  });

  test('User interface responsiveness', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];
    
    for (const viewport of viewports) {
      // Set viewport size
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Reload the page to ensure proper responsive behavior
      await page.goto('https://www.ffxiah.com');
      await page.waitForLoadState('networkidle');
      
      // Check for appropriate responsive elements
      if (viewport.name === 'mobile') {
        // On mobile, look for hamburger menu or mobile nav
        const mobileMenu = page.locator('.mobile-menu, .hamburger-menu, .navbar-toggler');
        if (await mobileMenu.isVisible({ timeout: 3000 })) {
          // Click the mobile menu to expand it
          await mobileMenu.click();
          await page.waitForTimeout(500); // Wait for animation
          
          // Verify expanded mobile menu
          const expandedMenu = page.locator('.mobile-nav-items, .navbar-collapse.show');
          await expect(expandedMenu).toBeVisible();
        }
      }
      
      // Take a screenshot at this viewport size
      await page.screenshot({ path: `screenshots/responsive-${viewport.name}.png`, fullPage: true });
    }
  });

  test('Advanced search features', async ({ page }) => {
    // Find and navigate to advanced search if it exists
    try {
      const advancedSearchLink = page.locator('a:text-is("Advanced Search"), a:has-text("Advanced"), a[href*="advanced"]').first();
      await advancedSearchLink.click();
      
      // Wait for advanced search page to load
      await page.waitForLoadState('networkidle');
      
      // Verify advanced search form exists
      const advancedForm = page.locator('form#advanced-search, .advanced-search-form, form[name*="advanced"]');
      await expect(advancedForm).toBeVisible();
      
      // Test filters if t
