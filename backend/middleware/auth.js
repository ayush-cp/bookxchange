const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access.' });
      } else {
        console.log(decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Access token is missing or invalid.' });
  }
};
