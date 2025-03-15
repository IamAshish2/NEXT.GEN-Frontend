import { BookOpen, Clock, Users } from 'lucide-react';

interface StudyMaterialProps {
  title: string;
  category: string;
  students: number;
  duration: string;
  image: string;
}

export default function StudyMaterialCard({ title, category, students, duration, image }: StudyMaterialProps) {
  return (
    <div className="bg-black border w-80 ml-auto mr-auto mt-10 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 px-3 py-1 rounded-full text-sm font-bold">
          {/* <p className='text-white'>{category}</p> */}
        </div>
      </div>
      <div className="p-2">
        <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span className="text-sm">{students} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-orange-500 text-black py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2">
          <BookOpen size={18} />
          Start Learning
        </button>
      </div>
    </div>
  );
}