import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { BuyButton, DownloadButton } from "../ActionButtons";
import { IPricing } from "@/types";

interface Props {
    tier: IPricing;
}

const PricingColumn: React.FC<Props> = ({ tier }: Props) => {
    const { name, price, priceNote, description, featuresHeading, features, cta, highlight } = tier;

    return (
        <div className={clsx("w-full max-w-sm mx-auto bg-white rounded-xl border lg:max-w-full", highlight ? "border-primary shadow-lg" : "border-gray-200")}>
            <div className="p-6 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-2xl font-semibold mb-1">{name}</h3>
                <p className="text-foreground-accent mb-4">{description}</p>
                <p className="text-3xl md:text-5xl font-bold mb-6">
                    <span className={clsx({ "text-secondary": highlight })}>
                        {typeof price === 'number' ? `$${price}` : price}
                    </span>
                    {priceNote && <span className="text-lg font-normal text-gray-600"> {priceNote}</span>}
                </p>
                {cta === 'buy' ? <BuyButton className="w-full" label="Buy Shotsmith Pro" /> : <DownloadButton className="w-full" />}
            </div>
            <div className="p-6 mt-1">
                <p className="font-bold mb-5">{featuresHeading}</p>
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <BsFillCheckCircleFill className={clsx("h-5 w-5 mr-2 mt-1 shrink-0", highlight ? "text-secondary" : "text-gray-400")} />
                            <span className="text-foreground-accent">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingColumn
