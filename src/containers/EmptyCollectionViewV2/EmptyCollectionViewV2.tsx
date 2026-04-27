import React from 'react'

import { Button, Text, Title, useTheme } from '@tetherto/pearpass-lib-ui-kit'
import { Add, ImportExport } from '@tetherto/pearpass-lib-ui-kit/icons'

import {
  ILLUSTRATION_HEIGHT,
  createStyles
} from './EmptyCollectionViewV2.styles'
import { useAppHeaderContext } from '../../context/AppHeaderContext'
import { useRouter } from '../../context/RouterContext'
import { useTranslation } from '../../hooks/useTranslation'
import { SettingsItemKey } from '../../pages/SettingsViewV2/SettingsViewV2'
import { ItemCardIllustration } from '../../svgs/ItemCardIllustration'

export const EmptyCollectionViewV2 = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { navigate } = useRouter()
  const { setIsAddMenuOpen } = useAppHeaderContext()
  const styles = createStyles()

  const handleAddItem = () => {
    setIsAddMenuOpen(true)
  }

  const handleImport = () => {
    navigate('settings', { initialTab: SettingsItemKey.ImportItems })
  }

  return (
    <div style={styles.container} data-testid="empty-collection-v2">
      <div style={styles.content}>
        <div style={styles.illustration}>
          <ItemCardIllustration width={null} height={ILLUSTRATION_HEIGHT} />
        </div>

        <div style={styles.textBlock}>
          <Title as="h2" data-testid="empty-collection-v2-title">
            {t('No item saved')}
          </Title>
          <Text
            as="p"
            variant="label"
            color={theme.colors.colorTextSecondary}
            style={
              styles.descriptionParagraph as unknown as React.ComponentProps<
                typeof Text
              >['style']
            }
          >
            {t('Start using PearPass by creating your first item')}
          </Text>
          <Text
            as="p"
            variant="label"
            color={theme.colors.colorTextSecondary}
            style={
              styles.descriptionParagraph as unknown as React.ComponentProps<
                typeof Text
              >['style']
            }
          >
            {t('or import your items from a different password manager')}
          </Text>
        </div>

        <div style={styles.ctas}>
          <div style={styles.ctaButton}>
            <Button
              variant="primary"
              size="small"
              fullWidth
              data-testid="empty-collection-v2-add"
              iconBefore={<Add width={16} height={16} />}
              onClick={handleAddItem}
            >
              {t('Add Item')}
            </Button>
          </div>
          <div style={styles.ctaButton}>
            <Button
              variant="secondary"
              size="small"
              fullWidth
              data-testid="empty-collection-v2-import"
              iconBefore={
                <ImportExport
                  width={16}
                  height={16}
                  color={theme.colors.colorTextPrimary}
                />
              }
              onClick={handleImport}
            >
              {t('Import Items')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
