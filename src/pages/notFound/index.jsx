import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '20px',
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <FaExclamationTriangle style={{ fontSize: '48px', color: '#0d9488', opacity: 0.5 }} />
      <h1 style={{ fontSize: '72px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#475569' }}>
        Sayfa Bulunamadı
      </h2>
      <p style={{ color: '#94a3b8', maxWidth: '400px' }}>
        Aradığınız sayfa mevcut değil veya taşındı.
      </p>
      <Link to="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#0d9488',
        color: 'white',
        padding: '14px 32px',
        borderRadius: '999px',
        fontWeight: '600',
        fontSize: '15px',
        textDecoration: 'none',
        marginTop: '8px',
        boxShadow: '0 4px 14px rgba(13,148,136,0.2)',
        transition: 'all 0.3s ease',
      }}>
        <FaHome />
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
