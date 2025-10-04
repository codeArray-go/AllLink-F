"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import Button from './Button';
import Dropdown from './Dropdown';
import Image from 'next/image';
import UseLoader from '@/store/loaderStore';
import useThemeStore from '@/store/themeStore';

const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
    const { isDarkMode, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const { showLoader } = UseLoader();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loginKaro = () => {
    showLoader();
    router.push("/login");
  };

  const handleLogout = async () => {
    showLoader();
    await logout();
    router.push("/");
  };

  const showNavBar = ["/", "/generate", "/login"].includes(pathname);
  if (!showNavBar) return null;

  const Dark = "🌙"
  const Light = "🌞"

  return (
    <div className=' h-[100px] w-full flex items-center justify-center z-10 bg-transparent" '>

      <nav className="w-full justify-between h-[70px] px-6 sm:px-10 flex items-center relative">

        {/* Theme + Logo */}
        <Link href="/">
          <h1 className={` text-2xl sm:text-3xl NunitoEB font-bold ${isDarkMode ? 'text-white' : 'text-slate-700'} flex items-center justify-around `}>
            <span className={`${isDarkMode ? 'text-white' : 'text-cyan-700'}`}>&lt;</span>
            A<Image src="/Logo.svg" height={30} width={30} className={`${isDarkMode ? '' : 'invert'}`} alt='Logo' />L
            <span className={`${isDarkMode ? 'text-white' : 'text-cyan-700'}`}>&gt;</span>
          </h1>
        </Link>

        <div className='flex items-center justify-between gap-10 h-auto '>
          {/* Theme toggle */}
          <div className='flex flex-col items-center justify-center cursor-pointer'>
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="toggle-theme"
              className={`relative z-50 rounded-full w-14 h-7 ${isDarkMode ? 'bg-gray-200 shadow-white' : 'bg-gray-700 shadow-black'} flex items-center px-1 shadow-sm`}
            >
              <div className={`duration-300 transform transition-transform ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full w-5 h-5 ${isDarkMode ? "translate-x-7" : "translate-x-0"} flex items-center justify-center `}>
                {isDarkMode ? Dark : Light}
              </div>
            </button>
          </div>

          {isAuthenticated ? (
            <div className="NunitoEB text-green-500 flex items-center justify-center gap-3">
              <Dropdown logout={handleLogout} user={user} />
              <div className="hidden sm:block">
                <Button text="LogOut" click={handleLogout} />
              </div>
            </div>
          ) : (
            <Button text="LogIn" click={loginKaro} />
          )}
        </div>
      </nav>
    </div>
  );
};

Navbar.displayName = 'Navbar'

export default Navbar;
