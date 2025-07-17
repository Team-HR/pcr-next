'use client';

import { getUser } from "./actions/getUser";
import { logout } from "./actions/logout";
import { useRouter } from 'next/navigation';

export default function dashboard() {
  const router = useRouter();
  async function handleGetUser() {
    const res = await getUser();
    console.log(res);
  }

  async function handleLogout() {
    const res = await logout();
    router.push("/login");
  }
  return (
    <div>
      Welcome user!
      <div className="btn" onClick={handleGetUser}>Get User Info</div>
      <div className="btn" onClick={handleLogout}>Logout</div>
    </div>
  );
}
