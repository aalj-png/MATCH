import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { matchesAPI } from '../api';
import '../styles/CreateMatch.css';

export const CreateMatchPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    team_a: '',
    team_b: '',
    date: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const matchData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };
      const response = await matchesAPI.create(matchData, token);
      navigate(`/matches/${response.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-match-container">
      <button onClick={() => navigate('/')} className="back-btn">← Back</button>

      <div className="create-match-box">
        <h1>Create New Match</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Match Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Finals 2024"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="team_a">Team A</label>
              <input
                type="text"
                id="team_a"
                name="team_a"
                value={formData.team_a}
                onChange={handleChange}
                required
                placeholder="Team name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="team_b">Team B</label>
              <input
                type="text"
                id="team_b"
                name="team_b"
                value={formData.team_b}
                onChange={handleChange}
                required
                placeholder="Team name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date & Time</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Match venue"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any additional details..."
              rows="4"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Creating...' : 'Create Match'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
