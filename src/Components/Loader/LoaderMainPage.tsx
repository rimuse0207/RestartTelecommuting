import React from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';

const LoaderMainPageMainDivBox = styled.div`
    ${(props: { loading: boolean }) => (props.loading ? 'position: fixed' : 'display:none')};
    width: 100vw;
    height: 100vh;
    background: ${props => (props.loading ? 'rgba(255, 255, 255, 0.5)' : 'none')};
    top: 0;
    left: 0;

    .sweet-loading {
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
`;

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #0a0ef3;
`;

type LoaderMainPageProps = {
    loading: boolean;
};
const LoaderMainPage = ({ loading }: LoaderMainPageProps) => {
    return (
        <LoaderMainPageMainDivBox loading={loading}>
            <div className="sweet-loading">
                <PulseLoader color={'#0a0ef3'} loading={loading} size={30} />
            </div>
        </LoaderMainPageMainDivBox>
    );
};

export default LoaderMainPage;
