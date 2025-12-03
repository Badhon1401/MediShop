import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/dist/server/api-utils';

export async function PUT(req) {
  try {
    const medicine = await req.json();

    const cookieStore = await cookies();
  const token = cookieStore.get("medishop-auth-token")?.value;


    if (!token) {
      redirect("/login");
    }
const url = new URL(req.url);
    const medicineId = url.searchParams.get('medicineId');

   
    const response = await fetch(
      `${process.env.BACKEND_SERVER_URL}/api/medicines/${medicineId}/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(medicine),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to update medicine detials' },
        { status: response.status }
      );
    }

    const updatedMedicine = await response.json();
    return NextResponse.json(updatedMedicine, { status: 201 });
  } catch (error) {
    console.error('Medicine modification Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
