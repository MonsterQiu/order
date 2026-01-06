import { useState } from 'react';
import Head from 'next/head';
import { PLATFORMS } from '../data/platforms';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PlatformCard from '../components/PlatformCard';
import AnalyticsSection from '../components/AnalyticsSection';
import Calculator from '../components/Calculator';
import StrategyCard from '../components/StrategyCard';
import PlanModal from '../components/PlanModal';
import Footer from '../components/Footer';
// 盈利功能组件
import SupportButton from '../components/SupportButton';
import SponsorsSection from '../components/SponsorsSection';
import NewsletterSection from '../components/NewsletterSection';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [planOpen, setPlanOpen] = useState(false);

  const filteredPlatforms = PLATFORMS.filter(p => filter === 'all' || p.type === filter);

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-stone-900 selection:bg-amber-100 font-sans">
      <Head>
        <title>CodeFreelance | 程序员接单生存指南</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="整合全球最优质的程序开发接单平台，助你实现从打工人到独立开发者的跨越。" />
      </Head>

      <Navbar onOpenPlan={() => setPlanOpen(true)} />

      <PlanModal isOpen={planOpen} onClose={() => setPlanOpen(false)} />

      {/* 浮动按钮组 */}
      {!planOpen && (
        <button
          onClick={() => setPlanOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-amber-600 text-white px-5 py-3 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-amber-200/70 hover:scale-105 transition-all"
        >
          开启计划
        </button>
      )}

      {/* 打赏按钮 */}
      <SupportButton />

      <main className="pt-40 pb-32 max-w-7xl mx-auto px-6 space-y-40">

        <HeroSection onOpenPlan={() => setPlanOpen(true)} />

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
            {filteredPlatforms.map(platform => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </section>

        <AnalyticsSection />

        {/* 邮件订阅 - 内容预告 */}
        <NewsletterSection />

        <Calculator />

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

      {/* 赞助商区域 */}
      <SponsorsSection />

      <Footer />
    </div>
  );
}
