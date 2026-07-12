import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { volunteers } from '../../../lib/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  const rows = await db.select().from(volunteers).orderBy(desc(volunteers.createdAt));
  return NextResponse.json(rows);
}

export async function POST(request) {
  const body = await request.json();

  const inserted = await db.insert(volunteers).values({
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    city: body.city,
    notes: body.notes || '',
  }).returning();

  return NextResponse.json(inserted[0], { status: 201 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Volunteer id is required' }, { status: 400 });
  }

  await db.delete(volunteers).where(eq(volunteers.id, Number(id)));
  return NextResponse.json({ success: true });
}
