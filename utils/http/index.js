const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;  // Use a more secure key in production

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
}

function reqBody(request) {
    return typeof request.body === "string"
      ? JSON.parse(request.body)
      : request.body;
}

// Function to verify the JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Function to hash password before saving
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Function to compare password with hashed password
async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePassword , reqBody};
