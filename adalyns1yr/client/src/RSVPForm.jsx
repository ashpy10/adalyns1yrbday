import { useState } from 'react';
import './RSVPForm.css';

function RSVPForm({ isOpen, onClose, isAttending, onSubmit }) {
  const [formData, setFormData] = useState({
    guest_name: '',
    adult_count: 1,
    child_count: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'adult_count' || name === 'child_count' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guest_name.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    try {
      const rsvpData = {
        guest_name: formData.guest_name.trim(),
        is_attending: isAttending,
        adult_count: formData.adult_count,
        child_count: formData.child_count
      };

      const response = await fetch('http://localhost:3001/api/rsvps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData)
      });

      if (response.ok) {
        const result = await response.json();
        setShowSuccess(true);
        onSubmit(result);
      } else {
        throw new Error('Failed to submit RSVP');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Sorry, there was an error submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ guest_name: '', adult_count: 1, child_count: 0 });
      setShowSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rsvp-modal-overlay" onClick={handleClose}>
            {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <div className="success-icon">🎉</div>
            <h3>We got your RSVP!</h3>
            <p>Can't wait to see you!</p>
            <button 
              className="success-close-btn"
              onClick={handleClose}
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
      <div className="rsvp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rsvp-modal-close" onClick={handleClose} disabled={isSubmitting}>
          ×
        </button>
        
        <div className="rsvp-modal-content">
          <h2 className="rsvp-modal-title">
            {isAttending ? '🎉 Yay! You\'re Coming!' : '😔 We\'ll Miss You!'}
          </h2>
          
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="form-group">
              <label htmlFor="guest_name">Your Name *</label>
              <input
                type="text"
                id="guest_name"
                name="guest_name"
                value={formData.guest_name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>

            {isAttending && (
              <>
                <div className="form-group">
                  <label htmlFor="adult_count">Number of Adults</label>
                  <input
                    type="number"
                    id="adult_count"
                    name="adult_count"
                    value={formData.adult_count}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="child_count">Number of Children</label>
                  <input
                    type="number"
                    id="child_count"
                    name="child_count"
                    value={formData.child_count}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    disabled={isSubmitting}
                  />
                </div>
              </>
            )}

            <div className="rsvp-form-buttons">
              <button
                type="submit"
                className="rsvp-btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVPForm; 