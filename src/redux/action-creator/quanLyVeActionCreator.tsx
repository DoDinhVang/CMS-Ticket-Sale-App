import { Dispatch } from 'redux'
import { baseService } from '../../service/BaseService'
import { TicketManagerType } from '../types/quanLyVeType'
import { FilterTicket } from '../../model/quanlyve/FilterTicket'
import { hideLoadingActionCreator, showLoadingActionCreator } from './loadingActionCreator'
import { modalVisibleActionCreator } from './modalFilterTicketActionCreator'

export const getTicketListActionCreator = () => {
    return async (dispatch: Dispatch) => {

        dispatch(showLoadingActionCreator())
        const data = await baseService.get('danhSachVe')
        dispatch({
            type: TicketManagerType.GET_TICKET_LIST,
            payload: data
        })
        dispatch(hideLoadingActionCreator())

    }
}
export const searchByTicketNumberActionCreator = (soVe: string) => {
    return async (dispatch: Dispatch) => {
        const data = await baseService.searchByTicketNumber('danhSachVe', soVe)
        dispatch({
            type: TicketManagerType.GET_TICKET_LIST,
            payload: data
        })
    }
}

export const getCheckInGateListActionCreator = () => {
    return async (dispatch: Dispatch) => {

        const data = await baseService.get('congCheckIn')
        dispatch({
            type: TicketManagerType.GET_CHECKIN_GATE_LIST,
            payload: data
        })

    }
}

export const filterTickerActionCreator = (values: FilterTicket) => {

    return async (dispatch: Dispatch) => {

        dispatch(showLoadingActionCreator())
        try {
            const data = await baseService.filterTicKet('danhSachVe', values)
            console.log('data', data)
            dispatch({
                type: TicketManagerType.SET_FILTER_TICKET,
                payload: data

            })

        } catch (error) {
            console.log('err', error)
        }
        dispatch(hideLoadingActionCreator())
        dispatch(modalVisibleActionCreator(false))
    }
}
