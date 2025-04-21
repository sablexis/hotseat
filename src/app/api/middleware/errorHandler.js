// src/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: err.message });
    }
    
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate entry', details: err.message });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  };