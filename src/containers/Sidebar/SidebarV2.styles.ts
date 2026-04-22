import type { ThemeColors } from '@tetherto/pearpass-lib-ui-kit'
import { rawTokens } from '@tetherto/pearpass-lib-ui-kit'

export const SIDEBAR_WIDTH_EXPANDED = 250
export const SIDEBAR_WIDTH_COLLAPSED = 57

export const createStyles = (colors: ThemeColors, isCollapsed: boolean) => ({
  wrapper: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    height: '100%',
    width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
    backgroundColor: colors.colorSurfacePrimary,
    borderRight: `1px solid ${colors.colorBorderPrimary}`,
    boxSizing: 'border-box' as const,
    overflow: 'hidden' as const,
    transition: 'width 150ms ease'
  },

  vaultSelector: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: isCollapsed ? ('center' as const) : ('flex-start' as const),
    gap: rawTokens.spacing8,
    width: '100%',
    height: 44,
    padding: rawTokens.spacing12,
    borderBottom: `1px solid ${colors.colorBorderPrimary}`,
    backgroundColor: colors.colorSurfacePrimary,
    boxSizing: 'border-box' as const,
    flexShrink: 0
  },

  vaultNameGroup: {
    flex: 1,
    minWidth: 0
  },

  vaultNameRow: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: rawTokens.spacing4,
    minWidth: 0,
    userSelect: 'none' as const
  },

  vaultNameText: {
    minWidth: 0,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    whiteSpace: 'nowrap' as const
  },

  chevron: {
    transition: 'transform 150ms ease'
  },

  chevronFlipped: {
    transform: 'rotate(180deg)'
  },

  chevronCollapsed: {
    transform: 'rotate(-90deg)'
  },

  collapseButtonFlipped: {
    transform: 'rotate(180deg)'
  },

  scrollArea: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    flex: 1,
    minHeight: 0,
    gap: rawTokens.spacing8,
    padding: rawTokens.spacing12,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const
  },

  sectionList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: 1,
    width: '100%'
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.colorBorderPrimary,
    border: 'none',
    margin: 0,
    flexShrink: 0
  },

  foldersHeader: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: isCollapsed ? ('center' as const) : ('flex-start' as const),
    gap: rawTokens.spacing4,
    height: 32,
    padding: `${rawTokens.spacing8}px ${rawTokens.spacing4}px`,
    borderRadius: rawTokens.radius8,
    width: '100%',
    boxSizing: 'border-box' as const
  },

  foldersHeaderToggle: {
    flex: 1,
    minWidth: 0
  },

  foldersHeaderToggleInner: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: isCollapsed ? ('center' as const) : ('flex-start' as const),
    gap: rawTokens.spacing4,
    userSelect: 'none' as const
  },

  footerSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: isCollapsed ? ('center' as const) : ('stretch' as const),
    gap: 1,
    padding: rawTokens.spacing12,
    borderTop: `1px solid ${colors.colorBorderPrimary}`,
    backgroundColor: colors.colorSurfacePrimary,
    flexShrink: 0
  }
})
