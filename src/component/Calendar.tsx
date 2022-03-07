import React, { Component, ReactComponentElement, ReactElement, useRef } from 'react'
import { useState, useEffect } from 'react';
import moment, { months } from 'moment';
import { Frame, Header, PrevAndNexButton, Body, Day } from '../styled-components/Calender';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { DatePicker, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../redux/configStore';
import { calendarHiddenActionCreator, getSelectedDateActionCreator } from '../redux/action-creator/CalendarActionCreator'
import { modalVisibleActionCreator } from '../redux/action-creator/modalFilterTicketActionCreator';
import { Input } from 'antd'
import { CalendarOutlined } from '@ant-design/icons';
import '../sass/Componens/datePicker.scss'
import { type } from 'os';
import { getRevenueActionCreator, getRevenueDataByWeekActionCreator } from '../redux/action-creator/dashboardActionCreator';
import { isBuffer } from 'util';
export default function Calendar(props: any) {
    // let { calendarHidden } = props;
    const { name, formik, feature, handleDatePicker, value } = props;
    const [calenHidden, setCalenHidden] = useState(true)

    const dispatch = useDispatch()
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const MONTHS = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const today = new Date()
    const [inputValue, setInputValue] = useState('');
    const [date, setDate] = useState(today)
    const [day, setDay] = useState(date.getDate())
    const [month, setMonth] = useState(date.getMonth())
    const [year, setYear] = useState(date.getFullYear())
    console.log('date', moment(date).format('DD/MM/YYYY'))
    // the first day of the month
    const getStartDayOfMonth = (date: Date) => {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

        return startDate === 0 ? 7 : startDate;
    }
    const isLeapYear = (year: number) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const [startDay, setStartDay] = useState(getStartDayOfMonth(date))
    const [radioValue, setRadioValue] = useState('month')
    const days = isLeapYear(year) ? DAYS_LEAP : DAYS

    console.log('startDayOfMonth', startDay)
    useEffect(() => { // compoentDidUdate
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
        dispatch(getSelectedDateActionCreator(date, name))

        // dispatch(calendarHiddenActionCreator(true))
        dispatch(getSelectedDateActionCreator(date, name))
        if (feature === 'filter') {
            if (typeof value === 'undefined') {
            } else {
                setInputValue(moment(date).format('DD/MM/YYYY'))
                const modifiedDate = {
                    ...formik.values.ngaySuDung,
                    [name]: new Date(moment(date).format())

                }
                formik.setFieldValue(`ngaySuDung`, modifiedDate)
            }
        } else if (feature === 'update') {
            if (value !== undefined) {
                setInputValue(moment(value).format('DD/MM/YYYY'))
                handleDatePicker(name, value, date)
            }
        } else if (feature === 'add') {
            if (typeof value === 'undefined') {
                handleDatePicker(name, date, date)

            } else {
                setInputValue(moment(date).format('DD/MM/YYYY'))
                handleDatePicker(name, value, date)
            }

        } else if (feature === 'logistics') {
            setInputValue(moment(date).format('[Tháng] MM,YYYY'))
            if (radioValue === 'month') {
                dispatch(getRevenueActionCreator(date.getMonth(), date.getFullYear()))
            } else if (radioValue === 'week') {

                const startOfWeek = 7 * Math.floor(day / 7)
                const endOfWeek = 7 * Math.floor(day / 7) + 6
                const modifiedStartOfWeek = moment(new Date(year, month, startOfWeek)).format()
                const modifiedEndOfWeek = moment(new Date(year, month, endOfWeek)).format()
                console.log('startofweek', startOfWeek)
                dispatch(getRevenueDataByWeekActionCreator(modifiedStartOfWeek, modifiedEndOfWeek))
            }
        }

    }, [date, day]);

    useEffect(() => {
        if (feature === 'update') {
            setInputValue(moment(value).format('DD/MM/YYYY'))
        }
    }, [value])

    const ref = useRef<any>();
    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {

            if (!calenHidden && ref.current && !ref.current.contains(e.target)) {
                setCalenHidden(true)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [calenHidden])

    const handleChangeRadioAnt = (e: any) => {
        const { value } = e.target;
        setRadioValue(value)

    }

    return (
        <div ref={ref} className='datePicker--ver--0'>
            <Input onFocus={() => {
                setCalenHidden(false)
            }} defaultValue='' value={inputValue} className='h-full w-full' style={{ paddingLeft: '8px', borderRadius: '8px' }}></Input>
            <div className='icons'>
                <CalendarOutlined onClick={() => {
                    setCalenHidden(oldSate => !oldSate)
                }} />
            </div>
            <Frame calendarHidden={calenHidden}>
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
                    {
                        Array(35)
                            .fill(null)
                            .map((_, index) => {

                                const d = index - (startDay - 2);

                                let daysOfThePrevMonth: number;
                                console.log('d', d)

                                if (month === 0) {
                                    daysOfThePrevMonth = days[11]
                                    console.log('ngày của tháng', daysOfThePrevMonth)

                                } else {
                                    daysOfThePrevMonth = days[month - 1]
                                }

                                let content: ReactElement;

                                if (d > 0 && d <= days[month]) {
                                    content = <button type='button' style={{ borderRadius: '100%' }} className='mb-0 text-center h-full w-full'>{d}</button>
                                } else if (d > days[month]) {
                                    content = <button type='button' style={{ borderRadius: '100%', color: '#23221F', opacity: '0.3', cursor: 'not-allowed' }} className='mb-0 text-center h-full w-full'>{d - days[month]}</button>

                                } else {
                                    content = <button type='button' style={{ borderRadius: '100%', color: '#23221F', opacity: '0.3', cursor: 'not-allowed' }} className='mb-0 text-center h-full w-full'>{daysOfThePrevMonth + d}</button>

                                }


                                if (radioValue === 'month') {
                                    return (
                                        <Day
                                            key={index}
                                            isToday={d === today.getDate()}
                                            isStartOfWeek={false}
                                            isEndOfWeek={false}
                                            isSelected={d === day}
                                            onClick={() => {
                                                setDate(new Date(year, month, d))
                                                setCalenHidden(true)
                                                if (feature === 'filter') {
                                                    const modifiedDate = {
                                                        ...formik.values.ngaySuDung,
                                                        [name]: new Date(moment(date).format())

                                                    }
                                                    formik.setFieldValue(`ngaySuDung`, modifiedDate)
                                                }

                                            }}
                                        >
                                            {content}
                                        </Day>
                                    );
                                } else {
                                    console.log('daybyday', day)
                                    const startOfWeek = 7 * Math.floor(day / 7)
                                    const endOfWeek = 7 * Math.floor(day / 7) + 6
                                    let selector = ''
                                    // console.log('startofweek', startOfWeek, index, day, t.count)
                                    if (index > startOfWeek && index < endOfWeek) {
                                        selector = 'between'

                                    } else if (index === startOfWeek) {
                                        console.log('index', index)
                                        selector = 'between first'
                                    } else if (index === endOfWeek) {
                                        selector = 'between end'
                                    }
                                    else {
                                        selector = ''
                                    }
                                    return (
                                        <Day
                                            key={index}
                                            isStartOfWeek={index === startOfWeek}
                                            isEndOfWeek={index === endOfWeek}
                                            startOfWeek={startOfWeek}
                                            endOfWeek={endOfWeek}
                                            className={selector}
                                            onClick={() => {
                                                setDate(new Date(year, month, d))
                                                setCalenHidden(true)
                                                if (feature === 'filter') {
                                                    const modifiedDate = {
                                                        ...formik.values.ngaySuDung,
                                                        [name]: new Date(moment(date).format())

                                                    }
                                                    formik.setFieldValue(`ngaySuDung`, modifiedDate)
                                                }


                                            }}
                                        // onMouseEnter={(props) => {
                                        //     setDate(new Date(year, month, d))
                                        // }}

                                        >
                                            {content}
                                        </Day>
                                    );
                                }

                            })
                    }


                </Body>
            </Frame>
        </div>
    )
}
