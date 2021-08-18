import React from "react";

type ChattingDescProps = {
    name: string,
    handleClickChattingDescReturn: () => void;
}

const ChattingDesc = ({ name, handleClickChattingDescReturn }: ChattingDescProps) => {
    return (
        <div>
            <button onClick={handleClickChattingDescReturn}>뒤로 가기 </button>
            <h1>{name}</h1>
        </div>
    )
}

export default ChattingDesc;