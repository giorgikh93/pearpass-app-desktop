async function imageFileToImageData(file: File | Blob): Promise<ImageData> {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('QR decoding not supported in this environment')
  }

  context.drawImage(bitmap, 0, 0)
  return context.getImageData(0, 0, canvas.width, canvas.height)
}

async function decodeWithBarcodeDetector(
  file: File | Blob
): Promise<string | null> {
  if (typeof BarcodeDetector === 'undefined') {
    return null
  }

  const detector = new BarcodeDetector({ formats: ['qr_code'] })
  const bitmap = await createImageBitmap(file)
  const results = await detector.detect(bitmap)

  if (!results.length) {
    return null
  }

  return results[0].rawValue
}

async function decodeWithJsQR(file: File | Blob): Promise<string> {
  const { default: jsQR } = await import('jsqr')
  const imageData = await imageFileToImageData(file)
  const result = jsQR(imageData.data, imageData.width, imageData.height)

  if (!result) {
    throw new Error('No QR code detected in image')
  }

  return result.data
}

export async function decodeQrFromImage(file: File | Blob): Promise<string> {
  try {
    const barcodeResult = await decodeWithBarcodeDetector(file)
    if (barcodeResult) {
      return barcodeResult
    }
  } catch {
    // BarcodeDetector may be present but unsupported at runtime; fall back to jsQR.
  }

  return decodeWithJsQR(file)
}
