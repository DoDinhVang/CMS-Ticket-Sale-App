import { Dispatch } from 'redux'
import { baseService } from '../../service/BaseService'
import { TicketManagerType } from '../types/quanLyVeType'
import { FilterTicket } from '../../model/quanlyve/FilterTicket'
import { hideLoadingActionCreator, showLoadingActionCreator } from './loadingActionCreator'
import { modalVisibleActionCreator } from './modalFilterTicketActionCreator'
import { STATUS_CODE } from '../../util/config'

export const getTicketListActionCreator = () => {
    return async (dispatch: Dispatch) => {

        dispatch(showLoadingActionCreator())
        try {
            const { lst, status } = await baseService.get('danhSachVe')
            console.log('lst', lst)

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: TicketManagerType.GET_TICKET_LIST,
                    payload: lst
                })

            }
        } catch (error) {
            console.log('error', error)
        }
        dispatch(hideLoadingActionCreator())


    }
}
export const searchByTicketNumberActionCreator = (soVe: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const { lst, status } = await baseService.searchByTicketNumber('danhSachVe', soVe)
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: TicketManagerType.GET_TICKET_LIST,
                    payload: lst
                })
            }
        } catch (error) {
            console.log('error', error)
        }

    }
}

export const getCheckInGateListActionCreator = () => {
    return async (dispatch: Dispatch) => {

        try {
            const { lst, status } = await baseService.get('congCheckIn')
            if(status===200){
                dispatch({
                    type: TicketManagerType.GET_CHECKIN_GATE_LIST,
                    payload: lst
                })
            }
        } catch (error) {
            console.log('error',error)
        }

    }
}

export const filterTickerActionCreator = (values: FilterTicket) => {

    return async (dispatch: Dispatch) => {

        dispatch(showLoadingActionCreator())
        try {
            const { lst, status } = await baseService.filterTicKet('danhSachVe', values)

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: TicketManagerType.SET_FILTER_TICKET,
                    payload: lst

                })
            }

        } catch (error) {
            console.log('err', error)
        }
        dispatch(hideLoadingActionCreator())
        dispatch(modalVisibleActionCreator(false))
    }
}
