'use client';

import { logout } from "@/lib/auth/logout";
import { useRouter, usePathname } from 'next/navigation';
import { getUser } from "@/lib/auth/getUser";
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: String }>(); // Replace 'any' with your user type
  const [loading, setLoading] = useState(true);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // Handle error (e.g., redirect to login)
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [pathname]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      Welcome user! {user ? user.username : ''}
      {/* <div className="btn" onClick={handleGetUser}>Get User Info</div> */}
    </div>
  );
}
