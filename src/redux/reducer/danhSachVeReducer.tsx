import { Action } from "../action/danhSachVeAction";
const initialState = {
  danhSachVe: []

};

const danhSachVeReducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case 'LAY_DANH_SACH_VE':
      return { ...state, danhSachVe: action.danhSachVe};

    default:
      return {...state};
  }
};
export default danhSachVeReducer
