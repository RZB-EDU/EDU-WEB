import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/scholarships', label: 'Scholarships' },
    { href: '/research', label: 'Research' },
    { href: '/universities', label: 'Universities' },
    { href: '/search', label: 'Search' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-xs">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-black text-lg">U</span>
            </div>
            <span className="font-black text-lg hidden sm:inline">UniPortal</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors no-underline">
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <a className="text-sm font-medium text-foreground hover:text-primary transition-colors no-underline">
                  {user?.name || 'Profile'}
                </a>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="sm">
                Login
              </Button>
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors no-underline py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <>
                  <Link href="/profile">
                    <a className="block text-sm font-medium text-foreground hover:text-primary transition-colors no-underline py-2" onClick={() => setIsOpen(false)}>
                      {user?.name || 'Profile'}
                    </a>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <a href={getLoginUrl()} className="block">
                  <Button size="sm" className="w-full">
                    Login
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
