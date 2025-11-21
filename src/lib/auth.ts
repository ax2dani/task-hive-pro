import 'server-only';
import type { NextRequest } from 'next/server';

const username = process.env.AUTH_USER || 'admin';
const password = process.env.AUTH_PASS || 'password123';
const expectedAuthHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

export function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('Authorization');
  return authHeader === expectedAuthHeader;
}
