// Absolute imports
import Link from "next/link";
import { Plus } from "iconoir-react";

const NavSecondary = ({ slug, currentUser, user }) => {
  return (
    <nav className="fixed top-0 z-20 flex items-center justify-between w-full h-12 border-b border-gray-200 backdrop-blur bg-white/70">
      <div className="items-center pl-5 space-x-1">
        <Link href="/">
          <a className="text-sm font-light text-gray-500 font-inter hover:text-gray-700">
            Copyhub
          </a>
        </Link>
        <span className="text-sm font-light text-gray-400 font-inter">/</span>
        <span className="text-sm italic font-normal text-gray-900 underline font-inter">
          {slug}
        </span>
      </div>
      {!currentUser ||
        (user?.firebaseId === currentUser.uid && (
          <div className="flex items-center h-full">
            <Link href="/settings/profile">
              <a className="mr-4 text-sm font-light text-gray-500 font-inter hover:underline hover:text-gray-700">
                Settings
              </a>
            </Link>
            <Link href="/settings/project">
              <a className="flex items-center h-full px-4 border-l border-gray-200 hover:bg-gray-900 hover:bg-opacity-5">
                <Plus className="w-4 h-4 text-gray-500" />
              </a>
            </Link>
          </div>
        ))}
    </nav>
  );
};

export default NavSecondary;
