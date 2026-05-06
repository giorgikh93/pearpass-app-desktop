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

test.describe('Creating Login Item', () => {
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

    await sideMenuPage.selectSideBarCategory('login')
    await utilities.deleteAllElements()
    try {
      await sideMenuPage.deleteFolder('Test Folder')
    } catch (e) {
      // folder may not exist from a previous run
    }
    await mainPage.clickAddItem('login')

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
    try {
      await sideMenuPage.deleteFolder('Test Folder')
    } catch (e) {
    }
    await sideMenuPage.clickSidebarExitButton()
  })

  test('Creating the "Login" item', async () => {
    qase.id(1928)
    await createOrEditPage.fillCreateOrEditInput('title', 'Login Title')
    await createOrEditPage.fillCreateOrEditInput('username', 'Test User')
    await createOrEditPage.fillCreateOrEditInput('password', 'Test Pass')
    await createOrEditPage.fillCreateOrEditInput('website', 'https://www.website.co')
    await createOrEditPage.fillCreateOrEditInput('comment', 'Test Note')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)
  })

  test('Viewing created item. Verify item details', async () => {
    qase.id(1929)
    await mainPage.verifyElementTitle('Login Title')
    await mainPage.openElementDetails()
    await detailsPage.verifyItemDetailsValue('Email or username', 'Test User')
    await detailsPage.verifyItemDetailsValue('Password', 'Test Pass')
    await detailsPage.verifyItemDetailsValue('https://', 'https://www.website.co')
    await detailsPage.verifyCustomNoteText('Test Note')
  })

  test('Password visibility icon displays/hides value', async () => {
    qase.id(1930)
    await mainPage.verifyElementTitle('Login Title')
    await mainPage.openElementDetails()
    await detailsPage.verifyPasswordFieldType('credentials-multi-slot-input-slot-1', 'password')
    await detailsPage.clickPasswordToggle('credentials-multi-slot-input-slot-1')
    await detailsPage.verifyPasswordFieldType('credentials-multi-slot-input-slot-1', 'text')
  })

  test('Dropdown moves to selected item edit screen', async () => {
    qase.id(1931)
    await mainPage.verifyElementTitle('Login Title')
    await sideMenuPage.clickSidebarAddButton()
    await detailsPage.fillCreateNewFolderTitleInput('Test Folder')
    await detailsPage.clickCreateFolderButton()
    await detailsPage.editElement()
    await createOrEditPage.openDropdownMenu()
    await createOrEditPage.selectFromDropdownMenu('Test Folder')
    await createOrEditPage.clickOnCreateOrEditButton('save')
    await expect(detailsPage.getItemDetailsFolderName('Test Folder')).toBeVisible()
    await mainPage.verifyElementFolderName('Test Folder')
  })

  test('Item moved to folder (and cleanup)', async ({ page }) => {
    qase.id(1932)
    await sideMenuPage.verifySidebarFolderName('Test Folder')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.openDropdownMenu()
    await createOrEditPage.selectFromDropdownMenu('Test Folder')
    await createOrEditPage.clickOnCreateOrEditButton('save')

    await sideMenuPage.deleteFolder('Test Folder')
  })

  test('Add via Favorite icon', async ({ page }) => {
    qase.id(1933)
    await sideMenuPage.selectSideBarCategory('all')
    await mainPage.clickMainViewHeaderSelect()
    await mainPage.elementCheckBox(false)
    await mainPage.clickOnFirstElement()
    await mainPage.elementCheckBox(true)
    await mainPage.clickOnMainViewFavoriteIcon()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via Favorite icon', async ({ page }) => {
    qase.id(1934)
    await mainPage.clickMainViewHeaderSelect()
    await mainPage.clickOnFirstElement()
    await mainPage.clickOnMainViewFavoriteIcon()
    await sideMenuPage.verifySideBarFavoritesFolder('0 items')
  })

  test('Add via More options', async ({ page }) => {
    qase.id(1935)
    await mainPage.openElementDetails()
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickMarkAsFavoriteButton()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via More options', async ({ page }) => {
    qase.id(1936)
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickRemoveFromFavoritesButton()
    await sideMenuPage.verifySideBarFavoritesFolder('0 items')
  })

  // test('Add Custom Note', async ({ page }) => {
  //   qase.id(1937)
  //   await mainPage.verifyElementTitle('Login Title')
  //   await mainPage.openElementDetails()
  //   await detailsPage.editElement()
  //   await createOrEditPage.clickCreateCustomItem()
  //   await createOrEditPage.clickCustomItemOptionNote()
  //   await expect(createOrEditPage.customNoteInput).toHaveCount(1)
  //   await createOrEditPage.fillCustomNoteInput()
  //   await createOrEditPage.clickOnCreateOrEditButton('save')
  //   await page.waitForTimeout(testData.timeouts.action)
  //   await mainPage.clickDetailsCloseButton()
  // })

  // test('Delete Note field', async ({ page }) => {
  //   qase.id(1938)
  //   await mainPage.verifyElementTitle('Login Title')
  //   await mainPage.openElementDetails()
  //   await detailsPage.editElement()
  //   await expect(createOrEditPage.customNoteInput_first).toHaveCount(2)
  //   await createOrEditPage.deleteCustomNote()
  //   await expect(createOrEditPage.customNoteInput_first).toHaveCount(1)
  //   await createOrEditPage.clickOnCreateOrEditButton('save')
  //   await page.waitForTimeout(testData.timeouts.action)
  //   await mainPage.clickDetailsCloseButton()
  // })

  test('Close via Cross icon', async ({ page }) => {
    qase.id(1939)
    await mainPage.verifyElementTitle('Login Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await detailsPage.clickElementItemCloseButton()
    await mainPage.verifyElementTitle('Login Title')
  })

  test('View uploaded file in Edit mode', async ({ page }) => {
    qase.id(1940)
    await detailsPage.editElement()
    await createOrEditPage.clickOnAttachment()
    await createOrEditPage.uploadFile()
    await createOrEditPage.verifyUploadedFileIsVisible()
    await createOrEditPage.clickOnUploadedFile()

    await createOrEditPage.clickOnCreateOrEditButton('save')
    await page.waitForTimeout(testData.timeouts.action)

    await detailsPage.verifyUploadedFileIsVisible()

    await detailsPage.clickOnUploadedFile()
    await detailsPage.verifyUploadedImageIsVisible()

    await createOrEditPage.clickElementItemCloseButton()
  })

  test('Empty fields not displayed in view mode', async ({ page }) => {
    qase.id(1942)
    await mainPage.verifyElementTitle('Login Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('username', '')
    await createOrEditPage.fillCreateOrEditInput('password', '')
    await createOrEditPage.fillCreateOrEditInput('website', '')
    await createOrEditPage.fillCreateOrEditInput('comment', '')
    await createOrEditPage.clickOnDeleteAttachmentButton()

    await createOrEditPage.clickOnCreateOrEditButton('save')
    await mainPage.openElementDetails()

    await detailsPage.verifyDetailsNoItems()

    await test.step('CLOSE DETAILS', async () => {
      await mainPage.clickDetailsCloseButton()
    })
  })
})
