import { useEffect, useRef } from "react";

export default function AmountInput({ id, onChange, disabled = false, focused = false }) {

    const ref = useRef(null)

    useEffect(() => {
        if (focused) {
          ref.current.focus()
        } 
    }, [focused])

    return (
        <input 
            id={id} 
            ref={ref}
            type="number" 
            autoComplete="off" 
            placeholder="0" 
            min="0" 
            step="any" 
            onChange={onChange} 
            disabled={disabled} 
        />
    );
}