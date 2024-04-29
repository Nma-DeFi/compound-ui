export default function WarningMessage({ children }) {
    return (
        <div className="bg-warning-subtle text-warning-emphasis p-3 my-3 rounded-3">
        { children }
        </div>
    )
}
