import { useCallback, useMemo, useState } from 'react'

// @ts-expect-error — package ships without typings
import { generateAvatarInitials } from '@tetherto/pear-apps-utils-avatar-initials'
import { html } from 'htm/react'
// @ts-expect-error — useRecords hook typings incomplete in @tetherto/pearpass-lib-vault
import { useRecords, useVault } from '@tetherto/pearpass-lib-vault'
import { Button, ListItem, useTheme } from '@tetherto/pearpass-lib-ui-kit'
import { ExpandMore, LockOutlined } from '@tetherto/pearpass-lib-ui-kit/icons'

import { RecordAvatar } from '../../../components/RecordAvatar'
import { RECORD_COLOR_BY_TYPE } from '../../../constants/recordColorByType'
import { createStyles } from './ImportVaultPreviewModalContent.styles'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useModal } from '../../../context/ModalContext'
import { useRouter } from '../../../context/RouterContext'
import { useTranslation } from '../../../hooks/useTranslation'
import { ModalContentV2 } from '../ModalContentV2'
import { VaultRecord } from '../../../shared/types'

function loginWebsiteUrl(record: VaultRecord): string {
  if (record.type !== 'login') {
    return ''
  }
  const first = record.data?.websites?.[0]
  if (typeof first === 'string') {
    return first
  }
  if (first && typeof first === 'object' && typeof first.website === 'string') {
    return first.website
  }
  return ''
}

function getRecordSubtitle(record: VaultRecord): string | undefined {
  const d = record.data
  if (!d) {
    return undefined
  }
  if (record.type === 'login') {
    if (typeof d.username === 'string' && d.username) {
      return d.username
    }
    if (typeof d.email === 'string' && d.email) {
      return d.email
    }
    const url = loginWebsiteUrl(record)
    if (url) {
      return url
    }
  }
  return undefined
}

export const ImportVaultPreviewModalContent = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { colors } = theme
  const { closeModal } = useModal()
  const { navigate } = useRouter()
  const { data: vaultData } = useVault()
  const [isVaultExpanded, setIsVaultExpanded] = useState(true)

  const { data: records, isLoading } = useRecords({
    shouldSkip: false,
    variables: {
      filters: {},
      sort: { key: 'updatedAt', direction: 'desc' }
    }
  })

  useGlobalLoading({ isLoading })

  const styles = createStyles(colors)

  const recordList = useMemo(
    () => (Array.isArray(records) ? records : []),
    [records]
  )

  const hasRecords = recordList.length > 0

  const vaultSubtitle = useMemo(() => {
    const n = recordList.length
    return `${n} ${t('Items')}`
  }, [recordList.length, t])

  const handleContinue = useCallback(() => {
    navigate('vault', { recordType: 'all' })
    closeModal()
  }, [navigate, closeModal])

  const vaultName = vaultData?.name ?? vaultData?.id ?? t('Vault')

  const lockIcon = html`
    <div style=${styles.lockBadge}>
      <span
        style=${{
          display: 'inline-flex',
          filter: `drop-shadow(0 0 3px ${colors.colorPrimary}99)`
        }}
      >
        <${LockOutlined} width=${18} height=${18} color=${colors.colorPrimary} />
      </span>
    </div>
  `

  const chevron = html`
    <div
      style=${{
        ...styles.chevronWrap,
        transform: isVaultExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
      }}
    >
      <${ExpandMore} width=${16} height=${16} color=${colors.colorTextPrimary} />
    </div>
  `

  const recordsInner = recordList.map((record) => {
    const recordType = record.type as keyof typeof RECORD_COLOR_BY_TYPE
    const avatarColor =
      RECORD_COLOR_BY_TYPE[recordType] ?? RECORD_COLOR_BY_TYPE.custom
    const domain = loginWebsiteUrl(record)

    return html`
      <${ListItem}
        key=${record.id}
        icon=${html`
          <${RecordAvatar}
            width=${32}
            height=${32}
            websiteDomain=${domain}
            initials=${generateAvatarInitials(record.data?.title)}
            size="md"
            isSelected=${false}
            isFavorite=${!!record.isFavorite}
            color=${avatarColor}
            testId=${`import-vault-preview-avatar-${record.id}`}
          />
        `}
        title=${record.data?.title ?? record.type}
        subtitle=${getRecordSubtitle(record)}
        showDivider=${false}
        testID=${`import-vault-preview-record-${record.id}`}
      />
    `
  })

  const recordsBody = html`
    <div style=${styles.recordsListWrapper}>${recordsInner}</div>
  `

  return html`
    <${ModalContentV2}
      onClose=${closeModal}
      backgroundColor=${colors.colorSurfacePrimary}
      borderColor=${colors.colorBorderPrimary}
      headerWrapperStyle=${styles.headerRow}
      headerChildren=${html`
        <span style=${styles.title}>${t('Import Vault')}<//>
      `}
      afterHeaderChildren=${html`
        <div role="separator" style=${styles.divider} />
      `}
    >
      <div style=${styles.bodyColumn}>
        <div style=${styles.vaultFoundSection}>
          <span style=${styles.sectionLabel}>${t('Vault Found')}<//>
          <div style=${styles.vaultPanel}>
            <${ListItem}
              icon=${lockIcon}
              title=${vaultName}
              subtitle=${vaultSubtitle}
              rightElement=${hasRecords ? chevron : undefined}
              onClick=${hasRecords ? () => setIsVaultExpanded((v) => !v) : undefined}
              testID="import-vault-preview-toggle"
            />
            ${hasRecords &&
            isVaultExpanded &&
            html`
              <div style=${styles.recordsScroll}>${recordsBody}</div>
            `}
          </div>
        </div>
        <div role="separator" style=${styles.divider} />
        <div style=${styles.footer}>
          <${Button}
            variant="primary"
            size="small"
            type="button"
            data-testid="import-vault-preview-continue"
            onClick=${handleContinue}
          >
            ${t('Continue')}
          <//>
        </div>
      </div>
    <//>
  `
}
