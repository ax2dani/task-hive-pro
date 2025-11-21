import { NextResponse, type NextRequest } from 'next/server';
import { getAuditLogs } from '@/lib/data';
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
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const logs = await getAuditLogs();
    
    const total = logs.length;
    const paginatedLogs = logs.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      data: paginatedLogs,
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
