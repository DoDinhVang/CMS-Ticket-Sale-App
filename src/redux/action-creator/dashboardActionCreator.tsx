import moment from 'moment'
import { Dispatch } from 'redux'
import { baseService } from '../../service/BaseService'
import { STATUS_CODE } from '../../util/config'
import { DashboardType } from '../types/DashboardType'
export const getRevenueActionCreator = (month: number, year: number) => {
    return async (dispatch: Dispatch) => {
        try {
            const { lst, status } = await baseService.get('doanhThu')
            console.log('lst', lst)
            if (status === STATUS_CODE.SUCCESS) {
                console.log('vào đây ')
                dispatch({
                    type: DashboardType.GET_REVENUE,
                    payload: {
                        lst,
                        month,
                        year
                    }
                })
            }

        } catch (error) {
            console.log('erroe', error)
        }
    }

}

export const getRevenueDataByMonthActionCreator = (month: number, year: number) => {
    return {
        type: DashboardType.GET_REVENUE_BY_MONTH,
        payload: {
            month,
            year
        }
    }
}
export const getRevenueDataByWeekActionCreator = (startOfWeek: string, endOfWeek: string) => {
    return async (dispatch: Dispatch<any>) => {
      
        console.log('sss0',)
        await dispatch(getRevenueActionCreator(new Date(startOfWeek).getMonth(),new Date(startOfWeek).getFullYear()))
        await dispatch({
            type: DashboardType.GET_REVENUE_BY_WEEK,
            payload: {
                startOfWeek,
                endOfWeek
            }
        })
    }
}