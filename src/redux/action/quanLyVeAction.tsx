import { TicketManagerType } from '../types/quanLyVeType'
import { CheckInGate } from '../../model/quanlyve/CheckInGate'
import { FilterTicket } from '../../model/quanlyve/FilterTicket'

interface GetTicketListAction{
    type: TicketManagerType,
    payload: any
}
interface GetCheckInGateListAction{
    type: TicketManagerType,
    payload: CheckInGate
}
interface FilterTicketAction{
    type: TicketManagerType,
    payload: FilterTicket
}
interface TicketStatusAction{
    type: TicketManagerType.SET_TICKET_STATUS,
    payload: number
}


export type TicketManagerAction = GetTicketListAction | GetCheckInGateListAction | FilterTicketAction |TicketStatusAction