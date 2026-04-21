export function House() {
    return (
        <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full p-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <style>{`
                @keyframes drawStroke {
                    from { stroke-dashoffset: 1200; }
                    to { stroke-dashoffset: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes floatY {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes slideDown {
                    from { transform: translateY(-30px); opacity: 0; }
                    to { transform: translateY(0px); opacity: 1; }
                }
                .house-outline {
                    stroke-dasharray: 1200;
                    stroke-dashoffset: 1200;
                    animation: drawStroke 1.4s ease-out 0.2s forwards;
                }
                .house-roof-line {
                    stroke-dasharray: 300;
                    stroke-dashoffset: 300;
                    animation: drawStroke 0.5s ease-out 1.4s forwards;
                }
                .house-chimney {
                    opacity: 0;
                    animation: slideDown 0.5s ease-out 0.8s forwards;
                }
                .house-door {
                    opacity: 0;
                    animation: fadeIn 0.5s ease-out 1.8s forwards;
                }
                .house-window {
                    opacity: 0;
                    animation: fadeIn 0.5s ease-out 2s forwards;
                }
                .house-dot-1 {
                    animation: floatY 3s ease-in-out 0s infinite;
                }
                .house-dot-2 {
                    animation: floatY 3s ease-in-out 1s infinite;
                }
                .house-dot-3 {
                    animation: floatY 3s ease-in-out 0.5s infinite;
                }
            `}</style>

            <path d="M60 200 L200 80 L340 200 L340 340 L60 340 Z" className="text-primary house-outline" />
            <rect x="170" y="240" width="60" height="100" className="text-primary house-door" />
            <rect x="90" y="220" width="50" height="50" className="text-primary house-window" />
            <rect x="260" y="220" width="50" height="50" className="text-primary house-window" />
            <path d="M60 200 L340 200" className="text-primary house-roof-line" />
            <rect x="270" y="120" width="25" height="40" className="text-accent house-chimney" strokeWidth="3" />
            <circle cx="80" cy="100" r="6" className="text-accent house-dot-1" fill="currentColor" stroke="none" />
            <circle cx="330" cy="80" r="4" className="text-accent house-dot-2" fill="currentColor" stroke="none" />
            <circle cx="350" cy="280" r="5" className="text-primary house-dot-3" fill="currentColor" stroke="none" />
        </svg>
    )
}
