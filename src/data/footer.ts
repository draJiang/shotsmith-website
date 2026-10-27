import { IMenuItem, ISocials } from "@/types";
import { siteDetails } from "./siteDetails";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    socials: ISocials;
} = {
    subheading: "Capture, annotate, and automate screenshots on your Mac.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Pricing",
            url: "#pricing"
        },
        {
            text: "FAQ",
            url: "#faq"
        },
        {
            text: "Find Your License Key",
            url: siteDetails.ordersUrl
        }
    ],
    email: siteDetails.supportEmail,
    socials: {}
}
