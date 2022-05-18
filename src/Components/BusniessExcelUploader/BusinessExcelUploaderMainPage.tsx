import React from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import BusinessExcelUploaderContent from './BusinessExcelUploderContent';

const BusinessExcelUplodaerMainPageMainDivBox = styled.div``;

const BusinessExcelUplodaerMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    return (
        <BusinessExcelUplodaerMainPageMainDivBox>
            <div className="App">
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="ERP 출장 엑셀 업로드" subtitles="엑셀 업로드"></HambergerMenu>
                    <BusinessExcelUploaderContent></BusinessExcelUploaderContent>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
                )
            </div>
        </BusinessExcelUplodaerMainPageMainDivBox>
    );
};

export default BusinessExcelUplodaerMainPage;
