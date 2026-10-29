'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

// 项目 API Key 和地址来自环境变量（Vercel 里配置）；没配置时不加载，本地开发也不会上报
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export default function PostHogProvider() {
    useEffect(() => {
        if (!key || posthog.__loaded) return;
        posthog.init(key, {
            api_host: host,
            // 只给有账号的访客建档，匿名访客不建 person profile，省事件费用
            person_profiles: 'identified_only',
            // 'history_change' 让 Next 路由切换也记录 $pageview
            defaults: '2025-05-24',
        });
    }, []);

    return null;
}
