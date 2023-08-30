import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { status, data } = useSession();
  const handleLogout = () => {
    signOut();
    // console.log("Fired From Navbar, status: ", status);
    // console.log("Data from navbar: ", data);
  };
  return (
    <div className="navbar bg-base-300 rounded-xl">
      <div className="flex-1">
        <Link href={`/`} className="btn btn-ghost normal-case text-xl">
          OneDemic | Admin
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button
              className="btn btn-ghost normal-case text-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
