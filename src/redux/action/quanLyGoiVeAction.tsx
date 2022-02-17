import { TicketPackManagerType } from "../types/quanLyGoiVeType";
import {InfoTicketPack, TicketPack} from "../../model/quanlygoive/TicketPack"
interface getTicketPackList{
    type: TicketPackManagerType.GET_TICKET_PACK_LIST,
    payload: Array<TicketPack>
}
interface ShowUpdateModal {
    type: TicketPackManagerType.SET_EDIT_MODAL_VISIBLE,
    payload: boolean
    
}

interface GetInfoTicketPack {
    type: TicketPackManagerType.GET_INFO_TICKET_PACK,
    payload: TicketPack
}


export type TickPackManagerAction = getTicketPackList | ShowUpdateModal | GetInfoTicketPack 