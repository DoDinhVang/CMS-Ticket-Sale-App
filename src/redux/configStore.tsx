import {combineReducers} from 'redux'
import danhSachVeReducer from './reducer/danhSachVeReducer'
import modalFilterTicketReducer from './reducer/ModalFilterTicketReducer'
const rootReducer = combineReducers({
    danhSachVeReducer,
    modalFilterTicketReducer
})

export default rootReducer
export type State = ReturnType<typeof rootReducer>