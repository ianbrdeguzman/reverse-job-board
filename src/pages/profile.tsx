import { auth } from '../firebase/admin';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { ProtectedPage } from '../components/ProtectedPage';
import { config } from '../config';

export default function ProfilePage() {
  return (
    <ProtectedPage>
      <div className="pt-[4rem]">
        <h1>Profile Page</h1>x
      </div>
    </ProtectedPage>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = getCookie(config.cookie.token, context) as string;

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: config.routes.signin
      }
    };
  }

  try {
    await auth.verifyIdToken(token);

    return {
      props: {}
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: config.routes.signin
      }
    };
  }
}
