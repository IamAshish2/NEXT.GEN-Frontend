import { BookOpen, Clock, Users, Bookmark, Share2, Star } from 'lucide-react';
import { useState } from 'react';

interface StudyMaterialProps {
  title: string;
  category: string;
  students: number;
  duration: string;
  image: string;
  rating?: number;
  description?: string;
  author?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  onBookmark?: () => void;
  onShare?: () => void;
  onClick?: () => void;
}

export default function StudyMaterialCard({
  title,
  category,
  students,
  duration,
  image,
  rating = 0,
  description = '',
  author = '',
  isNew = false,
  isFeatured = false,
  onBookmark,
  onShare,
  onClick
}: StudyMaterialProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 w-80 ml-auto mr-auto mt-30 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 max-w-sm transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Study material: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onClick) onClick();
      }}
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {isNew && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md">
            NEW
          </div>
        )}

        {isFeatured && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-md">
            FEATURED
          </div>
        )}

        <div className="absolute bottom-3 left-3 px-2 py-1 bg-orange-500/80 text-white text-xs font-bold rounded-md backdrop-blur-sm">
          {category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-100 mb-1 line-clamp-2">{title}</h3>

          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-full ${isBookmarked ? 'bg-orange-500/20' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
              onClick={handleBookmark}
              aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              <Bookmark
                size={18}
                className={isBookmarked ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}
              />
            </button>
            <button
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50"
              onClick={handleShare}
              aria-label="Share this material"
            >
              <Share2 size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        {author && (
          <p className="text-gray-400 text-sm mb-2">By {author}</p>
        )}

        {description && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{description}</p>
        )}

        {rating > 0 && (
          <div className="flex items-center mb-3 gap-1">
            {renderStars(rating)}
            <span className="text-gray-400 text-sm ml-1">({rating.toFixed(1)})</span>
          </div>
        )}

        <div className="flex items-center justify-between text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-500" />
            <span className="text-sm">{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>

        <button className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors duration-300 flex items-center justify-center gap-2 font-medium shadow-lg shadow-orange-500/20">
          <BookOpen size={18} className="group-hover:animate-pulse" />
          Start Learning
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>
      </div>
    </div>
  );
}