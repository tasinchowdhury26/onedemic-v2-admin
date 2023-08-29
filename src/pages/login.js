import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const { status, data } = useSession();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    }
    console.log(res);
  };
  return (
    <div className="flex justify-center items-center">
      <Head>
        <title>OneDemic | Admin Login</title>
      </Head>
      {status === "unauthenticated" ? (
        <div className="my-28 border border-gray-500 px-6 py-10 rounded-xl">
          <span className="text-2xl my-3 text-center font-bold">
            OneDemic Admin Panel
          </span>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter Your Username</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={userInfo.username}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, username: target.value })
                }
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter Password</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
              />
            </div>
            <button
              // disabled={!userInfo.username || !userInfo.password}
              type="submit"
              className="btn btn-neutral w-full my-5"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="gap-3 flex">
            <span className="loading loading-ring loading-lg"></span>
            <h1 className="text-4xl font-bold">Already Logged In</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
