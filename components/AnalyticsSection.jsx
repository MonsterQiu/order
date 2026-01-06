import { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    DoughnutController,
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
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        PointElement,
        LineElement
    );
}

export default function AnalyticsSection() {
    const feeChartRef = useRef(null);
    const demandChartRef = useRef(null);
    const chartsRef = useRef({ fee: null, demand: null });

    useEffect(() => {
        const feeCtx = feeChartRef.current;
        const demandCtx = demandChartRef.current;
        if (!feeCtx || !demandCtx) return;

        // 销毁旧图表
        if (chartsRef.current.fee) chartsRef.current.fee.destroy();
        if (chartsRef.current.demand) chartsRef.current.demand.destroy();

        const feeChart = new ChartJS(feeCtx, {
            type: 'bar',
            data: {
                labels: ['社区内推', '国内平台', 'Upwork', 'Fiverr', '中介机构'],
                datasets: [{
                    label: '平均费率 (%)',
                    data: [0, 10, 10, 20, 35],
                    backgroundColor: '#d97706',
                    borderRadius: 12,
                    barThickness: 32
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: '#f5f5f4' }, border: { display: false } },
                    x: { grid: { display: false } }
                }
            }
        });

        const demandChart = new ChartJS(demandCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web全栈', 'App开发', '自动化/爬虫', 'UI设计', '测试/运维'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: ['#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#e7e5e4'],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true, font: { size: 10 } }
                    }
                }
            }
        });

        chartsRef.current = { fee: feeChart, demand: demandChart };

        // 修复：保存引用以避免闭包问题
        const currentFeeChart = feeChart;
        const currentDemandChart = demandChart;

        return () => {
            if (currentFeeChart) currentFeeChart.destroy();
            if (currentDemandChart) currentDemandChart.destroy();
        };
    }, []);

    return (
        <section id="analytics" className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-stone-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative z-10">
                <div className="space-y-8">
                    <div className="w-16 h-16 bg-amber-600 rounded-[2rem] flex items-center justify-center text-3xl shadow-xl shadow-amber-900/40">📊</div>
                    <h2 className="text-4xl font-black">市场数据透视</h2>
                    <p className="text-stone-400 text-sm leading-relaxed font-medium">
                        作为独立开发者，理解"利润漏斗"至关重要。平台费率直接决定了你的底价设定。
                    </p>
                    <div className="space-y-4 pt-6 text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500" /> Web 全栈需求占比最高</div>
                        <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500" /> 国际平台单价高但抽成多</div>
                    </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                        <h4 className="text-center text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">佣金对比 (%)</h4>
                        <div className="h-56 relative"><canvas ref={feeChartRef}></canvas></div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                        <h4 className="text-center text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">领域热度分布</h4>
                        <div className="h-56 relative"><canvas ref={demandChartRef}></canvas></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
