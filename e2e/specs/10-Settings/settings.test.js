// import { qase } from 'playwright-qase-reporter'

import {
  LoginPage,
  MainPage,
  SideMenuPage,
  CreateOrEditPage,
  Utilities,
  DetailsPage,
  SettingsPage
} from '../../components/index.js'
import { test, expect } from '../../fixtures/app.runner.js'
import testData from '../../fixtures/test-data.js'

test.describe('Settings test', () => {
  test.describe.configure({ mode: 'serial' })

  let loginPage,
    createOrEditPage,
    sideMenuPage,
    mainPage,
    utilities,
    detailsPage,
    page,
    settingsPage

  test.beforeAll(async ({ app }) => {
    page = await app.getPage()
    const root = page.locator('body')
    loginPage = new LoginPage(root)
    sideMenuPage = new SideMenuPage(root)
    utilities = new Utilities(root)
    mainPage = new MainPage(root)

    await loginPage.loginToApplication(testData.credentials.validPassword)
  })

  test.beforeEach(async ({ app }) => {
    page = await app.getPage()
    const root = page.locator('body')
    loginPage = new LoginPage(root)
    mainPage = new MainPage(root)
    sideMenuPage = new SideMenuPage(root)
    createOrEditPage = new CreateOrEditPage(root)
    utilities = new Utilities(root)
    detailsPage = new DetailsPage(root)
    settingsPage = new SettingsPage(root)
  })

  test.afterAll(async () => {
    await utilities.deleteAllElements()
    await sideMenuPage.clickSidebarExitButton()
  })

  test('Verify Security Settings', async ({ page }) => {
    // qase.id(2605)
    await sideMenuPage.clickSidebarSettingsButton()

    await settingsPage.verifySettingsDropdownSectionIsVisible('security')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('app-preferences')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('master-password')

    

    // await settingsPage.clickBackSettingsButton()

    // await settingsPage.verifySettingsFunction('reminders-switch')
    // await settingsPage.verifySettingsFunction('copy-to-clipboard-switch')
    // await settingsPage.verifySettingsFunction('auto-logout-dropdown')

    // // Remimder Switch
    // await settingsPage.clickPearPassFunctionButton('reminders-switch', 'on')
    // await settingsPage.verifySwitchIsOnOrOff('reminders-switch', 'off', 'off')
    // await settingsPage.clickPearPassFunctionButton('reminders-switch', 'off')
    // await settingsPage.verifySwitchIsOnOrOff('reminders-switch', 'on', 'on')

    // Copy-to-clipboard Switch
    // await settingsPage.clickPearPassFunctionButton('copy-to-clipboard-switch', 'on')
    // await settingsPage.verifySwitchIsOnOrOff('copy-to-clipboard-switch', 'off', 'off')
    // await settingsPage.clickPearPassFunctionButton('copy-to-clipboard-switch', 'off')
    // await settingsPage.verifySwitchIsOnOrOff('copy-to-clipboard-switch', 'on', 'on')

    // Auto-Logout Dropdown
    await settingsPage.clickPearPassFunctionDropdown('auto-lock-select')
    await page.waitForTimeout(testData.timeouts.action)
    await settingsPage.getPearPassFunctionDropdownOption('seconds_30')
    await settingsPage.getPearPassFunctionDropdownOption('minutes_1')
    await settingsPage.getPearPassFunctionDropdownOption('minutes_5')
    await settingsPage.getPearPassFunctionDropdownOption('minutes_15')
    await settingsPage.getPearPassFunctionDropdownOption('minutes_30')
    await settingsPage.getPearPassFunctionDropdownOption('hours_1')
    await settingsPage.getPearPassFunctionDropdownOption('hours_4')
    await settingsPage.getPearPassFunctionDropdownOption('never')
    // Force-click the dropdown trigger to toggle it closed (bypasses the backdrop overlay)
    await settingsPage.getPearPassFunctionDropdown('auto-lock-select').click({ force: true })
    await page.waitForTimeout(testData.timeouts.action)
  })

  test('Verify Syncing Settings', async ({ page }) => {
    // qase.id(2606)
    await settingsPage.verifySettingsDropdownSectionIsVisible('syncing')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('blind-peering')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('your-devices')
  })

  test('Verify Vault Settings', async ({ page }) => {
    // qase.id(2607)
    await settingsPage.verifySettingsDropdownSectionIsVisible('vault')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('your-vaults')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('import-items')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('export-items')
  })

  test('Verify Appearance Settings', async ({ page }) => {
    // qase.id(2608)
    await settingsPage.verifySettingsDropdownSectionIsVisible('appearance')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('language')
  })

  test('Verify About Settings', async ({ page }) => {
    // qase.id(2609)
    await settingsPage.verifySettingsDropdownSectionIsVisible('about')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('report-a-problem')
    await settingsPage.verifySettingsDropdownNavigationIsVisible('app-version')

    await settingsPage.clickBackSettingsButton()
  })
})
