import React from 'react'
import InputSearch from '../../component/InputSearch';
import { Table, Tag, Space } from 'antd';
import {FilterOutlined}from '@ant-design/icons'
import './quanLyVe.css'
import { useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { LayDanhSachVeActionCreator } from '../../redux/action-creator/danhSachVeActionCreator';
import { State } from '../../redux/configStore';
export default function QuanLyVe() {

    const {danhSachVe} = useSelector( (state:State) => state.danhSachVeReducer);
    const dispatch =  useDispatch();
    const [style, setStyle] = useState({
            goiGiaDinh: 'loaigoi_active',
            goiSuKien: ''
    })
    const lst = danhSachVe.map((ve:any,index: number)=>{
        return {...ve, key: index}
    })


    useEffect(()=>{
        dispatch(LayDanhSachVeActionCreator())
    },[])

    const columns = [
        {
            title: 'bookingCode',
            dataIndex: 'bookingCode',
            key: 'booKingCode',
           
        },
        {
            title: 'Số Vé',
            dataIndex: 'soVe',
            key: 'soVe'
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'tenSuKien',
            key: 'tenSuKien'
        },
        {
            title: 'Tình Trạng sử dụng',
            dataIndex:'tinhTrangSuDung',
            key: 'tinhTrangSuDung',
            render: (text:boolean, record: any)=>{
                if(text){
                    return <Tag color='green'>Đã Sử Dụng</Tag>
                }
                return <Tag color='red'>Chưa sử dụng</Tag>
            }
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'ngayApDung',
            key: 'ngayApDung'

        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'ngayHetHan',
            key: 'ngayHetHan'

        },
      
        {
            title: 'Cổng check-in',
            dataIndex: 'congCheckIn',
            key: 'congCheckIn',
            
          
        },
    ];
    
    const data =  lst;
    return (
        <div id = 'quanLyVe'>
            {/* div:  loại gói  */}
            <div className='flex loaigoi'>
                <p onClick = {()=>{
                    setStyle({
                        goiGiaDinh: 'loaigoi_active',
                        goiSuKien: ''
                    })
                }} className= {`mr-8 ${style.goiGiaDinh}`}>Gói gia đình</p>
                <p onClick={()=>{
                     setStyle({
                        goiGiaDinh: '',
                        goiSuKien: 'loaigoi_active'
                    })
                }} className= {style.goiSuKien}>Gói Sự kiện</p>
            </div>

            {/* input search  */}
            <div className='flex justify-between items-center'>
                <InputSearch placeholder='Tìm bằng số vé'></InputSearch>
                <div className='flex justify-between items-center'>
                    <div className='filter__ticket'>
                        <FilterOutlined />
                        <span style={{marginLeft: '12px'}}>Lọc vé</span>
                    </div>
                    <div className='export__file'>
                        <span>Xuất file (.csv)</span>
                    </div>
                </div>
            </div>


            {/* danh sách vé  */}

            <div>
                <Table style={{ marginTop: '31px' }}
                    columns={columns}
                    pagination={{ position: ['bottomCenter'] }}
                    dataSource={data}
                />
            </div>

        </div>
    )
}
