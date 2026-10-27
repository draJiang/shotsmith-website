export interface IMenuItem {
    text: string;
    url: string;
}

export interface IBenefit {
    title: string;
    description: string;
    imageSrc: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: JSX.Element;
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