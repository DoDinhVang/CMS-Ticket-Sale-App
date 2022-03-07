import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Radio, Checkbox, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/configStore';
import { modalVisibleActionCreator } from '../../redux/action-creator/modalFilterTicketActionCreator';
import { CHUA_SU_DUNG, DA_SU_DUNG, HET_HAN } from '../../util/config';
import { filterTickerActionCreator, getCheckInGateListActionCreator } from '../../redux/action-creator/quanLyVeActionCreator';
import { CheckInGate } from '../../model/quanlyve/CheckInGate';
import { FilterTicket } from '../../model/quanlyve/FilterTicket'
import { useFormik } from 'formik';
import firebase from 'firebase';
import moment from 'moment';
import { toNamespacedPath } from 'node:path/posix';
import Calendar from '../Calendar';

export default function ModalFilterTicket() {

  const { modalVisible } = useSelector((state: State) => state.modalFilterTicketReducer)
  const { checkInGateList } = useSelector((state: State) => state.quanLyVeReducer);
  const { date,name} = useSelector((state: State) => state.calendarReducer)
  const dispatch = useDispatch();

  const initialValues: FilterTicket = {};
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: values => {
      console.log('value', values)
      dispatch(filterTickerActionCreator(values))
    },
  });

 

  const [disableCheckBox, setDisableCheckBox] = useState(false)

  console.log('disableCheckBox', disableCheckBox)
  const [checkedList, setCheckedList] = useState<any>([]);
  console.log('checkedlist', checkedList)


  const checkboxValueOnchange = (value: any) => {

    let checkBoxValueIsEmpty: boolean = false;
    let valueIsEmpty: string = '';
    for (let i = 0; i < value.length; i++) {
      if (value[i] === '') {
        checkBoxValueIsEmpty = true;
        break;
      }
      checkBoxValueIsEmpty = false;
    }

    if (checkBoxValueIsEmpty) {
      setCheckedList([''])
      formik.setFieldValue('congCheckInId', valueIsEmpty)

    } else {
      setCheckedList([...value])
      formik.setFieldValue('congCheckInId', value)
    }

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
              {/* <DatePicker format='DD/MM/YYYY' style={{ borderRadius: '8px' }} onChange={onChange('startTime')} /> */}
              {/* <MyDatePicker></MyDatePicker> */}
              <Calendar value = {formik.values.ngaySuDung?.startTime} feature = 'filter' name = 'startTime' formik = {formik}></Calendar>
            </div>
            <div >
              <p className='text-title'>Đến ngày</p>
              <Calendar value = {formik.values.ngaySuDung?.endTime} feature = 'filter' name = 'endTime' formik = {formik}></Calendar>
              {/* <MyDatePicker></MyDatePicker> */}
              {/* <DatePicker format='DD/MM/YYYY' style={{ borderRadius: '8px' }} onChange={onChange(`endTime`)} /> */}
            </div>
          </div>
          {/* radio input */}
          <div style={{ marginTop: '20px' }}>
            <p className='text-title'>Tình trạng sử dụng</p>
            <Radio.Group name='tinhTrangSuDung' defaultValue={''} onChange={formik.handleChange}>
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

              <Checkbox.Group value={checkedList} style={{ width: '100%' }} onChange={checkboxValueOnchange}>
                <Row>
                  <Col key='all' span={8}>
                    <Checkbox value={''} onChange={(e: any) => {
                      const { checked } = e.target
                      console.log('checkded', checked)
                      if (checked) {
                        setDisableCheckBox(true)
                      } else {
                        setDisableCheckBox(false)
                      }

                    }}>Tất cả</Checkbox>
                  </Col>
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
            <button type='submit' className='button--white' style={{width: '160px'}}>Lọc</button>
          </div>
        </div>
      </form>

    </Modal>
  </div>;
}



