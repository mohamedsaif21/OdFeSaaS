"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assest/odfe-logo-clean.png";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Kitchen Display", href: "#kitchen" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="OdFe POS Home">
          <span className="brand__logo-wrap">
            <Image
              className="brand__logo"
              src={logo}
              alt="OdFe POS"
              width={38}
              height={36}
              priority
            />
          </span>
          <span className="brand__badge">POS</span>
        </Link>

        <div className="nav__links">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav__right">
          <button
            className="nav__burger"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav" role="dialog" aria-modal="true">
          <div className="mobile-nav__backdrop" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-nav__panel">
            <div className="mobile-nav__links">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="mobile-nav__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mobile-nav__actions">
              <button className="btn btn--solid" style={{ width: "100%" }} type="button">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}