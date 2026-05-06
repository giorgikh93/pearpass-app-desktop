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

test.describe('Editing/Deleting Note Item', () => {
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

    await sideMenuPage.selectSideBarCategory('note')
    await utilities.deleteAllElements()
    await mainPage.clickAddItem('note')

    await createOrEditPage.fillCreateOrEditInput('note-title', 'Note Title')
    await createOrEditPage.fillCreateOrEditInput('note-comment', 'Test Note Text')
    await createOrEditPage.clickOnCreateOrEditButton('note-save')
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

  test('Verify that edited "Note" item fields are saved correctly', async () => {
    qase.id(2262)
    await mainPage.openElementDetails()
    await detailsPage.editElement()
    await createOrEditPage.fillCreateOrEditInput('note-title', 'EDITED Note Title')
    await createOrEditPage.fillCreateOrEditInput('note-comment', 'EDITED Test Note Text')
    await createOrEditPage.clickOnCreateOrEditButton('note-save')
    await page.waitForTimeout(testData.timeouts.action)
    await mainPage.openElementDetails()
    await detailsPage.verifyTitle('EDITED Note Title')
    await detailsPage.verifyNoteText('EDITED Test Note Text')
  })

  test('Verify that the "Login" item is removed after deletion', async () => {
    qase.id(2265)
    await utilities.deleteAllElements()
    await mainPage.verifyElementIsNotVisible()
  })

  test('Verify that the empty collection view is displayed on the Home screen after deleting the last item', async () => {
    qase.id(2266)
    await sideMenuPage.selectSideBarCategory('all')
    await expect(mainPage.emptyCollectionView).toBeVisible()
  })
})
