import { test, expect } from '../fixtures/app.runner.js'

class SideMenuPage {
  constructor(root) {
    this.root = root
  }

  // ==== LOCATORS ====

  get sidebarExitButton() {
    return this.root.getByTestId('sidebar-lock-app')
  }

  getSideMenuFolder(folderName) {
    return this.root.getByRole('button', { name: folderName })
      .and(this.root.locator('[data-testid^="sidebar-"]'))
  }

  async verifySideMenuFolderName(folderName) {
    await expect(this.getSideMenuFolder(folderName)).toBeVisible()
  }

  getSidebarCategory(categoryname) {
    return this.root.getByTestId(`sidebar-category-${categoryname}`)
  }

  get sidebarAddButton() {
    return this.root.getByTestId('sidebar-folder-add')
  }

  // get sidebarAddButton() {
  //   return this.root.getByTestId('sidebarfolder-button-add')
  // }

  get confirmButton() {
    return this.root.getByTestId('button-primary')
  }

  get favoritesFolder() {
    return this.root.getByTestId('sidebar-folder-favorites').locator('span').last()
  }

  async verifySideBarFavoritesFolder(items) {
    await expect(this.favoritesFolder).toBeVisible()
    await expect(this.favoritesFolder).toHaveAttribute('aria-label', items)
  }

  get sidebarSettingsButton() {
    return this.root.getByTestId('sidebar-settings-button')
  }

  get deleteFolderButton() {
    return this.root.getByTestId('deletefolder-submit-v2')
  }

  // ==== ACTIONS ====

  async clickDeleteFolderButton() {
    await expect(this.deleteFolderButton).toBeVisible()
    await this.deleteFolderButton.click()
  }

  async clickSidebarSettingsButton() {
    await expect(this.sidebarSettingsButton).toBeVisible()
    await this.sidebarSettingsButton.click()
  }

  async selectSideBarCategory(name) {
    const category = this.getSidebarCategory(name)
    await expect(category).toBeVisible()
    await expect(category).toBeEnabled()
    await category.click()
  }

  async deleteMultipleItemsFolder(foldername) {
    const folder = this.getSideMenuFolder(foldername)
    await expect(folder).toBeVisible()

    await folder.click({ button: 'right' })

    const deleteButton = this.root.getByText('Delete Folder', { exact: true })

    await expect(deleteButton).toBeVisible()
    await deleteButton.click()

    // after click, menu should disappear
    // await expect(deleteButton).toBeHidden()
  }

  async deleteFolder(foldername) {
    const folder = this.getSideMenuFolder(foldername)
    await expect(folder).toBeVisible()

    await folder.click({ button: 'right' })

    const deleteButton = this.root.getByText('Delete Folder', { exact: true })

    await expect(deleteButton).toBeVisible()
    await deleteButton.click()

    // after click, menu should disappear
    await expect(deleteButton).toBeHidden()
  }

  // async deleteFolder(foldername) {
  //   const folder = this.getSideMenuFolder(foldername)
  //   await expect(folder).toBeVisible()

  //   const folderRow = folder
  //     .getByText(foldername)
  //     .locator('..')
  //     .locator('div')
  //     .first()

  //   // right click instead of left click
  //   await folderRow.click({ button: 'right' })

  //   const deleteButton = folder
  //     .locator('..')
  //     .getByText('Delete Folder', { exact: true })

  //   await expect(deleteButton).toBeVisible()
  //   await deleteButton.click()

  //   await expect(this.deleteButton).not.toBeVisible()
  //   // await this.confirmButton.click()
  // }
  

  // async deleteFolder(foldername) {
  //   const folder = this.getSideMenuFolder(foldername)
  //   await expect(folder).toBeVisible()

  //   await folder
  //     .getByText(foldername)
  //     .locator('..')
  //     .locator('div')
  //     .first()
  //     .click()

  //   const deleteButton = folder
  //     .locator('..')
  //     .getByText('Delete', { exact: true })
  //   await deleteButton.click()
  //   await expect(this.confirmButton).toBeVisible()
  //   await this.confirmButton.click()
  // }

  async clickSidebarAddButton() {
    await expect(this.sidebarAddButton).toBeVisible()
    await this.sidebarAddButton.click()
  }

  async createFolder(name) {
    await this.clickSidebarAddButton()
    const nameInput = this.root.getByTestId('createfolder-name-v2').locator('input')
    await expect(nameInput).toBeVisible()
    await nameInput.fill(name)
    const saveBtn = this.root.getByTestId('createfolder-save-v2')
    await expect(saveBtn).toBeVisible()
    await saveBtn.click()
    await expect(saveBtn).toBeHidden()
  }

  async clickSidebarExitButton() {
    await expect(this.sidebarExitButton).toBeVisible()
    await this.sidebarExitButton.click()
  }

  async openSideBarFolder(foldername) {
    await expect(this.getSideMenuFolder(foldername)).toBeVisible()
    await this.getSideMenuFolder(foldername).click()
  }

  getFavoriteFileName() {
    return this.root.locator(
      'input[data-testid="sidebar-folder-favorites"][placeholder="Insert folder name"]'
    )
  }

  // ==== VERIFICATIONS ====

  async verifySidebarFolderName(foldername) {
    const folder = this.getSideMenuFolder(foldername)
    await expect(folder).toBeVisible()
  }

  async verifyFavoriteFolderIsNotVisible(foldername) {
    const folder = this.getSideMenuFolder(foldername)
    await expect(folder).not.toBeVisible()
  }

  async verifyFavoriteFileIsVisible(foldername, filename) {
    const folder = this.getSideMenuFolder(foldername)
    await expect(folder).toBeVisible()
    await expect(folder).toContainText(filename)
  }
}

module.exports = { SideMenuPage }
