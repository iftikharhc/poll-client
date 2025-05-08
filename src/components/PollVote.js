import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { castVote, getResults } from '../services/api';

const PollVote = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const { polls } = useSocket();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [voterId] = useState(`voter-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const fetchPoll = async () => {
      const foundPoll = polls.find(p => p.id === pollId);
      if (foundPoll) {
        setPoll(foundPoll);
      } else {
        // If poll not in socket data, fetch from API
        const results = await getResults(pollId);
        setPoll(results.poll);
      }
    };
    fetchPoll();
  }, [pollId, polls]);

  const handleVote = async () => {
    if (selectedOption === null) return;
    await castVote(pollId, selectedOption, voterId);
    navigate(`/results/${pollId}`);
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div className="poll-vote">
      <h2>{poll.question}</h2>
      <div className="options">
        {poll.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name="poll-option"
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
      <button onClick={handleVote} disabled={selectedOption === null}>
        Submit Vote
      </button>
      <button onClick={() => navigate(`/results/${pollId}`)}>
        View Results
      </button>
    </div>
  );
};

export default PollVote;