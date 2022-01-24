import {combineReducers} from 'redux'
import danhSachVeReducer from './reducer/danhSachVeReducer'
const rootReducer = combineReducers({
    danhSachVeReducer
})

export default rootReducer
export type State = ReturnType<typeof rootReducer>