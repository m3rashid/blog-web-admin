export const instance = process.env.VERCEL_URL
  ? `https://${process.env.SERVER_URL}/api`
  : 'http://localhost:5000/api'
