import { Modal, Button, Input, DatePicker, TimePicker, Checkbox, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateModalVisibleActionCreator } from '../../../redux/action-creator/quanLyGoiVeActionCreator';
import { State } from '../../../redux/configStore';

const { Option } = Select;
export default function UpdateTicketPack() {

    const { isUpdateModalVisible } = useSelector((state: State) => state.ticketPackManagerReducer)
    const dispatch = useDispatch()
    const handleOk = () => {
        dispatch(updateModalVisibleActionCreator(false))
    };
    const handleCancel = () => {
        dispatch(updateModalVisibleActionCreator(false))
    };

    return (
        <>
            <Modal width={758} title="Cập nhật thông tin gói vé" visible={isUpdateModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <form>
                    <div className='flex items-center justify-between mb-5'>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Mã sự kiện <span>*</span></p>
                            <Input style={{ width: '245px', height: '40px', borderRadius: '8px' }} defaultValue='235' />
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Tên sự kiện</p>
                            <Input style={{ width: '367px', height: '40px', borderRadius: '8px' }} defaultValue='hai' />
                        </div>
                    </div>

                    <div className='flex items-center justify-between mb-5'>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ngày áp dụng</p>
                            <div className='flex items-center'>
                                <DatePicker style={{ height: '40px', marginRight: '8px', borderRadius: '8px' }} onChange={() => { }} />
                                <TimePicker style={{ height: '40px', borderRadius: '8px' }} onChange={() => { }}></TimePicker>
                            </div>
                        </div>
                        <div style={{ flexBasis: '367px' }} >
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ngày hết hạn</p>
                            <div className='flex items-center'>
                                <DatePicker style={{ height: '40px', marginRight: '8px', borderRadius: '8px' }} onChange={() => { }} />
                                <TimePicker style={{ height: '40px', borderRadius: '8px' }} onChange={() => { }}></TimePicker>
                            </div>

                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Giá vé áp dụng</p>
                        <div className='mb-3'>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => { }} >Vé lẻ (vnđ/vé) với giá</Checkbox>
                            <Input className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Giá vé' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>Vé</span>
                        </div>
                        <div>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => { }} >Combo với giá vé</Checkbox>
                            <Input className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Giá vé' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>Vé</span>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Tình trạng</p>
                        <Select style={{ height: '40px', borderRadius: '8px', width: '176px' }} defaultValue="true" onChange={(value) => { }}>
                            <Option value="true">Đang sử dụng</Option>
                            <Option value="false">Chưa sử dụng</Option>

                        </Select>

                    </div>
                    <p className='text-xs italic' style={{ color: '#1E0D03', opacity: '0.4' }}><span>*</span> là thông tin bắt buộc</p>
                    <div className='text-center'>
                        <button onClick={()=>{
                            dispatch(updateModalVisibleActionCreator(false))
                        }} className='rounded-lg py-3 px-6 font-bold text-lg bg-white w-40 mr-4' style={{color: '#FF993C', border: '1px solid #FF993C'}}>Hủy</button>
                        <button className='rounded-lg py-3 px-6 font-bold text-lg text-white w-40' style={{background: '#FF993C'}}>Lưu</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
