const { getSession } = require('next-auth/react');

const verifySession = async (req, res, next) => {
  const session = await getSession({ req });
  
  if (session) {
    // Assuming the session object contains a user property with an id
    req.user = { _id: session.user.id };
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifySession;