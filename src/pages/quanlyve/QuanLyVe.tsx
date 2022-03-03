import React from 'react'
import InputSearch from '../../component/InputSearch';
import { Table, Tag } from 'antd';
import { FilterOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getTicketListActionCreator } from '../../redux/action-creator/quanLyVeActionCreator';
import { State } from '../../redux/configStore';
import moment from 'moment';
import { CHUA_SU_DUNG, DA_SU_DUNG, HET_HAN } from '../../util/config';
import { modalVisibleActionCreator } from '../../redux/action-creator/modalFilterTicketActionCreator';
export default function QuanLyVe() {

    const { ticketList } = useSelector((state: State) => state.quanLyVeReducer);
    const dispatch = useDispatch();
    const [style, setStyle] = useState({
        goiGiaDinh: 'loaigoi_active',
        goiSuKien: ''
    })

    const [maGoi, setMaGoi] = useState('goiGiaDinh')

    const lst = ticketList.filter((ve: any) => ve.maGoi === maGoi).map((ve: any, index: number) => {
        return { ...ve, key: index }
    })

    console.log('lst', lst)

    useEffect(() => {
        dispatch(getTicketListActionCreator())

    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'stt'
        },
        {
            title: 'Booking Code',
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
            dataIndex: 'tinhTrangSuDung',
            key: 'tinhTrangSuDung',
            render: (text: any, record: any) => {
                switch (text) {
                    case DA_SU_DUNG:
                        return <Tag color='blue'>Đã sử dụng</Tag>
                    case CHUA_SU_DUNG:
                        return <Tag color='green'>Chưa sử dụng</Tag>
                    case HET_HAN:
                        return <Tag color='red'>Hết hạn</Tag>

                    default:
                        break;
                }
                if (text) {

                }
                return <Tag color='red'>Chưa sử dụng</Tag>
            }
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung',
            key: 'ngaySuDung',
            render: (text: any) => {
                return <span>{moment(text.toDate()).format('DD/MM/YYYY')}</span>
            }

        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'ngayHetHan',
            key: 'ngayHetHan',
            render: (text: any) => {
                return <span>{moment(text.toDate()).format('DD/MM/YYYY')}</span>
            }

        },

        {
            title: 'Cổng check-in',
            dataIndex: 'congCheckIn',
            key: 'congCheckIn',

        },
    ];

    const data = lst;
    return (
        <div id='quanLyVe'>
            <h1 className='font-black text-4xl mb-6' style={{ lineHeight: "54px", color: "#1E0D03" }}>Quản lý vé</h1>
            {/* div:  loại gói  */}
            <div className='flex loaigoi'>
                <p onClick={() => {
                    setStyle({
                        goiGiaDinh: 'loaigoi_active',
                        goiSuKien: ''
                    })
                    setMaGoi('goiGiaDinh')
                }} className={`mr-8 ${style.goiGiaDinh}`}>Gói gia đình</p>
                <p onClick={() => {
                    setStyle({
                        goiGiaDinh: '',
                        goiSuKien: 'loaigoi_active'
                    })
                    setMaGoi('goiSuKien')
                }} className={style.goiSuKien}>Gói Sự kiện</p>
            </div>


            <div className='flex justify-between items-center'>
                {/* input search  */}
                <InputSearch placeholder='Tìm bằng số vé'></InputSearch>


                {/* filter ticket  and export file  */}
                <div className='flex  icon-filter justify-between items-center'>
                    <button className='button--white mr-3' onClick={() => {
                        dispatch(modalVisibleActionCreator(true))
                    }}>
                        <FilterOutlined />
                        <span style={{ marginLeft: '12px' }}>Lọc vé</span>
                    </button>
                    <button className='button--white'>
                        <span>Xuất file (.csv)</span>
                    </button>
                </div>
            </div>


            {/* danh sách vé  */}

            <div>
                <Table style={{ marginTop: '24px' }}
                    columns={columns}
                    pagination={{ position: ['bottomCenter'] }}
                    dataSource={data}
                />
            </div>

        </div>
    )
}
