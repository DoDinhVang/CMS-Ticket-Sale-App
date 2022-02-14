import { TicketPackManagerType } from "../types/quanLyGoiVeType";
import {TicketPack} from "../../model/quanlygoive/TicketPack"
interface getTicketPackList{
    type: TicketPackManagerType.GET_TICKET_PACK_LIST,
    payload: Array<TicketPack>
}
interface ShowUpdateModal {
    type: TicketPackManagerType.SET_UPDATE_MODAL_VISIBLE,
    payload: boolean
    
}

export type tickPackManagerAction = getTicketPackList | ShowUpdateModal