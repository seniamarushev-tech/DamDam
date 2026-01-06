import { useEffect, useMemo } from 'react';
import WebApp from '@twa-dev/sdk';
import './App.css';

export default function App() {
  const version = 'v0.1 CHECK';

  const tgUser = useMemo(() => {
    const u = WebApp?.initDataUnsafe?.user;
    if (!u) return null;
    return {
      id: u.id,
      name: [u.first_name, u.last_name].filter(Boolean).join(' '),
      username: u.username ? '@' + u.username : '(no username)',
    };
  }, []);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    WebApp.setHeaderColor?.('#0b0b0f');
    WebApp.setBackgroundColor?.('#0b0b0f');
  }, []);

  return (
    <div className="app">
      <div className="card">
        <div className="title">DUMDUM</div>
        <div className="muted">{version}</div>

        <div className="block">
          <div className="label">Telegram user</div>
          {tgUser ? (
            <div className="mono">
              id: {tgUser.id}<br />
              name: {tgUser.name}<br />
              user: {tgUser.username}
            </div>
          ) : (
            <div className="mono">NO initDataUnsafe.user (открой именно внутри Telegram)</div>
          )}
        </div>
      </div>
    </div>
  );
}
