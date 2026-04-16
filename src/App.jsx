import React, { useState, useCallback, useRef } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { storeDiseaseData } from './firebase';

// Import Assets
import bacterial1 from './assets/Bacterial1.jpeg';
import bacterial2 from './assets/Bacterial2.jpeg';
import nonBacterial1 from './assets/Non-Bacterial1.jpeg';
import nonBacterial2 from './assets/Non-Bacterial2.jpeg';

// --- MOCK DATA ---
const STATS_DATA = [
  { id: 1, label: 'Total Kits Tested', value: '1,284', color: '#7C3AED' },
  { id: 2, label: 'Bacterial Positive', value: '642', color: '#EF4444' },
  { id: 3, label: 'Non-Bacterial Pos', value: '312', color: '#F97316' },
  { id: 4, label: 'Pending Results', value: '330', color: '#6B7280' },
];

const GENDER_DATA = [
  { name: 'Male', value: 58, color: '#3B82F6' },
  { name: 'Female', value: 42, color: '#EC4899' },
];

const TYPE_DATA = [
  { name: 'Bacterial', value: 64, color: '#7C3AED', path: 'bacterial' },
  { name: 'Non-Bacterial', value: 36, color: '#F97316', path: 'nonbacterial' },
];

const AGE_DATA = [
  { name: '0–2 years', value: 45, color: '#14B8A6' },
  { name: '2–5 years', value: 55, color: '#F59E0B' },
];

const VILLAGE_DATA = [
  { name: 'Kalahandi', positive: 75, negative: 25 },
  { name: 'Dhenkanal', positive: 45, negative: 55 },
  { name: 'Rayagada', positive: 82, negative: 18 },
  { name: 'Koraput', positive: 60, negative: 40 },
  { name: 'Nuapada', positive: 35, negative: 65 },
  { name: 'Bolangir', positive: 90, negative: 10 },
];

const BACTERIAL_KITS_DATA = [
  { id: 'KIT-BD-001', name: 'Raju Kumar', village: 'Kalahandi', date: '01 Apr 2026', result: 'Positive' },
  { id: 'KIT-BD-002', name: 'Sunita Devi', village: 'Dhenkanal', date: '02 Apr 2026', result: 'Negative' },
  { id: 'KIT-BD-003', name: 'Manoj Sahu', village: 'Rayagada', date: '03 Apr 2026', result: 'Positive' },
  { id: 'KIT-BD-004', name: 'Priya Nayak', village: 'Koraput', date: '04 Apr 2026', result: 'Positive' },
  { id: 'KIT-BD-005', name: 'Amit Patel', village: 'Nuapada', date: '05 Apr 2026', result: 'Negative' },
  { id: 'KIT-BD-006', name: 'Geeta Rani', village: 'Bolangir', date: '06 Apr 2026', result: 'Positive' },
  { id: 'KIT-BD-007', name: 'Deepak Das', village: 'Kalahandi', date: '07 Apr 2026', result: 'Negative' },
  { id: 'KIT-BD-008', name: 'Laxmi Behera', village: 'Dhenkanal', date: '08 Apr 2026', result: 'Positive' },
  { id: 'KIT-BD-009', name: 'Suresh Majhi', village: 'Rayagada', date: '09 Apr 2026', result: 'Negative' },
  { id: 'KIT-BD-010', name: 'Anita Singh', village: 'Koraput', date: '10 Apr 2026', result: 'Positive' }
];

const NON_BACTERIAL_KITS_DATA = [
  { id: 'KIT-NB-001', name: 'Kavita Panda', village: 'Nuapada', date: '01 Apr 2026', result: 'Negative' },
  { id: 'KIT-NB-002', name: 'Rohit Meher', village: 'Bolangir', date: '02 Apr 2026', result: 'Positive' },
  { id: 'KIT-NB-003', name: 'Sita Bagh', village: 'Kalahandi', date: '03 Apr 2026', result: 'Negative' },
  { id: 'KIT-NB-004', name: 'Arjun Naik', village: 'Dhenkanal', date: '04 Apr 2026', result: 'Positive' },
  { id: 'KIT-NB-005', name: 'Meena Gond', village: 'Rayagada', date: '05 Apr 2026', result: 'Negative' },
  { id: 'KIT-NB-006', name: 'Bikash Jena', village: 'Koraput', date: '06 Apr 2026', result: 'Negative' },
  { id: 'KIT-NB-007', name: 'Puja Mallick', village: 'Nuapada', date: '07 Apr 2026', result: 'Positive' },
  { id: 'KIT-NB-008', name: 'Dinesh Soren', village: 'Bolangir', date: '08 Apr 2026', result: 'Negative' }
];

// --- STYLES ---
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #F5F3FF;
      color: #1E1B4B;
      overflow-x: hidden;
      width: 100%;
    }
    .container {
      width: 100%;
      max-width: 100%;
      padding: 16px;
      margin: 0 auto;
    }
    @media (min-width: 768px) {
      .container { padding: 24px; max-width: 1200px; }
    }
    .card {
      background: #FFFFFF;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      margin-bottom: 16px;
    }
    .header {
      background: #7C3AED;
      padding: 16px;
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-title {
      color: white;
      font-weight: bold;
      font-size: clamp(18px, 4vw, 26px);
      line-height: 1.2;
    }
    .header-subtitle {
      color: #EDE9FE;
      font-size: 13px;
      margin-top: 4px;
    }
    .header-date {
      color: #EDE9FE;
      font-size: 12px;
      margin-top: 4px;
    }

    .role-switcher {
      display: flex;
      background: rgba(255,255,255,0.2);
      padding: 4px;
      border-radius: 8px;
      gap: 4px;
    }
    .role-btn {
      padding: 6px 12px;
      border-radius: 6px;
      border: none;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .role-btn.active { background: white; color: #7C3AED; }
    .role-btn:not(.active) { background: transparent; color: white; }

    .grid-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }
    @media (min-width: 768px) {
      .grid-stats { grid-template-columns: repeat(4, 1fr); gap: 24px; }
    }
    .stat-card {
      border-left: 4px solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .stat-value { font-size: 28px; font-weight: 800; }
    .stat-label { font-size: 12px; color: #6B7280; margin-top: 4px; }

    /* Nav Cards */
    .nav-cards-container {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .nav-card {
      flex: 1;
      min-width: 280px;
      padding: 20px;
      border-radius: 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      transition: transform 0.2s;
    }
    .nav-card:hover { transform: scale(1.02); }
    .nav-card.bacterial { background: linear-gradient(to right, #F97316, #DC2626); }
    .nav-card.non-bacterial { background: linear-gradient(to right, #10B981, #059669); }
    .nav-card-top { font-size: 14px; font-weight: 300; }
    .nav-card-bottom { font-size: 20px; font-weight: bold; }
    .nav-card-arrow { font-size: 24px; }

    .grid-pies {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    @media (min-width: 768px) {
      .grid-pies { grid-template-columns: repeat(3, 1fr); gap: 24px; }
    }
    .pie-card { text-align: center; }
    .pie-title { font-weight: bold; font-size: 15px; margin-bottom: 8px; text-align: left; }
    .interactive-card {
      border: 2px solid #7C3AED;
      animation: pulse-border 2s infinite;
    }
    @keyframes pulse-border {
      0% { border-color: #7C3AED; box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
      70% { border-color: #7C3AED; box-shadow: 0 0 0 6px rgba(124, 58, 237, 0); }
      100% { border-color: #7C3AED; box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
    }

    .chart-container-scroll { overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch; }
    .chart-container-scroll::-webkit-scrollbar { display: none; }
    
    .village-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    @media (min-width: 768px) {
      .village-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }
    }
    .village-card { display: flex; flex-direction: column; gap: 8px; }
    .village-name { font-weight: 600; font-size: 14px; }
    .progress-bar-bg { background: #E5E7EB; border-radius: 4px; height: 8px; width: 100%; overflow: hidden; }
    .progress-bar-fill { height: 100%; border-radius: 4px; transition: width 0.3s ease; }

    .back-btn-purple {
      width: 100%;
      background: #7C3AED;
      color: white;
      border: none;
      padding: 10px 20px;
      font-weight: 600;
      border-radius: 8px;
      margin-bottom: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    @media (min-width: 768px) { .back-btn-purple { width: auto; } }

    .kit-card-row {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 16px;
      margin-bottom: 12px;
    }
    @media (min-width: 768px) {
      .kit-card-row { flex-direction: row; align-items: center; justify-content: space-between; }
    }
    .kit-info-block { flex: 1; min-width: 200px; }
    .kit-id-text { font-weight: bold; color: #7C3AED; font-size: 15px; margin-bottom: 4px; }
    .patient-name-text { font-size: 14px; color: #1E1B4B; margin-bottom: 2px; }
    .kit-detail-text { font-size: 13px; color: #6B7280; }
    
    .result-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 12px;
      margin-top: 8px;
    }

    .upload-box-wrapper { width: 100%; }
    @media (min-width: 768px) { .upload-box-wrapper { width: 80px; } }

    .upload-box-ui {
      width: 100%;
      height: 80px;
      border: 2px dashed #D1D5DB;
      border-radius: 8px;
      background: #F9FAFB;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #9CA3AF;
      font-size: 11px;
    }
    .upload-box-ui.disabled { cursor: default; opacity: 0.6; }
    .preview-img-ui { width: 100%; height: 80px; object-fit: cover; border-radius: 8px; cursor: pointer; }
    .preview-img-ui.viewer { cursor: default; }
    @media (min-width: 768px) {
      .upload-box-ui, .preview-img-ui { width: 80px; }
    }
    
    .footer-padding { padding-bottom: 40px; }
  `}</style>
);

// --- COMPONENTS ---

const Header = ({ role, setRole }) => (
  <header className="header">
    <div className="header-content">
      <div>
        <div className="header-title">DIACUE TEST REPORT</div>
        <div className="header-subtitle">Diarrhea Diagnostic Surveillance Dashboard</div>
        <div className="header-date">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
      </div>
      <div className="role-switcher">
        <button className={`role-btn ${role === 'viewer' ? 'active' : ''}`} onClick={() => setRole('viewer')}>Viewer</button>
        <button className={`role-btn ${role === 'uploader' ? 'active' : ''}`} onClick={() => setRole('uploader')}>Uploader</button>
      </div>
    </div>
  </header>
);

const StatCard = ({ label, value, color }) => (
  <div className="card stat-card" style={{ borderLeftColor: color }}>
    <div className="stat-value" style={{ color: color }}>{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const CustomPieLegend = ({ payload }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '12px' }}>
    {payload.map((entry, index) => (
      <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: entry.color }}></div>
        <span>{entry.value} {entry.payload.value}%</span>
      </div>
    ))}
  </div>
);

const PieSection = ({ title, data, onSliceClick, isInteractive }) => (
  <div className={`card pie-card ${isInteractive ? 'interactive-card' : ''}`}>
    <div className="pie-title">{title}</div>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={70}
          paddingAngle={5}
          dataKey="value"
          onClick={(data) => isInteractive && onSliceClick && onSliceClick(data.path)}
          style={{ cursor: isInteractive ? 'pointer' : 'default' }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend content={<CustomPieLegend />} />
      </PieChart>
    </ResponsiveContainer>
    {isInteractive && <div style={{ fontSize: '12px', color: '#7C3AED', marginTop: '12px', fontWeight: '500' }}>👆 Tap a slice to view kits</div>}
  </div>
);

const VillageProgressCard = ({ name, positive }) => {
  const isHighAlert = positive > 70;
  return (
    <div className="card village-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="village-name">{name}</div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: isHighAlert ? '#EF4444' : '#1E1B4B' }}>{positive}%</div>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${positive}%`, backgroundColor: isHighAlert ? '#EF4444' : '#7C3AED' }} />
      </div>
    </div>
  );
};

const KitRecordCard = ({ kit, image, onUpload, onSave, role }) => {
  const isPositive = kit.result === 'Positive';
  const isViewer = role === 'viewer';
  const [isSaving, setIsSaving] = React.useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (isViewer) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(kit.id, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (!isViewer) {
      fileInputRef.current.click();
    }
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      await onSave(kit);
      alert(`Kit ${kit.id} saved to database!`);
    } catch (err) {
      alert("Error saving kit. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="kit-card-row">
      <div className="kit-info-block">
        <div className="kit-id-text">{kit.id}</div>
        <div className="patient-name-text">{kit.name}</div>
        <div className="kit-detail-text">Village: {kit.village}</div>
        <div className="kit-detail-text">Date: {kit.date}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
          <div className="result-badge" style={{ backgroundColor: isPositive ? '#FEE2E2' : '#D1FAE5', color: isPositive ? '#DC2626' : '#059669', marginTop: 0 }}>
            {kit.result.toUpperCase()} {isPositive ? '🔴' : '🟢'}
          </div>
          <button 
            onClick={handleSaveClick}
            disabled={isSaving}
            style={{ 
              padding: '4px 12px', 
              fontSize: '12px', 
              borderRadius: '20px', 
              border: '1px solid #7C3AED', 
              background: isSaving ? '#F3F4F6' : 'white', 
              color: '#7C3AED', 
              cursor: isSaving ? 'default' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isSaving ? 'Saving...' : '☁️ Save'}
          </button>
        </div>
      </div>
      
      <div className="upload-box-wrapper">
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} disabled={isViewer} />
        {image ? (
          <img 
            src={image} 
            alt="Kit" 
            className={`preview-img-ui ${isViewer ? 'viewer' : ''}`} 
            onClick={handleUploadClick} 
          />
        ) : (
          <div className={`upload-box-ui ${isViewer ? 'disabled' : ''}`} onClick={handleUploadClick}>
            <div style={{ fontSize: '18px' }}>📷</div>
            <div>{isViewer ? 'No Image' : 'Upload'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [view, setView] = useState('main'); // 'main', 'bacterial', 'nonbacterial'
  const [role, setRole] = useState('viewer'); // 'viewer', 'uploader'
  
  const [kitImages, setKitImages] = useState({
    'KIT-BD-001': bacterial1,
    'KIT-BD-002': bacterial2,
  });
  const [nbKitImages, setNbKitImages] = useState({
    'KIT-NB-001': nonBacterial1,
    'KIT-NB-002': nonBacterial2,
  });

  const handleBacterialUpload = (id, data) => setKitImages(prev => ({ ...prev, [id]: data }));
  const handleNonBacterialUpload = (id, data) => setNbKitImages(prev => ({ ...prev, [id]: data }));

  const handleSaveToFirebase = async (kit) => {
    // Determine type based on ID prefix
    const type = kit.id.includes('-BD-') ? 'Bacterial' : 'Non-Bacterial';
    await storeDiseaseData({
      ...kit,
      type,
      // We don't save the full base64 image to Firestore due to size limits, 
      // but we record that it has an image if available
      hasImage: !!(kitImages[kit.id] || nbKitImages[kit.id])
    });
  };

  const renderDashboard = () => (
    <div className="container">
      {/* STAT CARDS */}
      <div className="grid-stats">
        {STATS_DATA.map(stat => <StatCard key={stat.id} {...stat} />)}
      </div>

      {/* NEW NAV CARDS */}
      <div className="nav-cards-container">
        <div className="nav-card bacterial" onClick={() => { setView('bacterial'); window.scrollTo(0,0); }}>
          <div>
            <div className="nav-card-top">64% of cases</div>
            <div className="nav-card-bottom">Bacterial Kits</div>
          </div>
          <div className="nav-card-arrow">→</div>
        </div>
        <div className="nav-card non-bacterial" onClick={() => { setView('nonbacterial'); window.scrollTo(0,0); }}>
          <div>
            <div className="nav-card-top">36% of cases</div>
            <div className="nav-card-bottom">Non-Bacterial Kits</div>
          </div>
          <div className="nav-card-arrow">→</div>
        </div>
      </div>

      {/* PIE CHARTS */}
      <div className="grid-pies">
        <PieSection title="Patient Gender" data={GENDER_DATA} />
        <PieSection title="Diarrhea Type" data={TYPE_DATA} isInteractive={true} onSliceClick={(path) => { setView(path); window.scrollTo(0,0); }} />
        <PieSection title="Age Group Distribution" data={AGE_DATA} />
      </div>

      {/* VILLAGE CHART */}
      <div className="card">
        <div className="pie-title" style={{ marginBottom: '4px' }}>Village-wise Diarrhea Test Results (%)</div>
        <div className="chart-container-scroll">
          <div style={{ minWidth: '550px', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VILLAGE_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#F5F3FF' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar name="Positive %" dataKey="positive" fill="#7C3AED" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar name="Negative %" dataKey="negative" fill="#14B8A6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="village-grid">
          {VILLAGE_DATA.map(v => <VillageProgressCard key={v.name} name={v.name} positive={v.positive} />)}
        </div>
      </div>
      <div className="footer-padding" />
    </div>
  );

  const renderBacterialPage = () => (
    <div className="container">
      <button className="back-btn-purple" onClick={() => setView('main')}>← Back to Dashboard</button>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#7C3AED', fontSize: '20px' }}>🧪 Bacterial Diarrhea — Kit Records</h2>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Showing all bacterial diarrhea diagnostic kits</p>
      </div>
      {BACTERIAL_KITS_DATA.map(kit => (
        <KitRecordCard 
          key={kit.id} 
          kit={kit} 
          image={kitImages[kit.id]} 
          onUpload={handleBacterialUpload} 
          onSave={handleSaveToFirebase}
          role={role} 
        />
      ))}
      <div className="footer-padding" />
    </div>
  );

  const renderNonBacterialPage = () => (
    <div className="container">
      <button className="back-btn-purple" onClick={() => setView('main')}>← Back to Dashboard</button>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#7C3AED', fontSize: '20px' }}>🧫 Non-Bacterial Diarrhea — Kit Records</h2>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Showing all non-bacterial diarrhea diagnostic kits</p>
      </div>
      {NON_BACTERIAL_KITS_DATA.map(kit => (
        <KitRecordCard 
          key={kit.id} 
          kit={kit} 
          image={nbKitImages[kit.id]} 
          onUpload={handleNonBacterialUpload} 
          onSave={handleSaveToFirebase}
          role={role} 
        />
      ))}
      <div className="footer-padding" />
    </div>
  );

  return (
    <>
      <GlobalStyles />
      <Header role={role} setRole={setRole} />
      {view === 'main' && renderDashboard()}
      {view === 'bacterial' && renderBacterialPage()}
      {view === 'nonbacterial' && renderNonBacterialPage()}
    </>
  );
}
