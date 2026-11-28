import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[SEIMS Server] Running on http://localhost:${PORT}`);
  console.log(`[SEIMS Server] Health check available at http://localhost:${PORT}/api/health`);
});
