
import { checkTicketAction } from "../action/doiSoatVeAction"
import { checkTicketType } from "../types/doiSoatVeType"

const initialState = {
    eventList: []
}
const checkTicketReducer = (state = initialState, action: checkTicketAction) => {
    switch (action.type) {

        case checkTicketType.GET_EVENT_LIST:
            return { ...state, eventList: action.payLoad }

        default:
            return { ...state }
    }
}

export default checkTicketReducer
