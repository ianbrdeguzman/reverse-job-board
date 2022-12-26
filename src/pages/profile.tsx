import { ProtectedPage } from '../components/ProtectedPage';

export default function ProfilePage() {
  return (
    <ProtectedPage>
      <div className="pt-[4rem]">
        <h1>Profile Page</h1>
      </div>
    </ProtectedPage>
  );
}
