// components/TemplateCard.jsx
import Link from 'next/link';

export default function TemplateCard({ template }) {
  return (
    <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2 truncate">{template.title}</h3>
        <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden">{template.description}</p>
        <p className="text-xs text-gray-500 mb-2">By: {template.creator.name || template.creator.email}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-semibold text-cyan-400">
          ${(template.price / 100).toFixed(2)}
        </span>
        <Link href={`/marketplace/template/${template.id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
          View
        </Link>
      </div>
    </div>
  );
}
