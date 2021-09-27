import React, { useEffect } from 'react';
import './Toast.css';

export type ToastProps = {
    id: string;
    destroy: () => void;
    title: string;
    content: string;
    duration?: number;
};

const Toast = ({ id, destroy, title, content, duration = 0 }: ToastProps) => {
    useEffect(() => {
        if (!duration) return;
        const timer = setTimeout(() => {
            destroy();
        }, duration);
        return () => clearTimeout(timer);
    }, [destroy, duration]);

    return (
        <div>
            <div className="toast-header">
                <div>{title}</div>
                <button onClick={destroy}>X</button>
            </div>
            <div className="toast-body">{content}</div>
        </div>
    );
};

const shouldRerender = (prevProps: ToastProps, nextProps: ToastProps) => {
    return prevProps.id === nextProps.id;
};
export default React.memo(Toast, shouldRerender);
