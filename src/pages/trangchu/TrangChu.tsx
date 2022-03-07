import React from 'react'
import { Area, Pie, G2 } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import Calendar from '../../component/Calendar'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getRevenueActionCreator } from '../../redux/action-creator/dashboardActionCreator';
import { State } from '../../redux/configStore'
import { Empty } from 'antd';
const getDaysInMonth = (month: number, year: number) => {
  var date = new Date(year, month, 1);
  console.log('date', new Date(date))
  var days = [];
  while (date.getMonth() === month) {
    days.push(moment(new Date(date)).format('DD/MM/YYYY'));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
export default function TrangChu() {
  const dispatch = useDispatch();
  let { revenueData, totalRevenue, month, year } = useSelector((state: State) => state.dashboardReducer)


  console.log('rve', revenueData)

  const config = {
    data: revenueData,
    xField: "date",
    yField: "doanhThu",
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
  const data = [
    {
      type: "Dã sử dụng",
      value: 27,
    },
    {
      type: 'Chưa sử dụng',
      value: 25,
    },
  ];
  const { registerTheme } = G2;
  registerTheme('custom-theme', {
    colors10: [
      '#FF8A48',
      '#4F75FF',
    ],
  });

  const configPie1 = {
    appendPadding: 10,
    data,
    title: {
      display: false
    },

    tooltip: {
      // formatter: (datum: Datum) => {
      //   return { name: datum.x, value: datum.y + '%' };
      // },
      showMarkers: false,

    },
    height: 380,
    width: 380,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    theme: 'custom-theme',
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent, value }: any) => {

        return value
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
  };
  const configPie2 = {
    appendPadding: 10,
    data,
    showTitle: true,
    showMarker: false,
    tooltip: {
      customContent: (title: any, data: any) => {
        console.log('title', title)
        return `<div>${title}</div>`;
      }
    },
    height: 380,
    width: 380,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    theme: 'custom-theme',
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent, value }: any) => {

        return value
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
  };
  useEffect(() => {
    dispatch(getRevenueActionCreator(month, year))
  }, [])
  return (
    <div id='tranChu'>
      <h1 className='text-3xl font-bold' style={{ color: " #1E0D03" }}>Thống kê</h1>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold' style={{ lineHeight: '28px', fontSize: '18px' }}>Doanh thu</h2>
        <Calendar feature='logistics'></Calendar>
      </div>
      {revenueData.length === 0 ? <Empty></Empty> : ''}
      <Area {...config} />
      <div className='mt-3'>
        <h2 className='text-sm font-medium' style={{ color: " #1E0D03", opacity: '0.5' }}>Tổng doanh thu theo tháng</h2>
        <p className='text-2xl font-bold' style={{ color: "#1E0D03" }}>{totalRevenue.toLocaleString()}</p>
      </div>
      <div className='flex'>
        <Calendar></Calendar>
        <div className='flex'>
          <div>
            <h2 className='text-center'>Gói gia đình</h2>
            <Pie {...configPie1} style ={{position: 'relative', top: '-48px',left: '57px'}} />
          </div>
          <div>
            <h2 className='text-center'>Gói sự kiện</h2>
            <Pie {...configPie2} style ={{position: 'relative', top: '-48px',left: '57px'}}/></div>
        </div>
      </div>
    </div>

  )

}
