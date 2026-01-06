import { TrendingUp, ExternalLink } from 'lucide-react';

// 热门技术关键词及其 Google Trends 数据
const TECH_TRENDS = [
    {
        keyword: "React",
        trend: 95,
        growth: "+12%",
        jobs: "全球需求第一",
        color: "#61DAFB"
    },
    {
        keyword: "Next.js",
        trend: 78,
        growth: "+45%",
        jobs: "增长最快框架",
        color: "#000000"
    },
    {
        keyword: "Python",
        trend: 92,
        growth: "+8%",
        jobs: "AI/数据分析必备",
        color: "#3776AB"
    },
    {
        keyword: "Node.js",
        trend: 85,
        growth: "+5%",
        jobs: "后端开发首选",
        color: "#339933"
    },
    {
        keyword: "TypeScript",
        trend: 82,
        growth: "+28%",
        jobs: "大厂标配",
        color: "#3178C6"
    },
    {
        keyword: "Flutter",
        trend: 68,
        growth: "+22%",
        jobs: "跨平台新星",
        color: "#02569B"
    }
];

export default function TechTrends() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-stone-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">实时热度</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
                        技术栈热度排行
                    </h2>
                    <p className="text-stone-500 mt-4 max-w-xl mx-auto">
                        基于 Google Trends 和招聘市场数据，了解当前最热门的技术方向
                    </p>
                </div>

                {/* 热度排行 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {TECH_TRENDS.map((tech, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                                        style={{ backgroundColor: tech.color }}
                                    >
                                        {index + 1}
                                    </div>
                                    <span className="font-bold text-lg text-stone-900">{tech.keyword}</span>
                                </div>
                                <span className={`text-sm font-bold ${tech.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {tech.growth}
                                </span>
                            </div>

                            {/* 热度条 */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-stone-400 mb-2">
                                    <span>热度指数</span>
                                    <span className="font-bold text-stone-900">{tech.trend}/100</span>
                                </div>
                                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                                        style={{
                                            width: `${tech.trend}%`,
                                            backgroundColor: tech.color
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="text-xs text-stone-500">
                                📊 {tech.jobs}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Google Trends 嵌入 */}
                <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-stone-900">📈 全球搜索趋势对比</h3>
                        <a
                            href="https://trends.google.com/trends/explore?cat=31&q=React,Vue,Angular,Next.js,Svelte"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                            在 Google Trends 查看 <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>

                    {/* Google Trends 嵌入 iframe */}
                    <div className="relative overflow-hidden rounded-2xl bg-stone-50">
                        <iframe
                            src="https://trends.google.com/trends/embed/explore/TIMESERIES?req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22React%22%2C%22geo%22%3A%22%22%2C%22time%22%3A%22today%2012-m%22%7D%2C%7B%22keyword%22%3A%22Vue%22%2C%22geo%22%3A%22%22%2C%22time%22%3A%22today%2012-m%22%7D%2C%7B%22keyword%22%3A%22Next.js%22%2C%22geo%22%3A%22%22%2C%22time%22%3A%22today%2012-m%22%7D%5D%2C%22category%22%3A31%2C%22property%22%3A%22%22%7D&tz=-480"
                            className="w-full h-80 border-0"
                            title="Google Trends"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-xs text-stone-400 mt-4 text-center">
                        数据来源：Google Trends · 过去 12 个月全球搜索热度
                    </p>
                </div>

                {/* 建议卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <div className="text-2xl mb-3">🚀</div>
                        <h4 className="font-bold text-green-800 mb-2">高增长技术</h4>
                        <p className="text-sm text-green-600">Next.js、TypeScript 增长迅猛，建议尽早布局</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                        <div className="text-2xl mb-3">💰</div>
                        <h4 className="font-bold text-amber-800 mb-2">高薪技术</h4>
                        <p className="text-sm text-amber-600">Python + AI/ML 方向时薪最高，可达 $100+</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <div className="text-2xl mb-3">📈</div>
                        <h4 className="font-bold text-blue-800 mb-2">稳定需求</h4>
                        <p className="text-sm text-blue-600">React + Node 全栈组合，订单量最稳定</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
