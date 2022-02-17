import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputSearch from '../../component/InputSearch'
import { getTicketPackListActionCreator, editModalVisibleActionCreator, getInfoTicketPackActionCreator } from '../../redux/action-creator/quanLyGoiVeActionCreator'
import { State } from '../../redux/configStore'
import { Table, Tag } from 'antd'
import { FormOutlined } from '@ant-design/icons';
import { TicketPack } from '../../model/quanlygoive/TicketPack'
import moment from 'moment'


export default function CaiDat() {
  const { ticketPackList} = useSelector((state: State) => state.ticketPackManagerReducer)
  const lst = ticketPackList.map((ticketPack: TicketPack, index: number) => {
    return { ...ticketPack, key: index }
  })
  console.log('lst', lst)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTicketPackListActionCreator())
  }, [])
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key'

    },
    {
      title: 'Mã gói',
      dataIndex: 'maGoi',
      key: "maGoi"
    },
    {
      title: 'Tên gói vé',
      dataIndex: 'tenGoi',
      key: 'tenGoi'
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'ngayApDung',
      key: 'ngayApDung',
      render: (text: any) => {
        console.log('text', text)
        return <span>{moment(text.toDate()).format('DD/MM/YYYY')}</span>
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'ngayHetHan',
      key: 'ngayHetHan',
      render: (text: any) => {
        return <span>{moment(text.toDate()).format('DD/MM/YYYY')}</span>
      }
    },
    {
      title: 'Giá vé (VND/VÉ)',
      dataIndex: 'giaVe',
      key: 'giaVe',
      render: (text: any) => {
        return <span>{text}</span>
      }
    },
    {
      title: 'Giá combo (VND/combo)',
      dataIndex: 'giaCombo',
      key: 'giaCombo',
      render: (text: any) => {
        return <>
          {text ? <span>{`${text.giaVe}/ ${text.soVe}`}</span> : <span></span>}
        </>

      }
    },
    {
      title: 'Tình trạng',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (text: any) => {
        return <>
          {text ? <Tag className='flex items-center' color={'green'}><p className='h-1 w-1 mb-0 inline-block rounded bg-green-500'></p> <p className='inline-block mb-0'>Đang sử dụng</p></Tag>
            : <Tag className='flex items-center' color={'red'}><p className='h-1 mb-0 inline-block w-1 rounded bg-red-500'></p><p className='mb-0 inline-block'>Tắt</p></Tag>}
        </>
      }
    },
    {
      title: '',
      key: 'capNhat',
      render: (record: TicketPack) => {
        console.log('record', record)
        return <div  onClick={()=>{
          
          dispatch(editModalVisibleActionCreator(true))
          dispatch(getInfoTicketPackActionCreator({...record, ngayApDung: moment(record.ngayApDung.toDate()).format(), ngayHetHan: moment(record.ngayHetHan.toDate()).format()}))
        }} className='flex items-center cursor-pointer'><FormOutlined style={{ color: '#FF993C' }} className='mr-2' /><span style={{ color: '#FF993C' }} className='whitespace-nowrap'>Cập nhật</span></div>
      }
    },
  ]
  const data = lst
  return (
    <div>

      <div className='flex justify-between items-center'>
        {/* input search  */}
        <InputSearch placeholder='Tìm bằng số vé'></InputSearch>


        {/* filter ticket  and export file  */}
        <div className='flex justify-between items-center'>
          <div className='export__file mr-3'>
            <span>Xuất file (.csv)</span>
          </div>


          <button className='py-3 px-3 rounded-lg text-white' style={{ background: '#FF993C' }}>Thêm gói vé</button>


        </div>
      </div>
      <div>
        <Table className='mt-6 'columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
      </div>

    </div>
  )
}
