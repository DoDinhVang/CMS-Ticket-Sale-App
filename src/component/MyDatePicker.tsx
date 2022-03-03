import React,{useState} from 'react'
import { Input } from 'antd'
import { CalendarOutlined } from '@ant-design/icons';
import '../sass/Componens/datePicker.scss'
import  Calendar from './Calendar'
import { useDispatch,useSelector } from 'react-redux';
import { calendarHiddenActionCreator } from '../redux/action-creator/CalendarActionCreator'
import {State} from '../redux/configStore'
import moment from 'moment'


export default function MyDatePicker(props:any) {
    const dispatch = useDispatch()
    const {date} = useSelector((state:State)=>state.calendarReducer)
    const [calenHidden,setCalenHidden] = useState(props.calendarHidden)
    console.log('calender ben myd', calenHidden)
    return (
        <div className='datePicker--ver--0'>
            <Input value = {moment(props.date).format('DD/MM/YYYY')} className='h-full w-full' style={{ paddingLeft:'8px', borderRadius: '8px' }}></Input>
            <div className='icons'>
                <CalendarOutlined onClick={()=>{
                    console.log('hello ccc')
                    setCalenHidden(false)
                }} />
            </div>
            <Calendar  calendarHidden = {calenHidden} />
        </div>
    )
}
