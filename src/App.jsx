import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Upload, Users, Search, ExternalLink, RefreshCw, Heart, Shield, HelpCircle, ChevronRight } from 'lucide-react';

// --- Styles ---
const AntigravityStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --bg-soft: #eef2ff;
      --glass: rgba(255, 255, 255, 0.7);
      --primary: #6c63ff;
      --secondary: #ff6584;
      --success: #43e97b;
      --text: #1a1a2e;
      --text-muted: #5e5e7a;
      --accent-sky: #70d6ff;
      --accent-mint: #99ffc7;
      
      --shadow-violet: 0 20px 60px rgba(108, 99, 255, 0.12), 0 4px 16px rgba(108, 99, 255, 0.08);
      --shadow-bold: 0 30px 80px rgba(108, 99, 255, 0.2), 0 10px 30px rgba(108, 99, 255, 0.15);
      --shadow-pink: 0 15px 40px rgba(255, 101, 132, 0.15);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background-color: var(--bg-soft);
      font-family: 'Inter', sans-serif;
      color: var(--text);
      overflow-x: hidden;
      min-height: 100vh;
    }

    h1, h2, h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    /* Floating Background Orbs */
    .orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      z-index: 0;
      opacity: 0.5;
      pointer-events: none;
      will-change: transform;
    }

    .orb-1 { width: 400px; height: 400px; background: var(--primary); top: -100px; left: -100px; animation: floatUp 25s infinite ease-in-out; }
    .orb-2 { width: 500px; height: 500px; background: var(--secondary); bottom: -150px; right: -100px; animation: floatUp 30s infinite ease-in-out reverse; }
    .orb-3 { width: 300px; height: 300px; background: var(--accent-sky); top: 40%; left: 70%; animation: floatUp 20s infinite ease-in-out 2s; }
    .orb-4 { width: 350px; height: 350px; background: var(--accent-mint); top: 60%; left: 10%; animation: floatUp 35s infinite ease-in-out 5s; }
    .orb-5 { width: 250px; height: 250px; background: var(--primary); top: 10%; right: 20%; animation: floatUp 22s infinite ease-in-out 1s; }

    @keyframes floatUp {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }

    /* General Animations */
    @keyframes riseIn {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @keyframes bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @keyframes popIn {
      0% { transform: scale3d(0.5, 0.5, 1); opacity: 0; }
      70% { transform: scale3d(1.08, 1.08, 1); opacity: 1; }
      100% { transform: scale3d(1, 1, 1); opacity: 1; }
    }

    @keyframes slideFloat {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .animate-rise { animation: riseIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    .animate-bob { animation: bob 3s infinite ease-in-out; }
    .animate-pop { animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

    /* Glassmorphism */
    .glass-card {
      background: var(--glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 24px;
      box-shadow: var(--shadow-violet);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      transform-style: preserve-3d;
      will-change: transform;
    }

    .glass-card:hover {
      box-shadow: var(--shadow-bold);
    }

    /* Navbar */
    .nav-pill {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      height: 64px;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: min(90%, 1000px);
      z-index: 100;
      background: var(--glass);
      backdrop-filter: blur(15px);
      border-radius: 32px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: var(--shadow-violet);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.25rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .brand-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
    }

    /* Layout Containers */
    .container {
      max-width: 1000px;
      margin: 120px auto 100px;
      padding: 0 24px;
      position: relative;
      z-index: 1;
    }

    .hero {
      text-align: center;
      margin-bottom: 60px;
    }

    .hero h1 {
      font-size: 4rem;
      margin-bottom: 16px;
      line-height: 1.1;
      text-shadow: 0 10px 20px rgba(108, 99, 255, 0.1);
    }

    .hero p {
      font-size: 1.25rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    /* Stats Row */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    .stat-card {
      padding: 32px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .stat-card .value {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1;
    }

    .stat-card .label {
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
    }

    /* Upload Area */
    .upload-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    .upload-card {
      padding: 40px;
      text-align: center;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 2px dashed rgba(108, 99, 255, 0.2);
    }

    .upload-card:hover {
      border-color: var(--primary);
      background: rgba(108, 99, 255, 0.03);
    }

    .upload-card.active {
      border-style: solid;
      border-color: var(--primary);
    }

    .upload-card .icon {
      width: 64px;
      height: 64px;
      background: white;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: var(--primary);
      box-shadow: var(--shadow-violet);
    }

    /* Buttons */
    .btn-gradient {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      padding: 18px 36px;
      border-radius: 18px;
      font-weight: 700;
      font-size: 1.1rem;
      border: none;
      cursor: pointer;
      width: 100%;
      box-shadow: 0 8px 30px rgba(108, 99, 255, 0.4);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .btn-gradient:hover:not(:disabled) {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 15px 40px rgba(108, 99, 255, 0.5);
    }

    .btn-gradient:active:not(:disabled) {
      transform: translateY(-2px);
    }

    .btn-gradient:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      filter: grayscale(0.5);
    }

    /* Tabs */
    .tabs-nav {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 48px;
      margin-bottom: 32px;
    }

    .tab-pill {
      padding: 12px 24px;
      border-radius: 50px;
      background: var(--glass);
      border: 1px solid rgba(255, 255, 255, 0.4);
      cursor: pointer;
      font-weight: 600;
      color: var(--text-muted);
      transition: all 0.3s ease;
      box-shadow: var(--shadow-violet);
    }

    .tab-pill.active {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      transform: translateY(-4px);
      box-shadow: var(--shadow-bold);
      border: none;
    }

    /* Search Box */
    .search-container {
      margin-bottom: 32px;
      position: relative;
    }

    .search-input {
      width: 100%;
      height: 60px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: var(--glass);
      padding: 0 60px 0 24px;
      font-size: 1rem;
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border 0.3s ease, box-shadow 0.3s ease;
      box-shadow: var(--shadow-violet);
    }

    .search-input:focus {
      border-color: var(--primary);
      box-shadow: var(--shadow-bold);
    }

    .search-icon {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }

    /* User List */
    .user-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .user-pill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background: var(--glass);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: var(--shadow-violet);
      transition: all 0.3s ease;
    }

    .user-pill:hover {
      transform: translateY(-3px) scale(1.005);
      box-shadow: var(--shadow-bold);
      background: rgba(255, 255, 255, 0.85);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      font-size: 1.1rem;
    }

    .username {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .btn-profile {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 12px;
      background: rgba(108, 99, 255, 0.1);
      color: var(--primary);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .btn-profile:hover {
      background: var(--primary);
      color: white;
    }

    /* Privacy & Help */
    .footer-note {
      text-align: center;
      margin-top: 40px;
      color: var(--text-muted);
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .pagination {
      margin-top: 40px;
      text-align: center;
    }

    .btn-secondary {
      background: var(--glass);
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 14px 28px;
      border-radius: 16px;
      cursor: pointer;
      font-weight: 600;
      color: var(--text-muted);
      transition: all 0.2s ease;
      box-shadow: var(--shadow-violet);
    }

    .btn-secondary:hover {
      background: white;
      transform: translateY(-2px);
      box-shadow: var(--shadow-bold);
    }

    /* 3D Tilt Wrapper */
    .tilt-wrapper {
      perspective: 1000px;
    }
  `}</style>
);

// --- Components ---

const TiltCard = ({ children, className = "", delay = "0s", ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      className={`tilt-wrapper ${className}`}
      style={{ animationDelay: delay }}
      {...props}
    >
      <div
        ref={cardRef}
        className="glass-card h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </div>
  );
};

const StatCard = ({ value, label, color, icon: Icon, delay }) => (
  <div className="animate-pop" style={{ animationDelay: delay }}>
    <TiltCard className="stat-card">
      <div className="icon" style={{ color }}>
        <Icon size={32} />
      </div>
      <div className="value" style={{
        background: `linear-gradient(135deg, ${color}, #000)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>{value}</div>
      <div className="label">{label}</div>
    </TiltCard>
  </div>
);

// --- Main App ---

export default function App() {
  const [followersData, setFollowersData] = useState(null);
  const [followingData, setFollowingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('not-following-back');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 30;

  // Parsing Logic
  const parseInstagramData = (data, isFollowing) => {
    console.log(`Parsing ${isFollowing ? 'following' : 'followers'} data:`, data);
    try {
      let entries = [];

      if (Array.isArray(data)) {
        // Direct array format (common in followers_1.json)
        entries = data;
      } else if (data && typeof data === 'object') {
        // Object format with specific keys (common in following.json)
        entries = data.relationships_following ||
          data.relationships_followers ||
          data.following ||
          data.followers ||
          [];

        // If we still didn't find an array, try to find the first array in the object
        if (entries.length === 0) {
          const firstArray = Object.values(data).find(val => Array.isArray(val));
          if (firstArray) entries = firstArray;
        }
      }

      console.log(`Found ${entries.length} raw entries`);

      return entries.flatMap(item => {
        // Instagram data items usually have a string_list_data array
        const listData = item.string_list_data || [];
        return listData.map(d => {
          // Robust username extraction: Use d.value if present, fallback to item.title
          const username = d.value || item.title || 'unknown';
          return {
            username,
            href: d.href,
            initials: username.substring(0, 2).toUpperCase()
          };
        });
      }).filter(u => u.username && u.username !== 'unknown'); // Ensure we have a valid username
    } catch (e) {
      console.error("Parse error:", e);
      return [];
    }
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const parsed = parseInstagramData(json, type === 'following');
        if (type === 'followers') setFollowersData(parsed);
        else setFollowingData(parsed);
      } catch (err) {
        alert("Invalid JSON file. Please upload the raw export files from Instagram.");
      }
    };
    reader.readAsText(file);
  };

  // Analysis Logic
  const analysis = useMemo(() => {
    if (!followersData || !followingData) return { notFollowingBack: [], mutuals: [], fans: [] };

    const followersSet = new Set(followersData.map(u => u.username));
    const followingSet = new Set(followingData.map(u => u.username));

    const notFollowingBack = followingData.filter(u => !followersSet.has(u.username));
    const mutuals = followingData.filter(u => followersSet.has(u.username));
    const fans = followersData.filter(u => !followingSet.has(u.username));

    return { notFollowingBack, mutuals, fans };
  }, [followersData, followingData]);

  const filteredList = useMemo(() => {
    let baseList = [];
    if (activeTab === 'not-following-back') baseList = analysis.notFollowingBack;
    else if (activeTab === 'mutuals') baseList = analysis.mutuals;
    else baseList = analysis.fans;

    if (!searchTerm) return baseList;
    return baseList.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [analysis, activeTab, searchTerm]);

  const pagedList = filteredList.slice(0, page * ITEMS_PER_PAGE);

  const startOver = () => {
    setFollowersData(null);
    setFollowingData(null);
    setSearchTerm('');
    setPage(1);
  };

  // Color generator for avatars
  const getAvatarColor = (username) => {
    const colors = ['#6c63ff', '#ff6584', '#43e97b', '#70d6ff', '#f9d423', '#a18cd1'];
    const index = username.length % colors.length;
    return colors[index];
  };

  return (
    <>
      <AntigravityStyles />

      {/* Dynamic Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
      <div className="orb orb-5"></div>

      <nav className="nav-pill">
        <div className="brand">
          <div className="brand-icon"><Shield size={20} /></div>
          Blansyn IG Tracker
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {(followersData || followingData) && (
            <button onClick={startOver} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              <RefreshCw size={14} style={{ marginRight: '6px' }} /> Start Over
            </button>
          )}
        </div>
      </nav>

      <main className="container">
        {/* Hero Section */}
        {!followersData && !followingData && (
          <section className="hero animate-rise">
            <h1>Blansyn Instagram <br />Followers Tracker</h1>
            <p>The ultimate professional tool to compare your Instagram followers and following lists with 100% privacy and Zero Gravity speed.</p>

            <div className="glass-card" style={{ padding: '32px', marginTop: '48px', textAlign: 'left', maxWidth: '700px', marginInline: 'auto' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HelpCircle size={22} color="var(--primary)" /> How to get your data?
              </h3>
              <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <li>Go to <b>Instagram Settings</b> &gt; <b>Account Center</b> &gt; <b>Your Information & Permissions</b> &gt; <b>Export Your Information</b></li>
                <li>Request a download in <b>JSON format</b> (Select "Followers and Following" only for speed).</li>
                <li>Once you get the ZIP, extract it and find <code>followers_1.json</code> and <code>following.json</code>.</li>
              </ol>
            </div>
          </section>
        )}

        {/* Upload Section */}
        <section className="upload-grid">
          <div className="animate-rise" style={{ animationDelay: '0.1s' }}>
            <label className="tilt-wrapper" style={{ display: 'block' }}>
              <input type="file" hidden onChange={(e) => handleFileUpload(e, 'followers')} accept=".json" />
              <div className={`glass-card upload-card animate-bob ${followersData ? 'active' : ''}`}>
                <div className="icon"><Users size={32} /></div>
                <h3>Followers</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                  {followersData ? `✅ ${followersData.length} Loaded` : 'Upload followers_1.json'}
                </p>
              </div>
            </label>
          </div>

          <div className="animate-rise" style={{ animationDelay: '0.2s' }}>
            <label className="tilt-wrapper" style={{ display: 'block' }}>
              <input type="file" hidden onChange={(e) => handleFileUpload(e, 'following')} accept=".json" />
              <div className={`glass-card upload-card animate-bob ${followingData ? 'active' : ''}`} style={{ animationDelay: '0.5s' }}>
                <div className="icon"><Users size={32} /></div>
                <h3>Following</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
                  {followingData ? `✅ ${followingData.length} Loaded` : 'Upload following.json'}
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* Analysis Results */}
        {(followersData || followingData) && (
          <div className="animate-rise" style={{ animationDelay: '0.3s' }}>
            <div className="stats-row">
              <StatCard
                icon={Shield}
                value={analysis.notFollowingBack.length}
                label="Not Following Back"
                color="var(--primary)"
                delay="0.4s"
              />
              <StatCard
                icon={Heart}
                value={analysis.mutuals.length}
                label="Mutual Follows"
                color="var(--success)"
                delay="0.5s"
              />
              <StatCard
                icon={Users}
                value={analysis.fans.length}
                label="You Don't Follow Back"
                color="var(--accent-sky)"
                delay="0.6s"
              />
            </div>

            <nav className="tabs-nav">
              <button
                className={`tab-pill ${activeTab === 'not-following-back' ? 'active' : ''}`}
                onClick={() => { setActiveTab('not-following-back'); setPage(1); }}
              >
                Ghosts 👻
              </button>
              <button
                className={`tab-pill ${activeTab === 'mutuals' ? 'active' : ''}`}
                onClick={() => { setActiveTab('mutuals'); setPage(1); }}
              >
                Mutuals 💚
              </button>
              <button
                className={`tab-pill ${activeTab === 'fans' ? 'active' : ''}`}
                onClick={() => { setActiveTab('fans'); setPage(1); }}
              >
                Fans 👀
              </button>
            </nav>

            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={`Search ${filteredList.length} users...`}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              />
              <Search className="search-icon" size={24} />
            </div>

            <div className="user-list">
              {pagedList.map((user, index) => (
                <div
                  key={user.username}
                  className="user-pill"
                  style={{
                    animation: `slideFloat 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
                    animationDelay: `${Math.min(index * 20, 300)}ms`
                  }}
                >
                  <div className="user-info">
                    <div className="avatar-circle" style={{
                      background: `linear-gradient(135deg, ${getAvatarColor(user.username)}, white)`,
                      boxShadow: `0 4px 12px ${getAvatarColor(user.username)}44`
                    }}>
                      {user.initials}
                    </div>
                    <span className="username">{user.username}</span>
                  </div>
                  <a href={user.href} target="_blank" rel="noopener noreferrer" className="btn-profile">
                    View Profile <ExternalLink size={14} />
                  </a>
                </div>
              ))}

              {pagedList.length === 0 && (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No users found here.
                </div>
              )}
            </div>

            {filteredList.length > pagedList.length && (
              <div className="pagination">
                <button onClick={() => setPage(page + 1)} className="btn-secondary" style={{ width: '100%', maxWidth: '300px' }}>
                  Show More ({filteredList.length - pagedList.length} left)
                </button>
              </div>
            )}
          </div>
        )}

        <div className="footer-note" style={{ flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={14} color="var(--success)" /> Your files never leave your device. Processing is 100% local.
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', pt: '20px', width: '100%', maxWidth: '300px', margin: '20px auto 0' }}></div>
          <a href="https://www.blansyn.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Developed by Blansyn <ExternalLink size={16} />
          </a>
        </div>
      </main>
    </>
  );
}
