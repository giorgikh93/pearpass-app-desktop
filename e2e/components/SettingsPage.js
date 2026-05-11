import { test, expect } from '../fixtures/app.runner.js'

class SettingsPage {
  constructor(root) {
    this.root = root
  }

  // --- Navigation ---

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

  get backSettingsButton() {
    return this.root.getByRole('button', { name: 'Go back' });
  }

  async clickBackSettingsButton() {
    await this.backSettingsButton.waitFor({ state: 'visible' });
    await this.backSettingsButton.click();
  }

  // --- Dropdowns ---

  getPearPassFunctionDropdown(pearpass_dropdown_id) {
    return this.root.getByTestId(`settings-${pearpass_dropdown_id}`)
  }

  async clickPearPassFunctionDropdown(dropdown_id) {
    const function_dropdown = this.getPearPassFunctionDropdown(dropdown_id)
    await expect(function_dropdown).toBeVisible()
    await function_dropdown.click()
  }

  getPearPassFunctionDropdownOption(dropdown_option) {
    return this.root.getByTestId(`settings-auto-lock-option-${dropdown_option}`)
  }

  async verifyPearPassFunctionDropdownOptionIsVisible(dropdown_id) {
    const function_dropdown =
      this.getPearPassFunctionDropdownOption(dropdown_id)
    await expect(function_dropdown).toBeVisible()
  }
}

module.exports = { SettingsPage }
