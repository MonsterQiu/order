import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onOpenPlan }) {
    return (
        <section className="text-center space-y-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">2026 自由开发者全渠道报告</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-stone-900">
                重塑你的<br /><span className="text-amber-600 text-stroke">职业边界</span>
            </h1>
            <p className="text-stone-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                整合全球最优质的程序开发接单平台，助你实现从"打工人"到"独立开发者"的跨越。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <a href="#directory" className="bg-stone-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-stone-800 transition-all shadow-xl shadow-stone-200">
                    开始探索 <ArrowRight className="w-5 h-5" />
                </a>
                <button
                    onClick={onOpenPlan}
                    className="bg-amber-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-500 transition-all shadow-xl shadow-amber-200 ring-2 ring-amber-200"
                >
                    开启计划 <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
}
