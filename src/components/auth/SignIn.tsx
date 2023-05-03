import { signIn } from "next-auth/react";
import Image from "next/image";

const Signin = () => {
  return (
    <div className="m-0 flex h-screen w-screen items-center justify-center bg-white p-0">
      <div
        className="border[1px] absolute m-0 flex h-screen w-full flex-col items-center justify-between border-0
       bg-gradient-to-tr from-blue-100 to-blue-50 p-10 shadow-xl md:h-3/4  md:w-96 md:rounded-xl  "
      >
        <h1 className="text-dark1 w-full text-2xl font-medium">
          <span className="font-bold text-blue-400">Thullo&nbsp;</span>
          Bring your team together
        </h1>
        <Image src="/ceo.jpeg" width={300} height={600} layout="fixed" alt={""} />
        <button
          className="btn h-16 w-28  bg-blue-400 text-lg font-bold text-white transition-all"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Signin;
