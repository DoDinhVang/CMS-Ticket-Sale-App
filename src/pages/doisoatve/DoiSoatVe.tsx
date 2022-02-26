import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { State } from '../../redux/configStore';
import InputSearch from '../../component/InputSearch'
import { Table, Tag, Space, Select, Radio, DatePicker, RadioChangeEvent } from 'antd';
import { useFormik } from 'formik';
import { FilterTicket } from '../../model/quanlyve/FilterTicket';
import { filterTickerActionCreator, getTicketListActionCreator } from '../../redux/action-creator/quanLyVeActionCreator';
import { getEventListActionCreator } from '../../redux/action-creator/doiSoatVeActionCreator'
import { Event } from '../../model/doiSoatVe/Events';

export default function DoiSoatVe() {

    const { ticketList } = useSelector((state: State) => state.quanLyVeReducer)
    const { eventList } = useSelector((state: State) => state.checkTicketReducer)
    const dispatch = useDispatch()
    const lst = ticketList.map((ve: any, index: number) => {
        return { ...ve, key: index }
    })


    const options = eventList.map((event: Event, index: number) => {
        console.log('event', event)
        return { label: event.tenSuKien, value: event.maSuKien }
    })
    console.log('option', options)

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: "stt"
        },
        {
            title: 'Số vé',
            dataIndex: 'soVe',
            key: "soVe"
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'tenSuKien',
            key: 'tenSuKien'
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung',
            key: "ngaySuDung",
            render: (text: any) => {
                return <span>{moment(text.toDate()).format('DD/MM/YYYY')}</span>
            }
        },
        {
            title: "Tên loại vé",
            dataIndex: 'loaiVe',
            key: 'loaiVe'
        },
        {
            title: 'Cổng check-in',
            dataIndex: 'congCheckIn',
            key: 'congCheckIn'
        },
        {
            titlle: '',
            dataIndex: 'tinhTrangDoiSoat',
            render: (text: any) => {
                if (text) {
                    return <span className='italic text-red-500 font-medium text-sm'>Đã đổi soát</span>
                }
                return <span className='italic text-gray-400 font-medium text-sm'>Chưa đổi soát</span>
            }
        }
    ];

    const data = lst

    const initialValues: FilterTicket = {
        maSuKien: "CEC2021"
    }

    const handleSelectChangeValue = (value: string) => {
        formik.setFieldValue('maSuKien', value)
    }
    const [value, setValue] = useState('')
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values) => {
            dispatch(filterTickerActionCreator(values))
        }

    })
    console.log('value', value)

    const handleRadioChangeValue = (e: RadioChangeEvent) => {
        const { value } = e.target
        setValue(value)
        formik.setFieldValue('checkTicket', value)

    }
    const onChangeDatePickerValue = (name: string) => {
        return (value: any) => {
            const modifiedDate = {
                ...formik.values.ngaySuDung,
                [name]: new Date(moment(value).format())

            }
            formik.setFieldValue(`ngaySuDung`, modifiedDate)
        }
    }
    useEffect(() => {
        dispatch(getTicketListActionCreator())
        dispatch(getEventListActionCreator())
        dispatch(filterTickerActionCreator(initialValues))
    }, [])
    return (
        <div className='flex'>
            <div className='mr-5 bg-white p-6 rounded-3xl'>
                {/* input search */}
                <h1 className='font-black text-4xl mb-6' style={{ lineHeight: "54px", color: "#1E0D03" }}>Đối soát vé</h1>
                <InputSearch placeholder='Tìm bằng số vé'></InputSearch>
                <Table className='mt-6 ' columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
            </div>

            <div className='rounded-3xl bg-white p-6' style={{ width: '320px' }}>
                <form onSubmit={formik.handleSubmit} className='block h-full'>
                    <h3 className='font-bold text-2xl' style={{ marginBottom: '29px' }}>Lọc Vé</h3>
                    <Select options={options} defaultValue='CEC2021' onChange={handleSelectChangeValue} style={{ width: '280px', background: '#F1F4F8', borderRadius: '8px', marginBottom: '24px' }}>

                    </Select>
                    <div className='flex justify-between mb-6'>
                        <p className='whitespace-nowrap mb-0 font-semibold text-base'>tình trạng đối soát</p>
                        <Radio.Group name='tinhTrangDoiSoat' style={{ flexBasis: '110px' }} onChange={handleRadioChangeValue} value={value}>
                            <Space direction="vertical">
                                <Radio value={''}>tất cả</Radio>
                                <Radio value={true}>đã đổi soát</Radio>
                                <Radio className='whitespace-nowrap' value={false}>chưa đối soát</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='flex justify-between mb-6'>
                        <p className='mb-0 font-semibold text-base'>loại vé</p>
                        <p className='mb-0' style={{ flexBasis: '110px' }}>vé cổng</p>
                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <p className='mb-0 font-semibold text-base'>từ ngày</p>
                        <DatePicker format='DD/MM/YYYY' style={{ flexBasis: '110px' }} onChange={onChangeDatePickerValue('startTime')} />
                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <p className='mb-0 font-semibold text-base'>đến ngày</p>
                        <DatePicker format='DD/MM/YYYY' style={{ flexBasis: '110px' }} onChange={onChangeDatePickerValue('endTime')} />
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='button--white w-40 h-12'>Lọc</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
