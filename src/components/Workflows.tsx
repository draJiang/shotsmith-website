"use client"
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion"
import { LuArrowRight } from "react-icons/lu";

import SectionTitle from "./SectionTitle";
import { actionGroups, workflowPresets, workflowsSection } from "@/data/workflows";
import { WorkflowColor } from "@/types";

// 与 App 里工作流图标、动作分组的配色一致
const iconColors: Record<WorkflowColor, string> = {
    blue: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
    purple: "bg-violet-100 text-violet-700",
    green: "bg-emerald-100 text-emerald-700",
};

const chipColors: Record<WorkflowColor, string> = {
    blue: "bg-blue-50 text-blue-800 border-blue-100",
    orange: "bg-orange-50 text-orange-800 border-orange-100",
    purple: "bg-violet-50 text-violet-800 border-violet-100",
    green: "bg-emerald-50 text-emerald-800 border-emerald-100",
};

const Workflows: React.FC = () => {
    const [selected, setSelected] = useState(0);
    const preset = workflowPresets[selected];
    // 系统设置了减少动态效果时不自动播放，改为显示播放控件。
    // 预渲染的 HTML 带着 autoPlay，浏览器在页面脚本运行前就开始播放了，水合也不会改属性，所以在这里停下、加上控件
    const reduceMotion = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !reduceMotion) return;
        video.pause();
        video.controls = true;
    }, [reduceMotion, selected]);

    return (
        <section id="workflows" className="mb-24">
            <motion.div
                className="max-w-3xl mx-auto text-center"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.9 }}
            >
                <SectionTitle>
                    <h3>{workflowsSection.title}</h3>
                </SectionTitle>
                <p className="mt-3 text-foreground-accent">{workflowsSection.description}</p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 items-start">
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:mt-2" role="tablist" aria-label="Preset workflows">
                    {workflowPresets.map((item, index) => (
                        <button
                            key={item.name}
                            role="tab"
                            aria-selected={index === selected}
                            onClick={() => setSelected(index)}
                            className={clsx(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base transition-colors",
                                index === selected ? "bg-hero-background text-foreground font-semibold" : "text-foreground-accent hover:bg-hero-background/60"
                            )}
                        >
                            <span className={clsx("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", iconColors[item.color])}>
                                {item.icon}
                            </span>
                            <span className="flex-1">{item.name}</span>
                            <kbd className="hidden sm:inline font-sans text-sm text-foreground-accent/70">{item.shortcut}</kbd>
                        </button>
                    ))}
                </div>

                <div>
                    <video
                        key={preset.videoSrc}
                        ref={videoRef}
                        src={preset.videoSrc}
                        poster={preset.posterSrc}
                        width={960}
                        height={660}
                        aria-label={`${preset.name}: ${preset.description}`}
                        autoPlay muted loop playsInline preload="metadata"
                        className="w-full h-auto rounded-[20px] shadow-xl shadow-black/5 bg-hero-background"
                    />
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        {preset.chain.map((step, index) => (
                            <span key={step} className="flex items-center gap-2">
                                {index > 0 && <LuArrowRight className="text-foreground-accent/60" size={16} aria-hidden />}
                                <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-foreground">{step}</span>
                            </span>
                        ))}
                    </div>
                    <p className="mt-3 text-foreground-accent">{preset.description}</p>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-10">
                <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between">
                    <h4 className="text-2xl font-semibold">Build your own from {actionGroups.reduce((n, g) => n + g.actions.length, 0)} actions</h4>
                    <p className="text-foreground-accent">Drop them on a canvas, connect them, and run.</p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-x-6">
                    {actionGroups.map(group => (
                        <div key={group.name} className="contents">
                            <div className="text-base text-foreground-accent sm:pt-1">{group.name}</div>
                            <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                                {group.actions.map(action => (
                                    <span key={action} className={clsx("rounded-full border px-3 py-1 text-sm", chipColors[group.color])}>
                                        {action}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Workflows
