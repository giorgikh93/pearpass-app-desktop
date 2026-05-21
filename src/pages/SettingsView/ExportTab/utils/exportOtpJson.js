import { parseOtpToJson } from '@tetherto/pearpass-lib-data-export'
import { encryptExportData } from '@tetherto/pearpass-lib-vault'

import { downloadFile } from './downloadFile'

/**
 * Exports all OTP records (TOTP and HOTP) across the given vaults to a single
 * JSON file.
 * @param {unknown[]} data
 * @param {string | null} [encryptionPassword]
 */
export const handleExportOtpJson = async (data, encryptionPassword = null) => {
  const [file] = parseOtpToJson(data)
  if (!file) return

  const content = encryptionPassword
    ? JSON.stringify(
        await encryptExportData(file.data, encryptionPassword),
        null,
        2
      )
    : file.data

  downloadFile({ filename: file.filename, content }, 'json')
}
