/**
 * Animated AI automation pipeline — the illustration on the automation
 * service card. Purely decorative.
 */
export function AiWorkflowDiagram() {
  return (
    <svg viewBox="0 0 330 288" width="100%" height="100%" role="presentation" focusable="false">
      {/* Flow connectors */}
      <path d="M62 112 L100 112" fill="none" stroke="var(--border-strong)" strokeWidth="1.3" strokeDasharray="4 5" style={{ animation: 'dash-flow 1.1s linear infinite' }} />
      <path d="M206 112 L220 112" fill="none" stroke="var(--border-strong)" strokeWidth="1.3" strokeDasharray="4 5" style={{ animation: 'dash-flow 1.1s linear infinite', animationDelay: '.2s' }} />
      <path d="M260 102 C278 94 278 66 294 66" fill="none" stroke="var(--border-strong)" strokeWidth="1.3" strokeDasharray="4 5" style={{ animation: 'dash-flow 1.4s linear infinite' }} />
      <path d="M260 122 C278 130 278 158 294 158" fill="none" stroke="var(--border-strong)" strokeWidth="1.3" strokeDasharray="4 5" style={{ animation: 'dash-flow 1.4s linear infinite', animationDelay: '.5s' }} />
      <path d="M120 140 L96 178 M153 140 L153 178 M186 140 L214 178" fill="none" stroke="var(--border-default)" strokeWidth="1.1" strokeDasharray="3 4" style={{ animation: 'dash-flow 2s linear infinite' }} />

      <text x="276" y="86" fontFamily="var(--font-mono)" fontSize="8" fill="var(--text-muted)">
        true
      </text>
      <text x="274" y="146" fontFamily="var(--font-mono)" fontSize="8" fill="var(--text-muted)">
        false
      </text>

      {/* Trigger */}
      <path d="M8 104 L14 104 L11 110 L17 110 L8 122 L11 113 L6 113 Z" fill="var(--accent)" opacity=".85" />
      <rect x="22" y="96" width="40" height="32" rx="9" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1.2" />
      <text x="42" y="116" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-muted)">
        Form
      </text>

      {/* Agent */}
      <rect x="100" y="82" width="106" height="58" rx="12" fill="var(--surface-card)" stroke="var(--accent)" strokeWidth="1.3" />
      <rect x="100" y="82" width="106" height="58" rx="12" fill="none" stroke="var(--accent)" strokeWidth="3" opacity=".3" style={{ animation: 'node-glow 2.6s ease-in-out infinite' }} />
      <rect x="110" y="99" width="24" height="24" rx="7" fill="var(--accent)" />
      <text x="122" y="115" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="var(--color-bg)">
        AI
      </text>
      <text x="140" y="107" fontFamily="var(--font-display)" fontSize="9.5" fill="var(--text-heading)">
        AI Agent
      </text>
      <text x="140" y="120" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-muted)">
        tools
      </text>

      {/* Branch */}
      <rect x="220" y="96" width="40" height="32" rx="9" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1.2" />
      <path d="M230 106 L250 106 M230 112 L250 112 M230 118 L250 118" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />

      <rect x="294" y="50" width="32" height="32" rx="9" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1.2" />
      <path d="M304 66 L308 70 L316 62" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="294" y="142" width="32" height="32" rx="9" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1.2" />
      <path d="M303 158 L317 158 M310 151 L310 165" stroke="var(--text-muted)" strokeWidth="1.6" strokeLinecap="round" />

      {/* Tool row */}
      {(
        [
          { x: 60, w: 72, label: 'Claude', cx: 96 },
          { x: 140, w: 72, label: 'Memory', cx: 176 },
          { x: 220, w: 62, label: 'API', cx: 251 },
        ] as const
      ).map((tool) => (
        <g key={tool.label}>
          <rect x={tool.x} y="178" width={tool.w} height="24" rx="12" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1.1" />
          <text x={tool.cx} y="194" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-muted)">
            {tool.label}
          </text>
          <circle cx={tool.cx} cy="212" r="2" fill="var(--accent)" opacity=".5" />
        </g>
      ))}

      <path
        d="M96 216 L96 240 M176 216 L176 240 M251 216 L251 240 M96 240 L251 240 M153 240 L153 252"
        fill="none"
        stroke="var(--border-default)"
        strokeWidth="1"
        strokeDasharray="3 4"
        style={{ animation: 'dash-flow 2.4s linear infinite' }}
      />

      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'node-pop 6s ease-in-out infinite', animationDelay: '3s' }}>
        <rect x="96" y="252" width="116" height="26" rx="8" fill="var(--surface-card)" stroke="var(--accent)" strokeWidth="1.1" />
        <circle cx="111" cy="265" r="3.4" fill="var(--accent)" style={{ animation: 'node-glow 1.8s ease-in-out infinite' }} />
        <text x="162" y="269" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)">
          run · 24/7
        </text>
      </g>

      <g opacity=".75">
        <rect x="16" y="252" width="70" height="26" rx="8" fill="none" stroke="var(--border-default)" strokeWidth="1" />
        <text x="51" y="269" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-muted)">
          cron
        </text>
        <rect x="222" y="252" width="92" height="26" rx="8" fill="none" stroke="var(--border-default)" strokeWidth="1" />
        <text x="268" y="269" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-muted)">
          webhook
        </text>
      </g>
    </svg>
  );
}
