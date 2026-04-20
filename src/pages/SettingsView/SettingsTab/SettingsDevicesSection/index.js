import React from 'react'

import { useLingui } from '@lingui/react'
import { formatDate } from '@tetherto/pear-apps-utils-date'
import { useVault } from '@tetherto/pearpass-lib-vault'
import { html } from 'htm/react'

import { Description, content } from './styles'
import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { ListItem } from '../../../../components/ListItem'
import { AddDeviceModalContent } from '../../../../containers/Modal/AddDeviceModalContent'
import { AddDeviceModalContentV2 } from '../../../../containers/Modal/AddDeviceModalContentV2/AddDeviceModalContentV2'
import { useModal } from '../../../../context/ModalContext'
import { ButtonPrimary } from '../../../../lib-react-components'
import { isV2 } from '../../../../utils/designVersion'

/**
 * @param {{}} props
 */
export const SettingsDevicesSection = () => {
  const { i18n } = useLingui()
  const { data } = useVault()
  const { setModal } = useModal()

  const handleAddDevice = () => {
    setModal(
      isV2() ? <AddDeviceModalContentV2 /> : html`<${AddDeviceModalContent} />`
    )
  }

  return html`
    <${CardSingleSetting}
      testId="settings-card-linked-devices"
      title=${i18n._('Linked devices')}
    >
      <${content}>
        <${Description}
          >${i18n._('These are the devices with access to this Vault.')}
        <//>
        ${data?.devices?.map(
          (device) =>
            html`<${ListItem}
              key=${device.name}
              testId="settings-linked-device-item"
              itemName=${device.name}
              itemDateText=${i18n._('Added on') +
              ' ' +
              formatDate(device.createdAt, 'dd-mm-yyyy', '/')}
            />`
        )}
        <div style=${{ display: 'flex', justifyContent: 'center' }}>
          <${ButtonPrimary}
            testId="settings-connect-new-device-button"
            onClick=${handleAddDevice}
            width="fit-content"
          >
            ${i18n._('Connect a new device')}
          <//>
        </div>
      <//>
    <//>
  `
}
