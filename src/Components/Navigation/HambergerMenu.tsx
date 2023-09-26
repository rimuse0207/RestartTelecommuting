import React, { useState, useEffect, useRef } from 'react';
import './Navigation.css';
import Navigation from './Navigation';

import { DecryptKey } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models/index';

import styled from 'styled-components';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

import Modal from 'react-modal';

const HomeMenuClicksDivBox = styled.div`
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 50%;
    position: fixed;
    top: 10px;
    right: 20px;
    z-index: 100;
    font-size: 2.3em;
    background-color: white;
    a {
        color: black;
    }
    :hover {
        cursor: pointer;
    }
    @media screen and (max-width: 1400px) {
        width: 40px;
        height: 40px;
        font-size: 2em;
    }
`;

const NotificationMainBoxdiv = styled.div`
    position: relative;
    .TextMovingBoxdiv {
        width: 37%;
        text-align: start;
        margin-left: 85px;
        position: absolute;
        margin-top: 20px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    ul,
    li {
        list-style: none;
    }

    .notify-wrap {
        position: relative;
    }
    .notify-wrap-inner {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin: 0 30px;
        text-align: center;
    }
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .notify-scroll {
        display: inline-block;

        animation: text-scroll 35s linear infinite;
    }
    @keyframes text-scroll {
        from {
            transform: translateX(20%);
            -moz-transform: translateX(20%);
            -webkit-transform: translateX(20%);
            -o-transform: translateX(20%);
            -ms-transform: translateX(20%);
        }
        to {
            transform: translateX(-100%);
            -moz-transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
            -o-transform: translateX(-100%);
            -ms-transform: translateX(-100%);
        }
    }
    .notify-scroll ul {
        display: inline;
    }
    .notify-scroll ul li {
        display: inline-block;
        padding-right: 500px;
        width: 30%;
        margin-left: 500px;
    }
`;

const CloseModalButtonMainDivBox = styled.div`
    position: fixed;
    right: 10px;
    top: 10px;
    button {
        outline: none;
        border: none;
        padding: 15px;
        font-size: 1.3em;
        font-weight: bolder;
        color: red;
        :hover {
            cursor: pointer;
        }
    }
`;

type HambergerMenu = {
    titles: string;
    subtitles: string;
};
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
    },
};
Modal.setAppElement('#COVIDUpdate');
const HambergerMenu = ({ titles, subtitles }: HambergerMenu) => {
    const myMenuRef = useRef<any>('null');
    const [hambergerOpen, setHambergerOpen] = useState(false);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [menuStatus, setMenuStatus] = useState('');
    const _menuToggle = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        hambergerOpen ? setMenuStatus('') : setMenuStatus('isopen');
        setHambergerOpen(!hambergerOpen);
    };
    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (myMenuRef.current && !myMenuRef.current.contains(e.target as Node)) {
                e.stopPropagation();
                setMenuStatus('');
                setHambergerOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [myMenuRef]);

    return (
        <div ref={myMenuRef}>
            <div className="menubar">
                <div className="MainTitles">
                    <h1>{titles}</h1>
                </div>
                <div className="hambclicker" onClick={(e: React.MouseEvent<HTMLElement>) => _menuToggle(e)}></div>
                <div id="hambmenu" className={menuStatus}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div>
                    <div className="Navigation_Info_div">
                        <div>
                            <div> {InfomationState.team.toUpperCase()}</div>
                            <div> {DecryptKey(InfomationState.name)}</div>
                            <div> {InfomationState.position}</div>
                        </div>
                    </div>
                </div>
            </div>
            {window.location.pathname !== '/' ? (
                <HomeMenuClicksDivBox>
                    <Link to="/">
                        <div>
                            <IoHome></IoHome>
                        </div>
                    </Link>
                </HomeMenuClicksDivBox>
            ) : (
                <div></div>
            )}

            <div>
                <Navigation menuStatus={menuStatus} setHambergerOpen={(e: React.MouseEvent<HTMLElement>) => _menuToggle(e)} />
            </div>
        </div>
    );
};

export default HambergerMenu;
