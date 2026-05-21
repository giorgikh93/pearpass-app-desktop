import { parseOtpToCsvText } from '@tetherto/pearpass-lib-data-export'

import { downloadFile } from './downloadFile'

/**
 * Exports all OTP records (TOTP and HOTP) across the given vaults to a single
 * CSV file.
 * @param {unknown[]} data
 */
export const handleExportOtpCsv = async (data) => {
  const [file] = parseOtpToCsvText(data)
  if (!file) return

  downloadFile({ filename: file.filename, content: file.data }, 'csv')
}
