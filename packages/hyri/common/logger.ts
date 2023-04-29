import chalk from 'chalk'

const logger = {
  log: function (message: any) {
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    console.log(`${chalk.bgBlue('[' + time + ']')} ${message}`)
  },
  info: function (message: any) {
    this.log(chalk.blue(message))
  },
  success: function (message: any) {
    this.log(chalk.green(message))
  },
  error: function (message: any) {
    this.log(chalk.red(chalk.bgRed(' ERROR ') + " " + message))
  },
  warning: function (message: any) {
    this.log(chalk.yellow(message))
  },
  debug: function (message: any) {
    this.log(chalk.gray(message))
  }
}

export default logger