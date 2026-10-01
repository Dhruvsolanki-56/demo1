import React from "react";
import { Link } from "react-router-dom";
import { Home, MessageSquare, Search, CompassIcon } from "lucide-react";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <section className="relative section container-page text-center min-h-[60vh] flex flex-col items-center justify-center">
      <SEO title="Page Not Found" noIndex />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-5">
        <CompassIcon size={28} />
      </div>
      <h1 className="mt-3 font-display text-4xl font-medium text-primary-600 sm:text-5xl">Page Not Found</h1>
      <p className="text-slate-600 mt-4 max-w-md mx-auto leading-relaxed">
        The page you're looking for may have been moved, renamed, or doesn't exist. Try one of the links below.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary btn-pill">
          <Home size={16} /> Back to Home
        </Link>
        <Link to="/products" className="btn-outline">
          <Search size={16} /> Browse Products
        </Link>
        <Link to="/contact" className="btn-outline">
          <MessageSquare size={16} /> Contact Us
        </Link>
      </div>
    </section>
  );
}
