export default function Spinner({ css = '' }) {
    return (
        <div className={`spinner-border ${css}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export function SmallSpinner() {
    return <Spinner css="spinner-border-sm ms-2" />
}

export function GrowSpinners({ nb = 5, css = '' }) {

    const loop = () => {
        let arr = []
        for (let i = 0; i < nb; i++) { arr.push(i) }
        return arr
    }

    return (
        <div className={css}>
            {loop().map(index =>
                <div className="spinner-grow text-primary mx-3 mx-xl-4" role="status" key={index}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    )
}
