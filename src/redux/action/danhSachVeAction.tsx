import { TicketListType } from "../types/danhSachVeType";


interface GetTicketListAction{
    type: TicketListType,
    ticketList: any
}



export type Action = GetTicketListAction