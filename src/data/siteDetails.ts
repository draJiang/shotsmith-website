// Vercel 部署时自动用生产域名；本地开发为 localhost。设置 NEXT_PUBLIC_SITE_URL 可以覆盖
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const siteDetails = {
    siteName: 'Shotsmith',
    siteUrl,
    metadata: {
        title: 'Shotsmith — Capture, annotate, and automate screenshots on Mac',
        description: 'A native Mac app for capturing regions, windows and long pages, marking them up in seconds, and sending them through workflows — OCR, translation, LLMs and scripts.',
    },
    language: 'en-us',
    locale: 'en-US',
    // Mac App 的下载地址；为空时下载按钮显示“Coming soon”。
    // /download 在 next.config.mjs 里跳到 GitHub 最新 Release 的 DMG，发新版不用改这里
    downloadUrl: '/download',
    // Lemon Squeezy 正式商品的结账页，付款后跳到 /activate.html 自动激活
    checkoutUrl: 'https://jiang.lemonsqueezy.com/checkout/buy/be2ad7d4-f8b3-4ccb-a616-3bbf7e0a33f1',
    // 顾客查看订单和密钥
    ordersUrl: 'https://app.lemonsqueezy.com/my-orders',
    // 支持邮箱；为空时不显示
    supportEmail: '',
    minimumSystem: 'macOS 14 Sonoma or later',
    googleAnalyticsId: '', // e.g. G-XXXXXXX,
}
