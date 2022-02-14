import {Dispatch} from 'redux'
import { TicketPack } from '../../model/quanlygoive/TicketPack'
import {tickPackManagerAction} from '../../redux/action/quanLyGoiVeAction'
import {TicketPackManagerType} from '../../redux/types/quanLyGoiVeType'
import { baseService } from '../../service/BaseService'
import { LoadingAction } from '../action/loadingAction'
import { hideLoadingActionCreator, showLoadingActionCreator } from './loadingActionCreator'
export const getTicketPackList = ()=>{
     return async (dispatch: Dispatch<tickPackManagerAction | LoadingAction>)=>{
            dispatch(showLoadingActionCreator())
            try {
                const ticketPackList:Array<TicketPack> = await baseService.get('danhSachGoi')

                dispatch({
                    type: TicketPackManagerType.GET_TICKET_PACK_LIST,
                    payload: ticketPackList
                })
            } catch (error) {
                console.log('error', error)
            }
            dispatch(hideLoadingActionCreator())
     }
}
export const updateModalVisibleActionCreator = (isUpdateModalVisible: boolean)=>{
    return {
        type: TicketPackManagerType.SET_UPDATE_MODAL_VISIBLE,
        payload: isUpdateModalVisible
    }
}