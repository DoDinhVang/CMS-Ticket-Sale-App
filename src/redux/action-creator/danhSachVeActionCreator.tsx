import {Dispatch} from 'redux'
import {Action} from '../action/danhSachVeAction'
import { baseService } from '../../service/BaseService'
import { DanhSachVeType } from '../types/danhSachVeType'
export const LayDanhSachVeActionCreator = ()=>{
    return  async (dispatch: Dispatch<Action>) =>{

        const data = await baseService.get('danhSachVe')
        dispatch({
            type: DanhSachVeType.LAYDANHSACHVE,
            danhSachVe: data
        })

    }
}