/* eslint-env jest */

import path from 'path'

jest.mock('fs', () => ({
  mkdirSync: jest.fn(),
  appendFileSync: jest.fn()
}))

jest.mock('os', () => ({
  tmpdir: jest.fn(() => '/tmp')
}))

const fs = require('fs')
const os = require('os')

const { createMainProcessLogger } = require('./createMainProcessLogger.cjs')

describe('createMainProcessLogger', () => {
  let infoSpy
  let warnSpy
  let errorSpy

  beforeEach(() => {
    jest.clearAllMocks()
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    infoSpy.mockRestore()
    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })

  describe('when debugMode is false', () => {
    it('returns a no-op logger that does not log or touch the filesystem', () => {
      const logger = createMainProcessLogger({
        app: { isPackaged: true },
        debugMode: false
      })

      logger.setLogPath('/some/dir')
      logger.log('log')
      logger.info('info')
      logger.debug('debug')
      logger.warn('warn')
      logger.error('error')

      expect(fs.mkdirSync).not.toHaveBeenCalled()
      expect(fs.appendFileSync).not.toHaveBeenCalled()
      expect(console.info).not.toHaveBeenCalled()
      expect(console.warn).not.toHaveBeenCalled()
      expect(console.error).not.toHaveBeenCalled()
    })
  })

  describe('when debugMode is true and app is not packaged', () => {
    it('logs to console only and never writes to disk', () => {
      const logger = createMainProcessLogger({
        app: { isPackaged: false },
        debugMode: true
      })

      // setLogPath should be a no-op when not packaged
      logger.setLogPath('/user/data')

      logger.log('log message')
      logger.info('info message')
      logger.debug('debug message')
      logger.warn('warn message')
      logger.error('error message')

      expect(fs.mkdirSync).not.toHaveBeenCalled()
      expect(fs.appendFileSync).not.toHaveBeenCalled()

      expect(console.info).toHaveBeenCalledWith('[MAIN]', 'log message')
      expect(console.info).toHaveBeenCalledWith('[MAIN][INFO]', 'info message')
      expect(console.info).toHaveBeenCalledWith(
        '[MAIN][DEBUG]',
        'debug message'
      )
      expect(console.warn).toHaveBeenCalledWith('[MAIN][WARN]', 'warn message')
      expect(console.error).toHaveBeenCalledWith(
        '[MAIN][ERROR]',
        'error message'
      )
    })
  })

  describe('when debugMode is true and app is packaged', () => {
    it('creates a log file under userData/logs and logs there and to console', () => {
      const logger = createMainProcessLogger({
        app: { isPackaged: true },
        debugMode: true
      })

      const userDataDir = '/User/Data/Dir'
      const logsDir = path.join(userDataDir, 'logs')
      const expectedLogFile = path.join(logsDir, 'main.log')

      logger.setLogPath(userDataDir)

      expect(fs.mkdirSync).toHaveBeenCalledWith(logsDir, { recursive: true })
      expect(fs.appendFileSync).toHaveBeenCalledTimes(1)

      const [filePath, firstLine] = fs.appendFileSync.mock.calls[0]
      expect(filePath).toBe(expectedLogFile)
      expect(firstLine).toContain('Main process log file:')
      expect(firstLine).toContain('[INFO]')

      expect(console.info).toHaveBeenCalledWith(
        '[MAIN] Log file:',
        expectedLogFile
      )

      // After setLogPath, log methods should also append to the same file
      fs.appendFileSync.mockClear()

      logger.info('hello world')

      const [filePathAfter, lineAfter] = fs.appendFileSync.mock.calls[0]
      expect(filePathAfter).toBe(expectedLogFile)
      expect(lineAfter).toContain('[INFO]')
      expect(lineAfter).toContain('hello world')
    })

    it('falls back to a tmp log file when creating the logs dir fails', () => {
      const mkdirError = new Error('mkdir failed')
      fs.mkdirSync.mockImplementationOnce(() => {
        throw mkdirError
      })

      const tmpDir = '/tmp/fallback'
      os.tmpdir.mockReturnValue(tmpDir)

      const logger = createMainProcessLogger({
        app: { isPackaged: true },
        debugMode: true
      })

      const userDataDir = '/User/Data/Dir'
      const expectedFallback = path.join(tmpDir, 'main-process.log')

      logger.setLogPath(userDataDir)

      expect(console.error).toHaveBeenCalledWith(
        '[MAIN] Failed to create log dir:',
        mkdirError.message,
        path.join(userDataDir, 'logs')
      )

      const [filePath, line] = fs.appendFileSync.mock.calls[0]
      expect(filePath).toBe(expectedFallback)
      expect(line).toContain('Main process log file (fallback):')

      expect(console.info).toHaveBeenCalledWith(
        '[MAIN] Log file (fallback):',
        expectedFallback
      )
    })
  })
})
