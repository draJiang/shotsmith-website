import { FiArrowUpRight, FiCrop, FiLayers, FiMapPin, FiSearch, FiVideo } from "react-icons/fi";

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
        imageSrc: "/images/feature-capture.webp"
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
        imageSrc: "/images/feature-pin.webp",
        videoSrc: "/images/feature-pin.mp4"
    },
]
