import React from 'react';
import { Button } from '../ui/button';
import { CheckSquare, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">TaskFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </a>
            <a href="#customers" className="text-sm hover:text-primary transition-colors">
              Customers
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="hidden md:inline-flex">
                Sign in
              </Button>
            </Link>
            <Link to="/login">
              <Button>Get started</Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
