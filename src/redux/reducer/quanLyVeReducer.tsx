import { FilterTicket } from "../../model/quanlyve/FilterTicket";
import { TicketList } from "../../model/quanlyve/TicketList";
import { TicketManagerAction } from "../action/quanLyVeAction";
import { TicketManagerType } from "../types/quanLyVeType";
const initialState = {
  ticketList: Array<TicketList>(),
  checkInGateList: []

};

const quanLyVeReducer = (state = initialState, action: TicketManagerAction) => {
  switch (action.type) {

    case TicketManagerType.GET_TICKET_LIST: {
      const { payload } = action
      const lst = payload.map((ticketObj: TicketList, index: number) => {
        return { ...ticketObj, ngayApDung: ticketObj.ngayApDung.toDate(), ngaySuDung: ticketObj.ngaySuDung.toDate(), ngayHetHan: ticketObj.ngayHetHan.toDate() }
      })
      return { ...state, ticketList: [...lst] }
    }


    case TicketManagerType.GET_CHECKIN_GATE_LIST:
      return { ...state, checkInGateList: action.payload }

    case TicketManagerType.SET_FILTER_TICKET: {
      const { payload } = action;
      console.log('infro dispatch', action.payload)
      console.log('danhSachVe', state.ticketList)

      const keys = Object.keys(payload)
      const values = Object.values(payload)
      console.log('keys', keys)
      console.log('values', values)
      let updateTicketList = [...state.ticketList]
      const getFilterTicketList = (key: any, value: any, array: any) => {
        return array.filter((ticket: TicketList) => {
          if (value === '') {
            return ticket[key as keyof TicketList] !== value
          } else if (key === 'congCheckInId') {
            return value.includes(ticket[key as keyof TicketList])
          } else if (key === 'startTime') {
            return ticket['ngayApDung'].getTime() >= value.getTime()
          } else if (key === 'endTime') {
            return ticket['ngayApDung'].getTime() <= value.getTime()
          }
          return ticket[key as keyof TicketList] === value
        })
      }
    
      for (let i = 0; i < keys.length; i++) {
        updateTicketList = getFilterTicketList(keys[i], values[i], updateTicketList)
      }
      console.log('result',updateTicketList)
      return { ...state ,ticketList: updateTicketList }

    }
    default:
      return { ...state };
  }
};
export default quanLyVeReducer
