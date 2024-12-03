import jwt from 'jsonwebtoken';

// Function to generate a JWT token for the user
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email }, // Payload
    process.env.JWT_SECRET,  // Use your JWT secret key from .env
    { expiresIn: '30d' }     // Token expiration time (30 days)
  );
};

// Optional: Function to verify JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
