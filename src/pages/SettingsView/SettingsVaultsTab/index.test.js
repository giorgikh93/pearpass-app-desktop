import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@tetherto/pearpass-lib-ui-theme-provider'
import { useVault } from '@tetherto/pearpass-lib-vault'

import { SettingsVaultsTab } from './index'
import { useModal } from '../../../context/ModalContext'
import { isV2 } from '../../../utils/designVersion'
import '@testing-library/jest-dom'

jest.mock('@lingui/react', () => ({
  useLingui: () => ({
    i18n: {
      _: (str) => str
    }
  }),
  I18nProvider: ({ children }) => children
}))

jest.mock('@tetherto/pearpass-lib-vault', () => ({
  useVault: jest.fn()
}))

jest.mock('../../../context/ModalContext', () => ({
  useModal: jest.fn()
}))

jest.mock(
  '../../../containers/Modal/CreateOrEditVaultModalContentV2/CreateOrEditVaultModalContentV2',
  () => ({
    CreateOrEditVaultModalContentV2:
      function MockCreateOrEditVaultModalContentV2() {
        return null
      }
  })
)

jest.mock('../../../utils/designVersion', () => ({
  isV2: jest.fn(() => false)
}))

jest.mock('../../../utils/vaultCreated', () => ({
  vaultCreatedFormat: jest.fn((date) => date + 'date')
}))

jest.mock('../../../components/CardSingleSetting', () => ({
  CardSingleSetting: ({ title, children }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}))

jest.mock('../../../components/ListItem', () => ({
  ListItem: ({ itemName, onEditClick }) => (
    <div>
      <p>{itemName}</p>
      <button onClick={onEditClick}>Edit</button>
    </div>
  )
}))

describe('VaultsTab', () => {
  const setModalMock = jest.fn()
  const closeModalMock = jest.fn()

  const renderWithProviders = (component) =>
    render(<ThemeProvider>{component}</ThemeProvider>)

  beforeEach(() => {
    useVault.mockReturnValue({
      data: {
        id: '1',
        name: 'Vault 1',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    })

    useModal.mockReturnValue({
      setModal: setModalMock,
      closeModal: closeModalMock
    })

    isV2.mockReturnValue(false)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders Your Vault section', () => {
    const { container } = renderWithProviders(<SettingsVaultsTab />)

    expect(screen.getByText('Your Vault')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders vault in the list', () => {
    renderWithProviders(<SettingsVaultsTab />)

    expect(screen.getByText('Vault 1')).toBeInTheDocument()
  })

  it('opens vault edit modal when editing the vault', () => {
    renderWithProviders(<SettingsVaultsTab />)

    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)

    expect(setModalMock).toHaveBeenCalledWith(expect.anything())
  })

  it('opens CreateOrEditVaultModalContentV2 when design version is v2', () => {
    isV2.mockReturnValue(true)

    renderWithProviders(<SettingsVaultsTab />)

    fireEvent.click(screen.getByText('Edit'))

    expect(setModalMock).toHaveBeenCalledWith(expect.anything())
  })
})
