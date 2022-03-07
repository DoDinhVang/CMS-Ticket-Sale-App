import React from 'react';
import './App.scss'
import TrangChu from './pages/trangchu/TrangChu';
import QuanLyVe from './pages/quanlyve/QuanLyVe';
import HomeTemPlate from './template/homeTemplate/HomeTemPlate'
import CaiDat from './pages/caidat/CaiDat'
import DoiSoatVe from './pages/doisoatve/DoiSoatVe'
import { Router, Switch } from "react-router-dom"
import history from './util/history'
import ModalFilterTicket from './component/modal/ModalFilterTicket'
import Loading from './component/loading/Loading'
import UpdateTicketPack from './pages/caidat/components/UpdateTicketPack'
import '../src/sass/Base/customize.scss'
import '../src/sass/Componens/button.scss'
import '../src/sass/Layouts/quanLyVe.scss'
import '../src/sass/Componens/inputSearch.scss'
import '../src/sass/Layouts/homeTemplate.scss'
import AddTicketPack from './pages/caidat/components/AddTicketPack';
// import Calendar from './component/Calendar';
// import MyDatePicker from './component/MyDatePicker';

function App() {


  return (
    <Router history={history}>
      <Loading />
      <ModalFilterTicket />
      <UpdateTicketPack />
      <AddTicketPack />

      {/* <Calendar/> */}
      <Switch>
        <HomeTemPlate padding='24px' background='white' title='Thống kê' exact path='/' Component={TrangChu}></HomeTemPlate>
        <HomeTemPlate padding='24px' background='white' title='Thống kê' exact path='/trangchu' Component={TrangChu}></HomeTemPlate>
        <HomeTemPlate padding='24px' background='white' title='Danh Sách gói vé' exact path='/caidat' Component={CaiDat}></HomeTemPlate>
        <HomeTemPlate padding='24px' background='white' title='Danh sách vé' exact path='/quanlyve' Component={QuanLyVe}></HomeTemPlate>
        <HomeTemPlate padding='0' background='#F9F6F4' title='Đối soát vé' exact path='/doisoatve' Component={DoiSoatVe}></HomeTemPlate>
      </Switch>

    </Router>
  );
}

export default App;
