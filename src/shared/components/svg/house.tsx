export function House() {
    return (
        <svg
            viewBox="0 0 480 400"
            style={{ width: "100%", maxWidth: "500px", height: "auto" }}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes drawPath {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes floatY {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-8px); }
                }
                @keyframes floatY2 {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-6px); }
                }
                @keyframes lampSwing {
                    0%, 100% { transform: rotate(-4deg); }
                    50%      { transform: rotate(4deg); }
                }
                @keyframes lightPulse {
                    0%, 100% { opacity: 0.13; }
                    50%      { opacity: 0.22; }
                }
                @keyframes sunbeam {
                    0%, 100% { opacity: 0.18; }
                    50%      { opacity: 0.32; }
                }
                @keyframes plantSway {
                    0%, 100% { transform: rotate(0deg); }
                    50%      { transform: rotate(3deg); }
                }
                @keyframes clockTick {
                    0%   { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes steam {
                    0%   { transform: translateY(0) scaleX(1);   opacity: 0.5; }
                    100% { transform: translateY(-18px) scaleX(1.5); opacity: 0; }
                }
                @keyframes blinkCursor {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }
                @keyframes treeSway1 {
                    0%, 100% { transform: rotate(0deg); }
                    25%      { transform: rotate(5deg); }
                    65%      { transform: rotate(-4deg); }
                }
                @keyframes treeSway2 {
                    0%, 100% { transform: rotate(0deg); }
                    30%      { transform: rotate(-6deg); }
                    70%      { transform: rotate(4deg); }
                }
                @keyframes treeSway3 {
                    0%, 100% { transform: rotate(0deg); }
                    40%      { transform: rotate(4deg); }
                    75%      { transform: rotate(-5deg); }
                }
                @keyframes cloudDrift {
                    0%, 100% { transform: translateX(0); }
                    50%      { transform: translateX(7px); }
                }

                .r-room   { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: drawPath 1.1s ease-out 0.1s forwards; }
                .r-floor  { opacity: 0; animation: fadeIn 0.5s ease-out 1s forwards; }
                .r-bed    { opacity: 0; animation: fadeUp 0.5s ease-out 1.2s forwards; }
                .r-pillow { opacity: 0; animation: fadeUp 0.4s ease-out 1.5s forwards; }
                .r-desk   { opacity: 0; animation: fadeUp 0.5s ease-out 1.4s forwards; }
                .r-lamp   { opacity: 0; animation: fadeUp 0.5s ease-out 1.7s forwards; }
                .r-shelf  { opacity: 0; animation: fadeUp 0.5s ease-out 1.6s forwards; }
                .r-window { opacity: 0; animation: fadeUp 0.6s ease-out 1.0s forwards; }
                .r-plant  { opacity: 0; animation: fadeUp 0.5s ease-out 1.9s forwards; }
                .r-badge  { opacity: 0; animation: fadeUp 0.5s ease-out 2.4s forwards; }
                .r-rug    { opacity: 0; animation: fadeIn 0.5s ease-out 1.3s forwards; }
                .r-lamp-swing  { transform-origin: 310px 62px; animation: lampSwing 4s ease-in-out infinite; }
                .r-light-cone  { animation: lightPulse 3s ease-in-out infinite; }
                .r-sunbeam     { animation: sunbeam 3.5s ease-in-out infinite; }
                .r-plant-sway  { transform-origin: 88px 310px; animation: plantSway 3s ease-in-out infinite; }
                .r-float1      { animation: floatY  3.2s ease-in-out 0s   infinite; }
                .r-float2      { animation: floatY  3.2s ease-in-out 1.1s infinite; }
                .r-float3      { animation: floatY2 4s   ease-in-out 0.5s infinite; }
                .r-steam1      { animation: steam 2s ease-out 2.5s infinite; }
                .r-steam2      { animation: steam 2s ease-out 3.1s infinite; }
                .r-cursor      { animation: blinkCursor 1s step-end infinite; }
                .r-clock-hand  { transform-origin: 395px 116px; animation: clockTick 6s linear infinite; }
                .r-tree1  { transform-origin: 222px 211px; animation: treeSway1 2.8s ease-in-out infinite; }
                .r-tree2  { transform-origin: 152px 211px; animation: treeSway2 3.3s ease-in-out 0.5s infinite; }
                .r-tree3  { transform-origin: 175px 210px; animation: treeSway3 2.5s ease-in-out 1s infinite; }
                .r-cloud  { animation: cloudDrift 5s ease-in-out infinite; }
            `}</style>

            <defs>
                <clipPath id="win-clip">
                    <rect x="132" y="82" width="106" height="126" rx="4" />
                </clipPath>
            </defs>

            {/* ── Room shell ── */}
            <rect x="40" y="48" width="400" height="290" rx="4" fill="#F9F8F5" stroke="#142044" strokeWidth="2.2" className="r-room" />
            <rect x="40" y="292" width="400" height="46" rx="0" fill="#EAE8E3" className="r-floor" />
            <line x1="40" y1="292" x2="440" y2="292" stroke="#D4D1CA" strokeWidth="1.5" className="r-floor" />
            <rect x="40" y="326" width="400" height="12" rx="0" fill="#D4D1CA" className="r-floor" />
            {[0,1,2,3,4].map(i => (
                <line key={i} x1="40" y1={298 + i * 6} x2="440" y2={298 + i * 6} stroke="#D4D1CA" strokeWidth="0.8" className="r-floor" />
            ))}
            {[100,180,260,340].map(x => (
                <line key={x} x1={x} y1="292" x2={x} y2="338" stroke="#D4D1CA" strokeWidth="0.8" className="r-floor" />
            ))}
            <line x1="40" y1="280" x2="440" y2="280" stroke="#E8E6E1" strokeWidth="1" className="r-floor" />

            {/* ── Rug ── */}
            <ellipse cx="240" cy="308" rx="110" ry="14" fill="#FF8D74" opacity="0.18" className="r-rug" />
            <ellipse cx="240" cy="308" rx="90" ry="10" fill="none" stroke="#FF6B4A" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" className="r-rug" />

            {/* ── Window ── */}
            <g className="r-window">
                {/* Outdoor scene clipped to window interior */}
                <g clipPath="url(#win-clip)">
                    {/* Sky */}
                    <rect x="132" y="82" width="106" height="126" fill="#C2DBF0" />
                    {/* Sun */}
                    <circle cx="228" cy="102" r="16" fill="#FFE090" opacity="0.55" />
                    <circle cx="228" cy="102" r="10" fill="#FFD060" opacity="0.5" />
                    {/* Far rolling hills */}
                    <path d="M132 178 Q150 162 168 170 Q186 158 204 166 Q220 158 240 165 L240 208 L132 208 Z" fill="#A8C890" />
                    {/* Grass strip */}
                    <rect x="132" y="196" width="106" height="12" fill="#7DB86A" />

                    {/* Tree 3 — small background, centre */}
                    <g className="r-tree3">
                        <rect x="172" y="183" width="5" height="28" rx="2" fill="#8B7050" />
                        <ellipse cx="175" cy="181" rx="13" ry="12" fill="#568A42" opacity="0.85" />
                        <ellipse cx="175" cy="170" rx="9"  ry="10" fill="#68A050" opacity="0.85" />
                    </g>

                    {/* Tree 2 — medium, left */}
                    <g className="r-tree2">
                        <rect x="148" y="174" width="7" height="37" rx="2" fill="#7A5C3A" />
                        <ellipse cx="152" cy="181" rx="19" ry="16" fill="#3A6A28" />
                        <ellipse cx="152" cy="167" rx="15" ry="15" fill="#4A7A36" />
                        <ellipse cx="152" cy="155" rx="10" ry="11" fill="#5A8A44" />
                    </g>

                    {/* Tree 1 — tallest, right */}
                    <g className="r-tree1">
                        <rect x="218" y="160" width="8" height="51" rx="2" fill="#7A5C3A" />
                        <ellipse cx="222" cy="172" rx="21" ry="18" fill="#3A6A28" />
                        <ellipse cx="222" cy="157" rx="17" ry="16" fill="#4A7A36" />
                        <ellipse cx="222" cy="144" rx="12" ry="13" fill="#5A8A44" />
                        <ellipse cx="222" cy="133" rx="7"  ry="9"  fill="#6A9A52" />
                    </g>

                    {/* Drifting cloud */}
                    <g className="r-cloud">
                        <ellipse cx="158" cy="103" rx="17" ry="9"  fill="white" opacity="0.88" />
                        <ellipse cx="170" cy="98"  rx="14" ry="8"  fill="white" opacity="0.88" />
                        <ellipse cx="148" cy="106" rx="10" ry="6"  fill="white" opacity="0.82" />
                    </g>

                    {/* Glass glare overlay */}
                    <rect x="132" y="82" width="106" height="126" fill="white" opacity="0.06" />
                </g>

                {/* Window frame */}
                <rect x="130" y="80" width="110" height="130" rx="6" fill="none" stroke="#142044" strokeWidth="2" />
                {/* Panes */}
                <line x1="185" y1="80" x2="185" y2="210" stroke="#142044" strokeWidth="1.5" />
                <line x1="130" y1="145" x2="240" y2="145" stroke="#142044" strokeWidth="1.5" />
                {/* Glass shine */}
                <rect x="135" y="86" width="12" height="48" rx="4" fill="white" opacity="0.35" />
                {/* Sill */}
                <rect x="124" y="208" width="122" height="10" rx="3" fill="#D4D1CA" stroke="#142044" strokeWidth="1.2" />
                {/* Curtains */}
                <path d="M130 80 Q118 130 126 210" fill="#FF8D74" opacity="0.25" />
                <path d="M130 80 Q118 130 126 210" stroke="#FF6B4A" strokeWidth="1.2" opacity="0.4" />
                <path d="M240 80 Q252 130 244 210" fill="#FF8D74" opacity="0.25" />
                <path d="M240 80 Q252 130 244 210" stroke="#FF6B4A" strokeWidth="1.2" opacity="0.4" />
                {/* Curtain rod */}
                <rect x="118" y="74" width="134" height="8" rx="4" fill="#8B91B5" />
                <circle cx="118" cy="78" r="5" fill="#8B91B5" />
                <circle cx="252" cy="78" r="5" fill="#8B91B5" />
            </g>

            {/* ── Hanging lamp ── */}
            <g className="r-lamp r-lamp-swing">
                <line x1="310" y1="48" x2="310" y2="68" stroke="#142044" strokeWidth="1.5" />
                <path d="M290 68 Q310 58 330 68 L322 100 Q310 106 298 100 Z" fill="#1A1F3C" />
                <path d="M290 68 Q310 58 330 68" stroke="#142044" strokeWidth="1.2" />
                <circle cx="310" cy="104" r="6" fill="#FFF0ED" />
                <path d="M298 106 L265 190 L355 190 L322 106 Z" fill="#FF6B4A" opacity="0.08" className="r-light-cone" />
            </g>

            {/* ── Shelf ── */}
            <g className="r-shelf">
                <rect x="348" y="130" width="88" height="10" rx="2" fill="#D4D1CA" stroke="#142044" strokeWidth="1.5" />
                <rect x="352" y="100" width="12" height="32" rx="2" fill="#FF6B4A" opacity="0.8" />
                <rect x="366" y="104" width="10" height="28" rx="2" fill="#142044" opacity="0.7" />
                <rect x="378" y="98" width="14" height="34" rx="2" fill="#8B91B5" opacity="0.8" />
                <rect x="394" y="106" width="10" height="26" rx="2" fill="#FF8D74" opacity="0.7" />
                <rect x="406" y="100" width="12" height="32" rx="2" fill="#C5C8D8" opacity="0.9" />
                <rect x="420" y="116" width="8" height="16" rx="2" fill="#D4D1CA" />
                <ellipse cx="424" cy="112" rx="10" ry="8" fill="#8B91B5" opacity="0.5" />
            </g>

            {/* ── Clock ── */}
            <g className="r-shelf">
                <circle cx="395" cy="166" r="18" fill="#F9F8F5" stroke="#142044" strokeWidth="1.5" />
                <circle cx="395" cy="166" r="2" fill="#142044" />
                <line x1="395" y1="166" x2="395" y2="154" stroke="#142044" strokeWidth="2" strokeLinecap="round" />
                <line x1="395" y1="166" x2="404" y2="160" stroke="#FF6B4A" strokeWidth="1.5" strokeLinecap="round" className="r-clock-hand" />
                {[0,90,180,270].map(deg => {
                    const rad = deg * Math.PI / 180;
                    return <line key={deg}
                        x1={395 + 14 * Math.sin(rad)} y1={166 - 14 * Math.cos(rad)}
                        x2={395 + 16 * Math.sin(rad)} y2={166 - 16 * Math.cos(rad)}
                        stroke="#142044" strokeWidth="1.5"
                    />;
                })}
            </g>

            {/* ── Bed ── */}
            <g className="r-bed">
                <rect x="48" y="210" width="168" height="88" rx="6" fill="#E8E9EF" stroke="#142044" strokeWidth="2" />
                <rect x="48" y="192" width="168" height="30" rx="8" fill="#1A1F3C" />
                <rect x="52" y="218" width="160" height="76" rx="4" fill="#F9F8F5" stroke="#D4D1CA" strokeWidth="1" />
                <path d="M52 248 Q132 244 212 248" stroke="#C5C8D8" strokeWidth="1.5" />
                {[[80,235],[110,228],[150,232],[180,235]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="2.5" fill="#C5C8D8" opacity="0.7" />
                ))}
                <rect x="48" y="290" width="168" height="8" rx="4" fill="#142044" opacity="0.15" />
            </g>

            {/* ── Pillows ── */}
            <g className="r-pillow">
                <rect x="58" y="196" width="50" height="28" rx="10" fill="#F9F8F5" stroke="#C5C8D8" strokeWidth="1.2" />
                <rect x="116" y="196" width="50" height="28" rx="10" fill="#FFF0ED" stroke="#C5C8D8" strokeWidth="1.2" />
                <line x1="83" y1="202" x2="83" y2="218" stroke="#D4D4D4" strokeWidth="1" />
                <line x1="141" y1="202" x2="141" y2="218" stroke="#FFD4CB" strokeWidth="1" />
            </g>

            {/* ── Desk ── */}
            <g className="r-desk">
                <rect x="270" y="220" width="166" height="14" rx="4" fill="#D4D1CA" stroke="#142044" strokeWidth="1.5" />
                <rect x="276" y="234" width="8" height="56" rx="3" fill="#C5C1BA" />
                <rect x="420" y="234" width="8" height="56" rx="3" fill="#C5C1BA" />
                <rect x="300" y="186" width="72" height="50" rx="4" fill="#0F1222" stroke="#142044" strokeWidth="1" />
                <rect x="304" y="190" width="64" height="42" rx="2" fill="#E8E9EF" opacity="0.15" />
                <rect x="308" y="195" width="40" height="4" rx="1" fill="#8B91B5" opacity="0.6" />
                <rect x="308" y="203" width="28" height="3" rx="1" fill="#8B91B5" opacity="0.4" />
                <rect x="308" y="210" width="48" height="3" rx="1" fill="#FF6B4A" opacity="0.5" />
                <rect x="308" y="217" width="20" height="3" rx="1" fill="#8B91B5" opacity="0.4" />
                <rect x="330" y="217" width="2" height="10" rx="1" fill="#FF6B4A" className="r-cursor" />
                <rect x="288" y="234" width="96" height="6" rx="2" fill="#142044" opacity="0.7" />
                <rect x="328" y="234" width="16" height="4" rx="1" fill="#0F1222" />
                <rect x="390" y="206" width="24" height="28" rx="5" fill="#FF8D74" opacity="0.85" stroke="#142044" strokeWidth="1.2" />
                <path d="M414 214 Q424 214 424 224 Q424 234 414 234" stroke="#142044" strokeWidth="1.2" fill="none" />
                <path d="M398 204 Q400 198 398 192" stroke="#C5C8D8" strokeWidth="1.5" className="r-steam1" />
                <path d="M406 204 Q408 197 406 190" stroke="#C5C8D8" strokeWidth="1.5" className="r-steam2" />
            </g>

            {/* ── Plant ── */}
            <g className="r-plant r-plant-sway">
                <rect x="50" y="276" width="22" height="28" rx="4" fill="#8B91B5" opacity="0.6" />
                <ellipse cx="61" cy="272" rx="20" ry="18" fill="#8B91B5" opacity="0.35" />
                <ellipse cx="56" cy="260" rx="13" ry="16" fill="#C5C8D8" opacity="0.5" />
                <ellipse cx="68" cy="258" rx="10" ry="13" fill="#8B91B5" opacity="0.45" />
                <rect x="46" y="274" width="30" height="6" rx="3" fill="#B8B4AB" />
            </g>

            {/* ── Floating badges ── */}
            <g className="r-badge r-float2" style={{ transformOrigin: "435px 200px" }}>
                <rect x="413" y="178" width="44" height="44" rx="11" fill="#1A1F3C" opacity="0.08" />
                <text x="435" y="206" textAnchor="middle" fontSize="20">✨</text>
            </g>
            <g className="r-badge r-float3" style={{ transformOrigin: "60px 360px" }}>
                <rect x="36" y="340" width="44" height="44" rx="11" fill="#8B91B5" opacity="0.12" />
                <text x="58" y="368" textAnchor="middle" fontSize="20">🌿</text>
            </g>
            <circle cx="452" cy="100" r="5" fill="#FF8D74" opacity="0.5" className="r-badge r-float1" />
            <circle cx="448" cy="290" r="6" fill="#C5C8D8" opacity="0.5" className="r-badge r-float3" />
        </svg>
    );
}
