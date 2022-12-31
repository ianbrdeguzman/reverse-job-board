import React from 'react';
import Link from 'next/link';
import { config } from '../config';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useComponentVisible } from '../hooks/useComponentVisible';
import { HiOutlineBars3, HiOutlineXMark, HiOutlineUser } from 'react-icons/hi2';
import { NavbarLink } from './NavbarLink';

export function Navbar() {
  const { user, signOut } = useAuth();
  const { pathname } = useRouter();
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
    setShowUserMenu(false);
  }, [pathname]);

  return (
    <nav ref={menuRef} className="bg-orange-400 absolute w-full z-50 shadow-lg">
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
                <HiOutlineBars3 className="w-6 h-6" />
              ) : (
                <HiOutlineXMark className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className="p-1 rounded-md border border-transparent hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=white"
                  alt="Your Company"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavbarLink href="/about" name="about" />
                <NavbarLink href="/filipinos" name="filipinos" />
                <NavbarLink href="/donate" name="donate" />
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
                    <span className="inline-block flex justify-center items-center h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                      {user && user.photoURL ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.photoURL}
                          alt={user.email!}
                        />
                      ) : (
                        <HiOutlineUser className="w-6 h-6 text-gray-400" />
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex">
                  <Link
                    href={config.routes.signin}
                    className="flex w-full justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white hover:bg-orange-300 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                  >
                    Sign in
                  </Link>
                  <Link
                    href={config.routes.register}
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
                  <Link
                    href={config.routes.profile}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
                    tabIndex={-1}
                  >
                    Add your profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
                    tabIndex={-1}
                  >
                    Settings
                  </Link>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-orange-100"
                    tabIndex={-1}
                    onClick={signOut}
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
            <NavbarLink href="/about" name="about" />
            <NavbarLink href="/filipinos" name="filipinos" />
            <NavbarLink href="/donate" name="donate" />
            {!user && (
              <div>
                <div className="border-b-2" />
                <Link
                  href={config.routes.register}
                  className="block text-center rounded-md border border-transparent bg-orange-300 mt-4 py-2 px-4 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-0 focus:ring-white focus:ring-offset-2"
                >
                  Register
                </Link>
                <p className="mt-2 text-center text-sm text-white">
                  Already have an account?{' '}
                  <Link
                    href={config.routes.signin}
                    className="font-bold hover:underline"
                  >
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
