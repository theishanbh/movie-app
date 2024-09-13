"use client";

import { useAuth } from "@/context/AuthContext";
import { AuthContextProps } from "../../types/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { accessToken, logout, loading } = useAuth() as AuthContextProps;
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  const handleSignInClick = () => {
    router.push("/signin");
  };

  const handleSignOutClick = () => {
    logout();
  };

  return (
    <div className="topbar bg-gray-100 h-20 w-full sticky top-0 z-10">
      <div className="px-10 flex justify-between h-full items-center">
        <div className="topbar__left__section flex justify-between items-center">
          <div className="topbar__img__container my-auto">
            {/* <img className="logo h-12" src="path_to_logo" alt="Logo"> */}
          </div>
          <nav className="topbar__left__navbar">
            <ul className="flex list-none px-4">
              <ul className="flex list-none px-4">
                <li>
                  <Link
                    href={"/"}
                    className="px-2 font-bold text-base no-underline text-black transition-all duration-300 ease-in-out hover:text-purple-600 hover:underline hover:underline-offset-2 active:text-purple-600"
                  >
                    Home
                  </Link>
                  <Link
                    href={"/trending"}
                    className="px-2 font-bold text-base no-underline text-black transition-all duration-300 ease-in-out hover:text-purple-600 hover:underline hover:underline-offset-2 active:text-purple-600"
                  >
                    Trending
                  </Link>
                  {accessToken ? (
                    <Link
                      href={"/watchlist"}
                      className="px-2 font-bold text-base no-underline text-black transition-all duration-300 ease-in-out hover:text-purple-600 hover:underline hover:underline-offset-2 active:text-purple-600"
                    >
                      Watchlist
                    </Link>
                  ) : (
                    <></>
                  )}
                </li>
              </ul>
            </ul>
          </nav>
        </div>
        <div className="topbar__right__section flex justify-between items-center ml-auto">
          <ul className="flex list-none px-4">
            {accessToken && !loading ? (
              <li>
                <button
                  onClick={handleSignOutClick}
                  className="bg-red-500 rounded text-white px-4 py-2 text-center no-underline inline-block text-base font-bold ml-6 hover:text-purple-600 hover:underline hover:underline-offset-2 active:text-purple-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={handleSignInClick}
                    className="bg-green-500 rounded text-white px-4 py-2 text-center no-underline inline-block text-base font-bold ml-6 hover:text-purple-600 hover:underline hover:underline-offset-2 active:text-purple-600"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleRegisterClick}
                    className="bg-blue-500 rounded text-white px-4 py-2 text-center no-underline inline-block text-base font-bold ml-6 hover:text-purple-600 hover:underline hover:underline-offset-2 active:text-purple-600"
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
