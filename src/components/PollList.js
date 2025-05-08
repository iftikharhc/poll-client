import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { getActivePolls } from '../services/api';

const PollList = () => {
  const { polls } = useSocket();
  const [localPolls, setLocalPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const activePolls = await getActivePolls();
      setLocalPolls(activePolls);
    };
    fetchPolls();
  }, []);

  const displayedPolls = polls.length > 0 ? polls : localPolls;

  return (
    <div className="poll-list">
      <h1>Active Polls</h1>
      <Link to="/create">Create New Poll</Link>
      <ul>
        {displayedPolls.map((poll) => (
          <li key={poll.id}>
            <h3>{poll.question}</h3>
            <div>
              <Link to={`/vote/${poll.id}`}>Vote</Link>
              <Link to={`/results/${poll.id}`}>View Results</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollList;