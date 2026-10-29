export interface IMenuItem {
    text: string;
    url: string;
    /** 设置后，点击该链接时上报这个事件 */
    event?: string;
}

export interface IBenefit {
    title: string;
    description: string;
    imageSrc: string;
    /** 有视频时显示视频（静音循环播放），imageSrc 作为加载前的封面图 */
    videoSrc?: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: JSX.Element;
}

export type WorkflowColor = 'blue' | 'orange' | 'purple' | 'green';

export interface IWorkflowPreset {
    name: string;
    shortcut: string;
    color: WorkflowColor;
    icon: JSX.Element;
    /** 工作流里依次执行的步骤 */
    chain: string[];
    description: string;
    videoSrc: string;
    /** 视频加载前显示的封面图 */
    posterSrc: string;
}

export interface IActionGroup {
    name: string;
    color: WorkflowColor;
    actions: string[];
}

export interface IPricing {
    name: string;
    price: number | string;
    /** 价格后面的小字，如 “one-time” */
    priceNote?: string;
    description: string;
    /** 功能列表上方的小标题 */
    featuresHeading: string;
    features: string[];
    cta: 'download' | 'buy';
    highlight?: boolean;
}

export interface IFAQ {
    question: string;
    answer: string;
}

export interface ISocials {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    threads?: string;
    twitter?: string;
    youtube?: string;
    x?: string;
    [key: string]: string | undefined;
}