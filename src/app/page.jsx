"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("../App"), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100svh',
      backgroundColor: '#04152D',
      gap: '16px'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid rgba(76, 175, 80, 0.2)',
        borderTopColor: '#4CAF50',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ color: '#fff', fontFamily: 'system-ui', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em' }}>
        Loading 1 Nation Pakistan...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
});

export default function Home() {
  return <App />;
}
