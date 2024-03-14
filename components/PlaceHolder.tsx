export const enum PlaceHolderSize {
    DEFAULT = '',
    SMALL = 'placeholder-sm',
    LARGE = 'placeholder-lg',
}

export type PlaceHolderParam = { 
    size?: PlaceHolderSize, 
    col?: number,
    css?: string
}

export default function PlaceHolder({ size = PlaceHolderSize.SMALL, col = 1, css = ''} : PlaceHolderParam) {
    return (
        <span className={`placeholder-glow ${css}`}>
            <span className={`placeholder ${size} bg-dark-subtle col-${col}`}></span>
        </span>
    )
}
