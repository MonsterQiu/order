import { Users, Globe, TrendingUp, Award } from 'lucide-react';

const STATS = [
    {
        icon: Globe,
        value: "30+",
        label: "收录平台",
        desc: "覆盖国内外主流渠道"
    },
    {
        icon: Users,
        value: "10,000+",
        label: "开发者访问",
        desc: "每月持续增长"
    },
    {
        icon: TrendingUp,
        value: "¥280",
        label: "平均时薪",
        desc: "自由职业者行业均值"
    },
    {
        icon: Award,
        value: "85%",
        label: "推荐满意度",
        desc: "用户反馈统计"
    }
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
                        为什么选择 CodeFreelance？
                    </h2>
                    <p className="text-stone-500 mt-4 max-w-xl mx-auto">
                        我们不只是平台导航，更是你自由职业路上的助力器
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                    {STATS.map((stat, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-3xl p-8 border border-stone-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <stat.icon className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="text-4xl md:text-5xl font-black text-stone-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm font-bold text-stone-700 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-stone-400">
                                {stat.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
