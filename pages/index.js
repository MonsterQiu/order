import { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

// --- Chart.js 注册 ---
if (typeof window !== 'undefined') {
  ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, Tooltip, 
    Legend, ArcElement, PointElement, LineElement
  );
}

// --- 数据定义 ---
const PLATFORMS = [
  { id: 1, name: "Upwork", type: "global", tags: ["全球", "高时薪", "美元"], difficulty: 4, fee: "10%", desc: "全球最大的自由职业者平台，英语环境，单价高。建议建立深度个人 Profile 并在特定领域深耕。", url: "https://www.upwork.com/", icon: "🌍" },
  { id: 2, name: "程序员客栈", type: "domestic", tags: ["国内", "项目制", "规范"], difficulty: 3, fee: "10-20%", desc: "国内成熟的程序开发众包平台，有专门的项目经理对接，适合有经验的开发者起步。", url: "https://www.proginn.com/", icon: "🏠" },
  { id: 3, name: "电鸭社区", type: "community", tags: ["远程办公", "直联", "口碑"], difficulty: 2, fee: "0%", desc: "国内最纯粹的远程工作社区。这里没有中间商，更看重个人品牌和社区声誉，适合长期合作。", url: "https://eleduck.com/", icon: "🦆" },
  { id: 4, name: "Fiverr", type: "global", tags: ["标准化", "全球", "轻量"], difficulty: 2, fee: "20%", desc: "将你的技能打包成“商品”售卖，如：修复一个 Bug $50。适合自动化脚本或小型 Web 开发。", url: "https://www.fiverr.com/", icon: "🏷️" },
  { id: 5, name: "V2EX - 酷工作", type: "community", tags: ["极客", "直联", "高质量"], difficulty: 3, fee: "0%", desc: "程序员最活跃的社区之一。发帖即招聘，回复即面试，沟通效率极高，项目质量往往很不错。", url: "https://www.v2ex.com/go/jobs", icon: "⚡" },
  { id: 6, name: "码市 (Codemart)", type: "domestic", tags: ["Coding", "国内", "标准"], difficulty: 3, fee: "10%", desc: "依托 Coding 生态，项目流程标准化，涵盖了从原型到交付的全过程。支付有平台担保。", url: "https://codemart.com/", icon: "🧱" },
  { id: 7, name: "Toptal", type: "global", tags: ["精英制", "高门槛", "时薪制"], difficulty: 5, fee: "0%", desc: "只招全球前 3% 的顶尖开发者。通过面试后，你将获得全球顶尖公司的长期高薪合同。", url: "https://www.toptal.com/", icon: "💎" }
];

// --- 子组件: 策略项 ---
const StrategyCard = ({ title, content }) => {
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
};

// --- 主页面 ---
export default function App() {
  const [filter, setFilter] = useState('all');
  const [rate, setRate] = useState(260);
  const [hours, setHours] = useState(25);
  const [feePercent, setFeePercent] = useState(0.12);
  const feeChartRef = useRef(null);
  const demandChartRef = useRef(null);
  const chartsRef = useRef({ fee: null, demand: null });

  const netIncome = useMemo(() => {
    const gross = Number(rate) * Number(hours) * 4.3; // 4.3 weeks/month
    return Math.floor(gross * (1 - feePercent));
  }, [rate, hours, feePercent]);

  // 图表渲染
  useEffect(() => {
    const feeCtx = feeChartRef.current;
    const demandCtx = demandChartRef.current;
    if (!feeCtx || !demandCtx) return;

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

    return () => {
      if (chartsRef.current.fee) chartsRef.current.fee.destroy();
      if (chartsRef.current.demand) chartsRef.current.demand.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-stone-900 selection:bg-amber-100 font-sans">
      <Head>
        <title>CodeFreelance | 程序员接单生存指南</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navigation */}
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
          <button className="bg-stone-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:scale-105 transition-all">开启计划</button>
        </div>
      </nav>

      <main className="pt-40 pb-32 max-w-7xl mx-auto px-6 space-y-40">
        
        {/* Hero Section */}
        <section className="text-center space-y-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">2026 自由开发者全渠道报告</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-stone-900">
            重塑你的<br /><span className="text-amber-600 text-stroke">职业边界</span>
          </h1>
          <p className="text-stone-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            整合全球最优质的程序开发接单平台，助你实现从“打工人”到“独立开发者”的跨越。
          </p>
          <div className="flex justify-center gap-4">
            <a href="#directory" className="bg-stone-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-stone-800 transition-all shadow-xl shadow-stone-200">
              开始探索 <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-100 pb-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tight uppercase">Platform Directory</h2>
              <p className="text-stone-400 font-medium">点击卡片直接前往平台官网。我们建议在初期深耕 2-3 个核心渠道。</p>
            </div>
            <div className="flex bg-stone-100 p-1.5 rounded-2xl">
              {['all', 'domestic', 'global', 'community'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-white text-amber-600 shadow-md' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  {t === 'all' ? '全部' : t === 'domestic' ? '国内' : t === 'global' ? '国际' : '社区'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLATFORMS.filter(p => filter === 'all' || p.type === filter).map(platform => (
              <div 
                key={platform.id}
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
            ))}
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics" className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-stone-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative z-10">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-amber-600 rounded-[2rem] flex items-center justify-center text-3xl shadow-xl shadow-amber-900/40">📊</div>
              <h2 className="text-4xl font-black">市场数据透视</h2>
              <p className="text-stone-400 text-sm leading-relaxed font-medium">
                作为独立开发者，理解“利润漏斗”至关重要。平台费率直接决定了你的底价设定。
              </p>
              <div className="space-y-4 pt-6 text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500" /> Web 全栈需求占比最高</div>
                <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500" /> 国际平台单价高但抽成多</div>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                <h4 className="text-center text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">佣金对比 (%)</h4>
                <div className="h-56 relative"><canvas id="feeChart" ref={feeChartRef}></canvas></div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                <h4 className="text-center text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">领域热度分布</h4>
                <div className="h-56 relative"><canvas id="demandChart" ref={demandChartRef}></canvas></div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calc" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tight leading-tight text-stone-900">收益预测<br />CALCULATOR</h2>
              <p className="text-stone-400 font-medium">设定合理的时薪是可持续发展的关键。请记住，你需要为自己的社保、设备和假期预留预算。</p>
            </div>
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Expected Hourly Rate</label>
                  <span className="text-3xl font-black text-amber-600">¥{rate} <span className="text-sm text-stone-300 font-medium">/ hr</span></span>
                </div>
                <input 
                  type="range" min="50" max="1500" step="10"
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Weekly Billable Hours</label>
                  <span className="text-3xl font-black text-amber-600">{hours} <span className="text-sm text-stone-300 font-medium">hrs</span></span>
                </div>
                <input 
                  type="range" min="5" max="60"
                  value={hours} onChange={e => setHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[0, 0.1, 0.2].map(v => (
                  <button 
                    key={v}
                    onClick={() => setFeePercent(v)}
                    className={`py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all ${feePercent === v ? 'bg-amber-600 text-white shadow-xl shadow-amber-200' : 'bg-white border border-stone-200 text-stone-400 hover:border-amber-200'}`}
                  >
                    FEE {v*100}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-[4rem] p-16 md:p-24 text-center space-y-10 shadow-2xl shadow-stone-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-600" />
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em]">Monthly Net Earnings</h4>
              <div className="text-8xl font-black text-stone-900 tracking-tighter">
                ¥{netIncome.toLocaleString()}
              </div>
            </div>
            <div className="pt-10 border-t border-stone-100 flex justify-center gap-10 text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">
               <span>Yearly: ¥{(netIncome*12).toLocaleString()}</span>
               <span>Platform Loss: ¥{Math.floor(netIncome / (1-feePercent) * feePercent).toLocaleString()}</span>
            </div>
            <p className="text-[10px] italic text-stone-400 max-w-[240px] mx-auto leading-relaxed">
              *基于 4.3 周/月计算。建议实际计费工时不超过总工作时间的 70% 以维持生活质量。
            </p>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="rules" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tight">Survival Strategy</h2>
            <p className="text-stone-500 font-medium max-w-xl mx-auto">不仅仅是写代码，更是经营你自己。这里有一些前辈总结的生存法则。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <StrategyCard 
              title="如何优雅地谈论价格？"
              content="永远不要给出一个绝对数字，而是一个预算范围。你可以说：'根据以往经验，类似规模的项目通常在 1.5w - 2.5w 之间。' 这给了你后期谈判的灵活性。"
            />
            <StrategyCard 
              title="如何预防尾款烂账？"
              content="坚持 3-4-3 支付原则：30% 预付开工，40% 中期核心功能演示（在你的服务器），30% 交付源码前结清。千万不要在未结清前交付源码。"
            />
            <StrategyCard 
              title="英文水平一般能接国际单吗？"
              content="完全可以。利用 ChatGPT 和 DeepL 翻译。初期选择异步沟通（邮件/消息）而非语音会议。大多数客户更在乎你的代码质量而非口语流利度。"
            />
            <StrategyCard 
              title="如何维持稳定的客源？"
              content="最好的客源是老客户的转介绍。确保每一次交付都超出客户预期一点点，并主动在项目结束一个月后回访，询问是否有新的需求。"
            />
          </div>
        </section>

      </main>

      <footer className="py-24 bg-stone-50 border-t border-stone-200/60 px-6 text-center">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="font-black text-2xl tracking-tighter text-stone-900">CodeFreelance.</div>
          <div className="flex justify-center gap-10 text-[10px] font-black text-stone-400 uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-stone-900 transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-stone-900 transition-colors">COMMUNITY</a>
            <a href="#" className="hover:text-stone-900 transition-colors">CONTACT</a>
          </div>
          <p className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em]">© 2026 Powered by Next.js & Tailwind. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
