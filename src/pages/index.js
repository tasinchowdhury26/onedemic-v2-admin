import RootLayout from "@/components/layouts/RootLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = ({ users }) => {
  const router = useRouter();
  const { status } = useSession();
  console.log(`Session status: `, status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  return (
    <div>
      <h1>Users Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th className="">UID</th>
            <th>Name</th>
            <th>Role</th>
            <th className="">Stripe ID</th>
            <th className="">Email</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover">
              <th>{users.indexOf(user) + 1}</th>
              <td className="">{user.uid}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td className="">{user.stripeCustomerID}</td>
              <td className="">{user.email}</td>
              <td>
                {/* Open the modal using ID.showModal() method */}
                <button
                  className="btn"
                  onClick={() => {
                    const modal = document.getElementById(
                      `my_modal_${user._id}`
                    );
                    if (modal) {
                      modal.showModal();
                    }
                  }}
                >
                  . . .
                </button>
                <dialog id={`my_modal_${user._id}`} className="modal">
                  <form method="dialog" className="modal-box">
                    <Image
                      src={user.profile}
                      alt="userImage"
                      width={500}
                      height={200}
                      quality={75}
                      className="rounded-lg"
                    />
                    <div className="py-4 text-lg">
                      <div className="flex justify-between">
                        <h3>ID:</h3>
                        <h3>{user._id}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>UID:</h3>
                        <h3>{user.uid}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Name:</h3>
                        <h3>{user.name}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Role:</h3>
                        <h3>{user.role}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Email:</h3>
                        <h3>{user.email}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Stripe ID:</h3>
                        <h3>{user.stripeCustomerID}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Selected Plan:</h3>
                        <h3>{user.selectedPlan}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Created At:</h3>
                        <h3>{user.createdAt}</h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Status:</h3>
                        <h3
                          className={`${
                            user.status === "active" && "text-green-600"
                          }`}
                        >
                          {user.status}
                        </h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>Last Login:</h3>
                        <h3>{user.lastLogin}</h3>
                      </div>
                    </div>
                  </form>
                  <form method="dialog" className="modal-backdrop">
                    <button
                      onClick={() => {
                        const modal = document.getElementById(
                          `my_modal_${user._id}`
                        );
                        if (modal) {
                          modal.close();
                        }
                      }}
                    >
                      close
                    </button>
                  </form>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/allUsers`);
  const users = await res.json();
  // console.log(users);
  return {
    props: {
      users: users.data,
    },
  };
};
