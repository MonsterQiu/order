import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        question: "没有经验能接到单吗？",
        answer: "完全可以！建议从猪八戒、一品威客等门槛较低的平台开始，先接几个小单积累评价和作品集。同时在 GitHub 上展示你的个人项目，证明你的技术能力。记住，每个大神都是从第一单开始的。"
    },
    {
        question: "如何定价不亏本？",
        answer: "使用公式：时薪 = (期望月收入 + 成本) ÷ 可计费小时数 × 1.3。记得加上社保、设备折旧、学习时间等隐性成本。建议新手按市场价的 80% 起步，积累口碑后逐步提价。"
    },
    {
        question: "客户不付款怎么办？",
        answer: "预防永远比补救重要！坚持 3-4-3 付款方式（30%预付、40%中期、30%交付前）。中期演示在自己服务器，源码交付前必须结清尾款。如遇纠纷，保留聊天记录，必要时走法律途径。"
    },
    {
        question: "英语不好能接国际单吗？",
        answer: "可以！用好翻译工具（DeepL、ChatGPT）。初期选择异步沟通（邮件/文字），避免视频会议。很多客户更看重代码质量而非口语流利度。随着经验积累，英语能力自然会提升。"
    },
    {
        question: "全职还是兼职做自由职业？",
        answer: "建议先兼职试水，月入稳定超过工资的 1.5 倍再考虑全职。全职后记得购买医社保、预留紧急资金（3-6个月生活费）。自由职业的风险是收入不稳定，需要有足够的缓冲。"
    },
    {
        question: "如何持续获得订单？",
        answer: "最好的订单来源是老客户转介绍。每次交付超出预期，项目结束 1 个月后主动回访。同时经营个人品牌：写技术博客、参与开源项目、在社区活跃。长期来看，被动获客才是王道。"
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-700">常见问题</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
                        新手常见疑问解答
                    </h2>
                    <p className="text-stone-500 mt-4">
                        我们整理了自由职业开发者最关心的问题
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-purple-200 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-stone-900 pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-stone-400 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180 text-purple-600' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <p className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-50 pt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
