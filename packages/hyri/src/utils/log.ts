import chalk from 'chalk'


const print = {
  log: (...message: any[]) => {
    console.log(...message)
  },
  error: (...message: any[]) => {
    console.error(chalk.red(...message))
  },
  success: (...message: any[]) => {
    console.log(chalk.green(...message))
  },
  warning: (...message: any[]) => {
    console.warn(chalk.yellow(...message))
  },
  info: (...message: any[]) => {
    console.info(chalk.blue(...message))
  },
}

export default print