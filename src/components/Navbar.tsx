"use client";
import Link from 'next/link';
import { NAV_LINKS } from '@/constants';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 flexBetween padding-container py-5 bg-black/80 backdrop-blur-md text-white"
    >
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
        AndSoft
      </Link>

      <ul className="hidden h-full gap-8 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link 
            href={link.href} 
            key={link.key} 
            className="regular-16 text-gray-300 flexCenter cursor-pointer transition-all hover:font-bold hover:text-cyan-400"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-full font-semibold transition-all">
        Холбогдох
      </button>
    </motion.nav>
  )
}

export default Navbar;