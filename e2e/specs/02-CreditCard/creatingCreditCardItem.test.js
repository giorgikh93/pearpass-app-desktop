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

test.describe('Creating Credit Card Item', async () => {
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
    createOrEditPage = new CreateOrEditPage(root)
    utilities = new Utilities(root)
    mainPage = new MainPage(root)
    detailsPage = new DetailsPage(root)

    await loginPage.loginToApplication(testData.credentials.validPassword)

    await sideMenuPage.selectSideBarCategory('all')
    await utilities.deleteAllElements()
    await sideMenuPage.selectSideBarCategory('creditCard')
    await mainPage.clickAddItem('creditCard')

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

  test.afterAll(async ({ app }) => {
    await utilities.deleteAllElements()
    await sideMenuPage.clickSidebarExitButton()
  })

  test('Creating the "Credit Card" item', async ({ page }) => {
    // qase.id(2115)
    await createOrEditPage.fillCreateOrEditInput('creditcard-title', 'Credit Card Title')
    await createOrEditPage.fillCreateOrEditInput('creditcard-name', 'John')
    await createOrEditPage.fillCreateOrEditInput('creditcard-number', '1231 2312')
    await createOrEditPage.fillCreateOrEditInput('creditcard-expiredate', '12 12')
    await createOrEditPage.fillCreateOrEditInput('creditcard-securitycode', '111')
    await createOrEditPage.fillCreateOrEditInput('creditcard-pincode', '5555')
    await createOrEditPage.fillCreateOrEditInput('creditcard-comment', 'Credit Card Note')
    await createOrEditPage.clickOnCreateOrEditButton('creditcard-save')
  })

  test('Viewing created item. Verify item details', async ({ page }) => {
    // qase.id(2116)
    await mainPage.verifyElementTitle('Credit Card Title')
    await mainPage.openElementDetails()

    await detailsPage.verifyItemDetailsValue('Name on card', 'John')
    await detailsPage.verifyItemDetailsValue('Number on card', '1231 2312')
    await detailsPage.verifyItemDetailsValue('Date of expire', '12 12')
    await detailsPage.verifyItemDetailsValue('Security code', '111')
    await detailsPage.verifyItemDetailsValue('Pin code', '5555')
    await detailsPage.verifyItemDetailsValue('Comment', 'Credit Card Note')
  })

  test('Password visibility icon displays/hides value', async ({ page }) => {
    // qase.id(2117)
    await mainPage.verifyElementTitle('Credit Card Title')
    await mainPage.openElementDetails()
    await detailsPage.verifyPasswordFieldType('card-details-multi-slot-input-slot-3', 'password')
    await detailsPage.clickPasswordToggle('card-details-multi-slot-input-slot-3')
    await detailsPage.verifyPasswordFieldType('card-details-multi-slot-input-slot-3', 'text')
  })

  // test('Dropdown moves to selected item edit screen', async ({ page }) => {
  //   // qase.id(2118)
  //   // NOTE: folder selector not yet implemented in credit card V2 modal
  //   await mainPage.verifyElementTitle('Credit Card Title')
  //   await sideMenuPage.clickSidebarAddButton()
  //   await detailsPage.fillCreateNewFolderTitleInput('Test Folder')
  //   await detailsPage.clickCreateFolderButton()
  //   await detailsPage.editElement()
  //   await createOrEditPage.openDropdownMenu()
  //   await createOrEditPage.selectFromDropdownMenu('Test Folder')
  //   await createOrEditPage.clickOnCreateOrEditButton('creditcard-save')
  //   await expect(detailsPage.getItemDetailsFolderName('Test Folder')).toBeVisible()
  //   await mainPage.verifyElementFolderName('Test Folder')
  // })

  // test('Item moved to folder (and cleanup)', async ({ page }) => {
  //   // qase.id(2119)
  //   await sideMenuPage.verifySidebarFolderName('Test Folder')
  //   await mainPage.openElementDetails()
  //   await detailsPage.editElement()
  //   await createOrEditPage.openDropdownMenu()
  //   await createOrEditPage.selectFromDropdownMenu('Test Folder')
  //   await createOrEditPage.clickOnCreateOrEditButton('save')

  //   await sideMenuPage.deleteFolder('Test Folder')
  // })

  test('Add via Favorite icon', async ({ page }) => {
    // qase.id(2120)
    await sideMenuPage.selectSideBarCategory('all')
    await mainPage.clickMainViewHeaderSelect()
    await mainPage.elementCheckBox(false)
    await mainPage.clickOnFirstElement()
    await mainPage.elementCheckBox(true)
    await mainPage.clickOnMainViewFavoriteIcon()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via Favorite icon', async ({ page }) => {
    // qase.id(2121)
    await mainPage.clickMainViewHeaderSelect()
    await mainPage.clickOnFirstElement()
    await mainPage.clickOnMainViewFavoriteIcon()
    await sideMenuPage.verifySideBarFavoritesFolder('0 items')
  })

  test('Add via More options', async ({ page }) => {
    // qase.id(2122)
    await mainPage.openElementDetails()
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickMarkAsFavoriteButton()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via More options', async ({ page }) => {
    // qase.id(2123)
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickRemoveFromFavoritesButton()
    await sideMenuPage.verifySideBarFavoritesFolder('0 items')
  })

  // test('Add Custom Note', async ({ page }) => {
  //   qase.id(2124)
  //   await mainPage.verifyElementTitle('Credit Card Title')
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
  //   qase.id(2125)
  //   await mainPage.verifyElementTitle('Credit Card Title')
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
    // qase.id(2126)
    await mainPage.verifyElementTitle('Credit Card Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await detailsPage.clickElementItemCloseButton()
    await mainPage.verifyElementTitle('Credit Card Title')
  })

  test('View uploaded file in Edit mode', async ({ page }) => {
    // qase.id(2127)
    await detailsPage.editElement()
        await createOrEditPage.clickOnAttachment()
        await createOrEditPage.uploadFile()
        await createOrEditPage.verifyUploadedFileIsVisible()
        await createOrEditPage.clickOnUploadedFile()
    
        await createOrEditPage.clickOnCreateOrEditButton('creditcard-save')
        await page.waitForTimeout(testData.timeouts.action)
    
    
        await detailsPage.verifyUploadedFileIsVisible()
        
        await detailsPage.clickOnUploadedFile()
        await detailsPage.verifyUploadedImageIsVisible()
    
        await createOrEditPage.clickElementItemCloseButton()
  })

  // test('View uploaded file in View mode (and cleanup)', async ({ page }) => {
  //   qase.id(2128)
  //   await mainPage.openElementDetails()
  //   await detailsPage.verifyUploadedFileIsVisible()
  //   await detailsPage.clickOnUploadedFile()
  //   await detailsPage.verifyUploadedImageIsVisible()
  //   await detailsPage.clickElementItemCloseButton()
  //   await detailsPage.editElement()
  //   await createOrEditPage.clickOnCreateOrEditButton('deleteattachment')
  //   await createOrEditPage.verifyUploadedImageIsNotVisible()
  //   await createOrEditPage.clickElementItemCloseButton()
  //   await mainPage.clickDetailsCloseButton()
  // })

  test('Empty fields not displayed in view mode', async ({ page }) => {
    // qase.id(2129)
    await mainPage.verifyElementTitle('Credit Card Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('creditcard-name', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-number', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-expiredate', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-securitycode', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-pincode', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-comment', '')
    await createOrEditPage.clickOnDeleteAttachmentButton()

    await createOrEditPage.clickOnCreateOrEditButton('creditcard-save')
    await mainPage.openElementDetails()

    await detailsPage.verifyDetailsNoItems()

    await test.step('CLOSE DETAILS', async () => {
      await mainPage.clickDetailsCloseButton()
    })
  })
})
