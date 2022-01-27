import { Dispatch } from 'redux'
import { Action } from '../action/danhSachVeAction'
import { baseService } from '../../service/BaseService'
import { TicketListType } from '../types/danhSachVeType'
export const getTicketListActionCreator = () => {
    return async (dispatch: Dispatch<Action>) => {

        const data = await baseService.get('danhSachVe')
        dispatch({
            type: TicketListType.GET_TICKET_LIST,
            ticketList: data
        })

    }
}
export const searchByTicketNumberActionCreator = (soVe:string) => {
    return async (dispatch: Dispatch<Action>) => {
        const data = await baseService.searchByTicketNumber('danhSachVe',soVe)
        dispatch({
            type: TicketListType.GET_TICKET_LIST,
            ticketList: data
        })
    }
}