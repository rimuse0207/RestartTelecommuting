import React from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import BusinessExcelUploaderContent from './BusinessExcelUploderContent';
import BusinessPrinterControllMainPage from './BusinessPrinterControllMainPage';
const BusinessExcelUplodaerMainPageMainDivBox = styled.div`
    .BusinessExcelUplodaer_ErpUploader {
        padding-left: 10px;
        width: 100%;
        margin-top: 10px;
        ul {
            display: flex;
            justify-content: space-around;
            li {
                border-bottom: 1px solid black;
                width: 40%;
                text-align: center;
                font-size: 1.5em;
                :hover {
                    cursor: pointer;
                }
            }
            .ClickedData {
                color: lightgray;
                border: none;
            }
        }
    }
`;

// const BusinessExcelUplodaerMainPage = () => {
//     const socket = useSelector((state: RootState) => state.Socket.socket);
//     const [SelectSubMenu, setSelectSubMenu] = React.useState({
//         ErpUploadOn: true,
//         PrinterControllOn: false,
//     });
//     return (
//         <BusinessExcelUplodaerMainPageMainDivBox>
//             <div className="App">
//                 <div style={{ height: '100%' }}>
//                     <HambergerMenu titles="ERP 파일 업로드" subtitles="엑셀 업로드"></HambergerMenu>
//                     <div className="BusinessExcelUplodaer_ErpUploader">
//                         <ul>
//                             <li
//                                 className={SelectSubMenu.ErpUploadOn ? '' : 'ClickedData'}
//                                 onClick={() => setSelectSubMenu({ ...SelectSubMenu, ErpUploadOn: true, PrinterControllOn: false })}
//                             >
//                                 ERP 파일 업로드
//                             </li>
//                             <li
//                                 className={SelectSubMenu.PrinterControllOn ? '' : 'ClickedData'}
//                                 onClick={() => setSelectSubMenu({ ...SelectSubMenu, ErpUploadOn: false, PrinterControllOn: true })}
//                             >
//                                 현장 수당 정산 출력 ON/OFF
//                             </li>
//                         </ul>
//                     </div>
//                     {SelectSubMenu.ErpUploadOn ? <BusinessExcelUploaderContent></BusinessExcelUploaderContent> : <></>}
//                     {SelectSubMenu.PrinterControllOn ? <BusinessPrinterControllMainPage></BusinessPrinterControllMainPage> : <></>}

//                     <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
//                 </div>
//                 )
//             </div>
//         </BusinessExcelUplodaerMainPageMainDivBox>
//     );
// };

const BusinessExcelUplodaerMainPage = () => {
    const [SelectSubMenu, setSelectSubMenu] = React.useState({
        PrinterControllOn: true,
    });
    return (
        <BusinessExcelUplodaerMainPageMainDivBox>
            <div className="App">
                <HambergerMenu titles="현장 수당 정산 출력 ON/OFF" subtitles="현장 수당 정산 출력 ON/OFF"></HambergerMenu>
                <div className="BusinessExcelUplodaer_ErpUploader">
                    <ul>
                        {/* <li
                            className={SelectSubMenu.ErpUploadOn ? '' : 'ClickedData'}
                            onClick={() => setSelectSubMenu({ ...SelectSubMenu, ErpUploadOn: true, PrinterControllOn: false })}
                        >
                            ERP 파일 업로드
                        </li> */}
                        <li
                            className={SelectSubMenu.PrinterControllOn ? '' : 'ClickedData'}
                            onClick={() => setSelectSubMenu({ ...SelectSubMenu, PrinterControllOn: true })}
                        >
                            현장 수당 정산 출력 ON/OFF
                        </li>
                    </ul>
                </div>

                {SelectSubMenu.PrinterControllOn ? <BusinessPrinterControllMainPage></BusinessPrinterControllMainPage> : <></>}
            </div>
        </BusinessExcelUplodaerMainPageMainDivBox>
    );
};

export default BusinessExcelUplodaerMainPage;
