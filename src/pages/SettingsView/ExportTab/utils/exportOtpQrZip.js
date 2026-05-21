import { parseOtpToQrSvgs } from '@tetherto/pearpass-lib-data-export'

import { downloadZip } from './downloadZip'

/**
 * Generates one QR SVG per OTP record (TOTP and HOTP) and bundles them into a
 * ZIP download.
 * @param {unknown[]} data
 */
export const handleExportOtpQrZip = async (data) => {
  const files = await parseOtpToQrSvgs(data)
  if (!files?.length) return

  await downloadZip(files)
}
