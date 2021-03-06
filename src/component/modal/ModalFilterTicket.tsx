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
import moment from 'moment';

import DatePicker from '../DatePicker';

export default function ModalFilterTicket() {

  const { modalVisible } = useSelector((state: State) => state.modalFilterTicketReducer)
  const { checkInGateList } = useSelector((state: State) => state.quanLyVeReducer);
  const dispatch = useDispatch();
  const initialValues: FilterTicket = {};
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: values => {
      console.log('values submit', values)
      dispatch(filterTickerActionCreator(values))
    },
  });
  const [disableCheckBox, setDisableCheckBox] = useState(false)
  const [checkedList, setCheckedList] = useState<any>([]);
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

  const handleOnChange = (value: any, name: string) => {

    formik.setFieldValue(name, value)
  }


  useEffect(() => {
    dispatch(getCheckInGateListActionCreator())

  }, [])
  return <div>

    <Modal
      title="L???c V??"
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
              <p className='text-title'>T??? ng??y</p>
              <DatePicker format='DD/MM/YYYY' name = 'startTime' onChange = {handleOnChange}></DatePicker>
            </div>
            <div >
              <p className='text-title'>?????n ng??y</p>
              <DatePicker format='DD/MM/YYYY' name='endTime' onChange={handleOnChange}></DatePicker>
            </div>
          </div>
          {/* radio input */}
          <div style={{ marginTop: '20px' }}>
            <p className='text-title'>T??nh tr???ng s??? d???ng</p>
            <Radio.Group name='tinhTrangSuDung' defaultValue={''} onChange={formik.handleChange}>
              <Radio value={''}>T???t c???</Radio>
              <Radio value={DA_SU_DUNG}>???? s??? d???ng</Radio>
              <Radio value={CHUA_SU_DUNG}>Ch??a s??? d???ng</Radio>
              <Radio value={HET_HAN}>H???t h???n</Radio>
            </Radio.Group>
          </div>

          {/* checkbox input  */}
          <div style={{ marginTop: '20px' }}>
            <p className='text-title'>C???ng check-in</p>
            <div>

              <Checkbox.Group value={checkedList} style={{ width: '100%' }} onChange={checkboxValueOnchange}>
                <Row>
                  <Col key='all' span={8}>
                    <Checkbox value={''} onChange={(e: any) => {
                      const { checked } = e.target

                      if (checked) {
                        setDisableCheckBox(true)
                      } else {
                        setDisableCheckBox(false)
                      }

                    }}>T???t c???</Checkbox>
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
            <button type='submit' className='button--white' style={{ width: '160px' }}>L???c</button>
          </div>
        </div>
      </form>

    </Modal>
  </div>;
}



