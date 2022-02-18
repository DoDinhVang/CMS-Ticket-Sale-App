import { Modal, Button, Input, DatePicker, TimePicker, Checkbox, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editModalVisibleActionCreator, updateTicketPackActionCreator } from '../../../redux/action-creator/quanLyGoiVeActionCreator';
import { State } from '../../../redux/configStore';
import { useFormik } from 'formik';
import { TicketPack } from '../../../model/quanlygoive/TicketPack'
import moment from 'moment';
import { baseService } from '../../../service/BaseService';

const { Option } = Select;
export default function UpdateTicketPack() {

    const { isUpdateModalVisible, infoTicketPack } = useSelector((state: State) => state.ticketPackManagerReducer)
    console.log('infoticketpack', infoTicketPack)
    const dispatch = useDispatch()
    const handleOk = () => {
        dispatch(editModalVisibleActionCreator(false))
    };
    const handleCancel = () => {
        dispatch(editModalVisibleActionCreator(false))
    };
    const initialValues: TicketPack = {
        giaVe: infoTicketPack.giaVe,
        maGoi: infoTicketPack.maGoi,
        maSuKien: infoTicketPack.maSuKien,
        tenSuKien: infoTicketPack.tenSuKien,
        giaCombo: infoTicketPack.giaCombo,
        ngayApDung: infoTicketPack.ngayApDung,
        ngayHetHan: infoTicketPack.ngayHetHan,
        tenGoi: infoTicketPack.tenGoi,
        trangThai: infoTicketPack.trangThai
    }
    console.log('itinial', initialValues)

    console.log('infoTicketPack', infoTicketPack)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values: TicketPack) => {
            dispatch(updateTicketPackActionCreator(values))
        }
    })

    const handleOnChangeDatePicker = (name: string) => {

        return (value: any) => {
            formik.setFieldValue(name, moment(value).format())
        }
    }
    const handleOnChangeTimePicker = (name: string) => {

        return (value: any) => {
            formik.setFieldValue(name, moment(value).format())
        }
    }
    // console.log(formik.moment)

    return (
        <>
            <Modal width={758} title="Cập nhật thông tin gói vé" visible={isUpdateModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <form onSubmit={formik.handleSubmit}>
                    <div className='flex items-center justify-between mb-5'>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Mã sự kiện <span>*</span></p>
                            <Input name = 'maSuKien' onChange={formik.handleChange} style={{ width: '245px', height: '40px', borderRadius: '8px' }} value={formik.values.maSuKien} />
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Tên sự kiện</p>
                            <Input name='tenSuKien' onChange={formik.handleChange} style={{ width: '367px', height: '40px', borderRadius: '8px' }} value={formik.values.tenSuKien} />
                        </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ngày áp dụng</p>
                            <div className='flex items-center'>
                                <DatePicker format='DD/MM/YYYY' value={moment(formik.values.ngayApDung)}  style={{ height: '40px', marginRight: '8px', borderRadius: '8px' }} onChange={handleOnChangeDatePicker('ngayApDung')} />
                                <TimePicker format='h:mm:ss' value={moment(formik.values.ngayApDung, 'h:mm:ss')} style={{ height: '40px', borderRadius: '8px' }} onChange={(values) => {
                                     
                                 }}></TimePicker>
                            </div>
                        </div>
                        <div style={{ flexBasis: '367px' }} >
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ngày hết hạn</p>
                            <div className='flex items-center'>
                                <DatePicker format='DD/MM/YYYY' value={moment(formik.values.ngayHetHan)}style={{ height: '40px', marginRight: '8px', borderRadius: '8px' }} onChange={(date) => {
                                  

                                }} />
                                <TimePicker  format='h:mm:ss' value={moment(formik.values.ngayHetHan, 'h:mm:ss')} style={{ height: '40px', borderRadius: '8px' }} onChange={(value) => {
                                    formik.setFieldValue('ngayHetHan',moment(value).format('h:mm:ss '))
                                }}></TimePicker>
                            </div>

                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Giá vé áp dụng</p>
                        <div className='mb-3'>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => { }} >Vé lẻ (vnđ/vé) với giá</Checkbox>
                            <Input name='giaVe' onChange={formik.handleChange} value={formik.values.giaVe} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Giá vé' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>Vé</span>
                        </div>
                        <div>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => { }} >Combo với giá vé</Checkbox>
                            <Input name='giaCombo' onChange={(e)=>{
                                const {value} = e.target
                                formik.setFieldValue('giaCombo', {...formik.values.giaCombo,giaVe: value })
                            }} value={formik.values.giaCombo?.giaVe} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Giá vé' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <Input name='giaCombo' onChange={(e)=>{
                                const {value} = e.target
                                formik.setFieldValue('giaCombo', {...formik.values.giaCombo,soVe: value })
                            }} value={formik.values.giaCombo?.soVe} className='rounded-lg mr-2 ' style={{ width: '148px', height: '40px' }} placeholder='Số vé' />
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>Vé</span>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Tình trạng</p>
                        <Select  style={{ height: '40px', borderRadius: '8px', width: '176px' }} value={formik.values.trangThai} onChange={(value)=>{
                            formik.setFieldValue('trangThai', value)
                        }}>
                            <Option value={true}>Đang sử dụng</Option>
                            <Option value={false}>Chưa sử dụng</Option>

                        </Select>

                    </div>
                    <p className='text-xs italic' style={{ color: '#1E0D03', opacity: '0.4' }}><span>*</span> là thông tin bắt buộc</p>
                    <div className='text-center'>
                        <button type='button' onClick={() => {
                            dispatch(editModalVisibleActionCreator(false))
                        }} className='rounded-lg py-3 px-6 font-bold text-lg bg-white w-40 mr-4' style={{ color: '#FF993C', border: '1px solid #FF993C' }}>Hủy</button>
                        <button type='submit' className='rounded-lg py-3 px-6 font-bold text-lg text-white w-40' style={{ background: '#FF993C' }}>Lưu</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}