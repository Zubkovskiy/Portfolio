/**
 * Animated React component tree — the illustration on the frontend service card.
 * Purely decorative: `aria-hidden` is applied by the card that renders it.
 */
export function ComponentTreeDiagram() {
  return (
    <svg viewBox="0 0 330 288" width="100%" height="100%" role="presentation" focusable="false">
      {/* Connectors */}
      <path
        d="M165 68 L165 82 Q165 88 159 88 L58 88 Q52 88 52 94 L52 102 M165 88 L165 102 M171 88 L272 88 Q278 88 278 94 L278 102"
        fill="none"
        stroke="rgba(162,255,1,.26)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="5 5"
        style={{ animation: 'dash-flow 1.8s linear infinite' }}
      />
      <path
        d="M165 134 L165 144 Q165 150 159 150 L124 150 Q118 150 118 156 L118 162 M171 150 L206 150 Q212 150 212 156 L212 162"
        fill="none"
        stroke="rgba(162,255,1,.2)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="5 5"
        style={{ animation: 'dash-flow 1.8s linear infinite', animationDelay: '.3s' }}
      />
      <path
        d="M212 190 L212 202"
        fill="none"
        stroke="rgba(162,255,1,.16)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="5 5"
        style={{ animation: 'dash-flow 1.8s linear infinite', animationDelay: '.6s' }}
      />

      {/* Junctions */}
      <circle cx="165" cy="88" r="2.2" fill="var(--accent)" />
      <circle cx="52" cy="88" r="2.2" fill="var(--border-strong)" />
      <circle cx="278" cy="88" r="2.2" fill="var(--border-strong)" />
      <circle cx="165" cy="150" r="2.2" fill="var(--accent)" />

      {/* Root node */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'node-pop 6s ease-in-out infinite' }}>
        <rect
          x="118"
          y="34"
          width="94"
          height="34"
          rx="10"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth="1.6"
          style={{ filter: 'drop-shadow(0 0 7px rgba(162,255,1,.3))' }}
        />
        <circle
          cx="133"
          cy="51"
          r="3.2"
          fill="var(--accent)"
          style={{ animation: 'node-glow 1.8s ease-in-out infinite' }}
        />
        <text x="172" y="56" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--accent)">
          {'<App />'}
        </text>
      </g>

      {/* Layer 2 */}
      {(
        [
          { x: 16, label: 'Header', delay: '.5s' },
          { x: 129, label: 'Hero', delay: '.9s' },
          { x: 242, label: 'Footer', delay: '1.3s' },
        ] as const
      ).map((node) => (
        <g
          key={node.label}
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'node-pop 6s ease-in-out infinite',
            animationDelay: node.delay,
          }}
        >
          <rect
            x={node.x}
            y="102"
            width="72"
            height="32"
            rx="9"
            fill="var(--surface-card)"
            stroke="var(--border-default)"
            strokeWidth="1.2"
          />
          <text x={node.x + 36} y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-body)">
            {node.label}
          </text>
        </g>
      ))}

      {/* Layer 3 */}
      {(
        [
          { x: 82, label: 'Card', delay: '1.8s' },
          { x: 176, label: 'Button', delay: '2.2s' },
        ] as const
      ).map((node) => (
        <g
          key={node.label}
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'node-pop 6s ease-in-out infinite',
            animationDelay: node.delay,
          }}
        >
          <rect
            x={node.x}
            y="162"
            width="72"
            height="28"
            rx="14"
            fill="var(--surface-card)"
            stroke="var(--border-default)"
            strokeWidth="1.2"
          />
          <text x={node.x + 36} y="180" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-muted)">
            {node.label}
          </text>
        </g>
      ))}

      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'node-pop 6s ease-in-out infinite', animationDelay: '2.6s' }}>
        <rect x="178" y="202" width="68" height="22" rx="11" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1" />
        <text x="212" y="217" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-muted)">
          onClick
        </text>
      </g>

      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'node-pop 6s ease-in-out infinite', animationDelay: '2.4s' }}>
        <rect x="26" y="196" width="94" height="24" rx="7" fill="none" stroke="var(--border-default)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="73" y="212" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-muted)">
          state · props
        </text>
      </g>

      {/* Render bus */}
      <path
        d="M118 190 L118 234 M52 134 L52 234 M52 234 L278 234"
        fill="none"
        stroke="rgba(162,255,1,.13)"
        strokeWidth="1"
        strokeDasharray="3 4"
        style={{ animation: 'dash-flow 2.4s linear infinite' }}
      />
      <path
        d="M278 134 L278 234 M165 234 L165 248"
        fill="none"
        stroke="rgba(162,255,1,.13)"
        strokeWidth="1"
        strokeDasharray="3 4"
        style={{ animation: 'dash-flow 2.4s linear infinite', animationDelay: '.4s' }}
      />

      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'node-pop 6s ease-in-out infinite', animationDelay: '3s' }}>
        <rect x="106" y="248" width="118" height="26" rx="8" fill="var(--surface-card)" stroke="var(--accent)" strokeWidth="1.1" />
        <circle cx="121" cy="261" r="3.4" fill="var(--accent)" style={{ animation: 'node-glow 1.8s ease-in-out infinite' }} />
        <text x="172" y="265" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)">
          render · 60fps
        </text>
      </g>

      <g opacity=".75">
        <rect x="18" y="248" width="72" height="26" rx="8" fill="none" stroke="var(--border-default)" strokeWidth="1" />
        <text x="54" y="265" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-muted)">
          hooks
        </text>
        <rect x="240" y="248" width="72" height="26" rx="8" fill="none" stroke="var(--border-default)" strokeWidth="1" />
        <text x="276" y="265" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--text-muted)">
          a11y
        </text>
      </g>
    </svg>
  );
}
