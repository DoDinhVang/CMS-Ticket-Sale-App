import {Dispatch} from 'redux'
import { baseService } from '../../service/BaseService'
import { checkTicketAction } from '../action/doiSoatVeAction'
import { checkTicketType } from '../types/doiSoatVeType'
export const getEventListActionCreator = ()=>{
    return async (dispatch: Dispatch<checkTicketAction>)=>{

        try {
            const eventList = await baseService.get('danhSachSuKien')
            dispatch({
                type: checkTicketType.GET_EVENT_LIST,
                payLoad: eventList
            })
        } catch (error) {
            console.log('error', error)
        }
    }
}