import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { projects } from '../../../lib/schema';
import { desc, eq } from 'drizzle-orm';

const DEFAULT_PROJECTS = [
  {
    title: 'Medical Camp',
    location: 'Abbottabad & Mansehra',
    date: 'March 2026',
    status: 'Ongoing (Twice a month)',
    category: 'Free Medical Camps',
    description: 'Providing free medical consultations, diagnostics, and essential medicines to underserved communities.',
    image: '/medical_camp.jpeg',
    details: 'Our Medical Camp initiative brings quality healthcare directly to communities in need. Mobile clinics staffed with qualified physicians and paramedics offer free health screenings, vaccinations, and basic treatment.'
  },
  {
    title: 'Stray Animal Welfare',
    location: 'Haripur & Surrounding Districts',
    date: 'June 2026',
    status: 'Ongoing',
    category: 'Nature Rehabilitation',
    description: 'Rescuing and rehabilitating injured and abandoned animals while promoting animal welfare awareness.',
    image: '/animal_rescue.jpeg',
    details: 'This initiative focuses on animal rescue operations, rehabilitation centers, and community education on animal welfare. We partner with veterinarians to provide free medical care for rescued animals.'
  },
  {
    title: 'Nature Rehabilitation',
    location: 'Galyat & Kaghan Valley',
    date: 'January 2026',
    status: 'Completed',
    category: 'Nature Rehabilitation',
    description: 'Large-scale tree plantation drive to combat deforestation and improve environmental sustainability.',
    image: '/massive_plantation.jpeg',
    details: 'Our Nature Rehabilitation initiative plants thousands of trees across KP. Volunteers engage in environmental conservation, creating green spaces, and combating climate change impacts on mountain communities.'
  },
  {
    title: 'Special Nation',
    location: 'Peshawar & Urban Centers',
    date: 'October 2026',
    status: 'Ongoing',
    category: 'Special Nation',
    description: 'Dedicated welfare programs and support services for persons with disabilities.',
    image: '/special_nation.jpeg',
    details: 'Special Nation focuses on empowering disabled individuals through vocational training, assistive devices, accessibility support, and inclusive community programs that ensure dignity and participation.'
  },
  {
    title: 'Project Haya',
    location: 'KP Tribal Districts',
    date: 'November 2026',
    status: 'Ongoing',
    category: 'Project Haya',
    description: 'Empowerment initiative supporting women\'s economic independence and skill development.',
    image: '/pervaaz-e-zann.jpeg',
    details: 'Project Haya promotes the values of modesty, dignity, and moral responsibility through awareness campaigns, educational workshops, and community engagement. The initiative empowers individuals, especially youth, to build strong character, uphold ethical values, and contribute positively to society.'
  }
];

export async function GET() {
  const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));

  if (rows.length === 0) {
    const inserted = await db.insert(projects).values(DEFAULT_PROJECTS).returning();
    return NextResponse.json(inserted);
  }

  return NextResponse.json(rows);
}

export async function POST(request) {
  const body = await request.json();

  const inserted = await db.insert(projects).values({
    title: body.title,
    description: body.description,
    details: body.details || body.description,
    location: body.location,
    date: body.date,
    status: body.status,
    category: body.category,
    image: body.image || '/placeholder-project.jpg',
  }).returning();

  return NextResponse.json(inserted[0], { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: 'Project id is required' }, { status: 400 });
  }

  const updated = await db.update(projects)
    .set({
      title: body.title,
      description: body.description,
      details: body.details || body.description,
      location: body.location,
      date: body.date,
      status: body.status,
      category: body.category,
      image: body.image || '/placeholder-project.jpg',
    })
    .where(eq(projects.id, Number(body.id)))
    .returning();

  return NextResponse.json(updated[0]);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Project id is required' }, { status: 400 });
  }

  await db.delete(projects).where(eq(projects.id, Number(id)));
  return NextResponse.json({ success: true });
}
