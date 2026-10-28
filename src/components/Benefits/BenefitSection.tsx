"use client"
import { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, useReducedMotion, Variants } from "framer-motion"

import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import { IBenefit } from "@/types";

interface Props {
    benefit: IBenefit;
    imageAtRight?: boolean;
}

const containerVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 100
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 0.9,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    }
};

export const childVariants = {
    offscreen: {
        opacity: 0,
        x: -50,
    },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 1,
        }
    },
};

const BenefitSection: React.FC<Props> = ({ benefit, imageAtRight }: Props) => {
    const { title, description, imageSrc, videoSrc, bullets } = benefit;
    // 系统设置了减少动态效果时不自动播放，改为显示播放控件。
    // 预渲染的 HTML 带着 autoPlay，浏览器在页面脚本运行前就开始播放了，水合也不会改属性，所以在这里停下、加上控件
    const reduceMotion = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !reduceMotion) return;
        video.pause();
        video.controls = true;
    }, [reduceMotion]);
    const mediaClassName = "lg:ml-0 w-full max-w-[560px] h-auto rounded-[20px] shadow-xl shadow-black/5";

    return (
        <section className="benefit-section">
            <motion.div
                className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
                variants={containerVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
            >
                <div
                    className={clsx("flex flex-wrap items-center w-full max-w-lg", { "justify-start": imageAtRight, "lg:order-1 justify-end": !imageAtRight })}
                    
                >
                    <div className="w-full  text-center lg:text-left ">
                        <motion.div
                            className="flex flex-col w-full"
                            variants={childVariants}
                        >
                            <SectionTitle>
                                <h3 className="lg:max-w-2xl">
                                    {title}
                                </h3>
                            </SectionTitle>

                            <p className="mt-1.5 mx-auto lg:ml-0 leading-normal text-foreground-accent">
                                {description}
                            </p>
                        </motion.div>

                        <div className="mx-auto lg:ml-0 w-full">
                            {bullets.map((item, index) => (
                                <BenefitBullet key={index} title={item.title} icon={item.icon} description={item.description} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={clsx("mt-5 lg:mt-0", { "lg:order-2": imageAtRight })}>
                    <div className={clsx("w-fit flex", { "justify-start": imageAtRight, "justify-end": !imageAtRight })}>
                        {videoSrc ? (
                            <video ref={videoRef} src={videoSrc} poster={imageSrc} width={560} height={480} aria-label={title}
                                autoPlay muted loop playsInline preload="metadata"
                                className={mediaClassName} />
                        ) : (
                            <Image src={imageSrc} alt={title} width="560" height="480" unoptimized className={mediaClassName} />
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default BenefitSection