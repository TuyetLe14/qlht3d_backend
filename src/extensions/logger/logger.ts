const fs = require('fs')
const path = require('path')
const { red, yellow, cyan, green } = require('chalk')

function logMessage(level, data) {
  const timestamp = new Date().toISOString()
  const stackTrace = new Error().stack?.split('\n')[3].trim()
  if (stackTrace) {
    const fileName = stackTrace.substring(stackTrace.lastIndexOf('/') + 1, stackTrace.lastIndexOf(':'))
    let logMessage = `[${timestamp}] - File: ${fileName})\n[Data]: ${JSON.stringify(data)}`

    // Choose color based on log level
    switch (level) {
      case 'info':
        logMessage = cyan(logMessage)
        break
      case 'error':
        logMessage = red(logMessage)
        break
      case 'warn':
        logMessage = yellow(logMessage)
        break
      default:
        logMessage = green(logMessage)
    }

    fs.appendFile(path.join(__dirname, 'app.log'), `${logMessage}\n`, (err) => {
      if (err) {
        console.error('Error writing to log file:', err)
      }
    })
    console.log(logMessage + '\n')
  }
}
export const logger = {
  info: (data: any) => logMessage('info', data),
  error: (data: any) => logMessage('error', data),
  warn: (data: any) => logMessage('warn', data),
}
