import { CalendarAction } from "../action/CalendarAction"
import { CalendarType } from "../types/CalendarType"

const initialState = {
    date: new Date(),
    name: ''
}

const calendarReducer = (state = initialState, action: CalendarAction) => {
    switch (action.type) {

        case CalendarType.SET_DATE:
            console.log('selectedate', action.payload)
            return {...state, date: action.payload.date, name: action.payload.name}

        default:
            return { ...state }
    }
}
export default calendarReducer
