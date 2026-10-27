import { FiArrowUpRight, FiCode, FiCrop, FiEyeOff, FiLayers, FiMapPin, FiSearch, FiVideo, FiZap } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Capture anything, mark it up fast",
        description: "Grab a region, a window, or a whole scrolling page, then annotate it in an editor built for keyboard-first speed.",
        bullets: [
            {
                title: "Region, window and scrolling capture",
                description: "Long pages are stitched into one image, without repeating sticky headers or floating buttons.",
                icon: <FiCrop size={26} />
            },
            {
                title: "Arrows, shapes, text and counters",
                description: "Every tool has a one-key shortcut. Number steps with counters and hide secrets with mosaic.",
                icon: <FiArrowUpRight size={26} />
            },
            {
                title: "Backgrounds and device frames",
                description: "Drop a screenshot onto a background or into a device frame, ready for docs and social posts.",
                icon: <FiLayers size={26} />
            }
        ],
        imageSrc: "/images/feature-capture.svg"
    },
    {
        title: "Keep it in view, find it later",
        description: "Pin a screenshot above everything while you work, record your screen, and search every shot you took.",
        bullets: [
            {
                title: "Pin to screen",
                description: "Float a screenshot over other apps. Swipe to change its opacity, lock it, or blur parts of it.",
                icon: <FiMapPin size={26} />
            },
            {
                title: "Screen recording with steps",
                description: "Record, trim, and get a screenshot of each step you clicked through, ready to share as a guide.",
                icon: <FiVideo size={26} />
            },
            {
                title: "History with text search",
                description: "Text in your screenshots is recognized on your Mac, so you can search for what you saw.",
                icon: <FiSearch size={26} />
            }
        ],
        imageSrc: "/images/feature-pin.svg"
    },
    {
        title: "Workflows: the step after the shot",
        description: "Chain actions on a visual canvas and run them from the editor toolbar or with ⌘1–⌘9. Building is free; running workflows is part of Shotsmith Pro.",
        bullets: [
            {
                title: "OCR, translation, LLMs and more",
                description: "Recognize text, translate in place, ask a local or cloud LLM, call a webhook, or run a script.",
                icon: <FiZap size={26} />
            },
            {
                title: "Private by default",
                description: "Recognition runs on device and data only goes to services you set up, including a local Ollama.",
                icon: <FiEyeOff size={26} />
            },
            {
                title: "Built for coding agents",
                description: "The shotsmith command line tool lets Claude Code and other agents create and test workflows for you.",
                icon: <FiCode size={26} />
            }
        ],
        imageSrc: "/images/feature-workflow.svg"
    },
]
