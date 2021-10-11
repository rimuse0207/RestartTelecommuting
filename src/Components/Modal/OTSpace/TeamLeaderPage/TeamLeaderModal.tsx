import React, { useEffect } from 'react';

import Modal from 'react-modal';

type TeamLeaderModalProps = {
    onClicked:boolean;
    modalClose:()=>void;
    clickedOTData:{
        date_mon:string;
        date_tue:string;
        date_wed:string;
        date_thu:string;
        date_fri:string;
        date_sat:string;
        date_sun:string;
        start_time_mon:string;
        start_time_tue:string;
        start_time_wed:string;
        start_time_thu:string;
        start_time_fri:string;
        start_time_sat:string;
        start_time_sun:string;
        end_time_mon:string;
        end_time_tue:string;
        end_time_wed:string;
        end_time_thu:string;
        end_time_fri:string;
        end_time_sat:string;
        end_time_sun:string;
        mon_rest:string;
        tue_rest:string;
        wed_rest:string;
        thu_rest:string;
        fri_rest:string;
        sat_rest:string;
        sun_rest:string;
        mon_time:number;
        tue_time:number;
        wed_time:number;
        thu_time:number;
        fri_time:number;
        sat_time:number;
        sun_time:number;
        mon_reason:string;
        tue_reason:string;
        wed_reason:string;
        thu_reason:string;
        fri_reason:string;
        sat_reason:string;
        sun_reason:string;
        mon_reason1:string;
        tue_reason1:string;
        wed_reason1:string;
        thu_reason1:string;
        fri_reason1:string;
        sat_reason1:string;
        sun_reason1:string;
        mon_reason2:string;
        tue_reason2:string;
        wed_reason2:string;
        thu_reason2:string;
        fri_reason2:string;
        sat_reason2:string;
        sun_reason2:string;

    }

};
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '90%',
    },
};
Modal.setAppElement('#ModalSet');

const TeamLeaderModal = ({ onClicked,modalClose,clickedOTData }: TeamLeaderModalProps) => {
   console.log(clickedOTData);
    return (
        <div>
            <Modal isOpen={onClicked} style={customStyles} onRequestClose={modalClose}>
            <table>
                <thead style={{ backgroundColor: '#2da8e5' }}>
                    <tr
                        className="testssBefore"
                        style={{
                            borderTop: '1.5px solid black',
                            borderLeft: '1.3px solid black',
                            borderRight: '1.3px solid black',
                            backgroundColor: '#2da8e5',
                        }}
                    >
                        <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#2da8e5' }}>
                            일자
                        </th>
                        <th
                            colSpan={3}
                            style={{ borderRight: '1.2px solid black', borderBottom: '1.2px solid black', backgroundColor: '#2da8e5' }}
                        >
                            소정근로
                        </th>
                        <th
                            colSpan={4}
                            style={{ borderRight: '1.2px solid black', borderBottom: '1.2px solid black', backgroundColor: '#2da8e5' }}
                        >
                            {' '}
                            연장 근무
                        </th>
                        <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#2da8e5' }}>
                            총 근무 <br />
                            합계 시간
                            <br />
                        </th>
                        <th rowSpan={2} style={{ backgroundColor: '#2da8e5' }}>
                            연장 사유
                        </th>
                    </tr>
                    <tr
                        className="testssBefore"
                        style={{ borderBottom: '1.2px solid black', borderLeft: '1.3px solid black', borderRight: '1.3px solid black' }}
                    >
                        <td style={{ borderRight: '1.2px solid black' }}>시작시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>종료시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>
                            총 합계 <br /> 시간
                        </td>
                        <td style={{ borderRight: '1.2px solid black' }}>시작시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>종료시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>휴게시간</td>
                        <td style={{ borderRight: '1.2px solid black' }}>
                            총 합계 <br />
                            시간
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={3} id="stat_date" width="100px">
                            {clickedOTData.date_mon}
                            <br />
                            월요일
                        </td>

                        
                        <td rowSpan={3} width="100px">
                           소정근로 시작시간
                        </td>
                        <td rowSpan={3} width="100px">
                        소정근로 종료시간
                        </td>
                        <td rowSpan={3} width="100px">
                            <span className="sum_time" id="sum_time_mon">
                               소정근로 합계
                            </span>
                            시간
                        </td>

                        <td rowSpan={3} width="100px">
                           {clickedOTData.start_time_mon}
                        </td>
                        <td rowSpan={3} width="100px">
                        {clickedOTData.end_time_mon}
                        </td>
                        <td rowSpan={3} width="100px">
                            {clickedOTData.mon_rest}
                        </td>
                        <td rowSpan={3} width="100px">
                            <span className="sum_over_time" id="sum_over_time_monOver">
                               {clickedOTData.mon_time}
                            </span>
                            시간
                        </td>
                        <td rowSpan={3} width="100px">
                            <span id="sum_times_mon">
                            {clickedOTData.mon_time}
                                 </span> 시간
                        </td>

                        <td className="reasontable">
                           {clickedOTData.mon_reason}
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            {clickedOTData.mon_reason1}
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                           {clickedOTData.mon_reason2}
                        
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3} style={{ minWidth: '100px' }}>
                        {clickedOTData.date_tue}
                            <br />
                            화요일
                        </td>

                     
                        <td rowSpan={3}>
                            
                        </td>
                        <td rowSpan={3}>
                           
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_tue">
                                
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.start_time_tue}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.end_time_tue}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.tue_rest}
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_tueOver">
                            {clickedOTData.tue_time}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_tue">{clickedOTData.tue_time}</span> 시간
                        </td>
                        <td className="reasontable">
                           
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                        {clickedOTData.date_wed}
                            <br />
                            수요일
                        </td>
                        
                        <td rowSpan={3}>
                           
                        </td>
                        <td rowSpan={3}>
                            {' '}
                           
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_wed">
                                
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.start_time_wed}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.end_time_wed}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.wed_rest}
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_wedOver">
                            {clickedOTData.wed_time}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_wed">{clickedOTData.wed_time}</span> 시간
                        </td>
                        <td className="reasontable">
                          
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                           
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                        {clickedOTData.date_thu}
                            <br />
                            목요일
                        </td>
                        
                        <td rowSpan={3}>
                            
                        </td>
                        <td rowSpan={3}>
                            
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_thu">

                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.start_time_thu}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.end_time_thu}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.thu_rest}
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_thuOver">
                            {clickedOTData.thu_time}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_thu">{clickedOTData.thu_time}</span> 시간
                        </td>
                        <td className="reasontable">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                        {clickedOTData.date_fri}
                            <br />
                            금요일
                        </td>

                       
                        <td rowSpan={3}>
                            {' '}
                            
                        </td>
                        <td rowSpan={3}>
                            {' '}
                            
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_time" id="sum_time_fri">
                               
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.start_time_fri}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.end_time_fri}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.fri_rest}
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_friOver">
                            {clickedOTData.fri_time}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_fri">{clickedOTData.fri_time}</span> 시간
                        </td>
                        <td className="reasontable">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                           
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3}>
                        {clickedOTData.date_sat}
                            <br />
                            토요일
                        </td>

                        
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                        {clickedOTData.start_time_sat}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.end_time_sat}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.sat_rest}
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_satOver">
                            {clickedOTData.sat_time}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sat">{clickedOTData.sat_time}</span> 시간
                        </td>
                        <td className="reasontable">
                           
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                           
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                           
                        </td>
                    </tr>

                    <tr>
                        <td rowSpan={3} id="stats_date">
                        {clickedOTData.date_sun}

                            <br />
                            일요일
                        </td>

                        
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}></td>
                        <td rowSpan={3}>
                        {clickedOTData.start_time_sun}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.end_time_sun}
                        </td>
                        <td rowSpan={3}>
                        {clickedOTData.sun_rest}
                        </td>
                        <td rowSpan={3}>
                            <span className="sum_over_time" id="sum_over_time_sunOver">
                            {clickedOTData.sun_time}
                            </span>{' '}
                            시간
                        </td>
                        <td rowSpan={3}>
                            <span id="sum_times_sun">{clickedOTData.sun_time}</span> 시간
                        </td>
                        <td className="reasontable">

                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                            
                        </td>
                    </tr>
                    <tr>
                        <td className="reasontable">
                           
                        </td>
                    </tr>

                    <tr style={{ height: '50px', border: '1.1px solid black' }}>
                        <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                            소정근로 총합계
                        </td>
                        <td colSpan={1}>
                            <span id="total_sum_time">
                               
                            </span>
                            시간
                        </td>
                        <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                            연장근무 총합계
                        </td>
                        <td colSpan={2}>
                            <span id="total_sum_over_time">
                               
                            시간
                            </span>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </Modal>
        </div>
    );
};

export default TeamLeaderModal;
