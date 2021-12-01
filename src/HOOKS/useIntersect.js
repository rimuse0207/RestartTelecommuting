import { useState, useEffect, useCallback } from 'react';

const baseOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px',
};
const useIntersect = (onIntersect, option) => {
    const [ref, setRef] = useState(null);
    const checkIntersect = useCallback(([entry], observer) => {
        console.log('순서1');
        if (entry.isIntersecting) {
            onIntersect(entry, observer);
            console.log('순서2');
        }
        console.log('순서3');
    }, []);
    useEffect(() => {
        let observer;
        console.log('순서4');

        if (ref) {
            console.log('순서5');
            observer = new IntersectionObserver(checkIntersect, {
                ...baseOption,
                ...option,
            });
            observer.observe(ref);
            console.log('순서6');
        }
        console.log('순서7');
        return () => observer && observer.disconnect();
    }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
    return [ref, setRef];
};

export default useIntersect;
