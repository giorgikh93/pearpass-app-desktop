import React from 'react'

import { useTheme } from '@tetherto/pearpass-lib-ui-kit'

import { createStyles } from './MainViewV2.styles'

export const MainViewV2 = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme.colors)

  return <div style={styles.wrapper} />
}
