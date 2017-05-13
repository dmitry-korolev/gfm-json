import { exec } from 'utils'

import { NodeCode, Parsed } from 'models'

const execCode = exec(/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/)
const captureCode = (source: string): Parsed<NodeCode> | null => {
  if (source[0] !== '`') {
      return null
  }

  const result = execCode(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const code = result[2]

  return {
    token: {
      type: 'code',
      value: code
    },
    newSource: source.substring(capture.length)
  }
}

export { captureCode }
