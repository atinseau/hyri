

type HyriContextParams = {
  hyriConfig: HyriConfig
}

class HyriContext {
  static hyriConfig: HyriConfig
  static packageJson: PackageJson | null = null

  static init(params: HyriContextParams) {
    this.hyriConfig = params.hyriConfig
  }

  static async loadPackageJson() {
    if (!this.packageJson) {
      const packageJsonPath = this.hyriConfig.appPath + '/package.json'
      this.packageJson = (await import(packageJsonPath)).default
    }
    return this.packageJson
  }

}

export default HyriContext;