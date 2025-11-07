'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/library', label: 'Ad Library' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
];

export default function Navlinks() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="hidden md:flex space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-medium transition-colors duration-200 ${
            isActive(link.href)
              ? 'text-blue-900 border-b-2 border-blue-600'
              : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}







// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import SignIn from './SignIn';

// export default function Navlinks() {
//     const pathname = usePathname();

//     const isActive = (path: string) => {
//         return pathname === path;
//   };

    

//   return (
//     <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-8">
//             <Link href="/" >
//               <div className='flex flex-col justify-center items-center border shadow px-3'>
//                 <span className="text-xl font-bold text-blue-600 hover:text-blue-700">&Lambda;S&Rho;&Lambda;C&Tau;</span>
//                 <small>ai super pac tracker</small>
//               </div>
//             </Link>
//             <nav className="hidden md:flex space-x-6">
//               <Link 
//                 href="/" 
//                 className={`font-medium transition-colors duration-200 ${
//                   isActive('/') 
//                     ? 'text-blue-600 border-b-2 border-blue-600' 
//                     : 'text-gray-700 hover:text-blue-600'
//                 }`}
//               >
//                 Dashboard
//               </Link>
//               <Link 
//                 href="/library" 
//                 className={`font-medium transition-colors duration-200 ${
//                   isActive('/library') 
//                     ? 'text-blue-600 border-b-2 border-blue-600' 
//                     : 'text-gray-700 hover:text-blue-600'
//                 }`}
//               >
//                 Ad Library
//               </Link>
//               <Link 
//                 href="/analytics" 
//                 className={`font-medium transition-colors duration-200 ${
//                   isActive('/analytics') 
//                     ? 'text-blue-600 border-b-2 border-blue-600' 
//                     : 'text-gray-700 hover:text-blue-600'
//                 }`}
//               >
//                 Analytics
//               </Link>
//               <Link 
//                 href="/about" 
//                 className={`font-medium transition-colors duration-200 ${
//                   isActive('/about') 
//                     ? 'text-blue-600 border-b-2 border-blue-600' 
//                     : 'text-gray-700 hover:text-blue-600'
//                 }`}
//               >
//                 About
//               </Link>
//             </nav>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <SignIn />
//             <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
//               Get API Access
//             </button>
//           </div>
//         </div>
//       </div>
//   )
// }
