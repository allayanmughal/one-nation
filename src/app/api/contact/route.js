import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { contactInquiries } from '../../../lib/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  const rows = await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  return NextResponse.json(rows);
}

export async function POST(request) {
  const body = await request.json();

  const inserted = await db.insert(contactInquiries).values({
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
  }).returning();

  return NextResponse.json(inserted[0], { status: 201 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Inquiry id is required' }, { status: 400 });
  }

  await db.delete(contactInquiries).where(eq(contactInquiries.id, Number(id)));
  return NextResponse.json({ success: true });
}
