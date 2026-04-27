import { useTheme } from '@tetherto/pearpass-lib-ui-kit'
import { html } from 'htm/react'

import {
  ContentWrapper,
  ContentWrapperV2,
  LayoutWrapper,
  SideBarWrapper,
  SideViewWrapper
} from './styles'
import { isV2 } from '../../utils/designVersion'
import { Sidebar } from '../Sidebar'
import { SidebarV2 } from '../Sidebar/SidebarV2'

/**
 * @typedef LayoutWithSidebarProps
 * @property {import('react').ReactNode} mainView
 * @property {import('react').ReactNode} sideView
 */

/**
 * @param {LayoutWithSidebarProps} props
 */

export const LayoutWithSidebar = ({ mainView, sideView }) => {
  const { theme } = useTheme()
  const isV2Design = isV2()
  const VersionBasedContentWrapper = isV2Design
    ? ContentWrapperV2
    : ContentWrapper

  const v2SideViewStyle = {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: theme.colors.colorSurfacePrimary,
    borderLeft: `1px solid ${theme.colors.colorBorderPrimary}`
  }

  return html`
    <${LayoutWrapper}>
      <${SideBarWrapper}>
        ${isV2Design ? html`<${SidebarV2} />` : html`<${Sidebar} />`}
      <//>

      <${VersionBasedContentWrapper}> ${mainView} <//>

      ${sideView &&
      (isV2Design
        ? html`<div style=${v2SideViewStyle}>${sideView}</div>`
        : html`<${SideViewWrapper}>${sideView}<//>`)}
    <//>
  `
}
