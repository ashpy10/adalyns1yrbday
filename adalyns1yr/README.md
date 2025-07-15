# Adalyn's 1st Birthday Simple App 

## Backend (Node.js + Express)
Core Dependencies:
express - Web framework
pg - PostgreSQL client
cors - Cross-Origin Resource Sharing middleware
dotenv - Environment variable loading

## Frontend (React + Vite)
Core Dependencies:
react - UI library
react-dom - React DOM rendering
vite - Build tool and dev server


## Deployment 
- Done on Render (BE) & Netlify (FE)


Ran into issues with the RSVP form submission in deployment, here are the steps we took to fix them: 


## What We Fixed:
1. Database Connection Issues
Problem: Render service was trying to connect to localhost instead of your Render database
Fix: Set the correct DATABASE_URL environment variable in Render dashboard
Result: Service now connects to the right database

2. CORS Configuration
Problem: Frontend (Netlify) couldn't communicate with backend (Render) due to CORS restrictions
Fix: Added your Netlify domain (https://adalynbday.netlify.app) to allowed origins
Result: Cross-origin requests now work

3. Database Timeout Issues
Problem: Database queries were timing out after 5-15 seconds
Fix:
Increased timeouts to 30 seconds
Added SSL configuration (rejectUnauthorized: false)
Removed complex timeout wrappers that were causing conflicts
Result: Database operations complete successfully

4. Performance Optimization
Problem: Render service was slow due to cold starts and resource limitations
Fix:
Upgraded to a paid Render plan
Added health check endpoint (/health)
Optimized database connection settings
Result: Much faster response times

5. Error Handling
Problem: Form would hang indefinitely on errors
Fix:
Added 30-second timeout to frontend fetch requests
Created custom error popup with fallback contact info
Made 'x' button always accessible
Result: Better user experience with proper error feedback

## Key Takeaways:
Environment variables in cloud platforms need to be set in their dashboard, not just local files
CORS is crucial for frontend-backend communication
Database timeouts need to be configured properly for cloud environments
SSL settings can resolve connectivity issues
Error handling should always provide user-friendly feedback
