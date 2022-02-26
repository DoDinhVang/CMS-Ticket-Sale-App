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

    // create and download csv
   export const createCSVActionCreator = (array: any[]) => {
        let keys = Object.keys(array[0])
        let result = ''
        result += keys.join(','); //Comma Seperates Headers
        result += '\n'; //New Row
        array.forEach(function (item) { //Goes Through Each Array Object
            keys.forEach(function (key) {//Goes Through Each Object value
                result += item[key] + ','; //Comma Seperates Each Key Value in a Row
            })
            result += '\n';//Creates New Row
        })

        return result;
    }
export const downloadCSVActionCreator = (array: any) => {
        let csv = 'data:text/csv;charset=utf-8,' + createCSVActionCreator(array); //Creates CSV File Format
        let excel = encodeURI(csv); //Links to CSV 

        let link = document.createElement('a');
        link.setAttribute('href', excel); //Links to CSV File 
        link.setAttribute('download', 'test.csv'); //Filename that CSV is saved as
        link.click();
    }