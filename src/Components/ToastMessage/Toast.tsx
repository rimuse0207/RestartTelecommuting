import React, { useEffect } from 'react';
import './Toast.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export type ToastProps = {
    id: string;
    destroy: () => void;
    title: string;
    content: string;
    duration?: number;
    DataSuccess: boolean;
};

const Toast = ({ id, destroy, title, content, duration = 0, DataSuccess }: ToastProps) => {
    useEffect(() => {
        if (!duration) return;
        const timer = setTimeout(() => {
            destroy();
        }, duration);
        return () => clearTimeout(timer);
    }, [destroy, duration]);

    return (
        <div id={DataSuccess ? 'Toast_div_success' : 'Toast_div_fail'}>
            <div className="toast-header">
                <div>{title}</div>
                <button style={{ width: '20px', height: '20px' }} onClick={destroy}>
                    <div style={{ fontWeight: 'bolder' }}>X</div>
                </button>
            </div>
            <div className="toast-body">{content}</div>
            <div className="Toast_loading_color"></div>
        </div>
    );
};

const shouldRerender = (prevProps: ToastProps, nextProps: ToastProps) => {
    return prevProps.id === nextProps.id;
};
export default React.memo(Toast, shouldRerender);
