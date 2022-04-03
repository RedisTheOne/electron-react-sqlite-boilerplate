import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';

type PostType = {
  id: number;
  json: string;
};

const Hello = () => {
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const mountedRef = useRef<boolean>();

  useEffect(() => {
    mountedRef.current = true;
    window.electron.ipcRenderer.getDatabase(`
      SELECT * FROM Post
    `);

    window.electron.ipcRenderer.on('get-from-db', (d) => {
      if (Array.isArray(d) && mountedRef.current) {
        setPosts(d);
      }
    });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          window.electron.ipcRenderer.getDatabase(`
            SELECT * FROM Post
          `);
        }}
      >
        Reload
      </Button>
      {posts.map((p) => (
        <div key={p.id}>
          <p>ID: {p.id}</p>
          <p>JSON: {p.json}</p>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
