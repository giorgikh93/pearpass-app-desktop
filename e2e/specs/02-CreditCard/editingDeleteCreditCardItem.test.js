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

test.describe('Editing/Deleting Credit Card Item', () => {
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

    await sideMenuPage.selectSideBarCategory('all')
    await utilities.deleteAllElements()
    await sideMenuPage.selectSideBarCategory('creditCard')
    await mainPage.clickAddItem('creditCard')

    await createOrEditPage.fillCreateOrEditInput('creditcard-title', 'Credit Card Title')
    await createOrEditPage.fillCreateOrEditInput('creditcard-name', 'John')
    await createOrEditPage.fillCreateOrEditInput('creditcard-number', '12312312')
    await createOrEditPage.fillCreateOrEditInput('creditcard-expiredate', '1212')
    await createOrEditPage.fillCreateOrEditInput('creditcard-securitycode', '111')
    await createOrEditPage.fillCreateOrEditInput('creditcard-pincode', '111')
    await createOrEditPage.fillCreateOrEditInput('creditcard-comment', 'Credit Card Note')
    await createOrEditPage.clickOnCreateOrEditButton('creditcard-save')
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.verifyElementTitle('Credit Card Title')

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

  test('Verify that edited "Credit Card" item fields are saved correctly', async () => {
    qase.id(2130)
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('creditcard-name', 'John EDITED')
    await createOrEditPage.fillCreateOrEditInput('creditcard-number', '99999999')
    await createOrEditPage.fillCreateOrEditInput('creditcard-expiredate', '0101')
    await createOrEditPage.fillCreateOrEditInput('creditcard-securitycode', '222')
    await createOrEditPage.fillCreateOrEditInput('creditcard-pincode', '222')
    await createOrEditPage.fillCreateOrEditInput('creditcard-comment', 'Credit Card Note EDITED')
    await createOrEditPage.clickOnCreateOrEditButton('creditcard-save')
    await page.waitForTimeout(testData.timeouts.action)

    await mainPage.verifyElementTitle('Credit Card Title')
    await mainPage.openElementDetails()
    await detailsPage.verifyItemDetailsValue('Name on card', 'John EDITED')
    await detailsPage.verifyItemDetailsValue('Number on card', '9999 9999')
    await detailsPage.verifyCustomNoteText('Credit Card Note EDITED')
  })

  test('Empty fields are not displayed in view mode', async ({ page }) => {
    qase.id(2131)
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('creditcard-name', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-number', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-expiredate', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-securitycode', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-pincode', '')
    await createOrEditPage.fillCreateOrEditInput('creditcard-comment', '')

    await createOrEditPage.clickOnCreateOrEditButton('creditcard-save')
    await mainPage.openElementDetails()

    await detailsPage.verifyDetailsNoItems()

    await test.step('CLOSE DETAILS', async () => {
      await mainPage.clickDetailsCloseButton()
    })
  })

  test('Verify that the "Credit Card" item is removed after deletion', async () => {
    qase.id(2133)
    await utilities.deleteAllElements()
    await mainPage.verifyElementIsNotVisible()
  })

  test('Verify that the empty collection view is displayed on the Home screen after deleting the last item', async () => {
    qase.id(2134)
    await sideMenuPage.selectSideBarCategory('all')
    await expect(mainPage.emptyCollectionView).toBeVisible()
  })
})
