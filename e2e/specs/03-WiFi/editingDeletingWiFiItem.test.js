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

test.describe('Editing/Deleting WiFi Item', () => {
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

    await sideMenuPage.selectSideBarCategory('wifiPassword')
    await utilities.deleteAllElements()
    await mainPage.clickAddItem('wifiPassword')

    await createOrEditPage.fillCreateOrEditInput('wifi-name', 'WiFi Title')
    await createOrEditPage.fillCreateOrEditInput('wifi-password', 'WiFi Pass')
    await createOrEditPage.fillCreateOrEditInput('wifi-comment', 'WiFi Note')
    await createOrEditPage.clickOnCreateOrEditButton('wifi-save')

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

  test.afterAll(async ({}) => {
    await utilities.deleteAllElements()
    await sideMenuPage.clickSidebarExitButton()
  })

  test('Verify that edited "WiFi" item fields are saved correctly', async ({ page }) => {
    // qase.id(2148)
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('wifi-name', 'WiFi Title Edited')
    // await createOrEditPage.fillCreateOrEditInput('wifi-password', 'WiFi Pass Edited')
    await createOrEditPage.fillCreateOrEditInput('wifi-comment', 'WiFi Note Edited')
    await createOrEditPage.clickOnCreateOrEditButton('wifi-save')
    await page.waitForTimeout(testData.timeouts.action)

    await mainPage.verifyElementTitle('WiFi Title Edited')
    await mainPage.openElementDetails()
    // await detailsPage.verifyTitle('WiFi Title Edited')
    // await detailsPage.verifyItemDetailsValue('Password', 'WiFi Pass Edited')
    await detailsPage.verifyItemDetailsValue('Add comment', 'WiFi Note Edited')
  })

  // test('Verify that deleted custom "Note" fields are not saved in the edited "WiFi" item', async () => {
  //   qase.id(2149)
  //   await detailsPage.editElement()
  //   await createOrEditPage.clickCreateCustomItem()
  //   await createOrEditPage.clickCustomItemOptionNote()
  //   await expect(createOrEditPage.customNoteInput).toHaveCount(1)
  //   await createOrEditPage.deleteCustomNote()
  //   await expect(createOrEditPage.customNoteInput).toHaveCount(0)
  //   await createOrEditPage.clickElementItemCloseButton()
  // })

  test('Empty fields are not displayed in view mode', async () => {
    // qase.id(2150)
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('wifi-comment', '')
    await createOrEditPage.clickOnCreateOrEditButton('wifi-save')
    await mainPage.openElementDetails()
    await detailsPage.verifyItemDetailsValueIsNotVisible('Add comment')
    await mainPage.clickDetailsCloseButton()
  })
})
