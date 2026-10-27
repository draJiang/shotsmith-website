import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Free',
        price: 0,
        priceNote: 'forever',
        description: 'Everything you need to capture, mark up, and share.',
        featuresHeading: 'Includes',
        features: [
            'Region, window and scrolling capture',
            'Screen recording with step screenshots',
            'Arrows, shapes, text, counters and mosaic',
            'Backgrounds and device frames',
            'Pin screenshots to your screen',
            'History with on-device text search',
            'Build and edit workflows',
        ],
        cta: 'download',
    },
    {
        name: 'Pro',
        price: 9,
        priceNote: 'one-time',
        description: 'Automate what happens after the shot. No subscription.',
        featuresHeading: 'Everything in Free, plus',
        features: [
            'Run workflows from the editor and with ⌘1–⌘9',
            'OCR, translate, LLM, webhook and script actions',
            'The shotsmith CLI for Claude Code and other agents',
            'Use on 2 Macs',
        ],
        cta: 'buy',
        highlight: true,
    },
]
