const ALLOWED_FILES = [
  '.ts',
  '.tsx',
]

const IGNORED_FILES = [
  '.d.ts'
]

const BOOTSTRAP_FILES: BootstrapModule[] = [
  {
    module: 'react-dom',
    output: 'react-dom.production.min.js',
    path: '/umd/react-dom.production.min.js'
  },
  {
    module: 'react',
    output: 'react.production.min.js',
    path: '/umd/react.production.min.js'
  }
]

const BUILD_DIR = '.hyri'


export {
  ALLOWED_FILES,
  IGNORED_FILES,
  BOOTSTRAP_FILES,
  BUILD_DIR
}