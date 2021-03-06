import { Modal, Button, Input, TimePicker, Checkbox, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editModalVisibleActionCreator, getTicketPackListActionCreator, updateTicketPackActionCreator } from '../../../redux/action-creator/quanLyGoiVeActionCreator';
import { State } from '../../../redux/configStore';
import { useFormik } from 'formik';
import { TicketPack } from '../../../model/quanlygoive/TicketPack'
import moment from 'moment';
import firebase from "firebase";
import DatePicker from '../../../component/DatePicker'
const { Option } = Select;
export default function UpdateTicketPack() {

    const { isUpdateModalVisible, infoTicketPack } = useSelector((state: State) => state.ticketPackManagerReducer)
    const dispatch = useDispatch()
    const handleOk = () => {
        dispatch(editModalVisibleActionCreator(false))
    };
    const handleCancel = () => {
        dispatch(editModalVisibleActionCreator(false))
    };

    const [disibleInputAnt, setdisibleInputAnt] = useState({
        elementTicketPrice: false,
        elementComboTicketPrice: false

    })
    const initialValues: TicketPack = {
        giaVe: infoTicketPack.giaVe,
        maGoi: infoTicketPack.maGoi,
        docId: infoTicketPack.docId,
        maSuKien: infoTicketPack.maSuKien,
        tenSuKien: infoTicketPack.tenSuKien,
        giaCombo: infoTicketPack.giaCombo,
        ngayApDung: infoTicketPack.ngayApDung,
        ngayHetHan: infoTicketPack.ngayHetHan,
        tenGoi: infoTicketPack.tenGoi,
        trangThai: infoTicketPack.trangThai
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values: TicketPack) => {
            console.log('submit values', values)
            dispatch(updateTicketPackActionCreator(values))
        }
    })
    
    const handleOnChangeDatePicker = (value: Date, name: string) => {
        console.log('value: date', value)
        const day = value.getDate()
        const month = value.getMonth()
        const year = value.getFullYear()
        console.log('day, month, year', day, month, year)
        let hour = formik.values.ngayApDung?.toDate().getHours()
        let minute = formik.values.ngayApDung?.toDate().getMinutes()
        let second = formik.values.ngayApDung?.toDate().getSeconds()
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(year, month, day, hour, minute, second))
        formik.setFieldValue(name, timestamp)

    }
    const handleOnChangeTimePicker = (name: string, date: Date) => {

        return (value: any) => {
            const timePicker = new Date(moment(value).format())
            const day = date.getDate()
            const month = date.getMonth()
            const year = date.getFullYear()
            const hour = timePicker.getHours()
            const minute = timePicker.getMinutes()
            const second = timePicker.getSeconds()
            const timestamp = firebase.firestore.Timestamp.fromDate(new Date(year, month, day, hour, minute, second))
            formik.setFieldValue(name, timestamp)
        }
    }
    console.log('ng??y ??p d???ng', formik.values.ngayApDung)
    useEffect(() => {
        dispatch(getTicketPackListActionCreator())
    }, [])


    return (
        <>
            <Modal width={570} title="C???p nh???t th??ng tin g??i v??" visible={isUpdateModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <form onSubmit={formik.handleSubmit}>
                    <div className='flex items-center justify-between mb-5'>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>M?? s??? ki???n <span style={{ color: '#FD5959' }}>*</span></p>
                            <Input name='maSuKien' onChange={formik.handleChange} style={{ width: '120px', height: '40px', borderRadius: '8px' }} value={formik.values.maSuKien} />
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>T??n s??? ki???n</p>
                            <Input name='tenSuKien' onChange={formik.handleChange} style={{ width: '320px', height: '40px', borderRadius: '8px' }} value={formik.values.tenSuKien} />
                        </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>
                        <div className='mr-5'>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ng??y ??p d???ng</p>
                            <div className='flex items-center'>
                                <DatePicker format='DD/MM/YYYY' onChange={handleOnChangeDatePicker} name='ngayApDung' defaultValue={formik.values.ngayApDung?.toDate()} /> :
                                <TimePicker value={moment(formik.values.ngayApDung?.toDate(), 'hh:mm:ss')} style={{ marginLeft: '12px', height: '40px', borderRadius: '8px' }} onChange={handleOnChangeTimePicker('ngayApDung', formik.values.ngayApDung?.toDate())}></TimePicker>
                            </div>
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ng??y h???t h???n</p>
                            <div className='flex items-center'>
                                <DatePicker format='DD/MM/YYYY' onChange={handleOnChangeDatePicker} name='ngayHetHan' defaultValue={formik.values.ngayHetHan?.toDate()} />
                                <TimePicker value={moment(formik.values.ngayHetHan?.toDate(), 'hh:mm:ss')} style={{ marginLeft: '12px', height: '40px', borderRadius: '8px' }} onChange={handleOnChangeTimePicker('ngayHetHan', formik.values.ngayHetHan?.toDate())}></TimePicker>
                            </div>

                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Gi?? v?? ??p d???ng</p>
                        <div className='mb-3'>
                            <Checkbox defaultChecked={true} className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => {
                                const { checked } = e.target;
                                if (checked) {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementTicketPrice: false
                                    })
                                } else {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementTicketPrice: true
                                    })
                                }
                            }} >V?? l??? (vn??/v??) v???i gi??</Checkbox>
                            <Input disabled={disibleInputAnt.elementTicketPrice} name='giaVe' onChange={formik.handleChange} value={formik.values.giaVe} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Gi?? v??' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>V??</span>
                        </div>
                        <div>
                            <Checkbox defaultChecked={true} className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => {
                                const { checked } = e.target
                                if (checked) {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementComboTicketPrice: false
                                    })
                                } else {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementComboTicketPrice: true
                                    })
                                }
                            }} >Combo v???i gi?? v??</Checkbox>
                            <Input disabled={disibleInputAnt.elementComboTicketPrice} name='giaCombo' onChange={(e) => {
                                const { value } = e.target
                                formik.setFieldValue('giaCombo', { ...formik.values.giaCombo, giaVe: value })
                            }} value={formik.values.giaCombo?.giaVe} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Gi?? v??' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <Input disabled={disibleInputAnt.elementComboTicketPrice} name='giaCombo' onChange={(e) => {
                                const { value } = e.target
                                formik.setFieldValue('giaCombo', { ...formik.values.giaCombo, soVe: value })
                            }} value={formik.values.giaCombo?.soVe} className='rounded-lg mr-2 ' style={{ width: '148px', height: '40px' }} placeholder='S??? v??' />
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>V??</span>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>T??nh tr???ng</p>
                        <Select style={{ height: '40px', borderRadius: '8px', width: '176px' }} value={formik.values.trangThai} onChange={(value) => {
                            formik.setFieldValue('trangThai', value)
                        }}>
                            <Option value={true}>??ang s??? d???ng</Option>
                            <Option value={false}>Ch??a s??? d???ng</Option>

                        </Select>

                    </div>
                    <p className='text-xs italic'>
                        <span className='font-semibold' style={{ color: '#FD5959' }}>*</span>
                        <span style={{ color: '#1E0D03', opacity: '0.4' }}>    l?? th??ng tin b???t bu???c</span>
                    </p>
                    <div className='text-center'>
                        <button type='button' onClick={() => {
                            dispatch(editModalVisibleActionCreator(false))
                        }} className='button--white mr-5' style={{ width: '132px' }}>H???y</button>
                        <button type='submit' className='button--orange' style={{ width: '132px' }}>L??u</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}