import errorHandler from '@/models/error/handler';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.nextUrl);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      throw new Error('id is required');
    }

    const res = await axios({
      method: 'GET',
      url: `https://youtube.com/watch?v=${id}`,
    });

    const pattern = /\{"text"\:"현재 "\},\{"text"\:"(\d+(?:,\d{3})*)"\},\{"text"\:"명 시청 중"\}/;
    const count = res.data.match(pattern)?.[1];

    if (typeof count !== 'string') {
      return NextResponse.json({ data: '?' });
    }

    return NextResponse.json({ data: count });
  } catch (error) {
    console.log('error', error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ data: message }, { status });
  }
};

export const dynamic = 'force-dynamic';