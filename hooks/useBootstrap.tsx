import { useEffect, useState } from "react"

export function useBootstrap() {

    const [ bootstrap, setBootstrap ] = useState(null);

    useEffect(() => {
        import('../utils/bootstrap').then(bs => setBootstrap(bs));
    }, []);

    return bootstrap;
}