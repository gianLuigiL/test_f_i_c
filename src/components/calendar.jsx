import React, { useState } from 'react';
import Month from './month';
import "./scss/calendar.scss"

export default function Calendar(props)  {
    //Selecting helps understanding whether the user is dragging or clicking
    const [selecting, setSelecting] = useState(false);

    const months = props.months.map((el, index)=> <Month 
        key={props.months[index].name} 
        {...props.months[index]} 
        select_month={props.select_month} 
        add_month={props.add_month} 
        selecting={selecting}/>);
    
    const start_selection = () => {
        //Every mousedown reset selection
        props.reset_months();
        setSelecting(true);
    }

    return (
        <div className="calendar" onMouseDown={start_selection} onMouseUp={() => setSelecting(false)} >
            {months}
        </div>
    )
}