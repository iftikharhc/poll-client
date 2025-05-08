import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import PollVote from './components/PollVote';
import ResultsView from './components/ResultsView';
import './styles.css';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<PollList />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/vote/:pollId" element={<PollVote />} />
            <Route path="/results/:pollId" element={<ResultsView />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;