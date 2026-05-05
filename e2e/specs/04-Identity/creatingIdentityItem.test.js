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

test.describe('Creating Identity Item', () => {
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

    await sideMenuPage.selectSideBarCategory('identity')
    await utilities.deleteAllElements()
    await mainPage.clickAddItem('identity')

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

  test('Creating the "Identity" item', async ({ page }) => {
    // qase.id(2151)
    await createOrEditPage.fillCreateOrEditInput('identity-title', 'Identity Title')
    await createOrEditPage.fillCreateOrEditInput('identity-fullname', 'Identity Fullname')
    await createOrEditPage.fillCreateOrEditInput('identity-email', 'identitytest@mail.co')
    await createOrEditPage.fillCreateOrEditInput('identity-phone', '')
    await createOrEditPage.fillCreateOrEditInput('identity-address', 'Identity Address')
    await createOrEditPage.fillCreateOrEditInput('identity-zip', 'Identity Zip')
    await createOrEditPage.fillCreateOrEditInput('identity-city', 'Identity City')
    await createOrEditPage.fillCreateOrEditInput('identity-region', 'Identity Region')
    await createOrEditPage.fillCreateOrEditInput('identity-country', 'Identity Country')
    await createOrEditPage.fillCreateOrEditInput('identity-passportfullname', 'Identity Passport Fullname')
    await createOrEditPage.fillCreateOrEditInput('identity-passportnumber', 'Identity Passport Number')
    await createOrEditPage.fillCreateOrEditInput('identity-passportissuingcountry', 'Identity Issuing Country')
    await createOrEditPage.fillCreateOrEditInput('identity-passportdateofissue', 'Identity Date of Issue')
    await createOrEditPage.fillCreateOrEditInput('identity-passportexpirydate', '01/01/2020')
    await createOrEditPage.fillCreateOrEditInput('identity-passportnationality', '01/01/2025')
    await createOrEditPage.fillCreateOrEditInput('identity-passportdob', '01/01/1990')
    await createOrEditPage.fillCreateOrEditInput('identity-passportgender', 'Identity Gender')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardnumber', 'Identity ID Card Number')
    await createOrEditPage.fillCreateOrEditInput('identity-idcarddateofissue', '01/01/2025')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardexpirydate', '01/01/2030')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardissuingcountry', 'USA')
    await createOrEditPage.fillCreateOrEditInput('identity-comment', 'Identity Driving License Note')
    await createOrEditPage.clickOnCreateOrEditButton('identity-save')

    await page.waitForTimeout(testData.timeouts.action)
  })

  test('Viewing created item. Verify item details', async ({ page }) => {
    // qase.id(2152)
    await mainPage.openElementDetails()
    await detailsPage.verifyIdentityDetailsValue('fullname', 'Identity Fullname')
    await detailsPage.verifyIdentityDetailsValue('email', 'identitytest@mail.co')
    await detailsPage.verifyIdentityDetailsValue('address', 'Identity Address')
    await detailsPage.verifyIdentityDetailsValue('zip', 'Identity Zip')
    await detailsPage.verifyIdentityDetailsValue('city', 'Identity City')
    await detailsPage.verifyIdentityDetailsValue('region', 'Identity Region')
    await detailsPage.verifyIdentityDetailsValue('country', 'Identity Country')
    await detailsPage.verifyIdentityDetailsValue('passportfullname', 'Identity Passport Fullname')
    await detailsPage.verifyIdentityDetailsValue('passportnumber', 'Identity Passport Number')
    await detailsPage.verifyIdentityDetailsValue('passportissuingcountry', 'Identity Issuing Country')
    await detailsPage.verifyIdentityDetailsValue('passportdateofissue', 'Identity Date of Issue')
    await detailsPage.verifyIdentityDetailsValue('passportexpirydate', '01/01/2020')
    await detailsPage.verifyIdentityDetailsValue('passportnationality', '01/01/2025')
    await detailsPage.verifyIdentityDetailsValue('passportdob', '01/01/1990')
    await detailsPage.verifyIdentityDetailsValue('passportgender', 'Identity Gender')
    await detailsPage.verifyIdentityDetailsValue('idcardnumber', 'Identity ID Card Number')
    await detailsPage.verifyIdentityDetailsValue('idcarddateofissue', '01/01/2025')
    await detailsPage.verifyIdentityDetailsValue('idcardexpirydate', '01/01/2030')
    await detailsPage.verifyIdentityDetailsValue('idcardissuingcountry', 'USA')
    await detailsPage.verifyIdentityDetailsValue('note', 'Identity Driving License Note')
  })

  // test('Dropdown moves to selected item edit screen', async ({ page }) => {
  //   qase.id(2153)
  //   await mainPage.verifyElementTitle('Identity Title')
  //   await sideMenuPage.clickSidebarAddButton()
  //   await detailsPage.fillCreateNewFolderTitleInput('Test Folder')
  //   await detailsPage.clickCreateFolderButton()
  //   await detailsPage.editElement()
  //   await createOrEditPage.openDropdownMenu()
  //   await createOrEditPage.selectFromDropdownMenu('Test Folder')
  //   await createOrEditPage.clickOnCreateOrEditButton('save')
  //   await detailsPage.getItemDetailsFolderName('Test Folder')
  //   await mainPage.verifyElementFolderName('Test Folder')
  // })

  // test('Item moved to folder (and cleanup)', async ({ page }) => {
  //   qase.id(2155)
  //   await sideMenuPage.verifySidebarFolderName('Test Folder')
  //   await mainPage.openElementDetails()
  //   await detailsPage.editElement()
  //   await createOrEditPage.openDropdownMenu()
  //   await createOrEditPage.selectFromDropdownMenu('No Folder')
  //   await createOrEditPage.clickOnCreateOrEditButton('save')
  //   await sideMenuPage.deleteFolder('Test Folder')
  // })

  test('Add via Favorite icon', async ({ page }) => {
    // qase.id(2156)
    await sideMenuPage.selectSideBarCategory('all')
    await mainPage.clickMainViewHeaderSelect()
    await mainPage.elementCheckBox(false)
    await mainPage.clickOnFirstElement()
    await mainPage.elementCheckBox(true)
    await mainPage.clickOnMainViewFavoriteIcon()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via Favorite icon', async ({ page }) => {
    // qase.id(2157)
    await mainPage.clickMainViewHeaderSelect()
    await mainPage.clickOnFirstElement()
    await mainPage.clickOnMainViewFavoriteIcon()
    await sideMenuPage.verifySideBarFavoritesFolder('0 items')
  })

  test('Add via More options', async ({ page }) => {
    // qase.id(2158)
    await mainPage.openElementDetails()
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickMarkAsFavoriteButton()
    await sideMenuPage.verifySideBarFavoritesFolder('1 items')
  })

  test('Remove via More options', async ({ page }) => {
    // qase.id(2159)
    await detailsPage.openItemBarThreeDotsDropdownMenu()
    await detailsPage.clickRemoveFromFavoritesButton()
    await sideMenuPage.verifySideBarFavoritesFolder('0 items')
  })

  // test('Add Custom Note', async ({ page }) => {
  //   qase.id(2160)
  //   await mainPage.verifyElementTitle('Identity Title')
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
  //   qase.id(2161)
  //   await mainPage.verifyElementTitle('Identity Title')
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
    // qase.id(2162)
    await mainPage.verifyElementTitle('Identity Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await detailsPage.clickElementItemCloseButton()
    await mainPage.verifyElementTitle('Identity Title')
  })

  test('View uploaded file in Edit mode', async ({ page }) => {
    // qase.id(2163)
    await detailsPage.editElement()
    await createOrEditPage.clickOnAttachment()
    await createOrEditPage.uploadFile()
    await createOrEditPage.verifyUploadedFileIsVisible()
    await createOrEditPage.clickOnUploadedFile()

    await createOrEditPage.clickOnCreateOrEditButton('identity-save')
    await page.waitForTimeout(testData.timeouts.action)

    await detailsPage.verifyUploadedFileIsVisible()

    await detailsPage.clickOnUploadedFile()
    await detailsPage.verifyUploadedImageIsVisible()

    await createOrEditPage.clickElementItemCloseButton()
    // await mainPage.verifyElementTitle('Identity Title')
    // await mainPage.openElementDetails()
    // await detailsPage.editElement()
    // await createOrEditPage.clickOnCreateOrEditButton('loadfile')
    // await createOrEditPage.uploadFile()
    // await createOrEditPage.verifyUploadedFileIsVisible()
    // await createOrEditPage.clickOnUploadedFile()
    // await createOrEditPage.verifyUploadedImageIsVisible()
    // await createOrEditPage.clickElementItemCloseButton()
    // await createOrEditPage.clickOnCreateOrEditButton('save')
    // await page.waitForTimeout(testData.timeouts.action)
    // await mainPage.clickDetailsCloseButton()
  })

  // test('View uploaded file in View mode (and cleanup)', async ({ page }) => {
  //   // qase.id(2164)
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
    // qase.id(2165)
    await mainPage.verifyElementTitle('Identity Title')
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    // await createOrEditPage.fillCreateOrEditInput('identity-title', '')
    await createOrEditPage.fillCreateOrEditInput('identity-fullname', '')
    await createOrEditPage.fillCreateOrEditInput('identity-email', '')
    await createOrEditPage.fillCreateOrEditInput('identity-phone', '')
    await createOrEditPage.fillCreateOrEditInput('identity-address', '')
    await createOrEditPage.fillCreateOrEditInput('identity-zip', '')
    await createOrEditPage.fillCreateOrEditInput('identity-city', '')
    await createOrEditPage.fillCreateOrEditInput('identity-region', '')
    await createOrEditPage.fillCreateOrEditInput('identity-country', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportfullname', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportnumber', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportissuingcountry', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportdateofissue', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportexpirydate', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportnationality', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportdob', '')
    await createOrEditPage.fillCreateOrEditInput('identity-passportgender', '')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardnumber', '')
    await createOrEditPage.fillCreateOrEditInput('identity-idcarddateofissue', '')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardexpirydate', '')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardissuingcountry', '')
    await createOrEditPage.fillCreateOrEditInput('identity-comment', '')
    await createOrEditPage.clickOnCreateOrEditButton('identity-save')

    await mainPage.openElementDetails()
    await detailsPage.verifyDetailsNoItems()

    // await detailsPage.verifyTitle('Identity Title')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('fullname', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('email', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('address', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('zip', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('city', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('region', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('country', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('passportfullname', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('passportnumber', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible(
    //   'passportissuingcountry',
    //   ''
    // )
    // await detailsPage.verifyItemDetailsValueIsNotVisible(
    //   'passportdateofissue',
    //   ''
    // )
    // await detailsPage.verifyItemDetailsValueIsNotVisible(
    //   'passportexpirydate',
    //   ''
    // )
    // await detailsPage.verifyItemDetailsValueIsNotVisible(
    //   'passportnationality',
    //   ''
    // )
    // await detailsPage.verifyItemDetailsValueIsNotVisible('passportdob', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('passportgender', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible('idcardnumber', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible(
    //   'idcarddateofissue',
    //   ''
    // )
    // await detailsPage.verifyItemDetailsValueIsNotVisible('idcardexpirydate', '')
    // await detailsPage.verifyItemDetailsValueIsNotVisible(
    //   'idcardissuingcountry',
    //   ''
    // )
    // await detailsPage.verifyItemDetailsValueIsNotVisible('note', '')

    await mainPage.clickDetailsCloseButton()
  })
})
