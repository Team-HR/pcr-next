'use client'

import Form from 'next/form'
import { login } from '@/lib/auth/login';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);

    try {
      await login(formData);
      // ✅ Redirect after successful login
      router.push('/dashboard');
    } catch (err) {
      console.log(err);

    }
  }

  return (
    <div className="grid grid-flow-col justify-items-center m-0">
      <Form action={handleSubmit} className='mt-30'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Username</label>
          <input name='username' type="text" className="input" placeholder="Username" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" />
          <button type='submit' className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </Form>
    </div>
  );
}
