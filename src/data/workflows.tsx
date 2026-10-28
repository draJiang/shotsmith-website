import { LuEyeOff, LuLanguages, LuScissors, LuSparkles } from "react-icons/lu";

import { IActionGroup, IWorkflowPreset } from "@/types"

export const workflowsSection = {
    title: "Workflows: the step after the shot",
    description: "Chain actions on a visual canvas and run them from the editor toolbar or with ⌘1–⌘9. Building is free; running workflows is part of Shotsmith Pro.",
}

// 视频由 App 仓库的 scripts/render-marketing.sh 渲染：按快捷键截图 → 编辑器 → ⌘N 运行 → 结果
export const workflowPresets: IWorkflowPreset[] = [
    {
        name: "Translate in Place",
        shortcut: "⌘1",
        color: "blue",
        icon: <LuLanguages size={18} />,
        chain: ["Screenshot", "Translate Image", "Open in Editor"],
        description: "Text in the screenshot is replaced by its translation, right where it was. Copy it or pin it.",
        videoSrc: "/images/workflow-translate.mp4",
        posterSrc: "/images/workflow-translate.webp",
    },
    {
        name: "Safe Share",
        shortcut: "⌘2",
        color: "orange",
        icon: <LuEyeOff size={18} />,
        chain: ["Screenshot", "Redact Private Info", "Open in Editor"],
        description: "Names, emails, phone numbers and addresses are found on your Mac and covered before you share.",
        videoSrc: "/images/workflow-redact.mp4",
        posterSrc: "/images/workflow-redact.webp",
    },
    {
        name: "Cut Out Subject",
        shortcut: "⌘3",
        color: "purple",
        icon: <LuScissors size={18} />,
        chain: ["Screenshot", "Remove Background", "Copy to Clipboard"],
        description: "Lift the subject out of any screenshot, ready to paste into a doc or a design.",
        videoSrc: "/images/workflow-cutout.mp4",
        posterSrc: "/images/workflow-cutout.webp",
    },
    {
        name: "Explain with LLM",
        shortcut: "⌘4",
        color: "purple",
        icon: <LuSparkles size={18} />,
        chain: ["Screenshot", "Ask LLM", "Show HUD"],
        description: "Ask a local or cloud model what you're looking at. The answer shows up on screen.",
        videoSrc: "/images/workflow-explain.mp4",
        posterSrc: "/images/workflow-explain.webp",
    },
]

// 与 App 工作流编辑器里的动作列表、分组和颜色一致
export const actionGroups: IActionGroup[] = [
    {
        name: "Recognize",
        color: "green",
        actions: ["Recognize Text", "Scan QR / Barcode", "Remove Background", "Redact Private Info", "Translate Image"],
    },
    {
        name: "Web & AI",
        color: "blue",
        actions: ["Ask LLM", "HTTP Request"],
    },
    {
        name: "Output",
        color: "orange",
        actions: ["Show HUD", "Speak Text", "Copy to Clipboard", "Open in Editor", "Open URL", "Send to AI App", "Save to File"],
    },
    {
        name: "Advanced",
        color: "purple",
        actions: ["Run Shell Script", "Run Workflow"],
    },
]
