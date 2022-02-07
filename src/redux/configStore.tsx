import {combineReducers} from 'redux'
import loadingReducer from './reducer/loadingReducer'
import quanLyVeReducer from './reducer/quanLyVeReducer'
import modalFilterTicketReducer from './reducer/modalFilterTicketReducer'
const rootReducer = combineReducers({
    loadingReducer,
    quanLyVeReducer,
    modalFilterTicketReducer,

})

export default rootReducer
export type State = ReturnType<typeof rootReducer>