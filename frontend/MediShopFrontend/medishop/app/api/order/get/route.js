import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("medishop-auth-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const url = new URL(req.url);
    const shopId = url.searchParams.get('shopId');
    
    if (!shopId) {
      return NextResponse.json(
        { error: 'Shop ID is required' }, 
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.BACKEND_SERVER_URL}/api/orders/${shopId}/get`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to fetch Orders' },
        { status: response.status }
      );
    }

    const orders = await response.json();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Orders Fetching Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}