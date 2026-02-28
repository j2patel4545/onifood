import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footerdas() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 min-h-[45vh]">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">OniFood</h2>
          <p className="text-sm leading-relaxed">
            Order delicious food from your favourite restaurants near you.
            Fast delivery, best offers and quality service guaranteed.
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> India
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> support@onifood.com
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Partner with us</li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">All Restaurants</li>
            <li className="hover:text-white cursor-pointer">Top Offers</li>
            <li className="hover:text-white cursor-pointer">Popular Cuisines</li>
            <li className="hover:text-white cursor-pointer">New Arrivals</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Refund Policy</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Subscribe</h3>
          <p className="text-sm">
            Get special offers, updates and exclusive deals.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-md bg-zinc-800 text-sm outline-none"
            />
            <button className="bg-red-500 px-4 py-2 rounded-r-md text-white text-sm hover:bg-red-600">
              Subscribe
            </button>
          </div>

          {/* Social */}
          <div className="flex gap-4 pt-3">
            <Facebook className="hover:text-white cursor-pointer" />
            <Instagram className="hover:text-white cursor-pointer" />
            <Twitter className="hover:text-white cursor-pointer" />
            <Youtube className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} OniFood. All rights reserved.
      </div>
    </footer>
  );
}
