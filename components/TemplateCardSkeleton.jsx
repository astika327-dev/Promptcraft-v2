// components/TemplateCardSkeleton.jsx

export default function TemplateCardSkeleton() {
    return (
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
        
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-5/6 mb-6"></div>
  
        <div className="flex justify-between items-center">
          <div className="h-10 bg-blue-800/50 rounded-lg w-28"></div>
        </div>
      </div>
    );
  }