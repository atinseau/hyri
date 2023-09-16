

const getViewFromFile = (file: string) => {
  const lines = file.split('\n')
  let viewString = '{'

  lines.forEach((line, i) => {
    if (line.length === 0) return
    if (line.includes('views:')) {
      let e = i + 1
      while (!lines[e].includes('}')) {
        const splitLine = lines[e].split(': ')
        const key = splitLine[0].replace(/'/g, '"').trim()
        const value = splitLine[1].replace(/,/g, '').trim()

        viewString += `${key}: "${value}"`
        if (!lines[e + 1].includes('}')) {
          viewString += ', '
        }
        e++
      }
      viewString += '}'
    }
  })
  return JSON.parse(viewString) as Record<string, string>
}

export default getViewFromFile