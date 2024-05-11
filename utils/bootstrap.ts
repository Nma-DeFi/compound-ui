import { Modal, Toast, Tooltip, Collapse } from "bootstrap";

export const openModal = (id: string) => {
    Modal.getOrCreateInstance(`#${id}`).show()
}

export const hideModal = (id: string) => {
    Modal.getOrCreateInstance(`#${id}`).hide()
}

export const openToast = (id: string) => {
    Toast.getOrCreateInstance(`#${id}`).show()
}

export const hideToast = (id: string) => {
    Toast.getOrCreateInstance(`#${id}`).hide()
}

export const getOrCreateTooltip = (elem: Element) => {
    return Tooltip.getOrCreateInstance(elem)
}

export const getOrCreateCollapse = (elem: Element, options) => {
    return Collapse.getOrCreateInstance(elem, options)
}