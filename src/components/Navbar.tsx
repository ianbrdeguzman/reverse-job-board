import React from 'react';
import Link from 'next/link';
import { auth } from '../firebase/client';
import { deleteCookie } from 'cookies-next';
import { useComponentVisible } from '../hooks/useComponentVisible';
import { useAuthUser, useAuthSignOut } from '@react-query-firebase/auth';
import { useRouter } from 'next/router';

export function Navbar() {
  const { pathname } = useRouter();
  const { data: user } = useAuthUser(['user'], auth);
  const { mutate: signOut } = useAuthSignOut(auth);
  const {
    ref: userMenuRef,
    isComponentVisible: showUserMenu,
    setIsComponentVisible: setShowUserMenu
  } = useComponentVisible<HTMLDivElement>(false);
  const {
    ref: menuRef,
    isComponentVisible: showMenu,
    setIsComponentVisible: setShowMenu
  } = useComponentVisible<HTMLDivElement>(false);

  React.useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const handleSignOut = () => {
    deleteCookie('auth');
    signOut();
  };

  return (
    <nav ref={menuRef} className="bg-orange-400 absolute w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="sr-only">Open main menu</span>
              {!showMenu ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=300"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=300"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                <Link
                  href="/dashboard"
                  className="flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                >
                  Dashboard
                </Link>
                <Link
                  href="/team"
                  className="flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                >
                  Team
                </Link>
                <Link
                  href="/projects"
                  className="flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                >
                  Projects
                </Link>
                <Link
                  href="/calendar"
                  className="flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                >
                  Calendar
                </Link>
              </div>
            </div>
          </div>
          <div
            ref={userMenuRef}
            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <div className="relative ml-3">
              {user ? (
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                      {user.photoURL ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      ) : (
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex">
                  <Link
                    href="/signin"
                    className="flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="ml-2 flex w-full justify-center rounded-md border border-transparent bg-orange-300 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                  >
                    Register
                  </Link>
                </div>
              )}
              {user && showUserMenu && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  tabIndex={-1}
                >
                  {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    tabIndex={-1}
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    tabIndex={-1}
                  >
                    Settings
                  </a>
                  <button
                    type="button"
                    className="block px-4 py-2 text-sm text-gray-700"
                    tabIndex={-1}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {showMenu && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 ">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link
              href="/dashboard"
              className="block rounded-md border border-transparent bg-orange-400 p-2 text-base font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
            >
              Dashboard
            </Link>
            <Link
              href="/team"
              className="block rounded-md border border-transparent bg-orange-400 p-2 text-base font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
            >
              Team
            </Link>
            <Link
              href="/projects"
              className="block rounded-md border border-transparent bg-orange-400 p-2 text-base font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
            >
              Projects
            </Link>
            <Link
              href="/calendar"
              className="block rounded-md border border-transparent bg-orange-400 p-2 text-base font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
            >
              Calendar
            </Link>
            {!user && (
              <div>
                <div className="border-b-2" />
                <Link
                  href="/register"
                  className="block text-center rounded-md border border-transparent bg-orange-300 mt-4 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                >
                  Register
                </Link>
                <p className="mt-2 text-center text-sm text-white">
                  Already have an account?{' '}
                  <Link href="/signin" className="font-bold">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
