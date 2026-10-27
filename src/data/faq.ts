import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Is ${siteDetails.siteName} free?`,
        answer: 'Yes. Capturing, annotating, pinning, screen recording and screenshot history are free. You can also build workflows for free; running them and using the command line tool need Shotsmith Pro.',
    },
    {
        question: 'Is Shotsmith Pro a subscription?',
        answer: 'No. Shotsmith Pro is a one-time purchase of $9.',
    },
    {
        question: 'How many Macs can I use Pro on?',
        answer: 'One license works on two Macs. To move it to another Mac, open Settings → License and choose Deactivate This Mac, then activate the new one with the same key.',
    },
    {
        question: 'How do I activate Pro after buying?',
        answer: `After checkout, ${siteDetails.siteName} opens and activates automatically. If it doesn't, paste the license key from your receipt email into Settings → License.`,
    },
    {
        question: 'Do my screenshots leave my Mac?',
        answer: 'Your screenshot history stays on your Mac, and text recognition runs on device. Workflows only send data to services you add yourself, such as an LLM provider or a local Ollama.',
    },
    {
        question: 'Which Macs are supported?',
        answer: `${siteDetails.siteName} needs ${siteDetails.minimumSystem}.`,
    },
];
