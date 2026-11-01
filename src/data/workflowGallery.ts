export type Port = { label: string; kind: 'image' | 'text' };
export type GalleryAction = {
    title: string;
    category: 'trigger' | 'recognize' | 'web' | 'output';
    icon: 'camera' | 'scan' | 'languages' | 'eye' | 'scissors' | 'sparkles' | 'clipboard' | 'editor' | 'hud';
    input?: Port;
    output?: Port;
    detail: string;
};

export type GalleryWorkflow = {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    category: string;
    color: string;
    poster?: string;
    actions: GalleryAction[];
    note?: string;
};

const screenshot: GalleryAction = { title: 'Screenshot', category: 'trigger', icon: 'camera', output: { label: 'Image', kind: 'image' }, detail: 'Start with a captured screenshot.' };

export const galleryWorkflows: GalleryWorkflow[] = [
    {
        slug: 'copy-text', name: 'Copy Text', tagline: 'Words out of pixels.', category: 'Productivity', color: '#31a974',
        description: 'Recognize text on your screen and copy it as clean, editable paragraphs. A small confirmation appears when it is ready.',
        actions: [screenshot,
            { title: 'Recognize Text', category: 'recognize', icon: 'scan', input: { label: 'Image', kind: 'image' }, output: { label: 'Text', kind: 'text' }, detail: 'On-device OCR joins wrapped lines into paragraphs.' },
            { title: 'Copy to Clipboard', category: 'output', icon: 'clipboard', input: { label: 'Text', kind: 'text' }, detail: 'Puts the recognized text on your clipboard.' },
            { title: 'Show HUD', category: 'output', icon: 'hud', input: { label: 'Text', kind: 'text' }, detail: 'Shows a brief “Text copied” confirmation.' },
        ],
    },
    {
        slug: 'translate-in-place', name: 'Translate in Place', tagline: 'Keep the layout. Change the language.', category: 'Language', color: '#4089de', poster: '/images/workflow-translate.webp',
        description: 'Replace text in a screenshot with a translation right where it appeared. Open the result in the editor to copy, annotate, or pin.',
        note: 'Requires an AI service configured in Shotsmith.',
        actions: [screenshot,
            { title: 'Translate Image', category: 'recognize', icon: 'languages', input: { label: 'Image', kind: 'image' }, output: { label: 'Image', kind: 'image' }, detail: 'Recognizes and translates the text while preserving the screenshot layout.' },
            { title: 'Open in Editor', category: 'output', icon: 'editor', input: { label: 'Image', kind: 'image' }, detail: 'Opens the translated screenshot for review and edits.' },
        ],
    },
    {
        slug: 'safe-share', name: 'Safe Share', tagline: 'Share the moment, not the details.', category: 'Privacy', color: '#ee9550', poster: '/images/workflow-redact.webp',
        description: 'Find names, email addresses, phone numbers, and other private details on your Mac. Review the mosaic marks before sharing.',
        actions: [screenshot,
            { title: 'Redact Private Info', category: 'recognize', icon: 'eye', input: { label: 'Image', kind: 'image' }, output: { label: 'Image', kind: 'image' }, detail: 'Detects private details locally and marks them for mosaic.' },
            { title: 'Open in Editor', category: 'output', icon: 'editor', input: { label: 'Image', kind: 'image' }, detail: 'Review, remove, or add redactions before exporting.' },
        ],
    },
    {
        slug: 'cut-out-subject', name: 'Cut Out Subject', tagline: 'Just the subject. Nothing else.', category: 'Creative', color: '#b16bc1', poster: '/images/workflow-cutout.webp',
        description: 'Remove the background from a screenshot on-device and copy the subject with transparency, ready to paste anywhere.',
        actions: [screenshot,
            { title: 'Remove Background', category: 'recognize', icon: 'scissors', input: { label: 'Image', kind: 'image' }, output: { label: 'Image', kind: 'image' }, detail: 'Cuts out the subject with an on-device model.' },
            { title: 'Copy to Clipboard', category: 'output', icon: 'clipboard', input: { label: 'Image', kind: 'image' }, detail: 'Copies the transparent result to the clipboard.' },
        ],
    },
    {
        slug: 'explain-with-llm', name: 'Explain with LLM', tagline: 'Make sense of what you see.', category: 'AI', color: '#6792d7', poster: '/images/workflow-explain.webp',
        description: 'Send a screenshot to a model you choose and get a short explanation in an on-screen HUD.',
        note: 'Requires an AI service with a vision-capable model configured in Shotsmith.',
        actions: [screenshot,
            { title: 'Ask LLM', category: 'web', icon: 'sparkles', input: { label: 'Image', kind: 'image' }, output: { label: 'Response', kind: 'text' }, detail: 'Asks your configured model to explain the screenshot.' },
            { title: 'Show HUD', category: 'output', icon: 'hud', input: { label: 'Text', kind: 'text' }, detail: 'Displays the explanation without leaving your screen.' },
        ],
    },
];

export function findGalleryWorkflow(slug: string) {
    return galleryWorkflows.find(workflow => workflow.slug === slug);
}
