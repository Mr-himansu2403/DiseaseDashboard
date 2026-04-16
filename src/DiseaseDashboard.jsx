import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import StatCard from "./components/StatCard";
import PieSection from "./components/PieSection";

const COLORS = {
  purple: "#7F77DD",
  teal: "#1D9E75",
  coral: "#D85A30",
  amber: "#BA7517",
  pink: "#D4537E",
  blue: "#378ADD",
};

const genderData = [
  { name: "Male", value: 58, color: COLORS.blue },
  { name: "Female", value: 42, color: COLORS.pink },
];

const diarrheaData = [
  { name: "Bacterial", value: 64, color: COLORS.coral },
  { name: "Non-Bacterial", value: 36, color: COLORS.teal },
];

const ageData = [
  { name: "0-2 yrs", value: 45, color: COLORS.amber },
  { name: "2-5 yrs", value: 55, color: COLORS.purple },
];

const villageData = [
  { village: "Kalahandi", tested: 87, positive: 62 },
  { village: "Dhenkanal", tested: 74, positive: 48 },
  { village: "Rayagada", tested: 63, positive: 41 },
  { village: "Koraput", tested: 91, positive: 67 },
  { village: "Nuapada", tested: 55, positive: 34 },
  { village: "Bolangir", tested: 68, positive: 45 },
];

export default function DiseaseDashboard() {
  const totalTested = villageData.reduce((a, b) => a + b.tested, 0);
  const totalPositive = villageData.reduce((a, b) => a + b.positive, 0);

  const barData = villageData.map(v => ({
    name: v.village,
    "Positive %": Math.round((v.positive / v.tested) * 100),
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#F4F2FD", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #3C3489 0%, #7F77DD 100%)",
        padding: "30px 20px", color: "white", borderRadius: "0 0 32px 32px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 800 }}>DIACUE TEST REPORT</h1>
        <p style={{ margin: "5px 0 0", opacity: 0.8 }}>Field Surveillance Dashboard · Updated April 16, 2026</p>
      </div>

      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 15, marginBottom: 25 }}>
          <StatCard label="Total Tested" value={totalTested} sub="All Villages" />
          <StatCard label="Positive Cases" value={totalPositive} sub={`${Math.round((totalPositive / totalTested) * 100)}% Rate`} color={COLORS.coral} />
          <StatCard label="Active Surveillance" value="6 Villages" sub="Odisha Region" color={COLORS.teal} />
        </div>

        {/* Charts Row */}
        <div style={{ display: "flex", gap: 15, flexWrap: "wrap", marginBottom: 25 }}>
          <PieSection title="Gender Split" data={genderData} />
          <PieSection title="Diarrhea Type" data={diarrheaData} />
          <PieSection title="Age Group" data={ageData} />
        </div>

        {/* Bar Chart Section */}
        <div style={{
          background: "white", borderRadius: 20, padding: "20px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)"
        }}>
          <h2 style={{ margin: "0 0 20px", fontSize: "18px", color: "#3C3489" }}>Village-wise Positive Cases (%)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#F4F2FD' }} />
              <Bar dataKey="Positive %" fill={COLORS.purple} radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
