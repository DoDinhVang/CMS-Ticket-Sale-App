import { Modal, Button, Input, DatePicker, TimePicker, Checkbox, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addModalVisibleActionCreator, addTicketPackActionCreator, updateTicketPackActionCreator } from '../../../redux/action-creator/quanLyGoiVeActionCreator';
import { State } from '../../../redux/configStore';
import { useFormik } from 'formik';
import { TicketPack } from '../../../model/quanlygoive/TicketPack'
import moment from 'moment';
import firebase from "firebase";
import Calendar from '../../../component/Calendar';
import { InfoTicketPack } from '../../../model/quanlygoive/TicketPack'
import { Value } from 'sass';

const { Option } = Select;
export default function AddTicketPack() {

    const { isAddModalVisible, infoTicketPack } = useSelector((state: State) => state.ticketPackManagerReducer)
    console.log('infoticketpack', infoTicketPack)
    const dispatch = useDispatch()
    const handleOk = () => {
        dispatch(addModalVisibleActionCreator(false))
    };
    const handleCancel = () => {
        dispatch(addModalVisibleActionCreator(false))
    };
    const initialValues  = new InfoTicketPack()



    console.log('infoTicketPack', infoTicketPack)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values: TicketPack) => {
           const {maGoi, docId, ...data} =  values;
           console.log('data', data)
           dispatch(addTicketPackActionCreator(data))

        }
    })
    // moment((formik.values.ngayApDung).toDate()).format('DD/MM/YYY h:mm:ss')
    // console.log('ngayapdung', formik.values.ngayApDung?.toDate())
    const handleOnChangeDatePicker = (name: string, date: Date, value: any) => {
        console.log('time', date)

        const datePicker = new Date(moment(value).format())
        const day = datePicker.getDate()
        const month = datePicker.getMonth()
        const year = datePicker.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        // const timestamp = firebase.firestore.Timestamp.fromDate(new Date(moment(value).format('DD / MM /YYYY')));
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(year, month, day, hour, minute, second))
        console.log('timestampdate', timestamp)
        formik.setFieldValue(name, timestamp)
    }
    const handleOnChangeTimePicker = (name: string, date: Date) => {

        return (value: any) => {
            const timePicker = new Date(moment(value).format())
            // console.log('timePicker', timePicker)
            const day = date.getDate()
            const month = date.getMonth()
            const year = date.getFullYear()
            const hour = timePicker.getHours()
            const minute = timePicker.getMinutes()
            const second = timePicker.getSeconds()
            const timestamp = firebase.firestore.Timestamp.fromDate(new Date(year, month, day, hour, minute, second))
            console.log('timestamptime', timestamp)
            formik.setFieldValue(name, timestamp)
        }
    }


    return (
        <>
            <Modal width={758} title="Thêm gói vé" visible={isAddModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Tên Gói Vé<span>*</span></p>
                        <Input name='tenGoi' onChange={formik.handleChange} style={{ width: '367px', height: '40px', borderRadius: '8px' }} placeholder="Nhập tên gói vé" />
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ngày áp dụng</p>
                            <div className='flex items-center'>

                                <Calendar value={formik.values.ngayApDung?.toDate()} feature='add' formik={formik} handleDatePicker={handleOnChangeDatePicker} name='ngayApDung'></Calendar>
                                {/* <DatePicker placeholder='dd/mm/yy' format='DD/MM/YYYY' style={{ height: '40px', marginRight: '8px', borderRadius: '8px' }} onChange={()=>{}} /> */}
                                {/* <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> */}
                                <TimePicker placeholder='hh:mm:ss' style={{ height: '40px', borderRadius: '8px' }} onChange={handleOnChangeTimePicker('ngayApDung', formik.values.ngayApDung?.toDate())}></TimePicker>
                            </div>
                        </div>
                        <div style={{ flexBasis: '367px' }} >
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ngày hết hạn</p>
                            <div className='flex items-center'>
                                <Calendar value={formik.values.ngayHetHan?.toDate()} handleDatePicker={handleOnChangeDatePicker} feature='add' formik={formik} name='ngayHetHan'></Calendar>
                                {/* <DatePicker placeholder='dd/mm/yy' format='DD/MM/YYYY' style={{ height: '40px', marginRight: '8px', borderRadius: '8px' }} onChange={() => { }} /> */}
                                <TimePicker placeholder='hh:mm:ss' style={{ height: '40px', borderRadius: '8px' }} onChange={handleOnChangeTimePicker('ngayHetHan', formik.values.ngayHetHan?.toDate())}></TimePicker>
                            </div>

                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Giá vé áp dụng</p>
                        <div className='mb-3'>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => { }} >Vé lẻ (vnđ/vé) với giá</Checkbox>
                            <Input name='giaVe' onChange={formik.handleChange} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Giá vé' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>Vé</span>
                        </div>
                        <div>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => { }} >Combo với giá vé</Checkbox>
                            <Input name='giaCombo' onChange={(e) => {
                                const { value } = e.target
                                formik.setFieldValue('giaCombo', { ...formik.values.giaCombo, giaVe: value })
                            }} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Giá vé' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <Input name='giaCombo' onChange={(e) => {
                                const { value } = e.target
                                formik.setFieldValue('giaCombo', { ...formik.values.giaCombo, soVe: value })
                            }} className='rounded-lg mr-2 ' style={{ width: '148px', height: '40px' }} placeholder='Số vé' />
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>Vé</span>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Tình trạng</p>
                        <Select style={{ height: '40px', borderRadius: '8px', width: '176px' }} defaultValue={false} onChange={(value) => {
                            formik.setFieldValue('trangThai', value)
                        }}>
                            <Option value={true}>Đang sử dụng</Option>
                            <Option value={false}>Chưa sử dụng</Option>

                        </Select>

                    </div>
                    <p className='text-xs italic' style={{ color: '#1E0D03', opacity: '0.4' }}><span>*</span> là thông tin bắt buộc</p>
                    <div className='text-center'>
                        <button type='button' onClick={() => {
                            dispatch(addModalVisibleActionCreator(false))
                        }} className='rounded-lg py-3 px-6 font-bold text-lg bg-white w-40 mr-4' style={{ color: '#FF993C', border: '1px solid #FF993C' }}>Hủy</button>
                        <button type='submit' className='rounded-lg py-3 px-6 font-bold text-lg text-white w-40' style={{ background: '#FF993C' }}>Lưu</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}