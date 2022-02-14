import {combineReducers} from 'redux'
import loadingReducer from './reducer/loadingReducer'
import quanLyVeReducer from './reducer/quanLyVeReducer'
import modalFilterTicketReducer from './reducer/modalFilterTicketReducer'
import checkTicketReducer from './reducer/doiSoatVeReducer'
import ticketPackManagerReducer from './reducer/quanLyGoiVeReducer'
const rootReducer = combineReducers({
    loadingReducer,
    quanLyVeReducer,
    modalFilterTicketReducer,
    checkTicketReducer,
    ticketPackManagerReducer

})

export default rootReducer
export type State = ReturnType<typeof rootReducer>