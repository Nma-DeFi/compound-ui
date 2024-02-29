export const enum PlaceHolderSize {
    DEFAULT = '',
    SMALL = 'placeholder-sm',
    LARGE = 'placeholder-lg',
}

export type PlaceHolderParam = { 
    size?: PlaceHolderSize, 
    col?: number
}

export default function PlaceHolder({ size = PlaceHolderSize.SMALL, col = 1} : PlaceHolderParam) {
    return (
        <span className={`placeholder-glow`}>
            <span className={`placeholder ${size} bg-secondary-subtle col-${col}`}></span>
        </span>
    )
}
