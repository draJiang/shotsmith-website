import posthog from 'posthog-js';

// 事件名遵循 PostHog 推荐的 category:object_action：小写 snake_case，动词用现在时，名字固定，变化的部分放属性
export const events = {
    downloadButtonClick: 'landing_page:download_button_click',
    buyButtonClick: 'landing_page:buy_button_click',
    navGetButtonClick: 'landing_page:nav_get_button_click',
    ordersLinkClick: 'landing_page:orders_link_click',
    // 付款后跳转的 public/activate.html 里单独上报同名事件
    activatePageView: 'purchase_flow:activate_page_view',
} as const;

export type ButtonLocation = 'hero' | 'pricing' | 'cta';

/** 上报事件；PostHog 没有加载（没配 key、本地开发）时什么都不做 */
export function track(event: string, properties?: Record<string, string>) {
    if (!posthog.__loaded) return;
    // 点击后会立刻跳走，用 sendBeacon 保证事件发得出去
    posthog.capture(event, properties, { transport: 'sendBeacon' });
}
