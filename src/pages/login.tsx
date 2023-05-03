import { GetServerSidePropsContext, NextPage } from "next";
import { Signin } from "~/components/auth";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (session && session.user)
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };

  return {
    props: { session }
  };
};

const Login: NextPage = () => {
  return <Signin />;
};

export default Login;
