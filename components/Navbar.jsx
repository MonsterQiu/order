import Link from 'next/link';

export default function Navbar({ onOpenPlan }) {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-stone-200/60 h-16 flex items-center px-6">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg">C</div>
                    <span className="font-extrabold text-xl tracking-tighter">CodeFreelance.</span>
                </div>
                <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">
                    <a href="#directory" className="hover:text-amber-600 transition-colors">渠道探寻</a>
                    <a href="#analytics" className="hover:text-amber-600 transition-colors">数据分析</a>
                    <a href="#calc" className="hover:text-amber-600 transition-colors">收益预测</a>
                </div>
                <button
                    onClick={onOpenPlan}
                    className="bg-stone-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all"
                >
                    开启计划
                </button>
            </div>
        </nav>
    );
}
