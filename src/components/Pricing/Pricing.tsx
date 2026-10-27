import PricingColumn from "./PricingColumn";

import { tiers } from "@/data/pricing";

const Pricing: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tiers.map(tier => (
                <PricingColumn key={tier.name} tier={tier} />
            ))}
        </div>
    )
}

export default Pricing
