import { NextResponse, type NextRequest } from 'next/server';
import { getTasks } from '@/lib/data';
import { checkAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized access. Please provide valid credentials.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const filter = searchParams.get('filter') || '';

    let tasks = await getTasks();

    if (filter) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(filter.toLowerCase()) ||
          task.description.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const total = tasks.length;
    const paginatedTasks = tasks.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      data: paginatedTasks,
      total,
      page,
      limit,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
