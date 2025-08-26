'use client'

import { getUser } from "@/lib/auth/getUser";
import { logout } from "@/lib/auth/logout";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { useEffect, useState } from "react";
import Link from 'next/link'
import Image from "next/image";

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


  const links = [
    {
      title: 'Performance Review',
      path: '/pcr'
    },
    {
      title: 'Individual Rating Scale',
      path: '/irsm'
    },
    {
      title: 'Rating Scale Matrix',
      path: '/rsm'
    }
  ]

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex flex-1">
        {/* <Link className="btn btn-lg btn-ghost text-xl" href={'/dashboard'}> </Link> */}
        <Image src={'/pcr-logo.png'} alt="pcr" width={50} height={50} className="mr-2" style={{ width: 'auto' }} priority />

        {
          links.map((link, index) => (
            <Link key={index} className="btn btn-ghost font-normal mt-2 mr-2" href={link.path}>{link.title}</Link>
          ))
        }

      </div>
      <div className="mr-10">{user?.username}</div>
      <div className="flex-none">
        <div className="btn" onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}
