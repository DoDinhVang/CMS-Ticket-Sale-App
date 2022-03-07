import styled, { css } from 'styled-components'

export const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  align-items: center;

`;
interface Calendar {
    calendarHidden: boolean
}
export const Frame = styled.div<Calendar>`
     position: absolute;
     right: 0;
     width: 280px;
     height: 320px;
     padding: 8px 12px;
     border-radius: 20px;
     box-shadow: 4px 4px 45px rgba(109, 46, 0, 0.35);
     z-index: 200000;
     background: white;
     display: ${(props) => {
        console.log('gggggg', props.calendarHidden)
        return props.calendarHidden ? 'none' : 'block'
    }}
`
export const PrevAndNexButton = styled.button`
    cursor: pointer;
`
export const Body = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

interface DayProps {
    isToday?: boolean,
    isSelected?: boolean,
    isStartOfWeek?: boolean,
    isEndOfWeek?: boolean,
    startOfWeek?: number,
    endOfWeek?: number
}
export const Day = styled.div<DayProps>`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 20px;
    background: ${(props) => {
        return props.isSelected ? '#FFBA7B' : 'white'
    }};
    color: ${(props) => {
        return props.isSelected ? '#FFFFFF':'#1E0D03'
    }};
    &:hover{
        background: #FFBA7B;
        color: white;
    }
    &.between{
        background:  #FFD2A8;
        border-radius: 0; 
        button{
            color: #FFFFFF !important;
            opacity: 1 !important;
        } 
    }
    &.first, &.end{
        position: relative;
        button{
            position: absolute;
            background:  #FFBA7B;
            height: 110%;
            width: 110%;
            border-radius: 50%;
        }
    }
    &.first{
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }
    &.end{
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
    }
   

    

`