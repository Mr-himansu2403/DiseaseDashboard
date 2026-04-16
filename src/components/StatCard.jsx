import React from 'react';

const StatCard = ({ label, value, sub, color }) => (
  <div style={{
    background: "white",
    borderRadius: 14,
    padding: "14px 16px",
    boxShadow: "0 2px 12px rgba(83,74,183,0.09)",
    border: "1.5px solid #EEEDFE",
    display: "flex",
    flexDirection: "column",
    gap: 2
  }}>
    <span style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</span>
    <span style={{ fontSize: 26, fontWeight: 800, color: color || "#3C3489" }}>{value}</span>
    {sub && <span style={{ fontSize: 11, color: "#aaa" }}>{sub}</span>}
  </div>
);

export default StatCard;
