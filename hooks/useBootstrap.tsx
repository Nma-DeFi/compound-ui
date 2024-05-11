import { useEffect, useState } from "react"
import * as BootstrapUtils from "../utils/bootstrap";

export function useBootstrap() {

    const [ bootstrap, setBootstrap ] = useState<typeof BootstrapUtils>({
        openModal: null,
        hideModal: null,
        openToast: null,
        hideToast: null,
        getOrCreateTooltip: null,
        getOrCreateCollapse: null,
    })

    useEffect(() => {
        import('../utils/bootstrap').then(bs => setBootstrap(bs))
    }, [])

    return bootstrap
}

export enum ModalEvent { 
    Show = 'show', 
    Hide = 'hide', 
    Hidden = 'hidden', 
}

export function useModalEvent(modalId: string) {
    const [ modalEvent, setModalEvent ] = useState<ModalEvent>()

    useEffect(() => {
        const { Show, Hide, Hidden  } = ModalEvent
        const modal = document.getElementById(modalId)
        modal.addEventListener('show.bs.modal', () => setModalEvent(Show))
        modal.addEventListener('hide.bs.modal', () => setModalEvent(Hide))
        modal.addEventListener('hidden.bs.modal', () => setModalEvent(Hidden))
      }, [modalId])

    return modalEvent
}

export enum ToastEvent { 
    Show = 'show', 
    Hide = 'hide', 
    Hidden = 'hidden', 
}

export function useToastEvent(toastId: string) {
    const [ toastEvent, setToastEvent ] = useState<ToastEvent>()

    useEffect(() => {
        if (!toastId) return
        const { Show, Hide, Hidden  } = ToastEvent
        const toast = document.getElementById(toastId)
        toast.addEventListener('show.bs.toast', () => setToastEvent(Show))
        toast.addEventListener('hide.bs.toast', () => setToastEvent(Hide))
        toast.addEventListener('hidden.bs.toast', () => setToastEvent(Hidden))
      }, [toastId])

    return toastEvent
}