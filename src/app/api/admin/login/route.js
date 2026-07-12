import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createHash, scryptSync, timingSafeEqual } from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '2bf5418a3bfcacadc19677a69415c5cb:5c1e7deeb11c59a30142611a4757891506caa2e321cc2c845b92a10c0ce4f4c17636ba160f3d493586c1b5aaabcb0be008feb4e2b462e757ebfa5ebd18825e7e';

function verifyPassword(inputPassword, storedHash) {
  const [salt, expectedHash] = storedHash.split(':');
  if (!salt || !expectedHash) return false;

  const derivedKey = scryptSync(inputPassword, salt, 64);
  const expectedBuffer = Buffer.from(expectedHash, 'hex');
  const actualBuffer = derivedKey;

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body || {};

  const isValid = username === ADMIN_USERNAME && verifyPassword(password, ADMIN_PASSWORD_HASH);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('one_nation_admin_auth', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
