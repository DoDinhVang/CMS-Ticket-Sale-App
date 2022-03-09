import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import Calendar2 from './Calendar2'
import '../sass/Componens/datepicker2.scss'
import moment from 'moment'
interface propsDatePicker {
    visibleProps?: boolean,
    name?: string,
    onChange?: any,
    defaultValue?: Date

}

export default function DatePicker(props: propsDatePicker) {
    const { visibleProps, name, onChange, defaultValue } = props;
    const [visible, setVisible] = useState(visibleProps || false)
    const [value, setValue] = useState<any>();

    const ref = useRef<any>(null)
    useEffect(() => {
        if (value !== undefined) {
            onChange(value, name)
        }
    }, [value])

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {

            if (visible && ref.current && !ref.current.contains(e.target)) {
                setVisible(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }

    }, [visible])

    return (
        <div ref={ref} className='datepicker' >
            <div className='date-picker-control'>
                {defaultValue !== undefined ?
                    <> <Input value={moment(defaultValue).format('DD/MM/YYYY')}
                        onChange={(e) => {

                        }}
                        onFocus={() => { setVisible(true) }} className='input-base'
                    />
                        <CalendarOutlined className='icon-calendar cursor-pointer' onClick={() => {
                            setVisible((oldSate: boolean) => !oldSate)
                        }} /></> : <>
                        <Input value={value === undefined ? '' : moment(value).format('DD/MM/YYYY')}
                            onChange={(e) => {

                            }}
                            onFocus={() => { setVisible(true) }} className='input-base'
                        />
                        <CalendarOutlined className='icon-calendar cursor-pointer' onClick={() => {
                            setVisible((oldSate: boolean) => !oldSate)
                        }} />
                    </>

                }

            </div>
            <Calendar2 setValueProps={setValue} visibleProps={visible} />
        </div>
    )
}
