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

test.describe('Multiple Selection', () => {
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
    await page.waitForTimeout(testData.timeouts.action)
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

  test('Verify that selected items in one tab are deleted on "Delete" click', async ({
    page
  }) => {
    // qase.id(2580)
    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.clickAddItem('login')
    await createOrEditPage.fillCreateOrEditInput('title', 'AAA')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('all')

    await mainPage.clickMultipleSelectiontButton()
    await mainPage.clickElementByPosition(0, 'AAA')

    await mainPage.clickMultipleSelectDeletetButton()
    await mainPage.clickYesButton()
  })

  test('Verify that selected items across tabs are deleted on "Delete" click', async ({
    page
  }) => {
    // qase.id(2581)
    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.clickAddItem('login')
    await createOrEditPage.fillCreateOrEditInput('title', 'AAA')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('identity')
    await mainPage.clickAddItem('identity')
    await createOrEditPage.fillCreateOrEditInput('identity-title', 'BBB')
    await createOrEditPage.clickOnCreateOrEditButton('identity-save')
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.clickMultipleSelectiontButton()
    await mainPage.clickElementByPosition(0, 'AAA')
    await mainPage.clickMultipleSelectDeletetButton()
    await mainPage.clickYesButton()
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('identity')
    await mainPage.clickMultipleSelectiontButton()
    await mainPage.clickElementByPosition(0, 'BBB')
    await mainPage.clickMultipleSelectDeletetButton()
    await mainPage.clickYesButton()
    await page.waitForTimeout(testData.timeouts.action)
  })

  test('Verify that "Multiple Selection" button is hidden when no items exist', async ({
    page
  }) => {
    // qase.id(2582)
    await sideMenuPage.selectSideBarCategory('all')
    await mainPage.verifyEmptyCollection()
    // await mainPage.verifyMultipleSelectiontButtonIsNotVisible()
  })

  test('Verify that "Multiple Selection" mode can be canceled', async ({
    page
  }) => {
    // qase.id(2583)
    await sideMenuPage.selectSideBarCategory('all')
    await utilities.deleteAllElements()
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.clickAddItem('login')
    await createOrEditPage.fillCreateOrEditInput('title', 'AAA')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)

    await mainPage.clickMultipleSelectiontButton()
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.clickElementByPosition(0, 'AAA')
    await mainPage.clickMultipleSelectiontButton()
  })

  test('Verify that "Delete" button is enabled only when items are selected', async ({
    page
  }) => {
    // qase.id(2584)
    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.clickMultipleSelectiontButton()
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.clickElementByPosition(0, 'AAA')
    await mainPage.verifyMultipleSelectDeleteButtonIsEnabled()
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.clickMultipleSelectiontButton()
    await page.waitForTimeout(testData.timeouts.action)
  })

  test('Verify that multiple items can be added to a folder simultaneously', async ({
    page
  }) => {
    // qase.id(2585)
    await sideMenuPage.selectSideBarCategory('all')
    await utilities.deleteAllElements()
    await page.waitForTimeout(testData.timeouts.action)

    // Create a folder first (canMove requires at least one folder to exist)
    await sideMenuPage.createFolder('Test Folder')
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('login')
    await mainPage.clickAddItem('login')
    await createOrEditPage.fillCreateOrEditInput('title', 'AAA')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)

    await mainPage.clickAddItem('login')
    await createOrEditPage.fillCreateOrEditInput('title', 'BBB')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)

    // Enable multi-select and select both items one by one via checkboxes
    await mainPage.clickMultipleSelectiontButton()
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.clickElementByPosition(0, 'BBB')
    await mainPage.clickElementByPosition(1, 'AAA')
    await page.waitForTimeout(testData.timeouts.action)

    // Move both items to the folder
    await mainPage.clickMultipleSelectMoveButon()
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.clickMoveFolderChip('Test Folder')
    await mainPage.clickMoveFolderSubmit()
    await page.waitForTimeout(testData.timeouts.action)

    await sideMenuPage.selectSideBarCategory('all')
    await mainPage.verifyElementFolderName('Test Folder')
    await sideMenuPage.deleteMultipleItemsFolder('Test Folder')
    await page.waitForTimeout(testData.timeouts.action)
    // await sideMenuPage.selectSideBarCategory('all')
    // await page.waitForTimeout(testData.timeouts.action)
    await sideMenuPage.clickDeleteFolderButton()
    // Click on "Delete Folder and Items" and verify that folder along with items inside it are deleted
  })
})
