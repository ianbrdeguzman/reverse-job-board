import { auth } from '../firebase/client';
import { useAuthUser } from '@react-query-firebase/auth';

export default function Home() {
  const { data: user } = useAuthUser(['user'], auth);

  console.log(user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello {user?.email}</h1>
      <button>Sign out</button>
    </div>
  );
}
