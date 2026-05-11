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

test.describe('Editing/Deleting Identity Item', () => {
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
    mainPage = new MainPage(root)
    sideMenuPage = new SideMenuPage(root)
    createOrEditPage = new CreateOrEditPage(root)
    utilities = new Utilities(root)
    detailsPage = new DetailsPage(root)

    await loginPage.loginToApplication(testData.credentials.validPassword)

    await sideMenuPage.selectSideBarCategory('identity')
    await utilities.deleteAllElements()
    await mainPage.clickAddItem('identity')

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

  test('Verify that edited "Identity" item fields are saved correctly', async () => {
    qase.id(2166)
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('identity-title', 'Identity Title Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-fullname', 'Identity Fullname Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-email', 'identitytestedited@mail.co')
    await createOrEditPage.fillCreateOrEditInput('identity-phone', 'Phone Number Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-address', 'Identity Address Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-zip', 'Identity Zip Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-city', 'Identity City Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-region', 'Identity Region Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-country', 'Identity Country Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-passportfullname', 'Identity Passport Fullname Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-passportnumber', 'Identity Passport Number Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-passportissuingcountry', 'Identity Issuing Country Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-passportdateofissue', 'Identity Date of Issue Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-passportexpirydate', '01/01/2022')
    await createOrEditPage.fillCreateOrEditInput('identity-passportnationality', '01/01/2027')
    await createOrEditPage.fillCreateOrEditInput('identity-passportdob', '01/01/1991')
    await createOrEditPage.fillCreateOrEditInput('identity-passportgender', 'Identity Gender Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardnumber', 'Identity ID Card Number Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-idcarddateofissue', '01/01/2026')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardexpirydate', '01/01/2031')
    await createOrEditPage.fillCreateOrEditInput('identity-idcardissuingcountry', 'USA Edited')
    await createOrEditPage.fillCreateOrEditInput('identity-comment', 'Identity Driving License Note Edited')
    await createOrEditPage.clickOnCreateOrEditButton('identity-save')

    await page.waitForTimeout(testData.timeouts.action)

    await mainPage.openElementDetails()
    await detailsPage.verifyIdentityDetailsValue('fullname', 'Identity Fullname Edited')
    await detailsPage.verifyIdentityDetailsValue('email', 'identitytestedited@mail.co')
    await detailsPage.verifyIdentityDetailsValue('address', 'Identity Address Edited')
    await detailsPage.verifyIdentityDetailsValue('zip', 'Identity Zip Edited')
    await detailsPage.verifyIdentityDetailsValue('city', 'Identity City Edited')
    await detailsPage.verifyIdentityDetailsValue('region', 'Identity Region Edited')
    await detailsPage.verifyIdentityDetailsValue('country', 'Identity Country Edited')
    await detailsPage.verifyIdentityDetailsValue('passportfullname', 'Identity Passport Fullname Edited')
    await detailsPage.verifyIdentityDetailsValue('passportnumber', 'Identity Passport Number Edited')
    await detailsPage.verifyIdentityDetailsValue('passportissuingcountry', 'Identity Issuing Country Edited')
    await detailsPage.verifyIdentityDetailsValue('passportdateofissue', 'Identity Date of Issue Edited')
    await detailsPage.verifyIdentityDetailsValue('passportexpirydate', '01/01/2022')
    await detailsPage.verifyIdentityDetailsValue('passportnationality', '01/01/2027')
    await detailsPage.verifyIdentityDetailsValue('passportdob', '01/01/1991')
    await detailsPage.verifyIdentityDetailsValue('passportgender', 'Identity Gender Edited')
    await detailsPage.verifyIdentityDetailsValue('idcardnumber', 'Identity ID Card Number Edited')
    await detailsPage.verifyIdentityDetailsValue('idcarddateofissue', '01/01/2026')
    await detailsPage.verifyIdentityDetailsValue('idcardexpirydate', '01/01/2031')
    await detailsPage.verifyIdentityDetailsValue('idcardissuingcountry', 'USA Edited')
    await detailsPage.verifyIdentityDetailsValue('note', 'Identity Driving License Note Edited')

  })

  test('Verify that the "Identity" item is removed after deletion', async () => {
    qase.id(2168)
    await utilities.deleteAllElements()
    await mainPage.verifyElementIsNotVisible()
  })

  test('Verify that the empty collection view is displayed on the Home screen after deleting the last item', async () => {
    qase.id(2169)
    await sideMenuPage.selectSideBarCategory('all')
    await expect(mainPage.emptyCollectionView).toBeVisible()
  })
})
