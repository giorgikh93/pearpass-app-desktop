import React, { useMemo } from 'react'
import { RuntimeLoader } from '@rive-app/webgl2'
import { useRiveWithRetry } from '../../../hooks/useRiveWithRetry'

RuntimeLoader.setWasmUrl('assets/rive/rive_webgl2.wasm')

export const CreditCardAnimation = (): React.ReactElement => {
  const riveParams = useMemo(() => ({
    src: 'assets/animations/form_credit_card.riv',
    stateMachines: ['State Machine 1'],
    animations: ['Timeline 1'],
    autoplay: true
  }), [])

  const { RiveComponent, key } = useRiveWithRetry({ riveParams, riveOptions: undefined })

  return (
    <RiveComponent
      key={key}
      style={{ width: '100%', aspectRatio: '1 / 1' }}
    />
  )
}
