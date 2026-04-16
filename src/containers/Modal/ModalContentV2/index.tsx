import type { CSSProperties, FormEvent, ReactNode } from 'react'

import { html } from 'htm/react'

import { Wrapper } from './styles'
import { ModalHeaderV2 } from '../ModalHeaderV2'

export type ModalContentV2Props = {
  onClose: () => void
  headerChildren: ReactNode
  children: ReactNode
  onSubmit?: () => void
  showCloseButton?: boolean
  borderColor?: string
  backgroundColor?: string
  borderRadius?: string
  closeButtonDataId?: string
  headerWrapperStyle?: CSSProperties
  afterHeaderChildren?: ReactNode
}

export const ModalContentV2 = ({
  onClose,
  onSubmit,
  headerChildren,
  children,
  showCloseButton = true,
  borderColor,
  backgroundColor,
  borderRadius,
  closeButtonDataId,
  headerWrapperStyle,
  afterHeaderChildren
}: ModalContentV2Props) => {
  const header = html`
    <${ModalHeaderV2}
      onClose=${onClose}
      showCloseButton=${showCloseButton}
      closeButtonDataId=${closeButtonDataId}
      wrapperStyle=${headerWrapperStyle}
    >
      ${headerChildren}
    <//>
  `

  if (onSubmit) {
    return html`
      <${Wrapper}
        $borderColor=${borderColor}
        $backgroundColor=${backgroundColor}
        $borderRadius=${borderRadius}
      >
        <form
          onSubmit=${(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          ${header}
          ${afterHeaderChildren}
          <div>${children}</div>
        </form>
      <//>
    `
  }

  return html`
    <${Wrapper}
      $borderColor=${borderColor}
      $backgroundColor=${backgroundColor}
      $borderRadius=${borderRadius}
    >
      ${header}
      ${afterHeaderChildren}
      <div>${children}</div>
    <//>
  `
}
