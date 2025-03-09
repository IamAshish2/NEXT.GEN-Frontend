import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiDislike } from "react-icons/bi";
import guts from "@/assets/guts.jpeg"


type CardProps = React.ComponentProps<typeof Card>

function PostCard({ className, ...props }: CardProps) {
    return (
        <Card  className={cn("w-[380px]", className)} {...props}>

            <CardHeader className="flex items-center justify-center">
                <img src={guts} alt="" className="w-16 h-16 rounded-full" />
                <CardTitle>Ashish Karki</CardTitle>
            </CardHeader>
            <div className="p-2 max-h-36 max-w-96">
                <CardDescription className=" ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima pariatur ipsum dicta esse porro nulla autem nam tempora! Vel, molestiae reiciendis aperiam dolorem sequi iure quae consequuntur animi! Odit, dolore.
                </CardDescription>
            </div>
            <CardContent className="grid gap-4">
                <div className="border h-72">
                    <img src={guts} className="object-cover bg-no-repeat w-full brightness-75" alt="upload" />
                </div>
            </CardContent>
            <CardFooter className="mt-8 flex justify-around">
                <AiOutlineLike size={30} className="brightness-50" />
                <BiDislike size={30} className="brightness-50" />
                <FaRegComment size={30} className="brightness-50" />
            </CardFooter>
        </Card>
    )
}

export default PostCard
