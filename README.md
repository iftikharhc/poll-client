# Team Polls - React Client

A real-time polling interface that connects to a Node.js backend. Allows creating polls, voting, and viewing live results.

## Key Features
- 🗳️ Create polls with multiple options
- ✅ Vote and change your vote
- 📊 Real-time results visualization
- 🌐 WebSocket-powered live updates
- 📱 Responsive design

## Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/team-polls-client.git
cd team-polls-client

# Install dependencies
npm install

# Configure environment (create .env file)
echo "REACT_APP_API_URL=http://localhost:3000/api" > .env
echo "REACT_APP_WS_URL=ws://localhost:3000" >> .env

# Start development server
npm start
