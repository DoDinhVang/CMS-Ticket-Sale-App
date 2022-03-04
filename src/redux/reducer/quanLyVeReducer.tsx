import { TicketManagerAction } from "../action/quanLyVeAction";
import { TicketManagerType } from "../types/quanLyVeType";
const initialState = {
  ticketList: [],
  checkInGateList: []

};

const quanLyVeReducer = (state = initialState, action:TicketManagerAction) => {
  switch (action.type) {

    case TicketManagerType.GET_TICKET_LIST:
      console.log("ticketlist", action.payload)
      return { ...state, ticketList: action.payload};

    case TicketManagerType.GET_CHECKIN_GATE_LIST:
      return {...state, checkInGateList: action.payload}
      
    case TicketManagerType.SET_FILTER_TICKET:
      return {...state, ticketList: action.payload}
   
    default:
      return {...state};
  }
};
export default quanLyVeReducer
