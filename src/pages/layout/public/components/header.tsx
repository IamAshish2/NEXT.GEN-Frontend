import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// this list will be changed to notifications received by the user later on in the application
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

const settings: { title: string; description: string, to: string }[] = [
    {
        title: "Switch Theme",
        description: "Change your theme to dark, white or as per your system.",
        to: "/settings/switch-theme"
    },
    {
        title: "Sign Up",
        description: "Go ahead and sign up to become a NEXT.GEN member and start communicating with geniuses.",
        to: "/signup"
    },
    {
        title: "Login.",
        description: "Already A Member? Well, Welcome back captain. Login to get your gear started, learn and grow.",
        to: "/login"
    },
    {
        title: "Discord",
        description: "Come join the official NEXT.GEN discord channel and communicate with the members.",
        to: "#"
    }
]

function Header() {
    return (
        <div className="">
            <NavigationMenu className="">
                <NavigationMenuList className="">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            className="flex h-full w-full sm:h-72 select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            to="/signup"
                                        >
                                            {/* <Icons.logo className="h-6 w-6" /> */}
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                NEXT.GEN
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Welcome to NEXT.GEN where talents gather to share knowledge
                                                and make connections with students all over the world.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/categories" title="Categories">
                                    Explore vast categories of study materials uploaded by NEXT.GEN,
                                    Professors, Scientists and Researchers.
                                </ListItem>
                                <ListItem href="/add-friends-section" title="Friends">
                                    Make Friends all around the world with like minded people.
                                </ListItem>
                                <ListItem href="/study-groups" title="Study Groups">
                                    Join study groups to study with people of similar interests.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {settings.map((setting) => (
                                    <Link key={setting.title} to={setting.to}>
                                        <ListItem
                                            key={setting.title}
                                            title={setting.title}
                                        >
                                            {setting.description}
                                        </ListItem>
                                    </Link>

                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Notifications</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {notifications.map((notification) => (
                                    <ListItem
                                        key={notification.title}
                                        title={notification.title}
                                    >
                                        {notification.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link to="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                        <Link to="/categories">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Categories
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link to="/friends">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Friends
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link to="/groups">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Groups
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link to="/profile">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Profile
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Header
