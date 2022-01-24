import React from 'react';
import TrangChu from './pages/trangchu/TrangChu';
import QuanLyVe from './pages/quanlyve/QuanLyVe';
import HomeTemPlate from './template/homeTemplate/HomeTemPlate';
import CaiDat from './pages/caidat/CaiDat';
import DoiSoatVe from './pages/doisoatve/DoiSoatVe';
import { Router, Switch } from "react-router-dom";
import history from './util/history';
import { db } from './firebase/firebase';
import { baseService } from './service/BaseService';
// const getlst = async ()=>{

//     const data = await baseService.get('danhSachVe')
//     await console.log(data)
// }
// getlst()

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemPlate title='Thống kê' exact path='/' Component={TrangChu}></HomeTemPlate>
        <HomeTemPlate title='Thống kê' exact path='/trangchu' Component={TrangChu}></HomeTemPlate>
        <HomeTemPlate title='Danh Sách gói vé' exact path='/caidat' Component={CaiDat}></HomeTemPlate>
        <HomeTemPlate title='Danh sách vé' exact path='/quanlyve' Component={QuanLyVe}></HomeTemPlate>
        <HomeTemPlate title='Đối soát vé' exact path='/doisoatve' Component={DoiSoatVe}></HomeTemPlate>
      </Switch>

    </Router>
  );
}

export default App;
