import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function StrategyCard({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group border border-stone-200 rounded-3xl overflow-hidden bg-white transition-all hover:border-amber-500">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-6 text-left"
            >
                <span className="font-bold text-stone-800 group-hover:text-amber-600 transition-colors">{title}</span>
                <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90 text-amber-600' : 'text-stone-300'}`} />
            </button>
            <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <p className="text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4">
                    {content}
                </p>
            </div>
        </div>
    );
}
