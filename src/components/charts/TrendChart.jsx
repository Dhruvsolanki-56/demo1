import React, { useMemo, useState } from "react";

/**
 * Single-series line + soft area fill, built in plain SVG per the dataviz
 * skill: 2px line, ~10% opacity area wash, hairline gridlines, hover
 * crosshair + tooltip. One series needs no legend box (the title says
 * what's plotted).
 */
export default function TrendChart({ data, height = 180, label = "Submissions" }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const width = 600;
  const padding = { top: 12, right: 8, bottom: 20, left: 8 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const maxVal = Math.max(1, ...data.map((d) => d.count));
  const stepX = data.length > 1 ? plotW / (data.length - 1) : 0;

  const points = useMemo(
    () =>
      data.map((d, i) => ({
        x: padding.left + i * stepX,
        y: padding.top + plotH - (d.count / maxVal) * plotH,
        ...d,
      })),
    [data, stepX, plotH, maxVal, padding.left, padding.top]
  );

  // Smoothed curve via simple Catmull-Rom-to-Bezier conversion, instead of
  // straight segments -- reads as a premium chart rather than a wireframe.
  const linePath = useMemo(() => smoothPath(points), [points]);
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${padding.top + plotH} L ${points[0]?.x ?? 0} ${padding.top + plotH} Z`;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - relX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setHoverIdx(closest);
  };

  const hovered = hoverIdx !== null ? points[hoverIdx] : null;
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <p className="text-sm font-semibold text-primary-900">{label}</p>
        <p className="text-xs text-slate-400">{total} total in this window</p>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIdx(null)}
        role="img"
        aria-label={`${label} over time, ${total} total`}
      >
        <defs>
          <linearGradient id="trendAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f56dd" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#4f56dd" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* horizontal gridlines at 0/50/100% for a premium chart-paper feel */}
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={padding.left}
            y1={padding.top + plotH * t}
            x2={width - padding.right}
            y2={padding.top + plotH * t}
            stroke="#eef2f7"
            strokeWidth={1}
          />
        ))}

        <path d={areaPath} fill="url(#trendAreaFill)" stroke="none" />
        <path d={linePath} fill="none" stroke="#4f56dd" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {hovered && (
          <>
            <line x1={hovered.x} y1={padding.top} x2={hovered.x} y2={padding.top + plotH} stroke="#cbd5e1" strokeWidth={1} />
            <circle cx={hovered.x} cy={hovered.y} r={4} fill="#4f56dd" stroke="#fff" strokeWidth={2} />
          </>
        )}

        {/* first/last date labels */}
        {data.length > 0 && (
          <>
            <text x={padding.left} y={height - 4} fontSize="10" fill="#94a3b8">
              {formatShortDate(data[0].date)}
            </text>
            <text x={width - padding.right} y={height - 4} fontSize="10" fill="#94a3b8" textAnchor="end">
              {formatShortDate(data[data.length - 1].date)}
            </text>
          </>
        )}
      </svg>
      {/* Always rendered (never conditionally mounted) so this line's height
          is reserved whether or not something is hovered -- toggling it in
          and out of the DOM shifted every section below the chart on every
          mouse move/leave. Invisible, not absent, when there's no hover. */}
      <div className={`text-xs text-slate-600 mt-1 text-center ${hovered ? "" : "invisible"}`}>
        <span className="font-semibold text-primary-700">{hovered?.count ?? 0}</span> on {formatShortDate(hovered?.date ?? data[data.length - 1]?.date)}
      </div>
    </div>
  );
}

function formatShortDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Draws a smooth curve through every point using cubic Beziers with
 * Catmull-Rom-derived control points -- no new dependency, just geometry. */
function smoothPath(points) {
  if (points.length < 3) {
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}
