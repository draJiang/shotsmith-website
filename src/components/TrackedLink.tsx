'use client';

import Link from 'next/link';

import { track } from '@/lib/analytics';

interface Props {
    href: string;
    event: string;
    className?: string;
    children: React.ReactNode;
}

/** 点击时上报事件的链接，给服务端组件里的链接用 */
const TrackedLink: React.FC<Props> = ({ href, event, className, children }) => (
    <Link href={href} className={className} onClick={() => track(event)}>
        {children}
    </Link>
);

export default TrackedLink;
