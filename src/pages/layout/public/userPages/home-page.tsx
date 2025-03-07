import PostCard from "../components/PostCard"

const HomePage = () => {
    return (
        <div className="flex flex-col gap-10 p-4 items-center justify-center min-h-screen">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    )
}

export default HomePage