import { useState, useEffect } from 'react'
import './App.css'
import RSVPForm from './RSVPForm.jsx'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showInvitation, setShowInvitation] = useState(false)
  const [showRSVPForm, setShowRSVPForm] = useState(false)
  const [isAttending, setIsAttending] = useState(null)

  useEffect(() => {
    // Show splash for 3 seconds, then reveal invitation
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
      setShowInvitation(true)
    }, 3000)

    return () => clearTimeout(splashTimer)
  }, [])

  const handleRSVP = (isAttending) => {
    setIsAttending(isAttending)
    setShowRSVPForm(true)
  }

  const handleRSVPClose = () => {
    setShowRSVPForm(false)
    setIsAttending(null)
  }

  const handleRSVPSubmit = (rsvpData) => {
    console.log('RSVP submitted:', rsvpData)
    // You can add additional logic here if needed
  }

  return (
    <div className="app">
      {/* Splash Screen with Flying Baby Animation */}
      {showSplash && (
        <div className="splash-screen">
          <div className="splash-content">
            <h1 className="splash-title">You're Invited to Celebrate<br />Adalyn's 1st Birthday!</h1>
            <p className="splash-subtitle">Loading the celebration...</p>
          </div>
          <div className="flying-baby">
            <img 
              src="https://res.cloudinary.com/daw3nco1o/image/upload/v1752541844/wonderwoman.png" 
              alt="Baby Adalyn" 
              className="baby-image"
            />
          </div>
        </div>
      )}

      {/* Main Invitation */}
      {showInvitation && (
        <div className="invitation">
          <header className="invitation-header">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                src="https://res.cloudinary.com/daw3nco1o/image/upload/v1752600244/Adalyn-min_bkgb5i.png" 
                alt="Baby Adalyn" 
                className="header-baby-image"
              />
              <div className="star-border">
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
                <div className="star">⭐</div>
              </div>
            </div>
            <h1>Adalyn is Entering Her 
              <br/>ONE-der Woman Year!</h1>
            <p className="subtitle">You're invited to celebrate!</p>
          </header>

          <main className="invitation-content">
            <section className="event-details">
              <h2>🎉 Celebration Details 🎉</h2>
              <div className="detail-item">
                <span className="icon">📅</span>
                <span>Date: Saturday August 23rd</span>
              </div>
              <div className="detail-item">
                <span className="icon">🕐</span>
                <span>Time: 12:30-4:30pm</span>
              </div>
              <div className="detail-item">
                <span className="icon">📍</span>
                <span>Location: <a href="https://maps.google.com/?q=17882+Hallcroft+Ln+Huntington+Beach+CA+92647" target="_blank" rel="noopener noreferrer" className="location-link">17882 Hallcroft Ln<br />
                Huntington Beach, CA 92647</a></span>
              </div>
              <div className="gift-detail-item">
                <span>Gifts are not required, but appreciated!
                 < br/>  Adalyn loves to read and play with toys</span>
              </div>
            </section>

            <section className="rsvp-section">
              <h2>RSVP</h2>
              <p>Please let us know if you can make it!</p>
              <div className="rsvp-buttons">
                <button 
                  className="rsvp-btn attending"
                  onClick={() => handleRSVP(true)}
                >
                  I'll be there! 🎉
                </button>
              </div>
            </section>
          </main>

          <footer className="invitation-footer">
            <p>We can't wait to celebrate with you!</p>
            <p>💕 Love, Adalyn, Darien, & Paul Naimo</p>
          </footer>
        </div>

      )}

      {/* RSVP Form Modal */}
      <RSVPForm
        isOpen={showRSVPForm}
        onClose={handleRSVPClose}
        isAttending={isAttending}
        onSubmit={handleRSVPSubmit}
      />
    </div>
  )
}

export default App
