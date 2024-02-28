import icons from './icons.json'

const ICONS_PATH = '/images/tokens/'
const DEFAULT_ICON = '_default.svg'

export function getTokenIcon(symbol: string) {
    const found = Object.keys(icons).find(icon => icon === symbol)
    const iconFile = found ? icons[symbol] : DEFAULT_ICON
    return ICONS_PATH + iconFile
}