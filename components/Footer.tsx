import React from 'react';

interface Link {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const navigation: Link[] = [
  {
    name: "GitHub",
    href: "https://github.com/emiridbest",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Terms of Service",
    href: "/terms",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        {/* Add the SVG path for the Terms of Service icon */}
      </svg>
    ),
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        {/* Add the SVG path for the Feedback icon */}
      </svg>
    ),
  },
  {
    name: "Partners",
    href: "/partners",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        {/* Add the SVG path for the Partners icon */}
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-cyan-900 mt-auto border-black border-t">
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white hover:text-indigo-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="flex justify-center md:order-1 mt-4 md:mt-0">
          <div className="bg-white rounded-md p-2 flex">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="w-48 sm:w-64 px-2 py-1 border border-gray-300 rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white px-4 py-1 rounded-r hover:bg-indigo-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6">
        <div className="text-center text-white">
          <a
            href="https://github.com/emiridbest"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-100"
          >
            © 2023 Your Website. All rights reserved.
          </a>
        </div>
      </div>
    </footer>
  );
}
