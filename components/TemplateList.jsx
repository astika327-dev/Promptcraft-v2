// components/TemplateList.jsx
'use client';

import { useState, useEffect } from 'react';
import TemplateCard from './TemplateCard';

export default function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/templates?page=${page}&limit=6`);
        const data = await response.json();
        setTemplates(data.templates);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      }
      setIsLoading(false);
    };

    fetchTemplates();
  }, [page]);

  if (isLoading) {
    return <div className="text-center">Loading templates...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">
          Previous
        </button>
        <span className="py-2">Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
