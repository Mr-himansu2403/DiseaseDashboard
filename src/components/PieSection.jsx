import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieSection = ({ title, data }) => (
  <div style={{
    background: "white",
    borderRadius: 16,
    padding: "16px 12px",
    boxShadow: "0 2px 16px rgba(83,74,183,0.10)",
    flex: 1,
    minWidth: "280px",
    position: "relative",
  }}>
    <p style={{ fontSize: 12, fontWeight: 700, color: "#534AB7", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>{title}</p>
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={70} dataKey="value" labelLine={false} label={CustomPieLabel}>
          {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
        </Pie>
        <Tooltip formatter={(v) => `${v}%`} />
      </PieChart>
    </ResponsiveContainer>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 4 }}>
      {data.map((entry, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#444" }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: entry.color, display: "inline-block" }} />
          {entry.name} {entry.value}%
        </span>
      ))}
    </div>
  </div>
);

export default PieSection;
