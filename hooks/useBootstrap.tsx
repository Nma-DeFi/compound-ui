import { useEffect, useState } from "react"
import { BootstrapUtils } from "../utils/bootstrap";

export function useBootstrap() {

    const [ bootstrap, setBootstrap ] = useState<typeof BootstrapUtils>({
        openModal: null,
        hideModal: null
    });

    useEffect(() => {
        import('../utils/bootstrap').then(({ BootstrapUtils }) => setBootstrap(BootstrapUtils));
    }, []);

    return bootstrap;
}