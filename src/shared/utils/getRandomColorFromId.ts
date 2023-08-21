function getHashCode(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB(i: number) {
  const r = (i & 0xff0000) >> 16
  const g = (i & 0x00ff00) >> 8
  const b = i & 0x0000ff
  return [r, g, b]
}

export function getRandomColorFromId(id: string) {
  const hashedId = getHashCode(id.toString())
  const [r, g, b] = intToRGB(hashedId)

  const minBrightness = 150
  const adjustedR = r < minBrightness ? r + 50 : r
  const adjustedG = g < minBrightness ? g + 50 : g
  const adjustedB = b < minBrightness ? b + 50 : b

  return `rgb(${adjustedR},${adjustedG},${adjustedB})`
}
