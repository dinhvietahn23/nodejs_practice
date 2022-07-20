import { INIT_STATE } from "../../constant";
import { getType, showModal, hideModal, createPost } from "../actions";

export default function modalReducers(state = INIT_STATE.modal, action) {
    switch(action.type) {
        case getType(showModal.showModal):
            return {
                isShow: true
            }
        
        case getType(hideModal.hideModal):
            return {
                isShow: false
            }
        default:
            return state 
    }
}