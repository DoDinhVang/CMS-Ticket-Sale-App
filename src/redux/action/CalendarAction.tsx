import {CalendarType} from '../types/CalendarType'
interface CalendarHidden{
    type: CalendarType.CALENDAR_HIDDEN,
    payload: true
}
interface SelectedDate{
    type: CalendarType.SET_DATE,
    payload: {
        date: Date,
        name: string
    }
}
export type CalendarAction = CalendarHidden | SelectedDate