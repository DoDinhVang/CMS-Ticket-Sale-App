import dashboardReducer from "../reducer/dashboardReducer";
import { DashboardType } from "../types/DashboardType";

interface GetRevenue{
    type: DashboardType.GET_REVENUE,
    payload: any  
}
interface GetRevenueByMonth{
    type: DashboardType.GET_REVENUE_BY_MONTH,
    payload:{
        values: any,
        month:number,
        year:number
    }
}

interface GetRevenueByWeek {
    type: DashboardType.GET_REVENUE_BY_WEEK,
    payload: {
        startOfWeek: string,
        endOfWeek: string
    }
}
export type DashboardAction = GetRevenue | GetRevenueByMonth | GetRevenueByWeek