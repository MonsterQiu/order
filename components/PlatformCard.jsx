export default function PlatformCard({ platform }) {
    return (
        <div
            onClick={() => window.open(platform.url, '_blank')}
            className="group relative bg-white border border-stone-200 rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 cursor-pointer"
        >
            <div className="flex justify-between items-start mb-10">
                <div className="text-4xl w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {platform.icon}
                </div>
                <div className="flex gap-1 pt-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < platform.difficulty ? 'bg-amber-500' : 'bg-stone-100'}`} />
                    ))}
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-600 transition-colors">{platform.name}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
                {platform.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-stone-400 bg-stone-100 px-2 py-1 rounded-md">{tag}</span>
                ))}
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-8 h-12 overflow-hidden">
                {platform.desc}
            </p>
            <div className="pt-6 border-t border-stone-50 flex justify-between items-center text-[10px] font-black text-stone-300 uppercase tracking-widest">
                <span>Fee Structure</span>
                <span className="text-stone-900">{platform.fee}</span>
            </div>
        </div>
    );
}
