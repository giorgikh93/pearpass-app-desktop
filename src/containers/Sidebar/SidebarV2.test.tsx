import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const mockNavigate = jest.fn()
const mockCloseAllInstances = jest.fn()
const mockResetState = jest.fn()
const mockSetIsLoading = jest.fn()

jest.mock('@tetherto/pearpass-lib-constants', () => ({
  AUTHENTICATOR_ENABLED: false
}))

jest.mock('@tetherto/pearpass-lib-vault', () => ({
  RECORD_TYPES: {
    LOGIN: 'login',
    IDENTITY: 'identity',
    CREDIT_CARD: 'credit_card',
    NOTE: 'note',
    CUSTOM: 'custom',
    WIFI_PASSWORD: 'wifi_password',
    PASS_PHRASE: 'pass_phrase'
  },
  closeAllInstances: (...args: unknown[]) => mockCloseAllInstances(...args),
  useFolders: () => ({ data: { customFolders: {}, favorites: { records: [] } } }),
  useRecordCountsByType: () => ({ data: {} }),
  useVault: () => ({ data: { name: 'Test Vault' } }),
  useVaults: () => ({ resetState: mockResetState })
}))

jest.mock('@tetherto/pearpass-lib-ui-kit', () => {
  const React = require('react')
  return {
    useTheme: () => ({ theme: { colors: {} } }),
    rawTokens: new Proxy({}, { get: () => 0 }),
    Button: ({ onClick, 'data-testid': dataTestId, 'aria-label': ariaLabel }: {
      onClick?: () => void
      'data-testid'?: string
      'aria-label'?: string
    }) =>
      React.createElement('button', {
        type: 'button',
        'data-testid': dataTestId,
        'aria-label': ariaLabel,
        onClick
      }),
    NavbarListItem: ({
      label,
      onClick,
      testID
    }: {
      label?: string
      onClick?: () => void
      testID?: string
    }) =>
      React.createElement(
        'button',
        { type: 'button', 'data-testid': testID, onClick },
        label
      ),
    Text: ({ children }: { children: React.ReactNode }) =>
      React.createElement('span', null, children)
  }
})

jest.mock('@tetherto/pearpass-lib-ui-kit/components/Pressable', () => {
  const React = require('react')
  return {
    Pressable: ({
      children,
      onClick,
      'data-testid': dataTestId
    }: {
      children: React.ReactNode
      onClick?: () => void
      'data-testid'?: string
    }) =>
      React.createElement(
        'button',
        { type: 'button', 'data-testid': dataTestId, onClick },
        children
      )
  }
})

const iconStub = () => null

jest.mock('@tetherto/pearpass-lib-ui-kit/icons', () => ({
  Add: iconStub,
  Close: iconStub,
  CreateNewFolder: iconStub,
  ExpandMore: iconStub,
  Layers: iconStub,
  LockFilled: iconStub,
  LockOutlined: iconStub,
  MenuOpen: iconStub,
  SettingsOutlined: iconStub,
  StarBorder: iconStub,
  StarFilled: iconStub,
  TwoFactorAuthenticationOutlined: iconStub,
  AccountCircleFilled: iconStub,
  AccountCircleOutlined: iconStub,
  AssignmentInd: iconStub,
  CreditCard: iconStub,
  FormatQuote: iconStub,
  GridView: iconStub,
  LayerFilled: iconStub,
  Note: iconStub,
  WiFi: iconStub
}))

jest.mock('../../context/RouterContext', () => ({
  useRouter: () => ({ navigate: mockNavigate, data: {} })
}))

jest.mock('../../context/ModalContext', () => ({
  useModal: () => ({ setModal: jest.fn(), closeModal: jest.fn() })
}))

jest.mock('../../context/LoadingContext', () => ({
  useLoadingContext: () => ({ setIsLoading: mockSetIsLoading })
}))

jest.mock('../../hooks/useTranslation', () => ({
  useTranslation: () => ({ t: (s: string) => s })
}))

jest.mock('../Modal/CreateFolderModalContentV2/CreateFolderModalContentV2', () => ({
  CreateFolderModalContentV2: () => null
}))

import { SidebarV2 } from './SidebarV2'

describe('SidebarV2 — lock app flow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('closes instances, navigates to master password, and resets vault state', async () => {
    mockCloseAllInstances.mockImplementation(() => Promise.resolve())

    render(<SidebarV2 />)

    fireEvent.click(screen.getByTestId('sidebar-lock-app'))

    await waitFor(() => {
      expect(mockCloseAllInstances).toHaveBeenCalledTimes(1)
    })
    expect(mockNavigate).toHaveBeenCalledWith('welcome', {
      state: 'masterPassword'
    })
    expect(mockResetState).toHaveBeenCalledTimes(1)
    expect(mockSetIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(mockSetIsLoading).toHaveBeenLastCalledWith(false)
  })

  it('navigates to settings when Settings is clicked', async () => {
    render(<SidebarV2 />)

    fireEvent.click(screen.getByTestId('sidebar-settings-button'))

    expect(mockNavigate).toHaveBeenCalledWith('settings', {})
  })
})
