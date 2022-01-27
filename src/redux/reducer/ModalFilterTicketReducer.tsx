import { Action } from "../action/modalFilterAction";
import { ModalFilterTicketType } from "../types/modalFilterTicketType";

const initialState = {
    modalVisible: false
};

const modalFilterTicketReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case  ModalFilterTicketType.SET_MODAL_VISIBLE:
      return { ...state, modalVisible: action.modalVisible};

    default:
      return {...state};
  }
};
export default modalFilterTicketReducer
