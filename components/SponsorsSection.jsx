import { Sparkles } from 'lucide-react';

// 赞助商数据 - 可自行修改
const SPONSORS = [
    {
        name: "成为赞助商",
        logo: "✨",
        url: "#",
        description: "展示您的品牌"
    }
];

export default function SponsorsSection() {
    return (
        <section className="py-16 border-t border-b border-stone-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-center gap-3 mb-10">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
                        赞助商 & 合作伙伴
                    </h3>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {SPONSORS.map((sponsor, index) => (
                        <a
                            key={index}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-2xl px-8 py-5 transition-all"
                        >
                            <span className="text-3xl">{sponsor.logo}</span>
                            <div>
                                <div className="font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                                    {sponsor.name}
                                </div>
                                <div className="text-[10px] text-stone-400">{sponsor.description}</div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a
                        href="mailto:sponsor@codefreelance.com"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 hover:text-amber-600 transition-colors"
                    >
                        想成为赞助商？联系我们 →
                    </a>
                </div>
            </div>
        </section>
    );
}
