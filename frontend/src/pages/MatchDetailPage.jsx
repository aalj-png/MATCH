import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { matchesAPI } from '../api';
import '../styles/MatchDetail.css';

export const MatchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const fetchMatch = async () => {
    try {
      setLoading(true);
      const data = await matchesAPI.getById(id);
      setMatch(data);
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await matchesAPI.update(id, formData, token);
      setMatch(formData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await matchesAPI.delete(id, token);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading match...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!match) return <div className="error-message">Match not found</div>;

  const isCreator = user && match.created_by_id === user.id;

  return (
    <div className="match-detail-container">
      <button onClick={() => navigate('/')} className="back-btn">← Back</button>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <h1>Edit Match</h1>
          
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Team A</label>
              <input
                type="text"
                name="team_a"
                value={formData.team_a}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Team B</label>
              <input
                type="text"
                name="team_b"
                value={formData.team_b}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Score A</label>
              <input
                type="number"
                name="score_a"
                value={formData.score_a}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Score B</label>
              <input
                type="number"
                name="score_b"
                value={formData.score_b}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date?.slice(0, 16)}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="match-detail">
          <div className="match-header">
            <div>
              <h1>{match.title}</h1>
              <span className="status-badge" style={{
                backgroundColor: match.status === 'scheduled' ? '#3498db' : 
                                match.status === 'ongoing' ? '#f39c12' : '#27ae60'
              }}>
                {match.status.toUpperCase()}
              </span>
            </div>
            {isCreator && (
              <div className="header-buttons">
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  ✏️ Edit
                </button>
                <button onClick={handleDelete} className="delete-btn">
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          <div className="match-content">
            <div className="teams-section">
              <div className="team-box">
                <h2>{match.team_a}</h2>
                <p className="team-score">{match.score_a}</p>
              </div>
              <div className="vs-divider">VS</div>
              <div className="team-box">
                <h2>{match.team_b}</h2>
                <p className="team-score">{match.score_b}</p>
              </div>
            </div>

            <div className="details-section">
              <div className="detail-item">
                <span className="label">📍 Location:</span>
                <span className="value">{match.location}</span>
              </div>
              <div className="detail-item">
                <span className="label">📅 Date:</span>
                <span className="value">{new Date(match.date).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">👤 Created by:</span>
                <span className="value">@{match.created_by.username}</span>
              </div>
              {match.description && (
                <div className="detail-item">
                  <span className="label">📝 Description:</span>
                  <p className="value">{match.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
