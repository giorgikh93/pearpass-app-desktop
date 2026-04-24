import React from 'react'
import { RuntimeLoader } from '@rive-app/webgl2'
import { useRiveWithRetry } from '../../../hooks/useRiveWithRetry'
import { useMemo } from 'react'

RuntimeLoader.setWasmUrl('assets/rive/rive_webgl2.wasm')

export const PasswordFillAnimation = (): React.ReactElement => {
  const riveParams = useMemo(() => ({
    src: 'assets/animations/pearpass_password.riv',
    stateMachines: ['State Machine 1'],
    animations: ['Timeline 1', 'Timeline 2'],
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
