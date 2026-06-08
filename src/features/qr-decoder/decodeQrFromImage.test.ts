import { decodeQrFromImage } from './decodeQrFromImage'

const MIGRATION_URI = 'otpauth-migration://offline?data=abc123'
const TOTP_URI = 'otpauth://totp/Google:user@gmail.com?secret=BASE32SECRET&issuer=Google'

const mockDetect = jest.fn<() => Promise<Array<Pick<DetectedBarcode, 'rawValue'>>>>()
const mockBitmap = {} as ImageBitmap
const mockJsQR = jest.fn<
  (
    data: Uint8ClampedArray,
    width: number,
    height: number
  ) => { data: string } | null
>()

jest.mock('jsqr', () => ({
  __esModule: true,
  default: (...args: Parameters<typeof mockJsQR>) => mockJsQR(...args)
}))

const mockGetImageData = jest.fn()
const mockDrawImage = jest.fn()
const mockGetContext = jest.fn(() => ({
  drawImage: mockDrawImage,
  getImageData: mockGetImageData
}))

const originalCreateElement = document.createElement.bind(document)

beforeEach(() => {
  ;(globalThis as any).BarcodeDetector = jest.fn().mockImplementation(() => ({
    detect: mockDetect
  }))
  ;(globalThis as any).createImageBitmap = jest
    .fn<() => Promise<ImageBitmap>>()
    .mockResolvedValue(mockBitmap)

  mockGetImageData.mockReturnValue({
    data: new Uint8ClampedArray(4),
    width: 1,
    height: 1
  })

  jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
    if (tagName === 'canvas') {
      return {
        width: 0,
        height: 0,
        getContext: mockGetContext
      } as unknown as HTMLCanvasElement
    }

    return originalCreateElement(tagName)
  })
})

afterEach(() => {
  delete (globalThis as any).BarcodeDetector
  delete (globalThis as any).createImageBitmap
  jest.restoreAllMocks()
  jest.clearAllMocks()
})

describe('decodeQrFromImage', () => {
  describe('BarcodeDetector path', () => {
    beforeEach(() => {
      mockDetect.mockResolvedValue([{ rawValue: MIGRATION_URI }])
    })

    it('returns the raw QR value from a migration URI', async () => {
      expect(await decodeQrFromImage(new Blob())).toBe(MIGRATION_URI)
    })

    it('returns the raw QR value from a standard otpauth URI', async () => {
      mockDetect.mockResolvedValue([{ rawValue: TOTP_URI }])

      expect(await decodeQrFromImage(new Blob())).toBe(TOTP_URI)
    })

    it('returns only the first result when multiple QR codes are detected', async () => {
      mockDetect.mockResolvedValue([{ rawValue: MIGRATION_URI }, { rawValue: TOTP_URI }])

      expect(await decodeQrFromImage(new Blob())).toBe(MIGRATION_URI)
    })

    it('passes the image bitmap to detector.detect', async () => {
      await decodeQrFromImage(new Blob())

      expect(mockDetect).toHaveBeenCalledWith(mockBitmap)
    })

    it('initialises BarcodeDetector with qr_code format', async () => {
      await decodeQrFromImage(new Blob())

      expect((globalThis as any).BarcodeDetector).toHaveBeenCalledWith({
        formats: ['qr_code']
      })
    })

    it('accepts a File as well as a Blob', async () => {
      expect(
        await decodeQrFromImage(new File([''], 'qr.png', { type: 'image/png' }))
      ).toBe(MIGRATION_URI)
    })

    it('does not use jsQR when BarcodeDetector succeeds', async () => {
      await decodeQrFromImage(new Blob())

      expect(mockJsQR).not.toHaveBeenCalled()
    })
  })

  describe('jsQR fallback', () => {
    beforeEach(() => {
      delete (globalThis as any).BarcodeDetector
      mockJsQR.mockReturnValue({ data: MIGRATION_URI })
    })

    it('decodes via jsQR when BarcodeDetector is not available', async () => {
      expect(await decodeQrFromImage(new Blob())).toBe(MIGRATION_URI)
    })

    it('passes image data from the canvas to jsQR', async () => {
      const imageData = {
        data: new Uint8ClampedArray([1, 2, 3, 4]),
        width: 2,
        height: 2
      }
      mockGetImageData.mockReturnValue(imageData)

      await decodeQrFromImage(new Blob())

      expect(mockJsQR).toHaveBeenCalledWith(imageData.data, 2, 2)
    })

    it('falls back to jsQR when BarcodeDetector finds no QR code', async () => {
      ;(globalThis as any).BarcodeDetector = jest.fn().mockImplementation(() => ({
        detect: mockDetect
      }))
      mockDetect.mockResolvedValue([])

      expect(await decodeQrFromImage(new Blob())).toBe(MIGRATION_URI)
    })

    it('falls back to jsQR when BarcodeDetector throws at runtime', async () => {
      ;(globalThis as any).BarcodeDetector = jest.fn().mockImplementation(() => ({
        detect: mockDetect
      }))
      mockDetect.mockRejectedValue(new Error('Unsupported platform'))

      expect(await decodeQrFromImage(new Blob())).toBe(MIGRATION_URI)
    })
  })

  describe('error handling', () => {
    beforeEach(() => {
      delete (globalThis as any).BarcodeDetector
      mockJsQR.mockReturnValue(null)
    })

    it('throws when no QR code is found in the image', async () => {
      await expect(decodeQrFromImage(new Blob())).rejects.toThrow(
        'No QR code detected in image'
      )
    })

    it('throws when BarcodeDetector finds nothing and jsQR also fails', async () => {
      ;(globalThis as any).BarcodeDetector = jest.fn().mockImplementation(() => ({
        detect: mockDetect
      }))
      mockDetect.mockResolvedValue([])

      await expect(decodeQrFromImage(new Blob())).rejects.toThrow(
        'No QR code detected in image'
      )
    })
  })
})
