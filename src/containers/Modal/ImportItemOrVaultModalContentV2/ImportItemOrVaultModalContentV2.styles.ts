import type { ThemeColors } from '@tetherto/pearpass-lib-ui-kit'
import { rawTokens } from '@tetherto/pearpass-lib-ui-kit'

export const createStyles = (colors: ThemeColors) => ({
  headerRow: {
    padding: `${rawTokens.spacing12}px ${rawTokens.spacing16}px`,
    marginBottom: 0,
    boxSizing: 'border-box' as const
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.colorBorderPrimary,
    flexShrink: 0,
    border: 'none',
    padding: 0,
    margin: 0
  },
  title: {
    color: colors.colorTextPrimary,
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize14,
    fontWeight: rawTokens.weightMedium
  },
  bodyColumn: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    width: '100%',
    alignItems: 'stretch' as const
  },
  shareLinkSection: {
    padding: `0 ${rawTokens.spacing16}px`,
    marginTop: rawTokens.spacing16,
    boxSizing: 'border-box' as const
  },
  inputSection: {
    padding: `0 ${rawTokens.spacing16}px`,
    marginTop: rawTokens.spacing16,
    boxSizing: 'border-box' as const,
    marginBottom: rawTokens.spacing16,
  },
  sectionLabel: {
    color: colors.colorTextSecondary,
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize12,
    fontWeight: rawTokens.weightMedium,
    marginBottom: rawTokens.spacing8
  },
  pairingHint: {
    color: colors.colorTextSecondary,
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize12,
    marginTop: rawTokens.spacing12,
    padding: `0 ${rawTokens.spacing16}px`,
    boxSizing: 'border-box' as const
  },
  footer: {
    display: 'flex' as const,
    justifyContent: 'flex-end' as const,
    alignItems: 'center' as const,
    gap: rawTokens.spacing12,
    padding: rawTokens.spacing16,
    boxSizing: 'border-box' as const
  }
})
