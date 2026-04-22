import React, { useMemo, useState } from 'react'

import { AUTHENTICATOR_ENABLED } from '@tetherto/pearpass-lib-constants'
import {
  closeAllInstances,
  useFolders,
  useRecordCountsByType,
  useVault,
  useVaults
} from '@tetherto/pearpass-lib-vault'
import {
  Button,
  NavbarListItem,
  Text,
  useTheme
} from '@tetherto/pearpass-lib-ui-kit'
import { Pressable } from '@tetherto/pearpass-lib-ui-kit/components/Pressable'
import {
  Add,
  Close,
  CreateNewFolder,
  ExpandMore,
  Layers,
  LockFilled,
  LockOutlined,
  MenuOpen,
  SettingsOutlined,
  StarBorder,
  StarFilled,
  TwoFactorAuthenticationOutlined
} from '@tetherto/pearpass-lib-ui-kit/icons'

import { createStyles } from './SidebarV2.styles'
import { NAVIGATION_ROUTES } from '../../constants/navigation'
import { useLoadingContext } from '../../context/LoadingContext'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'
import { useRecordMenuItemsV2 } from '../../hooks/useRecordMenuItemsV2'
import { useTranslation } from '../../hooks/useTranslation'
import { FAVORITES_FOLDER_ID } from '../../utils/isFavorite'
import { sortByName } from '../../utils/sortByName'
import { CreateFolderModalContentV2 } from '../Modal/CreateFolderModalContentV2/CreateFolderModalContentV2'

export const SidebarV2 = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVaultSelectorOpen, setIsVaultSelectorOpen] = useState(false)
  const styles = createStyles(theme.colors, isCollapsed)

  const { navigate, data: routerData } = useRouter()
  const { data: vaultData } = useVault()
  const { data: foldersData } = useFolders()
  const { data: recordCounts } = useRecordCountsByType()
  const { resetState } = useVaults()
  const { setModal, closeModal } = useModal()
  const { setIsLoading } = useLoadingContext()

  const [isFoldersExpanded, setIsFoldersExpanded] = useState(true)

  const { categoriesItems } = useRecordMenuItemsV2()

  const activeCategory =
    !routerData?.folder && routerData?.recordType ? routerData.recordType : null
  const isFavoritesActive = routerData?.folder === FAVORITES_FOLDER_ID
  const selectedFolderName =
    routerData?.folder && !isFavoritesActive ? routerData.folder : null

  const customFolders = useMemo(() => {
    const raw = Object.values(foldersData?.customFolders ?? {}) as Array<{
      name: string
      records: Array<{ data?: unknown }>
    }>

    return sortByName(
      raw.map((folder) => ({
        name: folder.name,
        count: folder.records.filter((record) => !!record.data).length
      }))
    )
  }, [foldersData])

  const favoritesCount =
    (foldersData?.favorites?.records?.length as number | undefined) ?? 0

  const handleCategoryClick = (type: string) => {
    navigate('vault', { recordType: type })
  }

  const handleFolderClick = (folderId: string) => {
    navigate('vault', { recordType: 'all', folder: folderId })
  }

  const handleAllFoldersClick = () => {
    navigate('vault', { recordType: 'all' })
  }

  const handleAddFolderClick = () => {
    setModal(<CreateFolderModalContentV2 onClose={closeModal} />)
  }

  const handleSettingsClick = () => {
    navigate('settings', {})
  }

  const handleLockApp = async () => {
    setIsLoading(true)
    try {
      await closeAllInstances()
      navigate('welcome', { state: NAVIGATION_ROUTES.MASTER_PASSWORD })
      resetState()
    } finally {
      setIsLoading(false)
    }
  }

  const isAllFoldersActive =
    !routerData?.folder && routerData?.recordType === 'all'

  const iconTextPrimary = { color: theme.colors.colorTextPrimary }
  const iconTextSecondary = { color: theme.colors.colorTextSecondary }

  const renderCollapseButton = () => (
    <div style={isCollapsed ? styles.collapseButtonFlipped : undefined}>
      <Button
        variant="tertiary"
        size="small"
        onClick={() => setIsCollapsed((value) => !value)}
        data-testid="sidebar-collapse-toggle"
        aria-label={isCollapsed ? t('Expand sidebar') : t('Collapse sidebar')}
        iconBefore={<MenuOpen style={iconTextPrimary} />}
      />
    </div>
  )

  const renderVaultHeader = () => {
    const chevronStyle = {
      ...iconTextPrimary,
      ...styles.chevron,
      ...(isVaultSelectorOpen ? styles.chevronFlipped : {})
    }

    const rightButton = isVaultSelectorOpen ? (
      <Button
        variant="tertiary"
        size="small"
        onClick={() => setIsVaultSelectorOpen(false)}
        data-testid="sidebar-vault-selector-close"
        aria-label={t('Close vault selector')}
        iconBefore={<Close style={iconTextPrimary} />}
      />
    ) : (
      renderCollapseButton()
    )

    return (
      <div style={styles.vaultSelector} data-testid="sidebar-vault-selector">
        <LockFilled width={16} height={16} style={iconTextPrimary} />
        <div style={styles.vaultNameGroup}>
          <Pressable
            onClick={() => setIsVaultSelectorOpen((value) => !value)}
            data-testid="sidebar-vault-selector-toggle"
            aria-label={
              isVaultSelectorOpen
                ? t('Close vault selector')
                : t('Open vault selector')
            }
          >
            <div style={styles.vaultNameRow}>
              <div style={styles.vaultNameText}>
                <Text variant="labelEmphasized" numberOfLines={1}>
                  {vaultData?.name ?? t('Personal Vault')}
                </Text>
              </div>
              <ExpandMore width={16} height={16} style={chevronStyle} />
            </div>
          </Pressable>
        </div>
        {rightButton}
      </div>
    )
  }

  const renderVaultListHeader = () => (
    <div style={styles.foldersHeader}>
      <div style={{ flex: 1 }}>
        <Text variant="labelEmphasized" color={theme.colors.colorTextSecondary}>
          {t('Vaults')}
        </Text>
      </div>
      <Button
        variant="tertiary"
        size="small"
        data-testid="sidebar-vault-add"
        aria-label={t('Add vault')}
        iconBefore={<Add style={iconTextSecondary} />}
      />
    </div>
  )

  return (
    <aside style={styles.wrapper} data-testid="sidebar-v2">
      {isCollapsed ? (
        <div style={styles.vaultSelector}>{renderCollapseButton()}</div>
      ) : (
        renderVaultHeader()
      )}

      <div style={styles.scrollArea}>
        {isVaultSelectorOpen && renderVaultListHeader()}

        {!isVaultSelectorOpen && (
          <>
            <div style={styles.sectionList}>
              {categoriesItems.map((item) => {
            const selected = activeCategory === item.type
            const Icon = selected ? item.FilledIcon : item.OutlinedIcon
            const iconColor = selected
              ? theme.colors.colorTextPrimary
              : theme.colors.colorTextSecondary

            return (
              <NavbarListItem
                key={item.type}
                testID={`sidebar-category-${item.type}`}
                label={item.label}
                count={isCollapsed ? undefined : recordCounts?.[item.type] ?? 0}
                selected={selected}
                variant={selected ? 'default' : 'secondary'}
                size="small"
                icon={<Icon color={iconColor} />}
                onClick={() => handleCategoryClick(item.type)}
              />
            )
          })}
        </div>

        <hr style={styles.divider} />

        <div style={styles.sectionList}>
          <div style={styles.foldersHeader}>
            <div style={styles.foldersHeaderToggle}>
              <Pressable
                onClick={() => setIsFoldersExpanded((value) => !value)}
                data-testid="sidebar-folders-toggle"
                aria-label={t('Folders')}
              >
                <div style={styles.foldersHeaderToggleInner}>
                  <ExpandMore
                    width={16}
                    height={16}
                    style={{
                      ...iconTextSecondary,
                      ...styles.chevron,
                      ...(!isFoldersExpanded ? styles.chevronCollapsed : {})
                    }}
                  />
                  {!isCollapsed && (
                    <Text
                      variant="labelEmphasized"
                      color={theme.colors.colorTextSecondary}
                    >
                      {t('Folders')}
                    </Text>
                  )}
                </div>
              </Pressable>
            </div>

            {!isCollapsed && (
              <Button
                variant="tertiary"
                size="small"
                onClick={handleAddFolderClick}
                data-testid="sidebar-folder-add"
                aria-label={t('Add folder')}
                iconBefore={<CreateNewFolder style={iconTextSecondary} />}
              />
            )}
          </div>

          {isFoldersExpanded && (
            <>
              <NavbarListItem
                testID="sidebar-folder-all"
                label={t('All Folders')}
                count={isCollapsed ? undefined : recordCounts?.all ?? 0}
                selected={isAllFoldersActive}
                variant={isAllFoldersActive ? 'default' : 'secondary'}
                size="small"
                icon={
                  <Layers
                    color={
                      isAllFoldersActive
                        ? theme.colors.colorTextPrimary
                        : theme.colors.colorTextSecondary
                    }
                  />
                }
                onClick={handleAllFoldersClick}
              />

              <NavbarListItem
                testID="sidebar-folder-favorites"
                label={t('Favorites')}
                count={isCollapsed ? undefined : favoritesCount}
                selected={isFavoritesActive}
                variant={isFavoritesActive ? 'default' : 'secondary'}
                size="small"
                icon={
                  isFavoritesActive ? (
                    <StarFilled color={theme.colors.colorTextPrimary} />
                  ) : (
                    <StarBorder color={theme.colors.colorTextSecondary} />
                  )
                }
                onClick={() => handleFolderClick(FAVORITES_FOLDER_ID)}
              />

              {customFolders.map((folder) => {
                const selected = selectedFolderName === folder.name

                return (
                  <NavbarListItem
                    key={folder.name}
                    testID={`sidebar-folder-${folder.name}`}
                    label={folder.name}
                    count={isCollapsed ? undefined : folder.count}
                    selected={selected}
                    variant={selected ? 'default' : 'secondary'}
                    size="small"
                    icon={
                      <Layers
                        color={
                          selected
                            ? theme.colors.colorTextPrimary
                            : theme.colors.colorTextSecondary
                        }
                      />
                    }
                    onClick={() => handleFolderClick(folder.name)}
                  />
                )
              })}
            </>
          )}
        </div>
          </>
        )}
      </div>

      {AUTHENTICATOR_ENABLED && (
        <div style={styles.footerSection}>
          <NavbarListItem
            testID="sidebar-authenticator"
            label={t('Authenticator')}
            size="small"
            selected={routerData?.recordType === 'authenticator'}
            variant={
              routerData?.recordType === 'authenticator'
                ? 'default'
                : 'secondary'
            }
            icon={
              <TwoFactorAuthenticationOutlined
                color={
                  routerData?.recordType === 'authenticator'
                    ? theme.colors.colorTextPrimary
                    : theme.colors.colorTextSecondary
                }
              />
            }
            onClick={() => navigate('vault', { recordType: 'authenticator' })}
          />
        </div>
      )}

      <div style={styles.footerSection}>
        <NavbarListItem
          testID="sidebar-settings-button"
          label={t('Settings')}
          size="small"
          variant="default"
          icon={<SettingsOutlined color={theme.colors.colorTextPrimary} />}
          onClick={handleSettingsClick}
        />
        <NavbarListItem
          testID="sidebar-lock-app"
          label={t('Lock App')}
          size="small"
          variant="default"
          icon={<LockOutlined color={theme.colors.colorTextPrimary} />}
          onClick={handleLockApp}
        />
      </div>
    </aside>
  )
}
