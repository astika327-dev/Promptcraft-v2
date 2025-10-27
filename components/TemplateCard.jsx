// components/TemplateCard.jsx
import Link from 'next/link';

export default function TemplateCard({ template }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-secondary transition-all">
      <div>
        <h3 className="text-xl font-bold mb-2 truncate text-primary">{template.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 h-20 overflow-hidden">{template.description}</p>
        <p className="text-xs text-muted-foreground mb-2">By: {template.creator.name || template.creator.email}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-semibold text-accent">
          ${(template.price / 100).toFixed(2)}
        </span>
        <Link href={`/marketplace/template/${template.id}`} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg text-sm">
          View
        </Link>
      </div>
    </div>
  );
}
