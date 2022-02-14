import { checkTicketType } from "../types/doiSoatVeType";
import { Event } from "../../model/doiSoatVe/Events";
interface GetEventListAction {
    type: checkTicketType.GET_EVENT_LIST,
    payLoad: any
}

export type checkTicketAction = GetEventListAction