// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} Pages of Flavor. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#ffe2ec',
    padding: '10px 0',
    textAlign: 'center',
    borderTop: '2px solid #ffc8dd',
    position: 'relative',
    marginTop: 'auto',
  },
  text: {
    margin: 0,
    color: '#888',
    fontSize: '0.9rem',
  },
};
