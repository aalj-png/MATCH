import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { matchesAPI } from '../api';
import '../styles/Home.css';

export const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchMatches();
  }, [filterStatus]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const data = await matchesAPI.getAll(0, 20, filterStatus || undefined);
      setMatches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return '#3498db';
      case 'ongoing':
        return '#f39c12';
      case 'completed':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  if (loading) return <div className="loading">Loading matches...</div>;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>⚽ Upcoming Matches</h1>
        <Link to="/matches/new" className="create-btn">
          + Create Match
        </Link>
      </div>

      <div className="filters">
        <button 
          className={filterStatus === '' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterStatus('')}
        >
          All
        </button>
        <button 
          className={filterStatus === 'scheduled' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterStatus('scheduled')}
        >
          Scheduled
        </button>
        <button 
          className={filterStatus === 'ongoing' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterStatus('ongoing')}
        >
          Ongoing
        </button>
        <button 
          className={filterStatus === 'completed' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterStatus('completed')}
        >
          Completed
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="matches-grid">
        {matches.length === 0 ? (
          <div className="no-matches">
            <p>No matches found</p>
            <Link to="/matches/new">Create your first match</Link>
          </div>
        ) : (
          matches.map(match => (
            <Link key={match.id} to={`/matches/${match.id}`} className="match-card">
              <div className="match-status" style={{ backgroundColor: getStatusColor(match.status) }}>
                {match.status.toUpperCase()}
              </div>
              <h3>{match.title}</h3>
              <div className="match-teams">
                <div className="team">{match.team_a}</div>
                <div className="vs">VS</div>
                <div className="team">{match.team_b}</div>
              </div>
              <div className="match-score">
                <span className="score">{match.score_a}</span>
                <span className="separator">-</span>
                <span className="score">{match.score_b}</span>
              </div>
              <div className="match-details">
                <p>📍 {match.location}</p>
                <p>📅 {new Date(match.date).toLocaleDateString()}</p>
              </div>
              <div className="match-meta">
                <small>By @{match.created_by.username}</small>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
