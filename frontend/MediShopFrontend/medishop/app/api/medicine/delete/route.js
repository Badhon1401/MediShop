import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(req) {
  try {

    const cookieStore = await cookies();
      const token = cookieStore.get("medishop-auth-token")?.value;
    
        if (!token) {
          redirect("/login");
        }
    const url = new URL(req.url);
    const medicineId = url.searchParams.get('medicineId');

   
    if (!medicineId) {
      return NextResponse.json(
        { error: 'Medicine ID is required' }, 
        { status: 400 }
      );
    }
     

    const response = await fetch(
      `${process.env.BACKEND_SERVER_URL}/api/medicines/${medicineId}/delete`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to delete medicine' },
        { status: response.status }
      );
    }
    
    const responseText = await response.text();
    return NextResponse.json(responseText, { status: 201 });
  } catch (error) {
    console.error('Medicine Deleting Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}