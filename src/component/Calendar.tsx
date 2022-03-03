import React, { Component } from 'react'
import { useState, useEffect } from 'react';
import moment, { months } from 'moment';
import { Frame, Header, PrevAndNexButton, Body, Day } from '../styled-components/Calender';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../redux/configStore';
import { calendarHiddenActionCreator, getSelectedDateActionCreator } from '../redux/action-creator/CalendarActionCreator'
import { modalVisibleActionCreator } from '../redux/action-creator/modalFilterTicketActionCreator';
// interface calendarHidden{
//     calendarHidden: boolean
// }
export default function Calendar(props: any) {
    let { calendarHidden } = props;
    

    const [calHidden, setCalHidden] = useState(true)

    // const { calendarHidden } = useSelector((state: State) => state.calendarReducer)
    const dispatch = useDispatch()
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const MONTHS = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const today = new Date()
    const [date, setDate] = useState(today)
    const [day, setDay] = useState(date.getDate())
    const [month, setMonth] = useState(date.getMonth())
    const [year, setYear] = useState(date.getFullYear())
    console.log('date', date)
    // the first day of the month
    const getStartDayOfMonth = (date: Date) => {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return startDate === 0 ? 7 : startDate;
    }
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date))
    const isLeapYear = (year: number) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const [radioValue, setRadioValue] = useState('month')
    const days = isLeapYear(year) ? DAYS_LEAP : DAYS
    useEffect(() => { // compoentDidUdate
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
        dispatch(getSelectedDateActionCreator(date))

    }, [date]);
    useEffect(()=>{
        setCalHidden(calendarHidden)
        calendarHidden = true
    },[calendarHidden])
    const handleChangeRadioAnt = (e: any) => {
        const { value } = e.target;
        setRadioValue(value)
    }
    console.log('callh', calHidden)

    return (
        <Frame calendarHidden={calHidden}>
            <Header>

                <LeftOutlined onClick={() => setDate(new Date(year, month - 1, day))} />
                <div className='px-2'>
                    {MONTHS[month]}, {year}
                </div>
                <RightOutlined onClick={() => setDate(new Date(year, month + 1, day))} />

            </Header>
            <Radio.Group defaultValue='month' value={radioValue} onChange={handleChangeRadioAnt} style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0' }} className='w-full items-center'>
                <Radio value='month' style={{ fontSize: '14px', fontWeight: '500', color: '#1E0D03' }}>Theo tháng</Radio>
                <Radio value='week' style={{ fontSize: '14px', fontWeight: '500', color: '#1E0D03' }}>Theo tuần</Radio>
            </Radio.Group>

            <Body>
                {DAYS_OF_THE_WEEK.map((d) => (
                    <Day key={d}>
                        <p style={{ color: "#C55E00" }} className='mb-0 text-lg font-semibold'>{d}</p>
                    </Day>
                ))}

                {Array(35)
                    .fill(null)
                    .map((_, index) => {
                        console.log('startDay', startDay)
                        const d = index - (startDay - 2);
                        let daysOfThePrevMonth: number;
                        console.log('month', month)
                        if (month === 0) {
                            daysOfThePrevMonth = days[11]
                            console.log('ngày của tháng', daysOfThePrevMonth)

                        } else {
                            daysOfThePrevMonth = days[month - 1]
                        }

                        let content: any;

                        if (d > 0 && d <= days[month]) {
                            content = <button type = 'button' style={{ borderRadius: '100%' }} className='mb-0 text-center h-ful w-full'>{d}</button>
                        } else if (d > days[month]) {
                            content = <button type = 'button' disabled style={{ borderRadius: '100%', color: '#23221F', opacity: '0.3', cursor: 'not-allowed' }} className='mb-0 text-center h-ful w-full'>{d - days[month]}</button>

                        } else {
                            content = <button type='button' disabled style={{ borderRadius: '100%', color: '#23221F', opacity: '0.3', cursor: 'not-allowed' }} className='mb-0 text-center h-ful w-full'>{daysOfThePrevMonth + d}</button>

                        }
                        console.log('ddds', d)
                        return (
                            <Day
                                key={index}
                                isToday={d === today.getDate()}
                                isSelected={d === day}
                                onClick={() => {
                                    console.log('hello')
                                    setDate(new Date(year, month, d))
                                    setCalHidden(true)

                                    // dispatch(calendarHiddenActionCreator(true))
                                    dispatch(getSelectedDateActionCreator(date))
                                    // dispatch(modalVisibleActionCreator(false))
                                }}
                            >
                                {content}
                            </Day>
                        );
                    })}

            </Body>
        </Frame>
    )
}
