import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  Calculator as CalcIcon, 
  Globe, 
  MessageSquare, 
  Zap,
  Info,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Briefcase,
  DollarSign
} from 'lucide-react';
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

// Register ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

/**
 * 🎨 选色方案: 现代大地色调 (Modern Earth Tones)
 * 背景: Stone 50/100
 * 主色: Amber 600 (琥珀色)
 * 文字: Stone 900
 * 辅助: Slate 500
 */

// --- 数据定义 ---
const PLATFORMS = [
  {
    id: 1,
    name: "程序员客栈",
    type: "domestic",
    tags: ["中高端", "国内", "项目管理"],
    difficulty: 3,
    fee: "10-20%",
    desc: "国内领先的自由工作平台，不仅有众包，还有按月雇佣模式。适合有 3 年以上开发经验的工程师。",
    url: "https://www.proginn.com/",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    id: 2,
    name: "Upwork",
    type: "global",
    tags: ["国际", "美元", "高单价"],
    difficulty: 4,
    fee: "10%",
    desc: "全球最大的自由职业者平台。不仅考验技术，还考验英语沟通和自我营销能力。",
    url: "https://www.upwork.com/",
    icon: <Globe className="w-6 h-6" />
  },
  {
    id: 3,
    name: "电鸭社区",
    type: "community",
    tags: ["远程办公", "反向招聘", "纯粹"],
    difficulty: 2,
    fee: "0%",
    desc: "中国最早的远程工作社区，聚集了大量寻求远程开发者的初创公司。氛围极佳。",
    url: "https://eleduck.com/",
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 4,
    name: "Fiverr",
    type: "global",
    tags: ["轻量", "标准化", "全球"],
    difficulty: 2,
    fee: "20%",
    desc: "以“Gig”为核心。你可以把爬虫脚本、网页修复、环境部署打包成固定价格的服务进行售卖。",
    url: "https://www.fiverr.com/",
    icon: <DollarSign className="w-6 h-6" />
  },
  {
    id: 5,
    name: "码市",
    type: "domestic",
    tags: ["标准化", "国内", "Coding"],
    difficulty: 3,
    fee: "10%",
    desc: "一站式软件外包服务平台，流程较为规范，适合承接整包项目。",
    url: "https://codemart.com/",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    id: 6,
    name: "V2EX 酷工作",
    type: "community",
    tags: ["极客", "直联", "高质量"],
    difficulty: 3,
    fee: "0%",
    desc: "极客聚集地。虽然没有交易担保，但通常这里的招聘方技术素养较高，需求明确。",
    url: "https://www.v2ex.com/go/jobs",
    icon: <MessageSquare className="w-6 h-6" />
  }
];

// --- 辅助组件: 平台卡片 ---
const PlatformCard = ({ platform }) => (
  <div 
    onClick={() => window.open(platform.url, '_blank')}
    className="group relative bg-white border border-stone-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-stone-200/50 hover:-translate-y-2 cursor-pointer"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-stone-50 rounded-xl group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
        {platform.icon}
      </div>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full ${i < platform.difficulty ? 'bg-amber-500' : 'bg-stone-200'}`}
          />
        ))}
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors flex items-center gap-2">
      {platform.name}
      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </h3>
    
    <div className="flex flex-wrap gap-2 mb-4">
      {platform.tags.map(tag => (
        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-stone-400 border border-stone-200 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      ))}
    </div>
    
    <p className="text-stone-500 text-sm leading-relaxed mb-6">
      {platform.desc}
    </p>
    
    <div className="pt-4 border-t border-stone-50 flex justify-between items-center text-xs">
      <span className="text-stone-400 font-medium">预计平台抽成</span>
      <span className="font-bold text-stone-900">{platform.fee}</span>
    </div>
  </div>
);

// --- 辅助组件: 策略手风琴 ---
const StrategyItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-stone-50 transition-colors"
      >
        <span className="font-bold text-stone-800">{title}</span>
        {isOpen ? <ChevronDown className="w-5 h-5 text-amber-600" /> : <ChevronRight className="w-5 h-5 text-stone-300" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-stone-500 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {content}
        </div>
      )}
    </div>
  );
};

// --- 主应用组件 ---
export default function App() {
  const [filter, setFilter] = useState('all');
  const [hourlyRate, setHourlyRate] = useState(250);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [platformFee, setPlatformFee] = useState(0.1);
  
  const feeChartRef = useRef(null);
  const demandChartRef = useRef(null);

  // 计算结果
  const monthlyIncome = useMemo(() => {
    const gross = hourlyRate * hoursPerWeek * 4.3;
    return Math.floor(gross * (1 - platformFee));
  }, [hourlyRate, hoursPerWeek, platformFee]);

  // 渲染图表
  useEffect(() => {
    const feeCtx = document.getElementById('feeChart').getContext('2d');
    const demandCtx = document.getElementById('demandChart').getContext('2d');

    const feeChart = new ChartJS(feeCtx, {
      type: 'bar',
      data: {
        labels: ['直连/社区', '国内平台', 'Upwork', 'Fiverr', '中介代发'],
        datasets: [{
          data: [2, 12, 10, 20, 35],
          backgroundColor: '#d97706',
          borderRadius: 8,
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
        labels: ['Web Fullstack', 'App/Mini-Program', 'Automation/Script', 'Design/UI', 'DevOps'],
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
        plugins: { legend: { position: 'bottom', labels: { padding: 20, boxWidth: 10 } } }
      }
    });

    return () => {
      feeChart.destroy();
      demandChart.destroy();
    };
  }, []);

  const filteredPlatforms = useMemo(() => {
    return filter === 'all' ? PLATFORMS : PLATFORMS.filter(p => p.type === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-amber-100">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
            <span className="font-bold tracking-tight text-lg">CodeFreelance.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-stone-500">
            <a href="#discovery" className="hover:text-amber-600 transition-colors">发现渠道</a>
            <a href="#analytics" className="hover:text-amber-600 transition-colors">市场分析</a>
            <a href="#calc" className="hover:text-amber-600 transition-colors">收入预测</a>
            <a href="#rules" className="hover:text-amber-600 transition-colors">生存法则</a>
          </div>
          <button className="bg-stone-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-stone-800 transition-all">
            获取报告
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 space-y-32">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold ring-1 ring-amber-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            2026 自由开发者生存指南已更新
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-stone-900 leading-[1.1]">
            不仅仅是代码，<br />更是你的 <span className="text-amber-600">个人商业实验室</span>
          </h1>
          <p className="text-stone-500 text-xl leading-relaxed max-w-2xl mx-auto">
            整合国内外最优质的接单渠道与市场数据，助你实现从“打工人”到“独立开发者”的跨越。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#discovery" className="bg-amber-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-200 transition-all">
              立即开始探索 <ArrowRight className="w-5 h-5" />
            </a>
            <button className="bg-white border border-stone-200 text-stone-800 px-8 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-all">
              查看方法论
            </button>
          </div>
        </section>

        {/* Section 1: Platform Discovery */}
        <section id="discovery" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">核心接单平台</h2>
              <p className="text-stone-500">点击卡片直接前往平台官网。我们建议同时在 2-3 个平台进行冷启动。</p>
            </div>
            <div className="flex bg-stone-100 p-1 rounded-xl">
              {['all', 'domestic', 'global', 'community'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === t ? 'bg-white shadow-sm text-amber-600' : 'text-stone-500 hover:text-stone-700'}`}
                >
                  {t === 'all' ? '全部' : t === 'domestic' ? '国内' : t === 'global' ? '国际' : '社区'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlatforms.map(platform => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </section>

        {/* Section 2: Analytics Dashboard */}
        <section id="analytics" className="bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">市场深度透视</h2>
              <p className="text-stone-500 leading-relaxed text-sm">
                作为独立开发者，理解“价值转换”比理解“API”更重要。佣金成本决定了你的底价，而领域热度决定了你的客源丰富程度。
              </p>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold mb-1">
                  <Info className="w-4 h-4" />
                  <span className="text-xs">专家建议</span>
                </div>
                <p className="text-stone-500 text-xs leading-relaxed">
                  优先选择 V2EX 或电鸭等 0 抽成社区积累种子客户，再通过 Upwork 赚取外汇溢价。
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest text-center">各渠道佣金损耗比</h4>
                <div className="h-64 relative">
                  <canvas id="feeChart"></canvas>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest text-center">2026 技术需求极坐标</h4>
                <div className="h-64 relative">
                  <canvas id="demandChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Salary Calculator */}
        <section id="calc" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex items-center gap-3 text-amber-600 font-bold">
              <CalcIcon className="w-6 h-6" />
              <span className="tracking-widest uppercase text-sm">收益预测</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">计算你的自由身价值</h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between font-bold">
                  <label className="text-stone-500">我的期望时薪</label>
                  <span className="text-amber-600">¥{hourlyRate} / Hr</span>
                </div>
                <input 
                  type="range" min="50" max="1000" step="10"
                  value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between font-bold">
                  <label className="text-stone-500">每周计费工时</label>
                  <span className="text-amber-600">{hoursPerWeek} Hrs / Week</span>
                </div>
                <input 
                  type="range" min="1" max="60"
                  value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-stone-500 font-bold mb-3">平台服务费模型</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '0%', val: 0 },
                    { label: '10%', val: 0.1 },
                    { label: '20%', val: 0.2 }
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => setPlatformFee(item.val)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${platformFee === item.val ? 'bg-amber-600 border-amber-600 text-white shadow-lg' : 'bg-white border-stone-200 text-stone-600 hover:border-amber-200'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-900 rounded-[2.5rem] p-12 text-white space-y-8 order-1 lg:order-2 shadow-2xl shadow-stone-300">
            <h4 className="text-stone-400 font-bold uppercase tracking-widest text-xs">每月净预估收入 (Net Income)</h4>
            <div className="text-7xl font-extrabold tracking-tighter">
              ¥{monthlyIncome.toLocaleString()}
            </div>
            <div className="pt-8 border-t border-stone-800 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-400">年度预估到手</span>
                <span className="font-bold">¥{(monthlyIncome * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-400">平台费用损耗</span>
                <span className="text-red-400 font-bold">- ¥{Math.floor(monthlyIncome / (1 - platformFee) * platformFee).toLocaleString()}</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed italic">
              *此计算基于 4.3 周/月的平均标准。请注意，自由职业者的实际工作效率往往高于办公室工作，建议按 60% 的总工时设定计费时长。
            </p>
          </div>
        </section>

        {/* Section 4: Survival Rules */}
        <section id="rules" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">生存法典</h2>
            <p className="text-stone-500">根据 100+ 位资深独立开发者的实战总结。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <StrategyItem 
              title="如何优雅地谈论价格而不丢单？"
              content="永远不要给出一个具体的数字，而是一个范围。你可以说：'基于类似规模的项目，通常预算在 1.5w 到 2.2w 之间，取决于我们是否需要包含额外的测试和 CI/CD 流程'。这给了你退一步的余地，也向对方展示了你的专业性。"
            />
            <StrategyItem 
              title="如何预防尾款收不回来的风险？"
              content="坚持 3-4-3 支付原则：30% 预付开工单，40% 中期核心功能演示（在你的测试环境），30% 交付源码前。绝对不要在未收到尾款的情况下将代码推送到客户的服务器。"
            />
            <StrategyItem 
              title="英文水平一般，能接国际单吗？"
              content="完全可以。利用 DeepL 和 ChatGPT 进行沟通润色。在国际平台上，很多客户更看重你的代码质量和响应速度。你可以先从非即时通讯（如消息框）开始，随着信心的增加再尝试视频会议。"
            />
            <StrategyItem 
              title="除了代码，我还需要学习什么？"
              content="需求分析和心理学。很多时候客户并不清楚自己想要什么。如果你能帮他梳理业务逻辑并提供超出代码价值的建议，你就能获得极高的客户粘性，从而获得源源不断的转介绍。"
            />
          </div>
        </section>

      </main>

      {/* 底部 */}
      <footer className="bg-stone-900 text-stone-500 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 bg-amber-600 rounded flex items-center justify-center text-white text-[10px] font-bold">C</div>
              <span className="font-bold text-white tracking-tight">CodeFreelance.</span>
            </div>
            <p className="text-xs max-w-xs">专为独立灵魂设计的生存蓝图。我们不生产订单，我们生产订单的搬运工。</p>
          </div>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">隐私协议</a>
            <a href="#" className="hover:text-white transition-colors">加入社区</a>
            <a href="#" className="hover:text-white transition-colors">开发者 API</a>
          </div>
          <div className="text-[10px] text-stone-700">
            © 2026 CODEFREELANCE HUB. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* 背景装饰 */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-amber-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-stone-200 rounded-full blur-[140px]"></div>
      </div>
    </div>
  );
}