import React from 'react';

import { DownloadButton } from './ActionButtons';
import HeroDemo from './HeroDemo';
import { heroDetails } from '@/data/hero';
import { siteDetails } from '@/data/siteDetails';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
        >
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>

            <div className="text-center">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-3xl mx-auto text-balance">{heroDetails.heading}</h1>
                <p className="mt-4 text-foreground-accent max-w-xl mx-auto">{heroDetails.subheading}</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-fit mx-auto">
                    <DownloadButton />
                </div>
                <p className="mt-4 text-sm text-foreground-accent">Free to use · {siteDetails.minimumSystem}</p>
                <HeroDemo />
            </div>
        </section>
    );
};

export default Hero;
