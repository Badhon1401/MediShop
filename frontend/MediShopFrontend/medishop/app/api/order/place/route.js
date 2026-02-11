import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/dist/server/api-utils';

export async function POST(req) {
  try {
    const order = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("medishop-auth-token")?.value;

    if (!token) {
      redirect("/login");
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
      `${process.env.BACKEND_SERVER_URL}/api/orders/${shopId}/place`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to Place Order.' },
        { status: response.status }
      );
    }

    const savedOrder = await response.json();
    return NextResponse.json(savedOrder, { status: 201 });

  } catch (error) {
    console.error('Order Placing Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
