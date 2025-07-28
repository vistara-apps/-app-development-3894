import { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

function CreateDebateModal({ onClose }) {
  const [formData, setFormData] = useState({
    topic: '',
    sport: ''
  });
  const { createDebate } = useData();
  const navigate = useNavigate();

  const sports = ['Basketball', 'Football', 'Soccer', 'Baseball', 'Hockey', 'Tennis', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDebate = createDebate(formData.topic, formData.sport);
    navigate(`/debate/${newDebate.id}`);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Start New Debate</h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="topic">Debate Topic</label>
            <textarea
              id="topic"
              name="topic"
              className="textarea"
              value={formData.topic}
              onChange={handleChange}
              required
              placeholder="Enter an engaging sports debate topic..."
              style={{ minHeight: '100px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sport">Sport Category</label>
            <select
              id="sport"
              name="sport"
              className="input"
              value={formData.sport}
              onChange={handleChange}
              required
            >
              <option value="">Select a sport</option>
              {sports.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={!formData.topic || !formData.sport}
          >
            Create Debate
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDebateModal;