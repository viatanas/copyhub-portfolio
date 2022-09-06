// Absolute imports
import Link from "next/link";

const Nav = ({ slug, currentUser }) => {
  return (
    <nav className="fixed top-0 z-20 flex items-center justify-between w-full h-12 border-b border-gray-200 backdrop-blur bg-white/70">
      <div className="items-center pl-4 space-x-1">
        <Link href="/">
          <a className="text-sm font-light text-gray-500 font-inter hover:underline hover:text-gray-900">
            Copyhub
          </a>
        </Link>
        {slug && (
          <span className="text-sm font-light text-gray-400 font-inter">/</span>
        )}
        <span className="text-sm italic font-normal text-gray-900 underline font-inter">
          {slug}
        </span>
      </div>
      {!currentUser && (
        <Link href="/waitlist">
          <a className="flex items-center h-full px-4 text-sm font-light text-gray-500 border-l border-gray-200 hover:bg-gray-900 hover:bg-opacity-5 font-inter hover:text-gray-900">
            Join waitlist
          </a>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
