// import React from 'react';
// import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-100 border-t border-gray-200 mt-30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <div className="flex space-x-4">
//               <a href="#" className="text-blue-600 hover:text-blue-700">
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-blue-600 hover:text-blue-700">
//                 <Twitter className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-blue-600 hover:text-blue-700">
//                 <Linkedin className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-blue-600 hover:text-blue-700">
//                 <Instagram className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 text-sm">Dashboard</Link>
//               </li>
//               <li>
//                 <Link to="/reports" className="text-gray-600 hover:text-blue-600 text-sm">Reports</Link>
//               </li>
//               <li>
//                 <Link to="/analytics" className="text-gray-600 hover:text-blue-600 text-sm">Analytics</Link>
//               </li>
//               <li>
//                 <Link to="/settings" className="text-gray-600 hover:text-blue-600 text-sm">Settings</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start space-x-3 text-sm text-gray-600">
//                 <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
//                 <span>+91 (123) 456-7890</span>
//               </li>
//               <li className="flex items-start space-x-3 text-sm text-gray-600">
//                 <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
//                 <span>contact@hemrajsteam.com</span>
//               </li>
//               <li className="flex items-center space-x-2 text-sm text-gray-600">
//                 <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
//                 <span className="whitespace-normal">123 Industrial Area, Mumbai, Maharashtra, India</span>
//               </li>
//             </ul>
//           </div>

//           {/* Working Hours */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
//             <ul className="space-y-2">
//               <li className="flex items-center space-x-2 text-sm text-gray-600">
//                 <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
//                 <span className="font-medium">Monday - Friday</span>
//                 <span>9:00 AM - 6:00 PM</span>
//               </li>
//               <li className="flex items-center space-x-2 text-sm text-gray-600">
//                 <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
//                 <span className="font-medium">Saturday</span>
//                 <span>9:00 AM - 3:00 PM</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-12 pt-8 border-t border-gray-200">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-sm text-gray-600">
//               © {currentYear} Hemraj Steam Management. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</Link>
//               <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</Link>
//               <Link to="/support" className="text-sm text-gray-600 hover:text-blue-600">Support</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-black mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      {/* Decorative elements removed for consistency */}

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-bold  text-gray-900">
                Social Handles
              </h2>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="group bg-blue-800/70 hover:bg-blue-700/100 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-blue-200 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="group bg-blue-800/70 hover:bg-blue-700/100 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-blue-200 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="group bg-blue-800/70 hover:bg-blue-700/100 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-blue-200 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="group bg-blue-800/70 hover:bg-blue-700/100 p-3 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5 text-blue-200 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-1 h-6 bg-blue-400 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/dashboard", label: "Dashboard" },
                { to: "/reports", label: "Reports" },
                { to: "/analytics", label: "Analytics" },
                { to: "/settings", label: "Settings" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-1 h-6 bg-blue-400 rounded-full mr-3"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4 text-sm text-gray-600">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>

                {/* flex-1 + min-w-0 allows wrapping inside a flex row */}
                <div className="text-left flex flex-col flex-1 min-w-0">
                  <span className="font-medium text-gray-900">Phone</span>
                  <div className="break-all whitespace-normal">
                    (+91) 3322298038/40649316/22654742/22292340
                  </div>
                </div>
              </li>

              {/* <li className="flex items-start space-x-4 text-sm text-gray-600">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-gray-900 block">Email</span>
                  <p>contact@hemrajsteam.com</p>
                </div>
              </li> */}
              <li className="flex items-start space-x-4 text-sm text-gray-600">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-gray-900 block">
                    Address
                  </span>
                  <p>
                    {" "}
                    46B, Rafi Ahmed Kidwai Road(1st Floor),Kolkata - 700016
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-1 h-6 bg-blue-400 rounded-full mr-3"></span>
              Working Hours
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Weekdays</span>
                </div>
                <p className="text-sm text-gray-600 ml-8">Monday - Friday</p>
                <p className="text-sm text-gray-600 ml-8">9:00 AM - 6:00 PM</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Weekend</span>
                </div>
                <p className="text-sm text-gray-600 ml-8">Saturday</p>
                <p className="text-sm text-gray-600 ml-8">9:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-gray-600">
              © {currentYear} Hemraj Steam Management. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            {[
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
              { to: "/support", label: "Support" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
