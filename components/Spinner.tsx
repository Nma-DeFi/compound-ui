export default function Spinner({ css }) {
    return (
        <div className={`spinner-border ${css}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export function SmallSpinner() {
    return <Spinner css="spinner-border-sm ms-2" />
}