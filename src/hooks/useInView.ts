import { RefObject, useEffect, useState } from "react";

// 元素有 threshold 比例进入视口时为 true，离开后为 false
export function useInView(ref: RefObject<Element>, threshold = 0.4): boolean {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, threshold]);
    return inView;
}
