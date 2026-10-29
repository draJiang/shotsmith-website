import { readFileSync } from 'fs';
import { join } from 'path';

// 构建时生成一次，PostHog 的 key 和地址从环境变量写进页面
export const dynamic = 'force-static';

// 只留下 key / 地址里会出现的字符，避免破坏页面里的字符串
const clean = (value: string) => value.replace(/[^A-Za-z0-9_.:\/-]/g, '');

export function GET() {
    const template = readFileSync(join(process.cwd(), 'src/app/activate.html/template.html'), 'utf8');
    const html = template
        .replace('__POSTHOG_KEY__', clean(process.env.NEXT_PUBLIC_POSTHOG_KEY || ''))
        .replace('__POSTHOG_HOST__', clean(process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'));
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
