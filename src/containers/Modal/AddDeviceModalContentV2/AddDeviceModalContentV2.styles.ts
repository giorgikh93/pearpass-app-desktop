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
  body: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: rawTokens.spacing12,
    padding: `${rawTokens.spacing16}px`,
    boxSizing: 'border-box' as const
  },
  sectionLabel: {
    color: colors.colorTextSecondary,
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize12,
    fontWeight: rawTokens.weightMedium
  },
  accessPanel: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'stretch' as const,
    borderWidth: 1,
    borderStyle: 'solid' as const,
    borderColor: colors.colorBorderPrimary,
    borderRadius: rawTokens.radius8,
    backgroundColor: colors.colorSurfacePrimary,
    boxSizing: 'border-box' as const
  },
  qrWrap: {
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginTop: rawTokens.spacing24,
    marginBottom: rawTokens.spacing8,
  },
  qrInner: {
    width: 160,
    height: 160,
    padding: rawTokens.spacing10,
    borderRadius: rawTokens.radius8,
    backgroundColor: colors.colorSurfaceHover,
    boxSizing: 'border-box' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: rawTokens.spacing12,
  },
  timerRow: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: rawTokens.spacing8,
    flexWrap: 'wrap' as const,
    marginBottom: rawTokens.spacing24,
  },
  timerText: {
    color: colors.colorTextPrimary,
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize14,
    fontWeight: rawTokens.weightMedium
  },
  itemLinkSection: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: rawTokens.spacing4,
    width: '100%',
    minWidth: 0,
    padding: rawTokens.spacing12,
    boxSizing: 'border-box' as const
  },
  itemLinkTextColumn: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'stretch' as const,
    gap: rawTokens.spacing8,
    flex: '1 1 auto' as const,
    minWidth: 0
  },
  itemLinkValue: {
    minWidth: 0,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const,
    color: colors.colorTextPrimary,
    fontFamily: rawTokens.fontPrimary,
    fontSize: rawTokens.fontSize14,
    fontWeight: rawTokens.weightRegular
  },
  copyIconButton: {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexShrink: 0,
    padding: 0,
    margin: 0,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer' as const,
    borderRadius: rawTokens.radius8,
    lineHeight: 0,
    color: colors.colorTextPrimary,
  }
})
