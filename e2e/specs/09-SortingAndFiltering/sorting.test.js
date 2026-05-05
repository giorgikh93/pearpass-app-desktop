// import { qase } from 'playwright-qase-reporter'

import {
  LoginPage,
  MainPage,
  SideMenuPage,
  CreateOrEditPage,
  Utilities,
  DetailsPage
} from '../../components/index.js'
import { test, expect } from '../../fixtures/app.runner.js'
import testData from '../../fixtures/test-data.js'

test.describe('Sorting test', () => {
  test.describe.configure({ mode: 'serial' })

  let loginPage,
    createOrEditPage,
    sideMenuPage,
    mainPage,
    utilities,
    detailsPage,
    page

  test.beforeAll(async ({ app }) => {
    page = await app.getPage()
    const root = page.locator('body')
    loginPage = new LoginPage(root)
    sideMenuPage = new SideMenuPage(root)
    utilities = new Utilities(root)
    mainPage = new MainPage(root)

    await loginPage.loginToApplication(testData.credentials.validPassword)

    await sideMenuPage.selectSideBarCategory('all')
    await utilities.deleteAllElements()
    // await page.waitForTimeout(testData.timeouts.action)
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
  })

  test.afterAll(async () => {
    await utilities.deleteAllElements()
    await sideMenuPage.clickSidebarExitButton()
  })

  test('Verify that items are sorted by most recently modified when "Recent" is selected', async () => {
    // qase.id(2592)
    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.clickAddItem('login')
    await createOrEditPage.fillCreateOrEditInput('title', 'AAA')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)

    // await sideMenuPage.selectSideBarCategory('creditCard')
    // await mainPage.clickAddItem('creditCard')
    // await createOrEditPage.fillCreateOrEditInput('creditCard-title', 'BBB') //createoredit-creditcard-input-title-v2
    // await createOrEditPage.clickOnCreateOrEditButton('creditCard-save')
    // await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('identity')
    await mainPage.clickAddItem('identity')
    await createOrEditPage.fillCreateOrEditInput('identity-title', 'BBB')
    await createOrEditPage.clickOnCreateOrEditButton('identity-save')
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('identity')
    await mainPage.clickAddItem('identity')
    await createOrEditPage.fillCreateOrEditInput('identity-title', 'CCC')
    await createOrEditPage.clickOnCreateOrEditButton('identity-save')
    await page.waitForTimeout(testData.timeouts.action)
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('all')
    await page.waitForTimeout(testData.timeouts.action)

    await mainPage.verifyElementByPosition(0, 'CCC')
    await mainPage.verifyElementByPosition(1, 'BBB')
    await mainPage.verifyElementByPosition(2, 'AAA')
  })

  test('Verify that items are sorted from newest to oldest when "Newest to oldest" is selected', async ({
    page
  }) => {
    // qase.id(2593)
    await mainPage.clickSortButton()
    await mainPage.selectSortOption('last_updated_newest')

    await mainPage.verifyElementByPosition('0', 'CCC')
    await mainPage.verifyElementByPosition('1', 'BBB')
    await mainPage.verifyElementByPosition('2', 'AAA')
  })

  test('Verify that items are sorted from oldest to newest when "Oldest to newest" is selected', async ({
    page
  }) => {
    // qase.id(2594)
    await mainPage.clickSortButton()
    await mainPage.selectSortOption('last_updated_oldest')

    await mainPage.verifyElementByPosition('0', 'AAA')
    await mainPage.verifyElementByPosition('1', 'BBB')
    await mainPage.verifyElementByPosition('2', 'CCC')
    await page.waitForTimeout(testData.timeouts.action)
  })

  test('Verify that favorite items are displayed first on the Home screen', async ({
    page
  }) => {
    // qase.id(2595)
    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.openElementDetails()
    await detailsPage.clickFavoriteButton()

    await sideMenuPage.selectSideBarCategory('identity')
    await mainPage.openElementDetails()
    await detailsPage.clickFavoriteButton()

    await sideMenuPage.selectSideBarCategory('all')
    await page.waitForTimeout(testData.timeouts.action)

    await mainPage.verifyElementByPosition('0', 'AAA')
    await mainPage.verifyElementByPosition('1', 'BBB')
    await mainPage.verifyElementByPosition('2', 'CCC')
  })

  test('Verify that only favorite items are displayed when "Favorite" is selected', async ({
    page
  }) => {
    // qase.id(2596)
    await sideMenuPage.openSideBarFolder('Favorites')
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.verifyElementByPosition('0', 'AAA')
    await mainPage.verifyElementByPosition('1', 'BBB')

    await sideMenuPage.selectSideBarCategory('all')
  })
})
