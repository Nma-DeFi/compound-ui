import { Modal, Toast } from "bootstrap";

export const openModal = (id) => {
    Modal.getOrCreateInstance(`#${id}`).show();
}

export const hideModal = (id) => {
    Modal.getOrCreateInstance(`#${id}`).hide();
}

export const openToast = (id) => {
    Toast.getOrCreateInstance(`#${id}`).show();
}

export const hideToast = (id) => {
    Toast.getOrCreateInstance(`#${id}`).hide();
}