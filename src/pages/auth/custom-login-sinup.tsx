import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
    return (
        <Tabs defaultValue="account" className="w-full p-8">
            <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger className="p-2" value="account">Sign up</TabsTrigger>
                <TabsTrigger className="p-2" value="password">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign up to create a new Account</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Email</Label>
                            <Input id="name" className="p-6" defaultValue="karkiaashish@gmail.com" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username" className="mb-2 ml-2 text-zinc-400">Username</Label>
                            <Input id="username" className="p-6" defaultValue="@karki" />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password" className="mb-2 ml-2 text-zinc-400">Password</Label>
                            <Input id="password" className="p-6" placeholder="Enter your password here" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <Button className="bg-zinc-300">Sign up</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
