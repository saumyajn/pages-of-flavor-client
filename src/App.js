// src/App.jsx
import React from 'react';
import HomePage from './pages/HomePage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
function App() {
  return (
      <div style={styles.appContainer}>
        <Header />
        <main style={styles.mainContent}>
          <HomePage />
        </main>
        <Footer />
      </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flexGrow: 1,
 
  },
};

export default App;
