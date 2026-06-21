import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const columns = [
  ['Audio Description', 'Investor Relations', 'Legal Notices'],
  ['Help Center', 'Jobs', 'Cookie Preferences'],
  ['Gift Cards', 'Terms of Use', 'Corporate Information'],
  ['Media Center', 'Privacy', 'Contact Us'],
];

const socials = [
  { Icon: FaFacebookF, label: 'Facebook' },
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaTwitter, label: 'Twitter' },
  { Icon: FaYoutube, label: 'YouTube' },
];

const Footer = () => (
  <footer className="border-t border-netflix-gray-dark bg-netflix-black px-4 py-10 text-netflix-gray md:px-12">
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex gap-5">
        {socials.map(({ Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="text-netflix-gray-light transition hover:text-white"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        {columns.flat().map((item) => (
          <a key={item} href="#" className="transition hover:text-white hover:underline">
            {item}
          </a>
        ))}
      </div>

      <p className="text-xs leading-relaxed">
        This is an educational Netflix Clone built for academic purposes only. It is not
        affiliated with, endorsed by, or connected to Netflix, Inc. All content shown is mock
        data.
      </p>
      <p className="text-xs">
        © {new Date().getFullYear()} Netflix Clone — Mostafa Taghipour, Islamic Azad University,
        North Tehran Branch.
      </p>
    </div>
  </footer>
);

export default Footer;
