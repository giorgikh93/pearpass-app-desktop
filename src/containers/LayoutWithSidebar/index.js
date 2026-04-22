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
  const isV2Design = isV2()
  const VersionBasedContentWrapper = isV2Design
    ? ContentWrapperV2
    : ContentWrapper

  return html`
    <${LayoutWrapper}>
      <${SideBarWrapper}>
        ${isV2Design ? html`<${SidebarV2} />` : html`<${Sidebar} />`}
      <//>

      <${VersionBasedContentWrapper}> ${mainView} <//>

      ${sideView && html` <${SideViewWrapper}> ${sideView} <//>`}
    <//>
  `
}
