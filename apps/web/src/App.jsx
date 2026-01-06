import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import './App.css';

export default function App() {

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    WebApp.setBackgroundColor('#0b0b0f');
  }, []);

  return (
    <div className="app">
      <h1>DUMDUM</h1>
    </div>
  );
}
