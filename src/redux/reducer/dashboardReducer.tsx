import moment from 'moment'
import { baseService } from '../../service/BaseService'
import { getRevenueActionCreator } from '../action-creator/dashboardActionCreator'
import { DashboardAction } from '../action/dashboardAction'
import { DashboardType } from '../types/DashboardType'

const initialState = {
    revenueData: new Array<any>(),
    totalRevenue: 0,
    modifiedRevenueData: new Array<any>(),
    month: 2,
    year: 2022,
}

const dashboardReducer = (state = initialState, action: DashboardAction) => {
    switch (action.type) {

        case DashboardType.GET_REVENUE:
            console.log('lend')
            const { lst, month, year } = action.payload
            console.log('month, year', month, year)
            const filterRevenueData = lst.filter((element: any) => {
                console.log('d_', element.date.toDate().getMonth() + 1)
                return element.date.toDate().getMonth() === month && element.date.toDate().getFullYear() === year
            })
            console.log('filterRevenueData', filterRevenueData)
            let configRevenueData = filterRevenueData.sort((a: any, b: any) => {
                console.log('a', a.date)
                return (a.date.toDate().getDate()) - (b.date.toDate().getDate());
            });
            configRevenueData = configRevenueData.map((_: any, index: any) => {
                return { date: moment(new Date(_.date.toDate())).format('DD/MM/YYYY'), doanhThu: _.doanhThu }
            })

            const updateTotalRevenue = configRevenueData.reduce((total: number, element: any) => {
                return total + element.doanhThu
            }, 0);
            console.log('total', updateTotalRevenue)
            


            return { ...state, revenueData: [...configRevenueData], totalRevenue: updateTotalRevenue }

        case DashboardType.GET_REVENUE_BY_WEEK: {
            const { startOfWeek, endOfWeek } = action.payload
            let upDateRevenueData = [...state.revenueData]


            upDateRevenueData = upDateRevenueData.filter(element => {
                console.log('fdsfds', moment(element).format('YYYY/MM/DD'), moment(startOfWeek).format('YYYY/MM/DD'))
                return moment(element).format('YYYY/MM/DD') >= moment(startOfWeek).format('YYYY/MM/DD') && moment(element).format('YYYY/MM/DD') <= moment(endOfWeek).format('YYYY/MM/DD')
            })
        
            console.log('upda', upDateRevenueData)
            state.revenueData = [...upDateRevenueData]
            return { ...state }
    }
        default:
return { ...state }
    }
}
export default dashboardReducer;
