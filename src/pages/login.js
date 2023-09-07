import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/");
    }
    // console.log(res);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1605106325682-3482f7c1c9c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80')] bg-contain">
      <Head>
        <title>OneDemic | Admin Login</title>
      </Head>
      {status === "unauthenticated" ? (
        <div className="my-28 border border-gray-500 px-8 py-12 rounded-xl backdrop-blur-xl bg-white/30">
          <span className="text-white text-3xl my-3 mx-auto font-bold">
            OneDemic Admin
          </span>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-white">
                  Enter Your Username
                </span>
              </label>
              <input
                type="text"
                required
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
                <span className="label-text text-white">Enter Password</span>
              </label>
              <input
                type="password"
                required
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
              disabled={loading}
              className="btn btn-neutral w-full my-5"
            >
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                `Login`
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="gap-3 flex backdrop-blur-xl bg-white/30 p-14 rounded-3xl">
            <h1 className="text-white text-4xl font-bold">Please Wait</h1>
            <span className="loading loading-dots loading-lg text-white"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
