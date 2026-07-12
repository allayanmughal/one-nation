import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('one_nation_admin_auth');

  return NextResponse.json({ authenticated: auth?.value === 'true' });
}
