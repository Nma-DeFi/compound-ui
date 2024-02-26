import icons from "./icons.json"

const ICON_PATH = '/images/tokens/'
const ICON_NOT_FOUND = '_default.svg'

export function getTokenIcon(symbol: string) {
    const found = Object.keys(icons).find(icons => icons === symbol)
    const iconFile = found ? icons[symbol] : ICON_NOT_FOUND
    return ICON_PATH + iconFile
}