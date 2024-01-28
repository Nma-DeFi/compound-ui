import { useEffect, useState } from "react"
import * as BootstrapUtils from "../utils/bootstrap";

export function useBootstrap() {

    const [ bootstrap, setBootstrap ] = useState<typeof BootstrapUtils>({
        openModal: null,
        hideModal: null,
        openToast: null,
        hideToast: null,
        getOrCreateTooltip: null,
    });

    useEffect(() => {
        import('../utils/bootstrap').then(bs => setBootstrap(bs));
    }, []);

    return bootstrap;
}

export type ModalEvent = 'show' | 'hide' | 'hidden'

export function useModalEvent(modalId: string) {

    const [ modalEvent, setModalEvent ] = useState<ModalEvent>()

    useEffect(() => {
        const modal = document.getElementById(modalId)
        modal.addEventListener('show.bs.modal', () => setModalEvent('show'))
        modal.addEventListener('hide.bs.modal', () => setModalEvent('hide'))
        modal.addEventListener('hidden.bs.modal', () => setModalEvent('hidden'))
      }, [modalId])

    return modalEvent
}