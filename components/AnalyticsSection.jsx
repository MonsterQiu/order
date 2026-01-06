import { useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Globe, Zap } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    DoughnutController,
    LineController,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';

// Chart.js 注册
if (typeof window !== 'undefined') {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarController,
        DoughnutController,
        LineController,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        PointElement,
        LineElement
    );
}

// 市场洞察数据
const INSIGHTS = [
    {
        icon: TrendingUp,
        label: "远程工作增长",
        value: "+340%",
        desc: "2020-2024年",
        trend: "up"
    },
    {
        icon: DollarSign,
        label: "国际单平均时薪",
        value: "$50-80",
        desc: "≈ ¥350-550",
        trend: "up"
    },
    {
        icon: Clock,
        label: "最佳接单时段",
        value: "周一至周三",
        desc: "上午10-12点",
        trend: "neutral"
    },
    {
        icon: Globe,
        label: "最热门技术栈",
        value: "React + Node",
        desc: "占需求40%",
        trend: "up"
    }
];

// 平台对比数据
const PLATFORM_COMPARISON = [
    { name: "Upwork", fee: "10%", hourlyRate: "$40-80", competition: "高", paymentSpeed: "7天" },
    { name: "Fiverr", fee: "20%", hourlyRate: "$20-50", competition: "极高", paymentSpeed: "14天" },
    { name: "程序员客栈", fee: "15%", hourlyRate: "¥150-400", competition: "中", paymentSpeed: "3天" },
    { name: "电鸭社区", fee: "0%", hourlyRate: "¥200-500", competition: "低", paymentSpeed: "即时" },
];

export default function AnalyticsSection() {
    const feeChartRef = useRef(null);
    const demandChartRef = useRef(null);
    const trendChartRef = useRef(null);
    const chartsRef = useRef({ fee: null, demand: null, trend: null });

    useEffect(() => {
        const feeCtx = feeChartRef.current;
        const demandCtx = demandChartRef.current;
        const trendCtx = trendChartRef.current;
        if (!feeCtx || !demandCtx || !trendCtx) return;

        // 销毁旧图表
        if (chartsRef.current.fee) chartsRef.current.fee.destroy();
        if (chartsRef.current.demand) chartsRef.current.demand.destroy();
        if (chartsRef.current.trend) chartsRef.current.trend.destroy();

        const feeChart = new ChartJS(feeCtx, {
            type: 'bar',
            data: {
                labels: ['社区内推', '国内平台', 'Toptal', 'Upwork', 'Fiverr', '中介机构'],
                datasets: [{
                    label: '平均费率 (%)',
                    data: [0, 12, 0, 10, 20, 35],
                    backgroundColor: ['#22c55e', '#f59e0b', '#3b82f6', '#d97706', '#ef4444', '#9ca3af'],
                    borderRadius: 8,
                    barThickness: 28
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        border: { display: false },
                        ticks: { color: '#a8a29e' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#a8a29e', font: { size: 10 } }
                    }
                }
            }
        });

        const demandChart = new ChartJS(demandCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web全栈', 'App开发', '自动化/爬虫', 'AI/ML', 'UI设计', '其他'],
                datasets: [{
                    data: [40, 22, 15, 10, 8, 5],
                    backgroundColor: ['#d97706', '#f59e0b', '#fbbf24', '#3b82f6', '#8b5cf6', '#e7e5e4'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: { size: 11 },
                            color: '#a8a29e'
                        }
                    }
                }
            }
        });

        const trendChart = new ChartJS(trendCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: '远程开发需求指数',
                    data: [100, 180, 250, 320, 400, 480],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#22c55e'
                }, {
                    label: '自由职业者数量',
                    data: [100, 140, 190, 260, 350, 420],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#f59e0b'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 11 },
                            color: '#a8a29e'
                        }
                    }
                },
                scales: {
                    y: {
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        border: { display: false },
                        ticks: { color: '#a8a29e' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#a8a29e' }
                    }
                }
            }
        });

        chartsRef.current = { fee: feeChart, demand: demandChart, trend: trendChart };

        const currentFeeChart = feeChart;
        const currentDemandChart = demandChart;
        const currentTrendChart = trendChart;

        return () => {
            if (currentFeeChart) currentFeeChart.destroy();
            if (currentDemandChart) currentDemandChart.destroy();
            if (currentTrendChart) currentTrendChart.destroy();
        };
    }, []);

    return (
        <section id="analytics" className="bg-stone-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-stone-300">
            {/* 标题 */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">数据洞察</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black">市场数据透视</h2>
                <p className="text-stone-400 mt-4 max-w-xl mx-auto">
                    掌握行业趋势，了解平台差异，做出更明智的选择
                </p>
            </div>

            {/* 关键数据卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {INSIGHTS.map((insight, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <insight.icon className={`w-5 h-5 ${insight.trend === 'up' ? 'text-green-400' : 'text-amber-400'}`} />
                            <span className="text-[10px] text-stone-400 font-bold uppercase">{insight.label}</span>
                        </div>
                        <div className="text-2xl font-black text-white">{insight.value}</div>
                        <div className="text-xs text-stone-500 mt-1">{insight.desc}</div>
                    </div>
                ))}
            </div>

            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                {/* 趋势图 */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-white mb-4">📈 行业增长趋势 (2020=100)</h4>
                    <div className="h-64"><canvas ref={trendChartRef}></canvas></div>
                </div>

                {/* 需求分布 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-white mb-4">🎯 技术领域需求分布</h4>
                    <div className="h-64"><canvas ref={demandChartRef}></canvas></div>
                </div>
            </div>

            {/* 佣金对比 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-white mb-4">💰 平台佣金对比 (%)</h4>
                    <div className="h-56"><canvas ref={feeChartRef}></canvas></div>
                </div>

                {/* 平台对比表 */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-white mb-4">📊 主流平台对比</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-stone-400 text-[10px] uppercase tracking-wider">
                                    <th className="text-left pb-3">平台</th>
                                    <th className="text-center pb-3">佣金</th>
                                    <th className="text-center pb-3">时薪</th>
                                    <th className="text-center pb-3">竞争</th>
                                    <th className="text-center pb-3">到账</th>
                                </tr>
                            </thead>
                            <tbody className="text-stone-300">
                                {PLATFORM_COMPARISON.map((p, i) => (
                                    <tr key={i} className="border-t border-white/5">
                                        <td className="py-3 font-medium text-white">{p.name}</td>
                                        <td className="text-center">{p.fee}</td>
                                        <td className="text-center text-amber-400">{p.hourlyRate}</td>
                                        <td className="text-center">{p.competition}</td>
                                        <td className="text-center">{p.paymentSpeed}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 底部提示 */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
                <p className="text-amber-300 text-sm">
                    💡 <strong>数据洞察：</strong>社区内推和 Toptal 无佣金，但门槛较高；
                    Upwork 是性价比最优选择；中介机构虽抽成高但可减轻沟通成本。
                </p>
            </div>
        </section>
    );
}
