import React from 'react'

import { Text, useTheme } from '@tetherto/pearpass-lib-ui-kit'

import { createStyles } from './EmptyResultsViewV2.styles'
import { useTranslation } from '../../hooks/useTranslation'

export const EmptyResultsViewV2 = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const styles = createStyles()

  return (
    <div style={styles.container} data-testid="empty-results-v2">
      <Text
        variant="bodyEmphasized"
        color={theme.colors.colorTextPrimary}
      >
        {t('No result found.')}
      </Text>
    </div>
  )
}
