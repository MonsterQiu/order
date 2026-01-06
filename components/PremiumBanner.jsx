import { ArrowRight, BookOpen, Star } from 'lucide-react';

export default function PremiumBanner() {
    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-[3rem] p-12 md:p-16 text-white overflow-hidden">
                    {/* 背景装饰 */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Star className="w-4 h-4" fill="white" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Premium Content</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                《程序员接单<br />完全指南》
                            </h2>

                            <p className="text-white/80 text-lg leading-relaxed">
                                从0到1打造你的自由职业生涯。包含定价策略、客户管理、合同模板、税务指南等独家内容。
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    <span>50+ 页精华内容</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4" fill="white" />
                                    <span>持续更新</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                            <div className="text-center space-y-6">
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/60">限时优惠价</div>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-xl text-white/40 line-through">¥199</span>
                                        <span className="text-5xl font-black">¥99</span>
                                    </div>
                                </div>

                                <ul className="text-left space-y-3 text-sm">
                                    {[
                                        "完整定价策略与报价模板",
                                        "10+ 真实合同案例分析",
                                        "客户沟通话术指南",
                                        "税务与财务规划建议",
                                        "专属读者交流群"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="https://xiaobot.net/p/codefreelance"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-white text-amber-600 font-black py-4 rounded-2xl hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    立即获取 <ArrowRight className="w-4 h-4" />
                                </a>

                                <p className="text-[10px] text-white/50">
                                    购买后可在小报童平台永久阅读
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
