import { test, expect } from '../fixtures/app.runner.js'

class CreateOrEditPage {
  constructor(root) {
    this.root = root
  }

  // ==== LOCATORS ====

  // website-multi-slot-input-slot-0
  get detailsWebsite() {
    return this.root.getByTestId('website-multi-slot-input-slot-0')
  }

  async verifyDetailsWebsiteCount(expectedCount) {
    await expect(this.detailsWebsite).toHaveCount(expectedCount)
  }

  get detailsComment() {
    return this.root.getByTestId('comments-multi-slot-input-slot-0')
  }

  async verifyDetailsCommentCount(expectedCount) {
    await expect(this.detailsComment).toHaveCount(expectedCount)
  }

  get deleteAttachmentButton() {
    // Matches any delete-attachment button ending with "-button-deleteattachment-v2-0"
    // e.g. createoredit-button-deleteattachment-v2-0, createoredit-creditcard-button-deleteattachment-v2-0, etc.
    return this.root.getByTestId(/-button-deleteattachment-v2-0$/).first()
  }

  getPasswordStrenghtCheck(strenght_type) {
    return this.root.getByTestId(`passwordcheck-strength-${strenght_type}`)
  }

  async verifyPasswordStrenght(strenght, type, text) {
    const element = this.root.getByTestId(`passwordcheck-strength-${strenght}`)
    await expect(element).toBeVisible()
    await expect(element).toHaveAttribute('type', type)
    await expect(element).toHaveText(text)
  }

  get charactersliderContainer() {
    return this.root.getByTestId('passwordgenerator-characterslider-container')
  }

  get charactersliderContainer() {
    return this.root.getByTestId('passwordgenerator-characterslider-container')
  }

  getCharsliderByPositionNumber(position_number) {
    return this.root.getByTestId(
      `passwordgenerator-characterSlider-${position_number}`
    )
  }

  async verifyCharsliderByPositionNumber(position) {
    const characterslider_container = this.charactersliderContainer
    await expect(characterslider_container).toBeVisible()
    const characterslider_number = this.getCharsliderByPositionNumber(position)
    await expect(characterslider_number).toBeVisible()
  }

  get switchwithlabelContainer() {
    return this.root.getByTestId(
      'ruleselector-switchwithlabel-specialCharacters'
    )
  }

  getswitchByPositionState(switch_state) {
    return this.root.getByTestId(`switchwithlabel-switch-${switch_state}`)
  }

  async verifySpecialCharactersSwitchByState(state) {
    const switch_container = this.switchwithlabelContainer
    await expect(switch_container).toBeVisible()
    const switch_state = this.getswitchByPositionState(state)
    await expect(switch_state).toBeVisible()
  }

  async clickSwitchByState(state) {
    const switch_container = this.switchwithlabelContainer
    await expect(switch_container).toBeVisible()
    const switch_state = this.getswitchByPositionState(state)
    await expect(switch_state).toBeVisible()
    await switch_state.click()
  }

  // ruleselector-switchwithlabel-specialCharacters
  // switchwithlabel-switch-on

  get passphraseRadioButtonContainer() {
    return this.root.getByTestId('radioselect-container')
  }

  getPasswordRadioButtonState(state) {
    return this.root.getByTestId(`radioselect-password-${state}`)
  }

  getPassphraseRadioButtonState(state) {
    return this.root.getByTestId(`radioselect-passphrase-${state}`)
  }

  async verifyRadioButtonPasswordState(password_state) {
    const radiobuttons_container = this.passphraseRadioButtonContainer
    await expect(radiobuttons_container).toBeVisible()
    const password_radiobutton_state =
      this.getPasswordRadioButtonState(password_state)
    await expect(password_radiobutton_state).toBeVisible()
  }

  async verifyRadioButtonPassphraseState(passphrase_state) {
    const radiobuttons_container = this.passphraseRadioButtonContainer
    await expect(radiobuttons_container).toBeVisible()
    const passphrase_radiobutton_state =
      this.getPassphraseRadioButtonState(passphrase_state)
    await expect(passphrase_radiobutton_state).toBeVisible()
  }

  get noteTextArea() {
    return this.root.getByTestId('createoredit-textarea-note')
  }

  get insertPasswordButton() {
    return this.root
      .getByTestId('generatepassword-button-primary-v2')
      .first()
  }

  getCreateOrEditInputField(field) {
    // Irregular test IDs that don't follow the standard pattern
    const overrides = {
      website: 'createoredit-input-website-v2-0',
      attachment: 'createoredit-attachment-upload-v2',
    }
    // Principle: '{category}-{field}' => 'createoredit-{category}-input-{field}-v2'
    //            '{field}'            => 'createoredit-input-{field}-v2'
    const dashIndex = field.indexOf('-')
    const testId = overrides[field] ??
      (dashIndex !== -1
        ? `createoredit-${field.slice(0, dashIndex)}-input-${field.slice(dashIndex + 1)}-v2`
        : `createoredit-input-${field}-v2`)
    // v2 InputField/PasswordField renders testID on wrapper div; drill into actual input
    return this.root.getByTestId(testId).locator('input').first()
  }

  getCreateOrEditTextareaField(field) {
    return this.root.getByTestId(`createoredit-textarea-${field}`)
  }

  get passwordMenu() {
    return this.root.getByTestId('createoredit-button-generatepassword-v2')
  }

  get createOrEditCustomInputField() {
    return this.root.getByTestId(`createoredit-button-createcustom`)
  }

  get createCustomNote() {
    return this.root.getByTestId('createcustomfield-option-note')
  }

  get customNoteInput() {
    return this.root.getByTestId('createoredit-custom-input-customfield-v2-0').locator('input').first()
  }

  get customNoteInput_first() {
    return this.root.getByTestId(/^createoredit-custom-input-customfield-v2-/)
  }

  // TODO: need to change customfields-input-note-0 to createoredit-input-note-0
  async fillCustomNoteInput() {
    const input = this.customNoteInput
    await input.waitFor({ state: 'visible' })
    await input.fill('')
    await input.fill('Custom Note')
  }

  async fillCustomNoteInput_first() {
    const input = this.customNoteInput_first
    await input.waitFor({ state: 'visible' })
    await input.fill('')
    await input.fill('Custom Note')
  }

  get deleteCustomNoteItem() {
    return this.root.getByTestId('createoredit-custom-button-removecustomfield-v2-0')
  }

  get dropdownFolderMenu() {
    return this.root.getByTestId('createoredit-select-folder-v2')
  }

  // get dropdownFolderMenu() {
  //   return this.root.getByTestId('createoredit-dropdown-folder')
  // }

  getDropdownItem(item) {
    return this.root.getByTestId(`menudropdown-item-${item}`)
  }

  getCreateOrEditButton(name) {
    // Principle: '{category}-{action}' => 'createoredit-{category}-button-{action}-v2'
    //            '{action}'            => 'createoredit-button-{action}-v2'
    const dashIndex = name.indexOf('-')
    const testId = dashIndex !== -1
      ? `createoredit-${name.slice(0, dashIndex)}-button-${name.slice(dashIndex + 1)}-v2`
      : `createoredit-button-${name}-v2`
    return this.root.getByTestId(testId)
  }

  getCreateOrEditUploadAttachment() {
    // Matches any attachment upload button ending with "-attachment-upload-v2"
    // e.g. createoredit-attachment-upload-v2, createoredit-creditcard-attachment-upload-v2, etc.
    return this.root.getByTestId(/-attachment-upload-v2$/).first()
  }

  async clickOnAttachment() {
    const input = this.getCreateOrEditUploadAttachment()
    await input.waitFor({ state: 'visible' })
    await input.click()
  }

  get deleteFileButton() {
    return this.root
      .getByTestId('createoredit-attachment')
      .getByRole('button', { name: 'Delete File' })
  }

  async clickOnDeleteFileButton() {
    const deleteButton = this.deleteFileButton
    await expect(deleteButton).toBeVisible()
    await deleteButton.click()
  }

  get elementItemPassword() {
    return this.root.getByPlaceholder('Password')
  }

  get elementItemPasswordShowHideFirst() {
    return this.root
      .getByTestId('password-field-eye-button')
      .first()
  }

  get elementItemPasswordShowHideLast() {
    return this.root.getByTestId('password-field-eye-button').last()
  }

  get uploadedFileLink() {
    // uploadfiles-dialog-v2
    // uploadfiles-field-v2
    // return this.root.getByRole('link', { name: 'TestPhoto.png' })
    return this.root
      .getByTestId('uploadfiles-field-v2')
      .getByText('TestPhoto.png', { exact: true })
  }

  get uploadedFile() {
    return this.root.getByTestId('uploadfiles-button-additem-v2')
  }

  get uploadedImage() {
    return this.root.getByAltText('TestPhoto.png')
  }

  get deleteFileButton() {
    return this.root.getByTestId('createoredit-button-deleteattachment')
  }

  get loadFile() {
    return this.root.getByTestId('createoredit-button-loadfile')
  }

  get saveButton() {
    return this.root.getByTestId('createoredit-button-save')
  }

  // get fileInput() {
  //   // return this.root.locator('input[type="file"]').first()
  //   return this.root.getByTestId('createoredit-attachment-upload-v2')
  //   // createoredit-attachment-upload-v2
  // }

  get fileInput() {
    return this.root.locator('input[type="file"]').first()
  }

  get elementItemCloseButton() {
    // Matches any close button whose testID ends with "-close-v2"
    // e.g. createoredit-login-close-v2, createoredit-creditcard-close-v2, etc.
    return this.root.getByTestId(/-close-v2$/).first()
  }

  get passwordInput() {
    return this.root.getByTestId('createoredit-input-password')
  }

  getSection(sectionname) {
    return this.root.getByTestId(`createoredit-section-${sectionname}`)
  }

  get identitySection() {
    return this.root.getByTestId(`createoredit-section-personalinfo`)
  }

  get passPhrasePasteButton() {
    return this.root.getByRole('button', { name: 'Paste recovery phrase' }).first()
  }

  // ==== ACTIONS ====

  async clickOnPasteFromClipboard() {
    const pasteButton = this.passPhrasePasteButton
    await expect(pasteButton).toBeVisible()
    await pasteButton.click()
  }

  async clickOnIdentitySection(sectionname) {
    const section = this.getSection(sectionname)
    await section.waitFor({ state: 'visible' })
    await section.click()
  }

  async clickOnCreateOrEditButton(button) {
    const input = this.getCreateOrEditButton(button)
    await input.waitFor({ state: 'visible' })
    await input.click()
  }

  async clickInsertPasswordButton() {
    await expect(this.insertPasswordButton).toBeVisible()
    await this.insertPasswordButton.click()
  }

  async clickInsertPasswordButton() {
    await expect(this.insertPasswordButton).toBeVisible()
    await this.insertPasswordButton.click()
  }

  async openPasswordMenu() {
    await expect(this.passwordMenu).toBeVisible()
    await this.passwordMenu.click()
  }

  async clickElementItemCloseButton() {
    await expect(this.elementItemCloseButton).toBeVisible()
    await this.elementItemCloseButton.click()
  }

  async clickLoadFileButton() {
    await expect(this.loadFile).toBeVisible()
    await this.loadFile.click()
  }

  async uploadFile() {
    await this.fileInput.setInputFiles('test-files/TestPhoto.png')
  }

  async clickOnUploadedFile() {
    // uploadfiles-button-additem-v2
    await expect(this.uploadedFile).toBeVisible()
    await this.uploadedFile.click()
  }

  async clickOnDeleteAttachmentButton() {
    const deleteButton = this.deleteAttachmentButton
    await expect(deleteButton).toBeVisible()
    await deleteButton.click()
  }

  async clickCreateCustomItem() {
    await expect(this.createOrEditCustomInputField).toBeVisible()
    await this.createOrEditCustomInputField.click()
  }

  async clickCustomItemOptionNote() {
    await expect(this.createCustomNote).toBeVisible()
    await this.createCustomNote.click()
  }

  async deleteCustomNote() {
    const input = this.customNoteInput
    await input.waitFor({ state: 'visible' })
    await input.fill('')
  }

  async clickShowHidePasswordButtonFirst() {
    await expect(this.elementItemPasswordShowHideFirst).toBeVisible()
    await this.elementItemPasswordShowHideFirst.click()
  }

  async clickShowHidePasswordButtonLast() {
    await expect(this.elementItemPasswordShowHideLast).toBeVisible()
    await this.elementItemPasswordShowHideLast.click()
  }

  async fillCreateOrEditInput(field, value) {
    const input = this.getCreateOrEditInputField(field)
    await input.waitFor({ state: 'visible' })
    await input.fill('')
    await input.fill(value)
  }

  async fillCreateOrEditTextArea(field, value) {
    const text_area = this.getCreateOrEditTextareaField(field)
    await text_area.waitFor({ state: 'visible' })
    await text_area.clear()
    await text_area.type(value)
  }

  async countItems(labelOrPlaceholder, expectedCount) {
    const itemDetail = this.getElementItemDetails(labelOrPlaceholder)
    await expect(itemDetail).toHaveCount(expectedCount)
  }

  async openDropdownMenu() {
    await this.dropdownFolderMenu.waitFor({ state: 'attached' })
    await this.dropdownFolderMenu.click()
  }

  async selectFromDropdownMenu(foldername) {
    const folder = this.root.getByTestId(`createoredit-folder-option-v2-${foldername}`)
    await expect(folder).toBeVisible()
    await folder.click()
  }

  // ==== VERIFICATIONS ====

  async verifyPasswordToNotHaveValue(password) {
    const passwordInput = this.getCreateOrEditInputField('password')
    await expect(passwordInput).toBeVisible()
    await expect(passwordInput).not.toHaveValue(password)
  }

  async verifyUploadedFileIsVisible() {
    await expect(this.uploadedFileLink).toBeVisible()
    await expect(this.uploadedFileLink).toHaveText('TestPhoto.png')
  }

  async verifyUploadedImageIsVisible() {
    await expect(this.uploadedImage).toBeVisible()
  }

  async verifyUploadedImageIsNotVisible() {
    await expect(this.uploadedImage).not.toBeVisible()
  }

  async verifyItemDetailsValue(labelOrPlaceholder, expectedValue) {
    const itemDetail = this.getElementItemDetails(labelOrPlaceholder)
    await expect(itemDetail).toHaveValue(expectedValue)
  }

  async verifyItemDetailsValueIsNotVisible(labelOrPlaceholder) {
    const itemDetail = this.getElementItemDetails(labelOrPlaceholder)
    await expect(itemDetail).not.toBeVisible()
  }

  async verifyPasswordType(password_type) {
    const itemDetail = this.root.getByPlaceholder('Password')
    await expect(itemDetail).toBeVisible()
    await expect(itemDetail).toHaveAttribute('type', password_type)
  }

  async verifyItemType(placeholder, item_type) {
    const itemDetail = this.root.getByPlaceholder(placeholder).nth('1')
    await expect(itemDetail).toBeVisible()
    await expect(itemDetail).toHaveAttribute('type', item_type)
  }

  async verifyItemVisibility(placeholder, counter) {
    const itemDetail = this.root.getByPlaceholder(placeholder).nth(counter)
    await expect(itemDetail).toBeVisible()
  }

  // Create Login Item
}

module.exports = { CreateOrEditPage }
