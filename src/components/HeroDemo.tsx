"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useReducedMotion } from "framer-motion";
import { IconType } from "react-icons";
import { LuCamera, LuCheckCircle, LuClipboard, LuLoader2, LuScissors, LuTerminal, LuZap } from "react-icons/lu";

import styles from "./HeroDemo.module.css";
// 视频和时间轴由 App 仓库的 scripts/render-marketing.sh（ONLY=hero-video）一起生成：节点取自 App 里动作的描述，
// events 是各节点在视频里的运行状态，卡片按视频的 currentTime 显示
import timeline from "../../public/images/hero-workflow.json";

type Timeline = typeof timeline;
type TimelineNode = Timeline["nodes"][number];
type NodeState = { status: string; preview?: string };

// App 里动作的 lucide 图标名
const icons: Record<string, IconType> = { camera: LuCamera, scissors: LuScissors, terminal: LuTerminal, clipboard: LuClipboard };

const NODE_WIDTH = 228;
const GAP = 56;
const PADDING = 32;
// 四张卡片排开时的宽度；页面更窄时整体缩小
const CANVAS_WIDTH = timeline.nodes.length * NODE_WIDTH + (timeline.nodes.length - 1) * GAP + PADDING * 2;
const ROW_HEIGHT = 220;

const visibleAt = (node: TimelineNode, t: number) => !("addedAt" in node) || t >= (node.addedAt as number);
const edgeActiveAt = (edge: Timeline["edges"][number], t: number) =>
    (!("from" in edge) || t >= (edge.from as number)) && (!("until" in edge) || t < (edge.until as number));

/** 第 t 秒时画布上的样子：有哪些节点、各自的运行状态、当前的说明文字、刚加进来的节点（显示为选中） */
function snapshot(t: number) {
    const states: Record<string, NodeState> = {};
    for (const event of timeline.events) {
        if (event.time > t) break;
        if (event.status === "idle") delete states[event.node];
        else states[event.node] = { status: event.status, preview: "preview" in event ? event.preview : undefined };
    }
    const caption = [...timeline.captions].reverse().find(c => c.time <= t)?.text ?? "";
    // 加进来的节点保持选中，直到下一次运行
    const selected = timeline.nodes.find(node => {
        if (!("addedAt" in node) || t < (node.addedAt as number)) return false;
        const nextRun = timeline.events.find(e => e.time > (node.addedAt as number) && e.status !== "idle")?.time ?? Infinity;
        return t < nextRun;
    })?.id ?? null;
    return {
        visible: timeline.nodes.filter(node => visibleAt(node, t)).map(node => node.id),
        edges: timeline.edges.flatMap((edge, index) => (edgeActiveAt(edge, t) ? [index] : [])),
        states, caption, selected,
    };
}

const HeroDemo: React.FC = () => {
    const reduceMotion = useReducedMotion();
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const [scale, setScale] = useState(1);
    const [snap, setSnap] = useState(() => snapshot(0));

    // 画布按容器宽度缩放
    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / CANVAS_WIDTH)));
        observer.observe(wrapper);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (reduceMotion) {
            video.pause();
            video.controls = true;
        } else {
            video.play().catch(() => {});
        }
    }, [reduceMotion]);

    // 每帧读视频时间：状态变了才重新渲染；连线直接改 path，卡片移动的过渡中也跟着端口走
    useEffect(() => {
        let frame = 0;
        let key = "";
        const tick = () => {
            const t = videoRef.current?.currentTime ?? 0;
            const next = snapshot(t);
            const nextKey = JSON.stringify(next);
            if (nextKey !== key) {
                key = nextKey;
                setSnap(next);
            }
            drawEdges(t, next.states);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, []);

    const drawEdges = (t: number, states: Record<string, NodeState>) => {
        const row = rowRef.current;
        if (!row) return;
        const box = row.getBoundingClientRect();
        // 行被整体缩放过，换回画布自己的坐标
        const k = box.width / row.offsetWidth || 1;
        const point = (key: string) => {
            const el = row.querySelector<HTMLElement>(`[data-port="${key}"]`);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            return { x: (r.left + r.width / 2 - box.left) / k, y: (r.top + r.height / 2 - box.top) / k };
        };
        timeline.edges.forEach((edge, index) => {
            const path = pathRefs.current[index];
            if (!path) return;
            const active = edgeActiveAt(edge, t);
            const a = active && point(`out:${edge.source}:${edge.sourcePort}`);
            const b = active && point(`in:${edge.target}:${edge.targetPort}`);
            if (!a || !b) {
                path.setAttribute("d", "");
                return;
            }
            // 与 React Flow 的 bezier 连线一致：从右侧端口到左侧端口，控制点各偏移一半的水平距离
            const offset = b.x >= a.x ? (b.x - a.x) / 2 : 0.25 * 25 * Math.sqrt(a.x - b.x);
            path.setAttribute("d", `M${a.x},${a.y} C${a.x + offset},${a.y} ${b.x - offset},${b.y} ${b.x},${b.y}`);
            // 编辑器里：目标节点运行中时连线显示为流动的虚线
            path.classList.toggle(styles.running, states[edge.target]?.status === "running");
        });
    };

    const connectedInputs = (nodeId: string) =>
        snap.edges.map(index => timeline.edges[index]).filter(e => e.target === nodeId).map(e => e.targetPort);

    // 可见的卡片居中排开，加入或移走卡片时其余的滑到新位置
    const visibleCount = snap.visible.length;
    const rowStart = (CANVAS_WIDTH - PADDING * 2 - (visibleCount * NODE_WIDTH + (visibleCount - 1) * GAP)) / 2;

    return (
        <div className="relative mt-12 md:mt-16 mx-auto z-10 w-full max-w-5xl overflow-hidden rounded-[20px] bg-white shadow-xl shadow-black/10 ring-1 ring-black/5">
            <video
                ref={videoRef}
                src="/images/hero-workflow.mp4"
                poster="/images/hero-workflow.webp"
                width={1280}
                height={880}
                muted loop playsInline preload="auto"
                aria-label={`Capture a product photo, press ${timeline.shortcut} to run the ${timeline.workflow} workflow, add a Run Shell Script step that pads it to a white square, and run it again`}
                className="block h-auto w-full"
            />
            {/* 画布按原尺寸排版再整体缩放；绝对定位，不让原尺寸的宽度撑开页面 */}
            <div ref={wrapperRef} className="relative border-t border-black/5" style={{ height: (ROW_HEIGHT + 64) * scale }}>
                <div className={styles.canvas} style={{ position: "absolute", left: 0, top: 0, width: CANVAS_WIDTH, height: ROW_HEIGHT + 64, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
                    <div className="flex items-center justify-between px-8 pt-4 pb-3 text-[13px]">
                        <span className="flex items-center gap-2 font-semibold">
                            {timeline.workflow}
                            <kbd className="font-sans font-normal text-[11px] text-black/50">{timeline.shortcut}</kbd>
                        </span>
                        <span key={snap.caption} className={clsx(styles.fadeIn, "text-[15px] font-semibold")}>{snap.caption}</span>
                        <span className="w-24" />
                    </div>
                    <div ref={rowRef} className="relative mx-8" style={{ height: ROW_HEIGHT - 12 }}>
                        <svg className={styles.edges} aria-hidden>
                            {timeline.edges.map((edge, index) => (
                                <path key={index} ref={el => { pathRefs.current[index] = el }} />
                            ))}
                        </svg>
                        {timeline.nodes.filter(node => snap.visible.includes(node.id)).map((node, index) => (
                            <ActionCard
                                key={node.id}
                                node={node}
                                state={snap.states[node.id]}
                                selected={snap.selected === node.id}
                                connected={connectedInputs(node.id)}
                                left={rowStart + index * (NODE_WIDTH + GAP)}
                                isNew={"addedAt" in node}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/** 与编辑器画布上的节点（WorkflowEditorWeb/src/Canvas.tsx 的 ActionNode）一致 */
const ActionCard: React.FC<{ node: TimelineNode; state?: NodeState; selected: boolean; connected: string[]; left: number; isNew: boolean }> = (
    { node, state, selected, connected, left, isNew }
) => {
    const Icon = icons[node.icon] ?? LuZap;
    return (
        <div
            className={clsx(styles.node, styles[node.category], selected && styles.selected, state && styles[state.status],
                isNew && styles.popIn)}
            style={{ position: "absolute", top: 0, left, transition: "left .6s cubic-bezier(.2,.8,.2,1)" }}
        >
            <div className={styles.header}>
                <span className={styles.icon}><Icon size={14} strokeWidth={2} /></span>
                <span className={styles.title}>{node.title}</span>
                <span className={styles.status}>
                    {state?.status === "running" && <LuLoader2 size={14} className={styles.spin} />}
                    {state?.status === "succeeded" && <LuCheckCircle size={14} />}
                    {!state && node.isTrigger && <span className={styles.triggerTag}>Trigger</span>}
                </span>
            </div>
            <div className={styles.ports}>
                {node.inputs.map(port => {
                    const isConnected = connected.includes(port.id);
                    return (
                        <div key={`in-${port.id}`} className={clsx(styles.port, styles.in)}>
                            <i data-port={`in:${node.id}:${port.id}`}
                                className={clsx(styles.handle, styles[port.type], !isConnected && styles.unconnected)} />
                            <span>{port.title}</span>
                            {port.isOptional && !isConnected && <span className={styles.optional}>optional</span>}
                        </div>
                    );
                })}
                {node.outputs.map(port => (
                    <div key={`out-${port.id}`} className={clsx(styles.port, styles.out)}>
                        <span>{port.title}</span>
                        <i data-port={`out:${node.id}:${port.id}`} className={clsx(styles.handle, styles[port.type])} />
                    </div>
                ))}
            </div>
            {node.summary && <div className={styles.summary}>{node.summary}</div>}
            {state?.status === "succeeded" && state.preview && <div className={styles.preview}>{state.preview}</div>}
        </div>
    );
};

export default HeroDemo;
