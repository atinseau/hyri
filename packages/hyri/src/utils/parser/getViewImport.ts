
const getFileImports = (file: string) => {
  const fileImports = file.match(/import\s+.*\s+from\s+['"].*['"]/g)

  const imports = fileImports?.map((fileImport) => {
    const lines = fileImport.split(' ')
    const exports: string[] = []
    let defaultExport = lines[1] !== '{' ? lines[1] : undefined
    let importPath = lines[lines.length - 1].replace(/(\")|(')/g, '')

    // 1 to skip the import keyword
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '{') {
        // Skip the opening bracket
        i++
        while (lines[i] !== '}' && i < lines.length) {
          exports.push(lines[i])
          i++
        }
      }
    }

    return {
      exports,
      importPath,
      defaultExport,
    }
  })

  return imports
}

export default getFileImports