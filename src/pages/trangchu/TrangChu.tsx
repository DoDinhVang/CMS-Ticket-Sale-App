import React from 'react'
import { Area } from '@ant-design/plots';
import { useEffect, useState } from 'react';
export default function TrangChu() {

    const [data, setData] = useState([]);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => {
            console.log('fetch data failed', error);
          });
      };
    const config = {
        data,
        // padding: 1,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          // type: 'timeCat',
          tickCount: 5,
        },
        color: '#FFA654',
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#FAA05F 1:#FFFFFF',
            };
          },
      
      };
      useEffect(() => {
        asyncFetch();
    }, []);

    return (
        <div>
            <h2 className='font-semibold' style={{lineHeight: '28px', fontSize: '18px'}}>Doanh thu</h2>
             <Area {...config} />
        </div>
        
    )

}
