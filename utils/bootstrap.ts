import { Modal } from "bootstrap";

export const BootstrapUtils = {
    openModal: (id) => {
        Modal.getOrCreateInstance(`#${id}`).show();
    }, 
    hideModal: (id) => {
        Modal.getOrCreateInstance(`#${id}`).hide();
    },
}
 