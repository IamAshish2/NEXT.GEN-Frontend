import CreatePostModal from "./home-page-post/post-modal"

const HomePage = () => {
    return (
        <div className="flex flex-col gap-10 p-4 items-center justify-center min-h-screen">
            <div>
                <CreatePostModal />
            </div>
        </div>
    )
}
export default HomePage