import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Radio, Checkbox, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/configStore';
import { modalVisibleActionCreator } from '../../redux/action-creator/modalFilterTicketActionCreator';
import { DatePicker } from 'antd';
import './modalFilterTicket.css'
import { CHUA_SU_DUNG, DA_SU_DUNG, HET_HAN } from '../../util/config';
import { filterTickerActionCreator, getCheckInGateListActionCreator } from '../../redux/action-creator/quanLyVeActionCreator';
import { CheckInGate } from '../../model/quanlyve/CheckInGate';
import { FilterTicket } from '../../model/quanlyve/FilterTicket'
import { useFormik } from 'formik';



export default function ModalFilterTicket() {

  const { modalVisible } = useSelector((state: State) => state.modalFilterTicketReducer)
  const { checkInGateList } = useSelector((state: State) => state.quanLyVeReducer);
  const dispatch = useDispatch();
  const plainOption = checkInGateList.map((checkInGate: CheckInGate) => {
    return checkInGate.id
  })
  const initialValues: FilterTicket = {
    checkInGateId: plainOption,
    ticketStatus: '',
    checkTicket: '',
    eventId: ''
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: values => {
      dispatch(filterTickerActionCreator(values))
    },
  });

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  }


  const [disableCheckBox, setDisableCheckBox] = useState(true)

 
  const [checkedList, setCheckedList] = useState<any>([1,2,3,4,5]);
  console.log('checkedlist', checkedList)


  const checkboxValueOnchange = (value: any) => {

    setCheckedList([...value])
    formik.setFieldValue('checkInGateId', value)
  }


  useEffect(() => {
    dispatch(getCheckInGateListActionCreator())
   

  }, [])
  return <div>

    <Modal
      title="Lọc Vé"
      bodyStyle={{
        borderRadius: '16px'
      }}
      centered
      visible={modalVisible}
      onCancel={() => { dispatch(modalVisibleActionCreator(false)) }}
    >

      {/* calendar  */}

      <form onSubmit={formik.handleSubmit} className='modal_ticket_content'>
        <div>
          <div className='flex items-center'>
            <div style={{ marginRight: '130px' }}>
              <p className='text-title'>Từ ngày</p>
              <DatePicker style={{ borderRadius: '8px' }} onChange={onChange} />
            </div>
            <div >
              <p className='text-title'>Đến ngày</p>
              <DatePicker style={{ borderRadius: '8px' }} onChange={onChange} />
            </div>
          </div>
          {/* radio input */}
          <div style={{ marginTop: '20px' }}>
            <p className='text-title'>Tình trạng sử dụng</p>
            <Radio.Group name='ticketStatus' defaultValue={''} onChange={formik.handleChange}>
              <Radio value={''}>Tất cả</Radio>
              <Radio value={DA_SU_DUNG}>Đã sử dụng</Radio>
              <Radio value={CHUA_SU_DUNG}>Chưa sử dụng</Radio>
              <Radio value={HET_HAN}>Hết hạn</Radio>
            </Radio.Group>
          </div>

          {/* checkbox input  */}
          <div style={{ marginTop: '20px' }}>
            <p className='text-title'>Cổng check-in</p>
            <div>
              <Checkbox defaultChecked = {true} onChange={(e: any) => {

                const { checked } = e.target

                if (checked) {
                  setDisableCheckBox(true)
                  setCheckedList(plainOption)
                  formik.setFieldValue('checkInGateId', plainOption)

                } else {
                  setDisableCheckBox(false)
                  setCheckedList([])
                  formik.setFieldValue('checkInGateId', [])
                }
              }}>Tất cả</Checkbox>
              <Checkbox.Group name='checkInGateId'  value={checkedList} style={{ width: '100%' }} onChange={checkboxValueOnchange}>
                <Row>
                  {checkInGateList.map((checkInGate: CheckInGate, index: number) => {
                    return <Col key={index} span={8}>
                      <Checkbox value={checkInGate.id} disabled={disableCheckBox}>{checkInGate.tenCong}</Checkbox>
                    </Col>
                  })}
                </Row>
              </Checkbox.Group>
            </div>
          </div>
          <div className='text-center' style={{ marginTop: '30px' }}>
            <button type='submit' style={{
              padding: '11px 24px',
              border: '1px solid #FF993C',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FF993C',
              lineHeight: "26px",
              width: '160px',
            }}>Lọc</button>
          </div>
        </div>
      </form>

    </Modal>
  </div>;
}



