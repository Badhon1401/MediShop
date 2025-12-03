
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
export const metadata = {
  title: "MediShop - Home",
  description: "Welcome to MediShop, manage your phramacy inventory and staff efficiently.",
};

async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("medishop-auth-token")?.value;

  if (!token) {
    redirect("/welcome");
  }

  redirect("/home");
}

export default HomePage;
