// import * as React from "react"
// import { Link } from "react-router-dom"
// import { cn } from "@/lib/utils"
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
//     navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"
// import { useHamburgerNavigation } from "./store"
// import { Menu } from "lucide-react"


// // this list will be changed to notifications received by the user later on in the application
// const notifications: { title: string; description: string; }[] = [
//     {
//         title: "Suspicious Login Attempt",
//         description: "A login attempt was detected from an unknown IP address. Please verify your activity.",
//     },
//     {
//         title: "Login Successful",
//         description: "You have successfully logged in from your Chrome browser on Windows 10.",
//     },
//     {
//         title: "New Post: 'Best Practices for React Performance'",
//         description: "Check out our latest article on improving the performance of your React applications.",
//     },
//     {
//         title: "Update: Cyber Security News Roundup",
//         description: "Stay informed with the latest cyber security threats and updates in our daily roundup.",
//     },
//     {
//         title: "Post Deleted: 'Beginner's Guide to Node.js'",
//         description: "The post 'Beginner's Guide to Node.js' was removed from the /Nodejs forum.",
//     },
//     {
//         title: "Login Alert: New Location",
//         description: "You have logged in from a new location, please verify this login.",
//     },
// ];

// const settings: { title: string; description: string, to: string }[] = [
//     {
//         title: "Switch Theme",
//         description: "Change your theme to dark, white or as per your system.",
//         to: "/settings/switch-theme"
//     },
//     {
//         title: "Sign Up",
//         description: "Go ahead and sign up to become a NEXT.GEN member and start communicating with geniuses.",
//         to: "/signup"
//     },
//     {
//         title: "Login.",
//         description: "Already A Member? Well, Welcome back captain. Login to get your gear started, learn and grow.",
//         to: "/login"
//     },
//     {
//         title: "Discord",
//         description: "Come join the official NEXT.GEN discord channel and communicate with the members.",
//         to: "#"
//     }
// ]

// // state to toggle open and close of the navigation modal for mobile screens

// function Header() {
//     const { isOpen, setOpen } = useHamburgerNavigation();
//     function handleOpenModal() {
//         setOpen(!isOpen);
//     }

//     return (
//         <div className="flex sm:justify-center sm:items-center">
//             <NavigationMenu className="sm:flex hidden">
//                 <NavigationMenuList className="">
//                     <NavigationMenuItem>
//                         <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
//                         <NavigationMenuContent>
//                             <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                                 <li className="row-span-3">
//                                     <NavigationMenuLink asChild>
//                                         <Link
//                                             className="flex h-full w-full sm:h-72 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                                             to="/signup"
//                                         >
//                                             {/* <Icons.logo className="h-6 w-6" /> */}
//                                             <div className="mb-2 mt-4 text-lg font-medium">
//                                                 NEXT.GEN
//                                             </div>
//                                             <p className="text-sm leading-tight text-muted-foreground">
//                                                 Welcome to NEXT.GEN where talents gather to share knowledge
//                                                 and make connections with students all over the world.
//                                             </p>
//                                         </Link>
//                                     </NavigationMenuLink>
//                                 </li>
//                                 <ListItem href="/categories" title="Categories">
//                                     Explore vast categories of study materials uploaded by NEXT.GEN,
//                                     Professors, Scientists and Researchers.
//                                 </ListItem>
//                                 <ListItem href="/add-friends-section" title="Friends">
//                                     Make Friends all around the world with like minded people.
//                                 </ListItem>
//                                 <ListItem href="/study-groups" title="Study Groups">
//                                     Join study groups to study with people of similar interests.
//                                 </ListItem>
//                             </ul>
//                         </NavigationMenuContent>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
//                         <NavigationMenuContent>
//                             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//                                 {settings.map((setting) => (
//                                     <Link key={setting.title} to={setting.to}>
//                                         <ListItem
//                                             key={setting.title}
//                                             title={setting.title}
//                                         >
//                                             {setting.description}
//                                         </ListItem>
//                                     </Link>

//                                 ))}
//                             </ul>
//                         </NavigationMenuContent>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <NavigationMenuTrigger>Notifications</NavigationMenuTrigger>
//                         <NavigationMenuContent>
//                             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//                                 {notifications.map((notification) => (
//                                     <ListItem
//                                         key={notification.title}
//                                         title={notification.title}
//                                     >
//                                         {notification.description}
//                                     </ListItem>
//                                 ))}
//                             </ul>
//                         </NavigationMenuContent>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/user-home">
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Home
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>


//                     <NavigationMenuItem>
//                         <Link to="/categories">
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Categories
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/friends">
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Friends
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/user-groups">
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Groups
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/user-profile">
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Profile
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>

//                     <NavigationMenuItem>
//                         <Link to="/login">
//                             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                                 Login
//                             </NavigationMenuLink>
//                         </Link>
//                     </NavigationMenuItem>

//                 </NavigationMenuList>
//             </NavigationMenu>

//             <button className="flex sm:hidden" onClick={handleOpenModal}>
//                 <Menu size={32} />
//             </button>
//         </div>
//     )
// }

// const ListItem = React.forwardRef<
//     React.ElementRef<"a">,
//     React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//     return (
//         <li>
//             <NavigationMenuLink asChild>
//                 <a
//                     ref={ref}
//                     className={cn(
//                         "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                         className
//                     )}
//                     {...props}
//                 >
//                     <div className="text-sm font-medium leading-none">{title}</div>
//                     <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                         {children}
//                     </p>
//                 </a>
//             </NavigationMenuLink>
//         </li>
//     )
// })
// ListItem.displayName = "ListItem"

// export default Header

import * as React from "react";
import { Link } from "react-router-dom";
import {
    Bell, Search, MessageSquare, Users, BookOpen,
    Bookmark, Settings, HelpCircle, LogOut, Menu,
    ChevronDown, Clock, Star, Home
} from "lucide-react";

const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
    const currentUser = "Ashish karki";
    const notifications: { title: string; description: string; }[] = [
        {
            title: "Suspicious Login Attempt",
            description: "A login attempt was detected from an unknown IP address. Please verify your activity.",
        },
        {
            title: "Login Successful",
            description: "You have successfully logged in from your Chrome browser on Windows 10.",
        },
        {
            title: "New Post: 'Best Practices for React Performance'",
            description: "Check out our latest article on improving the performance of your React applications.",
        },
        {
            title: "Update: Cyber Security News Roundup",
            description: "Stay informed with the latest cyber security threats and updates in our daily roundup.",
        },
        {
            title: "Post Deleted: 'Beginner's Guide to Node.js'",
            description: "The post 'Beginner's Guide to Node.js' was removed from the /Nodejs forum.",
        },
        {
            title: "Login Alert: New Location",
            description: "You have logged in from a new location, please verify this login.",
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto">
                {/* Main Header */}
                <div className="flex items-center justify-between px-4 h-16">
                    {/* Left Section - Logo & Search */}
                    <div className="flex items-center space-x-8">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-black">
                                NEXT<span className="text-[#E26300]">.GEN</span>
                            </span>
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden md:flex relative">
                            <input
                                type="text"
                                placeholder="Search communities, courses, discussions..."
                                className="w-[400px] pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 
                                         rounded-xl text-gray-900 placeholder:text-gray-400 
                                         focus:outline-none focus:ring-2 focus:ring-[#E26300]/20 
                                         focus:border-[#E26300] transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Center Section - Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {[
                            { icon: Home, label: "Home", link: "/user-home" },
                            { icon: Users, label: "Communities", link: "/user-groups" },
                            { icon: BookOpen, label: "Courses", link: "/courses" },
                            { icon: MessageSquare, label: "Discussions", link: "/discussions" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.link}
                                className="px-4 py-2 rounded-lg text-gray-600 hover:text-[#E26300] 
                                         hover:bg-[#E26300]/5 transition-colors flex items-center space-x-2"
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section - User Actions */}
                    <div className="flex items-center space-x-2">
                        {/* Notifications */}
                        <button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:text-[#E26300] 
                                     hover:bg-[#E26300]/5 transition-colors relative"
                        >
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#E26300] rounded-full"></span>
                        </button>

                        {/* User Menu */}
                        <Link to='/user-profile' className="relative ml-2">
                            <button className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-50 
                                           transition-colors">
                                <img
                                    src="https://github.com/shadcn.png"
                                    alt="user"
                                    className="w-8 h-8 rounded-full border-2 border-[#E26300]"
                                />
                                <div className="hidden md:block text-left">
                                    <div className="text-sm font-semibold text-gray-700">
                                        {currentUser}
                                    </div>
                                    <div className="text-xs text-gray-500">Student</div>
                                </div>
                                <ChevronDown size={16} className="text-gray-400" />
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-50">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>

                {/* Secondary Header - Categories/Tags */}
                <div className="hidden md:flex items-center space-x-4 px-4 h-10 border-t 
                               border-gray-100 overflow-x-auto">
                    {[
                        "Programming", "Data Science", "Web Development",
                        "Machine Learning", "Mobile Development", "DevOps",
                        "Algorithms", "System Design", "Databases"
                    ].map((category) => (
                        <button
                            key={category}
                            className="text-sm text-gray-500 hover:text-[#E26300] whitespace-nowrap 
                                     transition-colors"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
                    <div className="bg-white p-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 
                                         rounded-xl"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
                                            text-gray-400" />
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
                <div className="absolute right-4 top-16 w-[380px] bg-white rounded-xl border 
                               border-gray-200 shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-black">Notifications</h3>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.map((notification, index) => (
                            <button
                                key={index}
                                className="w-full px-4 py-3 hover:bg-gray-50 flex items-start 
                                         text-left transition-colors"
                            >
                                <div className="flex-1 pr-4">
                                    <p className="text-sm font-medium text-gray-900">
                                        {notification.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {notification.description}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400">2m ago</span>
                            </button>
                        ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                        <button className="text-sm text-[#E26300] hover:text-[#E26300]/80 
                                         transition-colors">
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;