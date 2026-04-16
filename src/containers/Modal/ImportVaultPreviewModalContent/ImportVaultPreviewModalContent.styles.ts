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
    alignItems: 'stretch' as const,
    flex: '1 1 auto' as const,
    minHeight: 0
  },
  vaultFoundSection: {
    padding: `0 ${rawTokens.spacing16}px`,
    margin: `${rawTokens.spacing16}px 0`,
    boxSizing: 'border-box' as const
  },
  sectionLabel: {
    color: colors.colorTextSecondary,
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize12,
    fontWeight: rawTokens.weightMedium,
    marginBottom: rawTokens.spacing8
  },
  vaultPanel: {
    borderWidth: 1,
    borderStyle: 'solid' as const,
    borderColor: colors.colorBorderPrimary,
    borderRadius: rawTokens.radius8,
    backgroundColor: colors.colorSurfacePrimary,
    overflow: 'hidden' as const,
    boxSizing: 'border-box' as const,
    marginTop: `${rawTokens.spacing12}px`,
  },
  lockBadge: {
    width: 32,
    height: 32,
    borderRadius: rawTokens.radius8,
    backgroundColor: colors.colorSurfaceHover,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0
  },
  recordsScroll: {
    maxHeight: 280,
    overflowY: 'auto' as const,
    boxSizing: 'border-box' as const
  },
  recordsListWrapper: {
    margin: rawTokens.spacing12,
    borderWidth: 1,
    borderStyle: 'solid' as const,
    borderColor: colors.colorBorderPrimary,
    borderRadius: rawTokens.radius8,
    boxSizing: 'border-box' as const
  },
  chevronWrap: {
    display: 'inline-flex' as const,
    transition: 'transform 0.15s ease'
  },
  footer: {
    display: 'flex' as const,
    justifyContent: 'flex-end' as const,
    alignItems: 'center' as const,
    gap: rawTokens.spacing12,
    padding: rawTokens.spacing16,
    boxSizing: 'border-box' as const,
    backgroundColor: colors.colorSurfacePrimary,
    flexShrink: 0
  }
})
