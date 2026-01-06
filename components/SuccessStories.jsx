import { Quote, ArrowRight } from 'lucide-react';

const STORIES = [
    {
        name: "张明",
        title: "全栈开发者",
        avatar: "👨‍💻",
        platform: "Upwork",
        income: "月入 ¥35,000+",
        story: "从国内平台转战 Upwork 后，时薪从 150 涨到 400。关键是找准定位，我专注做 React + Node 全栈项目。",
        tips: "建议先把 Profile 做到 100%，然后从小单开始积累评价。"
    },
    {
        name: "李薇",
        title: "前端工程师",
        avatar: "👩‍💻",
        platform: "程序员客栈",
        income: "月入 ¥20,000+",
        story: "作为宝妈重返职场很难，自由职业给了我灵活性。现在每天工作 5 小时，收入比之前上班还高。",
        tips: "时间管理很重要，我把工作集中在孩子上学的时段。"
    },
    {
        name: "王强",
        title: "后端架构师",
        avatar: "🧑‍💻",
        platform: "电鸭社区",
        income: "月入 ¥50,000+",
        story: "在电鸭找到一个长期合作的远程团队，相当于全职但更自由。省去通勤，效率反而更高。",
        tips: "社区口碑很重要，多分享、多互动，订单自然来。"
    }
];

export default function SuccessStories() {
    return (
        <section id="stories" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-700">真实案例</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
                        他们已经成功接单
                    </h2>
                    <p className="text-stone-500 mt-4 max-w-xl mx-auto">
                        来自不同背景的开发者，通过正确的渠道和方法实现了自由职业梦想
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STORIES.map((story, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 border border-stone-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50 transition-all relative overflow-hidden group"
                        >
                            {/* 背景装饰 */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                {/* 头部 */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center text-2xl">
                                        {story.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-900">{story.name}</div>
                                        <div className="text-xs text-stone-500">{story.title}</div>
                                    </div>
                                </div>

                                {/* 标签 */}
                                <div className="flex gap-2 mb-6">
                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                                        {story.platform}
                                    </span>
                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        {story.income}
                                    </span>
                                </div>

                                {/* 故事 */}
                                <div className="relative mb-6">
                                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-stone-100" />
                                    <p className="text-stone-600 text-sm leading-relaxed pl-4">
                                        {story.story}
                                    </p>
                                </div>

                                {/* 建议 */}
                                <div className="bg-stone-50 rounded-2xl p-4">
                                    <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">
                                        TA 的建议
                                    </div>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        {story.tips}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="#subscribe"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-2xl transition-colors"
                    >
                        我也想成功接单 <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
