// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-12 border-t border-gray-800">
      <div className="text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} PromptCraft. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy-policy" className="hover:text-cyan-400 text-sm">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-cyan-400 text-sm">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
