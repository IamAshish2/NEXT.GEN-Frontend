const GroupMembers = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 max-w-sm mx-auto transform transition-transform hover:scale-105">
        <div className="flex items-center space-x-4">
          <img src="https://example.com/profile/johndoe.jpg" alt="John Doe's profile" className="w-16 h-16 rounded-full object-cover shadow-md" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">Computer Science</p>
            <a href="mailto:johndoe@example.com" className="text-sm text-blue-500 hover:underline">johndoe@example.com</a>
          </div>
        </div>
      </div>
    )
}

export default GroupMembers