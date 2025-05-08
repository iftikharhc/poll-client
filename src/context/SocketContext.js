import { createContext, useContext, useEffect, useState } from 'react';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [polls, setPolls] = useState([]);
  const [activePoll, setActivePoll] = useState(null);
  const [results, setResults] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const { event: eventType, data } = JSON.parse(event.data);
      
      switch (eventType) {
        case 'poll_created':
          setPolls(prev => [...prev, data]);
          break;
        case 'vote_update':
          setResults(prev => ({
            ...prev,
            [data.pollId]: data.results
          }));
          break;
        case 'poll_closed':
          setPolls(prev => prev.map(poll => 
            poll.id === data.pollId ? { ...poll, is_active: false } : poll
          ));
          break;
        default:
          break;
      }
    };

    return () => {
      if (ws) ws.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, polls, activePoll, setActivePoll, results }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);