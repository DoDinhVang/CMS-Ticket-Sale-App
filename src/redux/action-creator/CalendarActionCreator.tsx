import {CalendarType} from '../types/CalendarType'
export const calendarHiddenActionCreator = (visible: boolean)=>{
        return {
            type: CalendarType.CALENDAR_HIDDEN,
            payload: visible
        }
}
export const getSelectedDateActionCreator = (date:Date)=>{
    return {
        type: CalendarType.SET_DATE,
        payload: date
    }
}