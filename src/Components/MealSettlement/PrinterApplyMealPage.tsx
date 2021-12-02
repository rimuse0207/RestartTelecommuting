import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
import moment from 'moment';
const customStyles = {
    content: {
        width: '100%',
        height: '100%',
        border: 'none',
        top: '0px',
        left: '0px',
        background: 'white',
    },
};

Modal.setAppElement('#ModalPrinter');

type PrinterAfterSelectClickModalProps = {
    printerClicked: boolean;
    applyedData: [] | null | any;
    setPrinterClicked: (data: boolean) => void;
    selectDate: string;
    OTDatas: [] | null | any;
};

const PrinterApplyMealPage = ({
    printerClicked,
    setPrinterClicked,
    applyedData,
    selectDate,
    OTDatas,
}: PrinterAfterSelectClickModalProps) => {
    function closeModal() {
        setPrinterClicked(false);
    }
    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 500);
        window.onafterprint = function () {
            setPrinterClicked(false);
        };
    }, []);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    return (
        <div>
            <div>
                <Modal isOpen={printerClicked} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                    <div>
                        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{moment(selectDate).format('YYYY년 MM월')} 식대 정산</h1>
                        <div>
                            <table style={{ fontSize: 'medium', width: '100%', height: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ fontSize: 'medium' }}>
                                    <tr style={{ height: '50px' }}>
                                        <th>부서</th>
                                        <th>{InfomationState.team}</th>
                                        <th colSpan={2}></th>
                                        <th>성명</th>
                                        <th colSpan={3}>{DecryptKey(InfomationState.name)}</th>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <th>일자</th>
                                        <th>구분</th>
                                        <th>지출 금액</th>
                                        <th>정산 금액</th>
                                        <th>방문처</th>
                                        <th>지역</th>
                                        <th>비고</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applyedData.map(
                                        (
                                            list: {
                                                indexs: string;
                                                dates: string;
                                                division: string;
                                                spending: number;
                                                calculate: number;
                                                place: string;
                                                location: string;
                                            },
                                            i: number
                                        ) => {
                                            return (
                                                <tr key={list.indexs} style={{ border: '0.5px solid black' }}>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.dates}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.division}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                        {list.spending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                                                    </td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                        {list.calculate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                                                    </td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.place}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>{list.location}</td>
                                                    <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                                        {/* {OTDatas.map((item: { dates: string; OTTimes: number }) => {
                                                            return list.division === '석식' ? (
                                                                item.dates === list.dates ? (
                                                                    // <div>{item.OTTimes}시간</div>
                                                                    <div></div>
                                                                ) : (
                                                                    <div></div>
                                                                )
                                                            ) : (
                                                                <div></div>
                                                            );
                                                        })} */}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}

                                    <tr
                                        className="tailtr"
                                        style={{ fontSize: 'large', border: '0.5px solid black', padding: '10px', fontWeight: 'bolder' }}
                                    >
                                        <td colSpan={3} style={{ border: '0.5px solid black', padding: '10px' }}>
                                            합계
                                        </td>
                                        <td style={{ border: '0.5px solid black', padding: '10px' }}>
                                            {applyedData
                                                .map((list: { calculate: number }) => list.calculate)
                                                .reduce((prev: number, curr: number) => prev + curr, 0)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            원
                                        </td>
                                        <td colSpan={4} style={{ border: '0.5px solid black', padding: '10px' }}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px', marginLeft: '30px' }}>* 영수증 첨부 (카드영수증, 현금영수증, PAYCO이용내역)</div>
                </Modal>
            </div>
        </div>
    );
};
export default PrinterApplyMealPage;
