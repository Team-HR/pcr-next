'use client'

import { getUser } from "@/lib/auth/getUser";
import { logout } from "@/lib/auth/logout";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { useEffect, useState } from "react";
import Link from 'next/link'

export default function Navbar({ navLinks, rightMenu
}: { navLinks?: React.ReactNode; rightMenu?: React.ReactNode; }) {
  const router = useRouter();
  const pathName = usePathname();

  async function handleLogout() {
    const res = await logout();
    router.push("/login");
  }

  const [user, setUser] = useState<{ acc_id: Number, username: String }>() || null;
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  useEffect(() => {
    async function getAuthenticatedUser() {
      if (pathName == '/login' || pathName == '/') {
        setIsAuthenticated(false)
        return false
      }
      try {
        const userData = await getUser();
        setUser(userData);
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }

    }
    getAuthenticatedUser()
  }, [router, pathName])

  if (!isAuthenticated) {
    return <div></div>
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href={'/dashboard'}>App Nextjs Test</Link>
        <Link className="btn btn-ghost ml-2" href={'/pcr'}>Link 1</Link>
        {navLinks}
      </div>
      <div className="mr-10">{user?.username}</div>
      <div className="flex-none">
        <div className="btn" onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}
