import { useEffect, useRef } from 'react';

export const useElasticScroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        let isAtBoundary = false;
        let boundaryTimeout = null;

        const handleWheel = (e) => {
            const scrollTop = element.scrollTop;
            const scrollHeight = element.scrollHeight;
            const clientHeight = element.clientHeight;
            const isAtTop = scrollTop <= 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

            // Only apply elastic effect when at boundaries and trying to scroll further
            if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                if (!isAtBoundary) {
                    e.preventDefault();
                    isAtBoundary = true;

                    const direction = isAtTop ? 1 : -1;
                    const resistance = Math.min(Math.abs(e.deltaY) * 0.2, 30);

                    element.style.transform = `translateY(${direction * resistance}px)`;
                    element.style.transition = 'none';

                    // Clear any existing timeout
                    if (boundaryTimeout) {
                        clearTimeout(boundaryTimeout);
                    }

                    // Bounce back after a short delay
                    boundaryTimeout = setTimeout(() => {
                        element.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        element.style.transform = 'translateY(0)';

                        setTimeout(() => {
                            isAtBoundary = false;
                        }, 400);
                    }, 100);
                }
            }
        };

        // Add wheel event listener
        element.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            element.removeEventListener('wheel', handleWheel);
            if (boundaryTimeout) {
                clearTimeout(boundaryTimeout);
            }
        };
    }, []);

    return scrollRef;
};
