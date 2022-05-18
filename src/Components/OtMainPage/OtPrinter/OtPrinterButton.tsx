import React from 'react';

const OtPrinterButton = () => {
    const handleCLicks = () => {
        window.open('http://localhost:3000/PrinterTest', 'AfterOT', 'width=980, height=700');
    };

    return (
        <div>
            asdsadlkasdjkhsdk
            <button onClick={handleCLicks}>여기를 클릭 시 출력</button>
        </div>
    );
};

export default OtPrinterButton;
