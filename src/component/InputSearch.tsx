import React from 'react';
import { SearchOutlined } from '@ant-design/icons'
export default function InputSearch(props:any) {


    const {placeholder} = props
    return <div className='input-group flex'>
        <input  className='input-control italic' placeholder= {placeholder}></input>
        <SearchOutlined className='icon-control' />
    </div>
}
