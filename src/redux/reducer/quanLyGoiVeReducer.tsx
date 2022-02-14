import { TicketPack } from "../../model/quanlygoive/TicketPack"
import { tickPackManagerAction } from '../action/quanLyGoiVeAction'
import { TicketPackManagerType } from "../types/quanLyGoiVeType"
const initialState = {
    ticketPackList: Array<TicketPack>(),
    isUpdateModalVisible: false
}

const ticketPackManagerReducer = (state = initialState, action: tickPackManagerAction) => {
    switch (action.type) {

        case TicketPackManagerType.GET_TICKET_PACK_LIST:
            return { ...state,ticketPackList: action.payload }
        case TicketPackManagerType.SET_UPDATE_MODAL_VISIBLE:
            return {...state, isUpdateModalVisible: action.payload}

        default:
            return state
    }
}
export default ticketPackManagerReducer
