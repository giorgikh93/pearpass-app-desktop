import { test, expect } from '../fixtures/app.runner.js'

class SettingsPage {
  constructor(root) {
    this.root = root
  }

  // ==== LOCATORS ====

  getSettingsNavigations(navigation_menu_navigation_id) {
    return this.root.getByTestId(
      `settings-nav-${navigation_menu_navigation_id}`
    )
  }

  async clickSettingsNavigation(navigation_name) {
    const navigation_menu = this.getSettingsNavigations(navigation_name)
    await expect(navigation_menu).toBeVisible()
    await navigation_menu.click()
  }

  //

  getSettingsCard(card_id) {
    return this.root.getByTestId(`settings-card-${card_id}`)
  }

  async verifySettingsCardIsVisible(card) {
    const card_container = this.getSettingsCard(card)
    await expect(card_container).toBeVisible()
  }

  getSettingsDropdownSection(section_name) {
    return this.root.getByTestId(`section-${section_name}`)
  }

  async verifySettingsDropdownSectionIsVisible(section_name) {
    const section_dropdown = this.getSettingsDropdownSection(section_name)
    await expect(section_dropdown).toBeVisible()
  }

  getSettingsDropdownNavigation(section_navigation_name) {
    return this.root.getByTestId(`settings-nav-${section_navigation_name}`)
  }

  async verifySettingsDropdownNavigationIsVisible(section_navigation_name) {
    const section_navigation = this.getSettingsDropdownNavigation(section_navigation_name)
    await expect(section_navigation).toBeVisible()
  }

  //

  getPearPassFunction(pearpass_function_id) {
    return this.root.getByTestId(`settings-${pearpass_function_id}`)
  }

  async verifySettingsFunction(function_name) {
    const function_pearpass = this.getPearPassFunction(function_name)
    await expect(function_pearpass).toBeVisible()
  }

  //

  getPearPassFunctionButton(pearpass_function_id, on_off_status) {
    return this.root
      .getByTestId(`settings-${pearpass_function_id}`)
      .getByTestId(`switchwithlabel-switch-${on_off_status}`)
  }

  async clickPearPassFunctionButton(function_id, on_off) {
    const function_button = this.getPearPassFunctionButton(function_id, on_off)
    await expect(function_button).toBeVisible()
    await function_button.click()
  }

  async verifySwitchIsOnOrOff(id, state_on_off, attribute_state_on_off) {
    const jedan = this.getPearPassFunctionButton(id, state_on_off)
    await expect(jedan).toHaveAttribute(
      'data-testid',
      `switchwithlabel-switch-${attribute_state_on_off}`
    )
  }

  //

  getPearPassFunctionDropdown(pearpass_dropdown_id) {
    return this.root.getByTestId(`settings-${pearpass_dropdown_id}`)
  }

  async clickPearPassFunctionDropdown(dropdown_id) {
    const function_dropdown = this.getPearPassFunctionDropdown(dropdown_id)
    await expect(function_dropdown).toBeVisible()
    await function_dropdown.click()
  }

  //

  getPearPassFunctionDropdownOption(dropdown_option) {
    return this.root.getByTestId(`settings-auto-lock-option-${dropdown_option}`)
  }

  async verifyPearPassFunctionDropdownOptionIsVisible(dropdown_id) {
    const function_dropdown =
      this.getPearPassFunctionDropdownOption(dropdown_id)
    await expect(function_dropdown).toBeVisible()
    // await function_dropdown.click()
  }

  //

  // get backSettingsButton() {
  //   return this.root.getByTestId('button-round-icon')
  // }

  get backSettingsButton() {
    return this.root.getByRole('button', { name: 'Go back' });
  }

  async clickBackSettingsButton() {
    await this.backSettingsButton.waitFor({ state: 'visible' });
    await this.backSettingsButton.click();
  }
}

module.exports = { SettingsPage }
