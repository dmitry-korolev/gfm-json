import { exec } from 'utils'

import { INodeStrikethrough, IParsed, ITokenizer } from 'models'

const execStrikethrough = exec(/^~~(?=\S)([\s\S]*?\S)~~/)
const captureStrikethrough = (source: string, inlineLexer: ITokenizer): IParsed<INodeStrikethrough> | null => {
  if (source[0] !== '~') {
    return null
  }

  const result = execStrikethrough(source)

  if (!result) {
    return null
  }

  const capture = result[0]
  const rawValue = result[1]

  return {
    token: {
      type: 'strikethrough',
      children: inlineLexer(rawValue)
    },
    newSource: source.substring(capture.length)
  }
}

export { captureStrikethrough }
