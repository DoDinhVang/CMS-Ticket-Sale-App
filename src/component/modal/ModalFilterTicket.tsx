import React from 'react';
import { useState } from 'react';
import { Modal, Radio, Checkbox, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/configStore';
import { modalVisibleActionCreator } from '../../redux/action-creator/modalFilterTicketActionCreator';
import { DatePicker, Space } from 'antd';
import './modalFilterTicket.css'
import { CHUA_SU_DUNG, DA_SU_DUNG, HET_HAN } from '../../util/config';


export default function ModalFilterTicket() {

  const { modalVisible } = useSelector((state: State) => state.modalFilterTicketReducer)
  const dispatch = useDispatch();

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  }
  const [radioValue, setRadioValue] = useState('')

  const radioOnchange = (e: any) => {
    setRadioValue(e.target.value)
  }

  const [disableCheckBox, setDisableCheckBox] = useState(false)
  const checkboxOnchange = (checkedValues: any) => {
    console.log('checked = ', checkedValues);
  }
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
      <form className='modal_ticket_content'>
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
            <Radio.Group onChange={radioOnchange} value={radioValue}>
              <Radio value={''}>Tất cả</Radio>
              <Radio value={DA_SU_DUNG}>Đã sử dụng</Radio>
              <Radio value={CHUA_SU_DUNG}>Chưa sử dụng</Radio>
              <Radio value={HET_HAN}>Hết hạn</Radio>
            </Radio.Group>
          </div>
          {/* checkbox input  */}
          <div style={{ marginTop: '20px' }}>
            <p className='text-title'>Cổng check-in</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={checkboxOnchange}>
              <Row>
                <Col span={8}>
                  <Checkbox value="" onClick={(e:any)=>{
                      const {checked} = e.target
                      if(checked){
                        setDisableCheckBox(true)
                      }else{
                        setDisableCheckBox(false)
                      }
                  }}>Tất cả</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="cong1" disabled = {disableCheckBox}>Cổng 1</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="cong2" disabled = {disableCheckBox}>Cổng 2</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="cong3" disabled = {disableCheckBox}>Cổng 3</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="cong4" disabled = {disableCheckBox}>Cổng 4</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="cong5" disabled = {disableCheckBox}>Cổng 5</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
          <div className='text-center' style={{marginTop: '30px'}}>
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
