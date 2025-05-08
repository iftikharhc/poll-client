import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { getResults } from '../services/api';

const ResultsView = () => {
  const { pollId } = useParams();
  const { results, polls } = useSocket();
  const [poll, setPoll] = useState(null);
  const [pollResults, setPollResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // First try to get from socket data
      const foundPoll = polls.find(p => p.id === pollId);
      if (foundPoll) {
        setPoll(foundPoll);
      } else {
        // If not found, fetch from API
        const data = await getResults(pollId);
        setPoll(data.poll);
        setPollResults(data.results);
      }
    };
    fetchData();
  }, [pollId, polls]);

  useEffect(() => {
    if (results[pollId]) {
      setPollResults(results[pollId]);
    }
  }, [results, pollId]);

  if (!poll) return <div>Loading...</div>;

  const totalVotes = pollResults.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="results-view">
      <h2>{poll.question}</h2>
      <div className="results">
        {poll.options.map((option, index) => {
          const result = pollResults.find(r => r.option_index === index);
          const count = result ? result.count : 0;
          const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          
          return (
            <div key={index} className="result-bar">
              <div className="option-info">
                <span className="option-text">{option}</span>
                <span className="vote-count">{count} votes ({percentage}%)</span>
              </div>
              <div className="bar-container">
                <div 
                  className="bar" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total-votes">Total votes: {totalVotes}</div>
    </div>
  );
};

export default ResultsView;