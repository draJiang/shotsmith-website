'use client';

import clsx from 'clsx';
import { FaApple } from 'react-icons/fa';

import { siteDetails } from '@/data/siteDetails';
import { ButtonLocation, events, track } from '@/lib/analytics';

interface Props {
    /** 深色背景上用浅色按钮 */
    dark?: boolean;
    className?: string;
    /** 按钮所在位置，随点击事件一起上报 */
    location: ButtonLocation;
}

/** 下载 Mac App；还没有下载地址时显示 Coming soon */
export const DownloadButton: React.FC<Props> = ({ dark, className, location }) => {
    const style = clsx(
        'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-semibold transition-colors',
        dark ? 'bg-white text-foreground hover:bg-gray-100' : 'bg-foreground text-white hover:bg-black',
        className,
    );
    if (!siteDetails.downloadUrl) {
        return (
            <span className={clsx(style, 'opacity-60 cursor-default')} aria-disabled="true">
                <FaApple className="w-5 h-5" /> Coming soon for Mac
            </span>
        );
    }
    return (
        <a
            href={siteDetails.downloadUrl}
            className={style}
            onClick={() => track(events.downloadButtonClick, { button_location: location })}
        >
            <FaApple className="w-5 h-5" /> Download for Mac
        </a>
    );
};

/** 打开 Lemon Squeezy 结账页 */
export const BuyButton: React.FC<Props & { label?: string }> = ({ dark, className, location, label = 'Buy Pro — $9' }) => (
    <a
        href={siteDetails.checkoutUrl}
        onClick={() => track(events.buyButtonClick, { button_location: location })}
        className={clsx(
            'inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold transition-colors',
            dark ? 'border border-white/30 text-white hover:bg-white/10' : 'bg-primary text-white hover:bg-primary-accent',
            className,
        )}
    >
        {label}
    </a>
);
