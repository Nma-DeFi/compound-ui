import { Modal } from "bootstrap";

export const openModal = (id) => {
    Modal.getOrCreateInstance(`#${id}`).show();
}

export const hideModal = (id) => {
    Modal.getOrCreateInstance(`#${id}`).hide();
}