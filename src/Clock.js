import React, { useEffect, useState } from 'react';

import styles from './Clock.module.css';

function Clock(props){

    const[time,setTime] = useState(new Date());

    function getHands(){

        let hands = [];

        for(let a = 1; a <= 12; a++){

            hands.push(a);

        }

        return hands;


    }

    function getSeconds(){

        let seconds = [];

        for(let a = 0; a < 60; a++){

            seconds.push(a);

        }

        return seconds;

    }

    useEffect(()=>{

        setInterval(()=>{

            setTime( new Date() );

        },1000);
    },[]);


    function getHourDeg(){

        let hourSeconds = Math.ceil(time.getHours()*(1/12)+1)*3600;
        let minuteSeconds = time.getMinutes()*60;
        let seconds = time.getSeconds();


        let totalSeconds = hourSeconds+minuteSeconds+seconds;
        let degree = ((totalSeconds/43200)*360)+90;
        
        return degree+"deg";


    }

    function getMinuteDeg(){

        return ((time.getMinutes()*6)+90)+"deg";

    }

    function getSecondDeg(){

        return ((time.getSeconds()*6)+90)+"deg";

    }


    return(
        
        <div className={styles.content}>

            <div className={styles.clock}>

                { getHands().map((hour,index)=>{ return(

                    <div key={index} style={{ transform: `rotate(${(hour*30)+90}deg)` }} className={styles.hand}><div style={{ transform: `rotate(${-((hour*30)+90)}deg)` }}>{hour}</div></div>

                )})}

                <div className={styles.middle}></div>

                <div style={{transform: `rotate(${getHourDeg()})`}} className={`${styles.arrow} ${styles.arrow_hours}`}><div></div></div>
                <div style={{transform: `rotate(${getMinuteDeg()})`}} className={`${styles.arrow} ${styles.arrow_minutes}`}><div></div></div>
                <div style={{transform: `rotate(${getSecondDeg()})`}} className={`${styles.arrow} ${styles.arrow_seconds}`}><div></div></div>

                { getSeconds().map((second,index)=>{return(

                    <div style={{transform: `rotate(${(second*6)+90}deg)`}} key={index} className={`${styles.second} ${ index % 5 === 0 ? styles.second_dark : null}`}><div></div></div>

                )})}

            </div>

        </div>

        
    );


}

export default Clock;