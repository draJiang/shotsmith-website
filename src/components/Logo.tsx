/** Shotsmith 标志：深色屏幕 + 橙色方块 */
const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true">
        <path fill="currentColor" d="M52 44 H104 A12 12 0 0 1 116 56 V128 A12 12 0 0 0 128 140 H200 A12 12 0 0 1 212 152 V204 A24 24 0 0 1 188 228 H52 A24 24 0 0 1 28 204 V68 A24 24 0 0 1 52 44 Z" />
        <path fill="#F2512D" d="M160 28 H208 A20 20 0 0 1 228 48 V96 A20 20 0 0 1 208 116 H160 A20 20 0 0 1 140 96 V48 A20 20 0 0 1 160 28 Z" />
    </svg>
);

export default Logo;
