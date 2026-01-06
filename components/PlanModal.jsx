import { useState, useEffect, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { PLATFORMS, TYPE_LABELS } from '../data/platforms';
import { getRecommendations } from '../utils/recommendations';

export default function PlanModal({ isOpen, onClose }) {
    const [planForm, setPlanForm] = useState({
        target: "all",
        experience: "junior",
        english: "mid",
        bidding: "no",
        duration: "long",
        rate: 260
    });

    const recommendations = useMemo(
        () => getRecommendations(planForm, PLATFORMS).slice(0, 5),
        [planForm]
    );

    const updatePlan = (key, value) => {
        setPlanForm((prev) => ({ ...prev, [key]: value }));
    };

    const resetForm = () => {
        setPlanForm({
            target: "all",
            experience: "junior",
            english: "mid",
            bidding: "no",
            duration: "long",
            rate: 260
        });
    };

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 px-4 py-10">
            <div
                className="absolute inset-0"
                onClick={onClose}
                role="button"
                tabIndex={0}
                aria-label="关闭"
                onKeyDown={(e) => e.key === 'Enter' && onClose()}
            />
            <div
                className="relative w-full max-w-5xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl max-h-[90vh] overflow-y-auto"
                role="dialog"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
                            AI MATCH
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight">接单平台智能推荐</h3>
                        <p className="text-stone-400 text-sm">
                            基于你填写的信息进行本地规则匹配，不依赖外部 API。
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900"
                    >
                        关闭
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                目标渠道
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: "all", label: "不限" },
                                    { value: "domestic", label: "国内" },
                                    { value: "global", label: "国际" },
                                    { value: "community", label: "社区" }
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => updatePlan("target", option.value)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${planForm.target === option.value
                                                ? "bg-stone-900 text-white"
                                                : "bg-stone-100 text-stone-400 hover:text-stone-700"
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                    经验阶段
                                </label>
                                <select
                                    value={planForm.experience}
                                    onChange={(event) => updatePlan("experience", event.target.value)}
                                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700"
                                >
                                    <option value="newbie">0-1 年</option>
                                    <option value="junior">1-3 年</option>
                                    <option value="mid">3-5 年</option>
                                    <option value="senior">5+ 年</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                    英语沟通
                                </label>
                                <select
                                    value={planForm.english}
                                    onChange={(event) => updatePlan("english", event.target.value)}
                                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700"
                                >
                                    <option value="low">基础</option>
                                    <option value="mid">一般</option>
                                    <option value="high">流利</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                    竞标偏好
                                </label>
                                <select
                                    value={planForm.bidding}
                                    onChange={(event) => updatePlan("bidding", event.target.value)}
                                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700"
                                >
                                    <option value="no">不接受竞标</option>
                                    <option value="yes">可以竞标</option>
                                    <option value="any">无所谓</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                    项目周期
                                </label>
                                <select
                                    value={planForm.duration}
                                    onChange={(event) => updatePlan("duration", event.target.value)}
                                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700"
                                >
                                    <option value="long">中长期</option>
                                    <option value="short">短期小单</option>
                                    <option value="any">不限</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                    期望时薪 (RMB)
                                </label>
                                <span className="text-2xl font-black text-amber-600">￥{planForm.rate}</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="1500"
                                step="10"
                                value={planForm.rate}
                                onChange={(event) => updatePlan("rate", Number(event.target.value))}
                                aria-label="期望时薪"
                                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                            />
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            推荐结果基于本地规则匹配
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-black">匹配结果</h4>
                            <button
                                onClick={resetForm}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900"
                            >
                                重置
                            </button>
                        </div>

                        {recommendations.map((platform, index) => {
                            const reasons = platform.reasons.length ? platform.reasons : ["综合匹配"];
                            return (
                                <div
                                    key={platform.id}
                                    className="border border-stone-200 rounded-2xl p-5 bg-stone-50/70"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-black text-stone-900">
                                                {index + 1}. {platform.name}
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                                                {TYPE_LABELS[platform.type]}
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                                            Fee {platform.fee}
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-500 leading-relaxed mt-2">
                                        {platform.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {reasons.map((reason) => (
                                            <span
                                                key={reason}
                                                className="text-[9px] font-black uppercase tracking-widest text-stone-400 bg-white border border-stone-200 px-2 py-1 rounded-md"
                                            >
                                                {reason}
                                            </span>
                                        ))}
                                    </div>
                                    <a
                                        href={platform.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mt-4"
                                    >
                                        前往平台
                                        <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
