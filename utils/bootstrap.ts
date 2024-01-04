import { Modal } from "bootstrap";

export function openModal(id) {
    Modal.getOrCreateInstance(`#${id}`).show();
}
  
export function hideModal(id) {
    Modal.getOrCreateInstance(`#${id}`).hide();
}