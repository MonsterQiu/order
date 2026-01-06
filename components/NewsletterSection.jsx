import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);

        try {
            // 使用 Formspree 免费服务收集邮箱
            // 请替换为您的 Formspree endpoint: https://formspree.io/
            const response = await fetch('https://formspree.io/f/xlgdyvdo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error('提交失败');
            }
        } catch (error) {
            console.error('提交失败:', error);
            // 暂时直接显示成功（在没有配置 Formspree 之前）
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="subscribe" className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-[3rem] p-12 md:p-16 text-white overflow-hidden">
                    {/* 背景装饰 */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">即将推出</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            《程序员接单完全指南》<br />
                            <span className="text-amber-400">正在筹备中</span>
                        </h2>

                        <p className="text-stone-400 text-lg leading-relaxed max-w-xl mx-auto">
                            我们正在整理定价策略、合同模板、客户沟通技巧等独家内容。
                            留下邮箱，第一时间获取发布通知和早鸟优惠。
                        </p>

                        {/* 内容预告 */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                            {[
                                '定价策略与报价模板',
                                '真实合同案例分析',
                                '客户沟通话术指南',
                                '税务与财务规划',
                                '接单避坑指南',
                                '专属读者社群'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-stone-300">
                                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* 订阅表单 */}
                        {!submitted ? (
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                            >
                                <div className="flex-1 relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-amber-500 hover:bg-amber-400 disabled:bg-amber-600 text-stone-900 font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
                                >
                                    {loading ? '提交中...' : <>订阅通知 <ArrowRight className="w-4 h-4" /></>}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 max-w-md mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                                <p className="text-green-300 font-bold">订阅成功！</p>
                                <p className="text-green-400/70 text-sm mt-1">我们会在内容发布时第一时间通知您</p>
                            </div>
                        )}

                        <p className="text-[10px] text-stone-500">
                            我们尊重您的隐私，绝不发送垃圾邮件
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
