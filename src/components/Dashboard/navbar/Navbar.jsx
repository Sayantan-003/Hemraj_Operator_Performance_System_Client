// // // import React, { useState, useEffect } from "react";
// // // import { Menu, X, Bell, Search } from "lucide-react";

// // // //import logos
// // // import PrepIcon from "../../icons/PrepIcons";
// // // import SolventIcon from "../../icons/SolventIcon";
// // // import RefineryIcon from "../../icons/RefineryIcon";

// // // // Logo Component
// // // import Logo from "./Logo";


// // // import ExpandableSearch from './ExpandableSearch'


// // // // Main Navbar Component
// // // const Navbar = () => {
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // //   const [activeItem, setActiveItem] = useState("Prep");

// // //   // Navigation configuration - easily maintainable
// // //   const navItems = [
// // //     {
// // //       name: "Prep",
// // //       icon: PrepIcon,
// // //       href: "#prep-report",
// // //       description: "Material Preparation & Processing",
// // //       ariaLabel: "Navigate to preparation section",
// // //     },
// // //     {
// // //       name: "Solvent",
// // //       icon: SolventIcon,
// // //       href: "#solvent-report",
// // //       description: "Solvent Extraction Process",
// // //       ariaLabel: "Navigate to solvent section",
// // //     },
// // //     {
// // //       name: "Refinery",
// // //       icon: RefineryIcon,
// // //       href: "#refinery-report",
// // //       description: "Oil Refining & Distillation",
// // //       ariaLabel: "Navigate to refinery section",
// // //     },
// // //   ];

// // //   // Event handlers
// // //   const handleItemClick = (itemName) => {
// // //     try {
// // //       setActiveItem(itemName);
// // //       setIsMobileMenuOpen(false);
// // //     } catch (error) {
// // //       console.error("Error handling item click:", error);
// // //     }
// // //   };

// // //   const handleNavClick = (href, itemName) => {
// // //     try {
// // //       const target = document.querySelector(href);
// // //       if (target) {
// // //         target.scrollIntoView({
// // //           behavior: "smooth",
// // //           block: "start",
// // //         });
// // //       }
// // //       handleItemClick(itemName);
// // //     } catch (error) {
// // //       console.error("Error navigating to section:", error);
// // //       // Fallback: still update active item
// // //       handleItemClick(itemName);
// // //     }
// // //   };

// // //   const toggleMobileMenu = () => {
// // //     setIsMobileMenuOpen((prev) => !prev);
// // //   };

// // //   // Close mobile menu on escape key
// // //   useEffect(() => {
// // //     const handleEscape = (e) => {
// // //       if (e.key === "Escape") {
// // //         setIsMobileMenuOpen(false);
// // //       }
// // //     };

// // //     if (isMobileMenuOpen) {
// // //       document.addEventListener("keydown", handleEscape);
// // //       return () => document.removeEventListener("keydown", handleEscape);
// // //     }
// // //   }, [isMobileMenuOpen]);

// // //   return (
// // //     <nav
// // //       className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200 shadow-sm sticky top-0 z-50"
// // //       role="navigation"
// // //       aria-label="Main navigation"
// // //     >
// // //       <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="flex justify-between items-center h-16">
// // //           {/* Logo Section */}
// // //           <div className="flex-shrink-0">
// // //             <Logo />
// // //           </div>

// // //           {/* Desktop Navigation */}
// // //           <div className="hidden md:flex items-center space-x-2">
// // //             {navItems.map((item) => {
// // //               const IconComponent = item.icon;
// // //               const isActive = activeItem === item.name;

// // //               return (
// // //                 <button
// // //                   key={item.name}
// // //                   onClick={() => handleNavClick(item.href, item.name)}
// // //                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
// // //                     isActive
// // //                       ? "bg-blue-600 text-white shadow-md"
// // //                       : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
// // //                   }`}
// // //                   title={item.description}
// // //                   aria-label={item.ariaLabel}
// // //                   aria-pressed={isActive}
// // //                 >
// // //                   <IconComponent size={18} />
// // //                   <span>{item.name}</span>
// // //                 </button>
// // //               );
// // //             })}
// // //           </div>

// // //           {/* Right Side Actions */}
// // //           <div className="hidden md:flex items-center space-x-3">
// // //             {/* Search */}
// // //             <div className="relative">
// // //               <ExpandableSearch onSectionSelect={(section) => console.log('Selected:', section)} />

// // //             </div>

// // //             {/* Notifications */}
// // //             <button
// // //               className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
// // //               aria-label="View notifications"
// // //               title="3 new notifications"
// // //             >
// // //               <Bell size={20} />
// // //               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
// // //                 3
// // //               </span>
// // //               <span className="sr-only">3 unread notifications</span>
// // //             </button>

// // //             {/* User Avatar */}
// // //             <button
// // //               className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
// // //               aria-label="User menu for John Doe"
// // //               title="John Doe - Process Engineer"
// // //             >
// // //               JD
// // //             </button>
// // //           </div>

// // //           {/* Mobile menu button */}
// // //           <div className="md:hidden">
// // //             <button
// // //               onClick={toggleMobileMenu}
// // //               className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
// // //               aria-label={
// // //                 isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
// // //               }
// // //               aria-expanded={isMobileMenuOpen}
// // //               aria-controls="mobile-menu"
// // //             >
// // //               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Mobile Navigation Menu */}
// // //         {isMobileMenuOpen && (
// // //           <div
// // //             id="mobile-menu"
// // //             className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
// // //             role="menu"
// // //             aria-label="Mobile navigation menu"
// // //           >
// // //             <div className="px-2 pt-2 pb-3 space-y-1">
// // //               {navItems.map((item) => {
// // //                 const IconComponent = item.icon;
// // //                 const isActive = activeItem === item.name;

// // //                 return (
// // //                   <button
// // //                     key={item.name}
// // //                     onClick={() => handleNavClick(item.href, item.name)}
// // //                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
// // //                       isActive
// // //                         ? "bg-blue-600 text-white shadow-md"
// // //                         : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
// // //                     }`}
// // //                     role="menuitem"
// // //                     aria-label={item.ariaLabel}
// // //                   >
// // //                     <IconComponent size={20} />
// // //                     <div className="flex flex-col items-start">
// // //                       <span className="font-medium">{item.name}</span>
// // //                       <span className="text-xs opacity-75">
// // //                         {item.description}
// // //                       </span>
// // //                     </div>
// // //                   </button>
// // //                 );
// // //               })}

// // //               {/* Mobile Search */}
// // //               <ExpandableSearch onSectionSelect={(section) => console.log('Selected:', section)} />


// // //               {/* Mobile User Section */}
// // //               <div className="px-3 py-4 border-t border-gray-200 mt-4">
// // //                 <div className="flex items-center space-x-3">
// // //                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
// // //                     JD
// // //                   </div>
// // //                   <div>
// // //                     <div className="text-sm font-medium text-gray-900">
// // //                       John Doe
// // //                     </div>
// // //                     <div className="text-xs text-blue-600">
// // //                       Process Engineer
// // //                     </div>
// // //                   </div>
// // //                   <div className="ml-auto relative">
// // //                     <Bell size={20} className="text-gray-400" />
// // //                     <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;



// // import React, { useState, useEffect } from "react";
// // import { Menu, X, Bell } from "lucide-react";

// // //import logos
// // import PrepIcon from "../../icons/PrepIcons";
// // import SolventIcon from "../../icons/SolventIcon";
// // import RefineryIcon from "../../icons/RefineryIcon";

// // // Logo Component
// // import Logo from "./Logo";
// // import ExpandableSearch from "./ExpandableSearch";

// // // 🔑 bring in logged-in user + logout
// // import { useAuth } from "../../../context/AuthContext";

// // const Navbar = () => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [activeItem, setActiveItem] = useState("Prep");
// //   const { user, logout } = useAuth(); // { username, role }

// //   // role-based nav config
// //   const roleNavMap = {
// //     super_admin: [
// //       { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" },
// //       { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" },
// //       { name: "Refinery", icon: RefineryIcon, href: "#refinery-report", description: "Oil Refining & Distillation" }
// //     ],
// //     prep_admin: [
// //       { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" }
// //     ],
// //     solvent_admin: [
// //       { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" }
// //     ],
// //     refinery_admin: [
// //       { name: "Refinery", icon: RefineryIcon, href: "#refinery-report", description: "Oil Refining & Distillation" }
// //     ],
// //     admin4: [
// //       { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" },
// //       { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" }
// //     ]
// //   };

// //   // fallback if no user logged in → no items
// //   const navItems = roleNavMap[user?.role] || [];

// //   const handleItemClick = (itemName) => {
// //     setActiveItem(itemName);
// //     setIsMobileMenuOpen(false);
// //   };

// //   const handleNavClick = (href, itemName) => {
// //     const target = document.querySelector(href);
// //     if (target) {
// //       target.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }
// //     handleItemClick(itemName);
// //   };

// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen((prev) => !prev);
// //   };

// //   // Close mobile menu on escape key
// //   useEffect(() => {
// //     const handleEscape = (e) => {
// //       if (e.key === "Escape") setIsMobileMenuOpen(false);
// //     };
// //     if (isMobileMenuOpen) {
// //       document.addEventListener("keydown", handleEscape);
// //       return () => document.removeEventListener("keydown", handleEscape);
// //     }
// //   }, [isMobileMenuOpen]);

// //   return (
// //     <nav className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
// //       <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-16">
// //           {/* Logo Section */}
// //           <div className="flex-shrink-0">
// //             <Logo />
// //           </div>

// //           {/* Desktop Navigation */}
// //           <div className="hidden md:flex items-center space-x-2">
// //             {navItems.map((item) => {
// //               const IconComponent = item.icon;
// //               const isActive = activeItem === item.name;
// //               return (
// //                 <button
// //                   key={item.name}
// //                   onClick={() => handleNavClick(item.href, item.name)}
// //                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
// //                     isActive
// //                       ? "bg-blue-600 text-white shadow-md"
// //                       : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
// //                   }`}
// //                   title={item.description}
// //                 >
// //                   <IconComponent size={18} />
// //                   <span>{item.name}</span>
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           {/* Right Side Actions */}
// //           <div className="hidden md:flex items-center space-x-3">
// //             <ExpandableSearch onSectionSelect={(section) => console.log("Selected:", section)} />

// //             {/* Notifications */}
// //             <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm">
// //               <Bell size={20} />
// //               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
// //                 3
// //               </span>
// //             </button>

// //             {/* User Avatar + Logout */}
// //             {user?.username && (
// //               <div className="flex items-center space-x-2">
// //                 <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
// //                   {typeof user.username === "string" ? user.username.charAt(0).toUpperCase() : ""}
// //                 </div>
// //                 <button
// //                   onClick={logout}
// //                   className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             )}
// //           </div>

// //           {/* Mobile menu button */}
// //           <div className="md:hidden">
// //             <button onClick={toggleMobileMenu} className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white">
// //               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile menu */}
// //         {isMobileMenuOpen && (
// //           <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
// //             <div className="px-2 pt-2 pb-3 space-y-1">
// //               {navItems.map((item) => {
// //                 const IconComponent = item.icon;
// //                 const isActive = activeItem === item.name;
// //                 return (
// //                   <button
// //                     key={item.name}
// //                     onClick={() => handleNavClick(item.href, item.name)}
// //                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
// //                       isActive
// //                         ? "bg-blue-600 text-white shadow-md"
// //                         : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
// //                     }`}
// //                   >
// //                     <IconComponent size={20} />
// //                     <span>{item.name}</span>
// //                   </button>
// //                 );
// //               })}

// //               {/* User Section */}
// //               {user?.username &&   (
// //                 <div className="px-3 py-4 border-t border-gray-200 mt-4 flex justify-between items-center">
// //                   <span className="text-sm text-gray-900">{user.username}</span>
// //                   <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600">
// //                     Logout
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;



// import React, { useState, useRef, useEffect } from "react";
// import { Menu, X, Bell } from "lucide-react";
// import PrepIcon from "../../icons/PrepIcons";
// import SolventIcon from "../../icons/SolventIcon";
// import RefineryIcon from "../../icons/RefineryIcon";
// import Logo from "./Logo";
// import ExpandableSearch from "./ExpandableSearch";
// import { useAuth } from "../../../context/AuthContext";

// // Helper to get initials from username
// function getInitials(name) {
//   if (!name) return "";
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// // Dropdown menu item
// function MenuItem({ icon, label }) {
//   return (
//     <button className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
//       <span className="mr-3 text-lg">{icon}</span>
//       <span className="flex-1 text-left">{label}</span>
//       <span className="text-gray-400">›</span>
//     </button>
//   );
// }

// // User avatar + dropdown menu
// function UserMenu({ user, logout }) {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef();

//   // Close dropdown on outside click
//   useEffect(() => {
//     function handleClick(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     if (open) {
//       document.addEventListener("mousedown", handleClick);
//       return () => document.removeEventListener("mousedown", handleClick);
//     }
//   }, [open]);

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md hover:scale-105 transition-all focus:outline-none"
//         onClick={() => setOpen((o) => !o)}
//         aria-label="Open user menu"
//       >
//         {getInitials(user.username)}
//       </button>
//       {open && (
//         <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-4 z-50 border border-gray-100 animate-fade-in">
//           <div className="flex items-center px-6 pb-2 border-b border-gray-100">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold mr-3">
//               {getInitials(user.username)}
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800">{user.username}</div>
//               <div className="text-xs text-gray-500">{user.role}</div>
//             </div>
//           </div>
//           <div className="py-2">
//             <MenuItem icon="👤" label="Edit Profile" />
//             <MenuItem icon="⚙️" label="Settings & Privacy" />
//             <MenuItem icon="❓" label="Help & Support" />
//             <MenuItem icon="💡" label="Display & Accessibility" />
//           </div>
//           <div className="pt-2 border-t border-gray-100">
//             <button
//               onClick={logout}
//               className="w-full flex items-center px-6 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-all"
//             >
//               <span className="mr-3">🚪</span> Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState("Prep");
//   const { user, logout } = useAuth();

//   // role-based nav config
//   const roleNavMap = {
//     super_admin: [
//       { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" },
//       { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" },
//       { name: "Refinery", icon: RefineryIcon, href: "#refinery-report", description: "Oil Refining & Distillation" }
//     ],
//     prep_admin: [
//       { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" }
//     ],
//     solvent_admin: [
//       { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" }
//     ],
//     refinery_admin: [
//       { name: "Refinery", icon: RefineryIcon, href: "#refinery-report", description: "Oil Refining & Distillation" }
//     ],
//     admin4: [
//       { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" },
//       { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" }
//     ]
//   };

//   const navItems = roleNavMap[user?.role] || [];

//   const handleItemClick = (itemName) => {
//     setActiveItem(itemName);
//     setIsMobileMenuOpen(false);
//   };

//   const handleNavClick = (href, itemName) => {
//     const target = document.querySelector(href);
//     if (target) {
//       target.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//     handleItemClick(itemName);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   // Close mobile menu on escape key
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape") setIsMobileMenuOpen(false);
//     };
//     if (isMobileMenuOpen) {
//       document.addEventListener("keydown", handleEscape);
//       return () => document.removeEventListener("keydown", handleEscape);
//     }
//   }, [isMobileMenuOpen]);

//   return (
//     <nav className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
//       <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo Section */}
//           <div className="flex-shrink-0">
//             <Logo />
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-2">
//             {navItems.map((item) => {
//               const IconComponent = item.icon;
//               const isActive = activeItem === item.name;
//               return (
//                 <button
//                   key={item.name}
//                   onClick={() => handleNavClick(item.href, item.name)}
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
//                     isActive
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
//                   }`}
//                   title={item.description}
//                 >
//                   <IconComponent size={18} />
//                   <span>{item.name}</span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Right Side Actions */}
//           <div className="hidden md:flex items-center space-x-3 relative">
//             <ExpandableSearch onSectionSelect={(section) => console.log("Selected:", section)} />

//             {/* Notifications */}
//             <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm">
//               <Bell size={20} />
//               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
//                 3
//               </span>
//             </button>

//             {/* User Avatar Circle with Dropdown */}
//             {user?.username && (
//               <UserMenu user={user} logout={logout} />
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button onClick={toggleMobileMenu} className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white">
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navItems.map((item) => {
//                 const IconComponent = item.icon;
//                 const isActive = activeItem === item.name;
//                 return (
//                   <button
//                     key={item.name}
//                     onClick={() => handleNavClick(item.href, item.name)}
//                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-md"
//                         : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
//                     }`}
//                   >
//                     <IconComponent size={20} />
//                     <span>{item.name}</span>
//                   </button>
//                 );
//               })}

//               {/* User Section */}
//               {user?.username && (
//                 <div className="px-3 py-4 border-t border-gray-200 mt-4 flex justify-between items-center">
//                   <span className="text-sm text-gray-900">{user.username}</span>
//                   <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600">
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import PrepIcon from "../../icons/PrepIcons";
import SolventIcon from "../../icons/SolventIcon";
import RefineryIcon from "../../icons/RefineryIcon";
import Logo from "./Logo";
import ExpandableSearch from "./ExpandableSearch";
import { useAuth } from "../../../context/AuthContext";

// Helper to get initials from username
function getInitials(name) {
  if (!name || typeof name !== 'string') return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Limit to 2 characters
}

// Dropdown menu item
function MenuItem({ icon, label, onClick }) {
  return (
    <button 
      className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
      onClick={onClick}
    >
      <span className="mr-3 text-lg">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      <span className="text-gray-400">›</span>
    </button>
  );
}

// User avatar + dropdown menu
function UserMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Debug log to check user data
  console.log("UserMenu user data:", user);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open user menu"
        type="button"
      >
        {getInitials(user?.username)}
      </button>
      
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-4 z-50 border border-gray-100 transform transition-all duration-200 ease-out scale-100 opacity-100">
            {/* User Info Header */}
            <div className="flex items-center px-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                {getInitials(user?.username)}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{user?.username || 'User'}</div>
                <div className="text-xs text-gray-500 capitalize">{user?.role?.replace(/_/g, ' ') || 'Role'}</div>
              </div>
            </div>
            
            {/* Menu Items */}
            {/* <div className="py-2">
              <MenuItem 
                icon="👤" 
                label="Edit Profile" 
                onClick={() => {
                  setOpen(false);
                  // Add profile edit logic here
                  console.log('Edit profile clicked');
                }}
              />
              <MenuItem 
                icon="⚙️" 
                label="Settings & Privacy" 
                onClick={() => {
                  setOpen(false);
                  // Add settings logic here
                  console.log('Settings clicked');
                }}
              />
              <MenuItem 
                icon="❓" 
                label="Help & Support" 
                onClick={() => {
                  setOpen(false);
                  // Add help logic here
                  console.log('Help clicked');
                }}
              />
              <MenuItem 
                icon="💡" 
                label="Display & Accessibility" 
                onClick={() => {
                  setOpen(false);
                  // Add accessibility logic here
                  console.log('Accessibility clicked');
                }}
              />
            </div>
             */}
            {/* Logout Button */}
            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="w-full flex items-center px-6 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <span className="mr-3">🚪</span> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Prep");
  const { user, logout } = useAuth();

  // Debug log to check user data in main component
  console.log("Navbar user data:", user);

  // role-based nav config
  const roleNavMap = {
    super_admin: [
      { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" },
      { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" },
      { name: "Refinery", icon: RefineryIcon, href: "#refinery-report", description: "Oil Refining & Distillation" }
    ],
    prep_admin: [
      { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" }
    ],
    solvent_admin: [
      { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" }
    ],
    refinery_admin: [
      { name: "Refinery", icon: RefineryIcon, href: "#refinery-report", description: "Oil Refining & Distillation" }
    ],
    admin4: [
      { name: "Prep", icon: PrepIcon, href: "#prep-report", description: "Material Preparation & Processing" },
      { name: "Solvent", icon: SolventIcon, href: "#solvent-report", description: "Solvent Extraction Process" }
    ]
  };

  const navItems = roleNavMap[user?.role] || [];

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href, itemName) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    handleItemClick(itemName);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                  }`}
                  title={item.description}
                >
                  <IconComponent size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ExpandableSearch onSectionSelect={(section) => console.log("Selected:", section)} />

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* User Avatar Circle with Dropdown */}
            {user && user.username ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <div className="text-sm text-gray-500">No user data</div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeItem === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.name)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                    }`}
                  >
                    <IconComponent size={20} />
                    <span>{item.name}</span>
                  </button>
                );
              })}

              {/* Mobile User Section */}
              {user && user.username && (
                <div className="px-3 py-4 border-t border-gray-200 mt-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {getInitials(user.username)}
                    </div>
                    <span className="text-sm text-gray-900">{user.username}</span>
                  </div>
                  <button 
                    onClick={logout} 
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;