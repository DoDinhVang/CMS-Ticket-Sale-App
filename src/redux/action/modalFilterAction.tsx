import { ModalFilterTicketType } from "../types/modalFilterTicketType";


interface ModalVisibleAction{
    type: ModalFilterTicketType
    modalVisible: boolean
}

export type Action = ModalVisibleAction