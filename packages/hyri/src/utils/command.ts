
// Only available in bin file
const getAppMode = () => {
  const args = process.argv.slice(2)
  const appMode = args[0];
  if (
    appMode !== "dev"
    && appMode !== "build"
    && appMode !== "serve"
    && appMode !== "debug"
  ) {
    throw new Error("Invalid app mode")
  }
  return appMode
}

export default getAppMode