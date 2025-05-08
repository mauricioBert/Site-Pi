import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // O token vem no formato: "Bearer TOKEN"
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Decodificação do token disponível em `req.user`
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
