import { qase } from 'playwright-qase-reporter'

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

test.describe('Creating Custom Item', () => {
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

    await sideMenuPage.selectSideBarCategory('custom')
    await utilities.deleteAllElements()
    await mainPage.clickAddItem('custom')

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

  test('Creating the "Custom" item', async ({ page }) => {
    qase.id(2546)
    await createOrEditPage.fillCreateOrEditInput('custom-title', 'Custom Field Title')
    await createOrEditPage.clickOnCreateOrEditButton('custom-save')
    await page.waitForTimeout(testData.timeouts.action)
  })

  test('Viewing created item. Verify item details', async ({ page }) => {
    qase.id(2547)
    await mainPage.openElementDetails()
    await detailsPage.verifyTitle('Custom Field Title')
  })

  test('Add via Favorite icon', async ({ page }) => {
    qase.id(2250)
    await sideMenuPage.selectSideBarCategory('all')
    await mainPage.verifyElementTitle('Custom Field Title')
    await mainPage.openElementDetails()
    await detailsPage.clickFavoriteButton()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via Favorite icon', async ({ page }) => {
    qase.id(2251)
    await mainPage.openElementDetails()
    await detailsPage.clickFavoriteButton()
  })

  test('Add via More options', async ({ page }) => {
    qase.id(2252)
    await mainPage.openElementDetails()
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickMarkAsFavoriteButton()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via More options', async ({ page }) => {
    qase.id(2253)
    await mainPage.openElementDetails()
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickRemoveFromFavoritesButton()
    await sideMenuPage.verifySideBarFavoritesFolder('0 items')
  })

  test('Add Custom Note', async ({ page }) => {
    qase.id(2254)
    await mainPage.verifyElementTitle('Custom Field Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await expect(createOrEditPage.customNoteInput).toHaveCount(1)
    await createOrEditPage.fillCustomNoteInput()
    await createOrEditPage.clickOnCreateOrEditButton('custom-save')
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.clickDetailsCloseButton()
  })

  test('Delete Note field', async ({ page }) => {
    qase.id(2255)
    await mainPage.verifyElementTitle('Custom Field Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await expect(createOrEditPage.customNoteInput_first).toHaveCount(1)
    await createOrEditPage.deleteCustomNote()
    await expect(createOrEditPage.customNoteInput_first).toHaveCount(1)
    await createOrEditPage.clickOnCreateOrEditButton('custom-save')
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.clickDetailsCloseButton()
  })

  test('Close via Cross icon', async ({ page }) => {
    qase.id(2256)
    await mainPage.verifyElementTitle('Custom Field Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await detailsPage.clickElementItemCloseButton()
    await mainPage.verifyElementTitle('Custom Field Title')
  })

  test('View uploaded file in Edit mode', async ({ page }) => {
    qase.id(2257)
    await mainPage.verifyElementTitle('Custom Field Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.clickOnAttachment()
    await createOrEditPage.uploadFile()
    await createOrEditPage.verifyUploadedFileIsVisible()
    await createOrEditPage.clickOnUploadedFile()
    await createOrEditPage.clickOnCreateOrEditButton('custom-save')
    await page.waitForTimeout(testData.timeouts.action)

    await detailsPage.verifyUploadedFileIsVisible()

    await detailsPage.clickOnUploadedFile()
    await detailsPage.verifyUploadedImageIsVisible()

    await createOrEditPage.clickElementItemCloseButton()
    await mainPage.clickDetailsCloseButton()
  })

  // test('Empty fields not displayed in view mode', async ({ page }) => {
  // qase.id(2259);
  //   await mainPage.verifyElementTitle('Custom Field Title')
  //   await mainPage.openElementDetails()
  //   await detailsPage.editElement()
  //   await createOrEditPage.fillCreateOrEditTextArea('note', '')
  //   await createOrEditPage.clickOnCreateOrEditButton('save')
  //   await mainPage.openElementDetails()
  //   await detailsPage.verifyItemDetailsValueIsNotVisible('Add comment')

  //   await mainPage.clickDetailsCloseButton()

  // })
})
