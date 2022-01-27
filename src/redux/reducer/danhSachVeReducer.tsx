import { Action } from "../action/danhSachVeAction";
import { TicketListType } from "../types/danhSachVeType";
const initialState = {
  ticketList: []

};

const danhSachVeReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case TicketListType.GET_TICKET_LIST:
      return { ...state, ticketList: action.ticketList};
   
    default:
      return {...state};
  }
};
export default danhSachVeReducer
