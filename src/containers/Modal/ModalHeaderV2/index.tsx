import type { CSSProperties, ReactNode } from 'react'

import { html } from 'htm/react'

import { CloseButton } from './styles'
import { XIcon } from '../../../lib-react-components'
import { Header, HeaderChildrenWrapper } from '../ModalHeader/styles'

/** V2 modal header: optional row styles + close as icon only (not ButtonRoundIcon). */
export type ModalHeaderV2Props = {
  onClose: () => void
  children: ReactNode
  showCloseButton?: boolean
  closeButtonDataId?: string
  wrapperStyle?: CSSProperties
}

export const ModalHeaderV2 = ({
  onClose,
  children,
  showCloseButton = true,
  closeButtonDataId,
  wrapperStyle
}: ModalHeaderV2Props) => html`
  <${Header} style=${wrapperStyle}>
    <${HeaderChildrenWrapper}> ${children} <//>

    ${showCloseButton &&
    html`
      <${CloseButton}
        type="button"
        onClick=${onClose}
        data-testid="modalheader-button-close"
        data-id=${closeButtonDataId}
        aria-label="Close"
      >
        <${XIcon} color="currentColor" size="20" />
      <//>
    `}
  <//>
`
