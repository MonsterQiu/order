import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Sparkles, Key, AlertCircle, CheckCircle, Loader2, Settings, X } from 'lucide-react';
import { PLATFORMS, TYPE_LABELS } from '../data/platforms';
import { getRecommendations } from '../utils/recommendations';

// AI 提供商配置
const AI_PROVIDERS = {
    gemini: {
        name: 'Google Gemini',
        icon: '🔮',
        placeholder: 'AIzaSy...',
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        free: true
    },
    openai: {
        name: 'OpenAI ChatGPT',
        icon: '🤖',
        placeholder: 'sk-...',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        free: false
    },
    claude: {
        name: 'Anthropic Claude',
        icon: '🧠',
        placeholder: 'sk-ant-...',
        endpoint: 'https://api.anthropic.com/v1/messages',
        free: false
    }
};

// 生成 AI 分析 prompt
const generatePrompt = (form) => {
    return `你是一位资深的自由职业顾问，专门帮助程序员找到适合的接单渠道。

用户信息：
- 经验水平：${form.experience === 'newbie' ? '0-1年' : form.experience === 'junior' ? '1-3年' : form.experience === 'mid' ? '3-5年' : '5年以上'}
- 英语能力：${form.english === 'low' ? '基础' : form.english === 'mid' ? '一般' : '流利'}
- 目标市场：${form.target === 'all' ? '不限' : form.target === 'domestic' ? '国内' : form.target === 'global' ? '国际' : '社区'}
- 竞标偏好：${form.bidding === 'no' ? '不接受竞标' : form.bidding === 'yes' ? '可以竞标' : '无所谓'}
- 项目周期：${form.duration === 'long' ? '中长期' : form.duration === 'short' ? '短期小单' : '不限'}
- 期望时薪：¥${form.rate}
- 技术栈：${form.techStack || '未填写'}
- 补充说明：${form.notes || '无'}

请给出：
1. 针对该用户的个性化接单策略建议（3-5条，每条50字以内）
2. 最适合的 3 个平台及原因
3. 需要注意的风险提示（1-2条）
4. 预估月收入范围

请用简洁专业的语气回复，使用中文，直接给出建议，不要有开场白。`;
};

// 调用不同 AI API
const callAI = async (provider, apiKey, prompt) => {
    if (provider === 'gemini') {
        const response = await fetch(`${AI_PROVIDERS.gemini.endpoint}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text;
    }

    if (provider === 'openai') {
        const response = await fetch(AI_PROVIDERS.openai.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1000
            })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.choices[0].message.content;
    }

    if (provider === 'claude') {
        const response = await fetch(AI_PROVIDERS.claude.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 1000,
                messages: [{ role: 'user', content: prompt }]
            })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.content[0].text;
    }

    throw new Error('未知的 AI 提供商');
};

export default function PlanModal({ isOpen, onClose }) {
    const [mode, setMode] = useState('form'); // 'form' | 'result' | 'settings'
    const [loading, setLoading] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [error, setError] = useState(null);

    // API 设置
    const [selectedProvider, setSelectedProvider] = useState('gemini');
    const [apiKeys, setApiKeys] = useState({
        gemini: '',
        openai: '',
        claude: ''
    });

    // 使用次数（存储在 localStorage）
    const [freeUsesLeft, setFreeUsesLeft] = useState(2);

    // 表单数据
    const [planForm, setPlanForm] = useState({
        target: "all",
        experience: "junior",
        english: "mid",
        bidding: "no",
        duration: "long",
        rate: 260,
        techStack: "",
        notes: ""
    });

    // 加载 localStorage 数据
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedKeys = localStorage.getItem('codefreelance_api_keys');
            const savedUses = localStorage.getItem('codefreelance_free_uses');
            const savedProvider = localStorage.getItem('codefreelance_provider');

            if (savedKeys) setApiKeys(JSON.parse(savedKeys));
            if (savedUses) setFreeUsesLeft(parseInt(savedUses));
            if (savedProvider) setSelectedProvider(savedProvider);
        }
    }, []);

    // 保存 API Keys
    const saveSettings = () => {
        localStorage.setItem('codefreelance_api_keys', JSON.stringify(apiKeys));
        localStorage.setItem('codefreelance_provider', selectedProvider);
        setMode('form');
    };

    // 本地规则推荐
    const recommendations = useMemo(
        () => getRecommendations(planForm, PLATFORMS).slice(0, 5),
        [planForm]
    );

    const updatePlan = (key, value) => {
        setPlanForm((prev) => ({ ...prev, [key]: value }));
    };

    // AI 分析
    const handleAIAnalysis = async () => {
        const currentKey = apiKeys[selectedProvider];
        const canUseFree = freeUsesLeft > 0;

        // 检查是否有 API Key 或免费次数
        if (!currentKey && !canUseFree) {
            setError('免费次数已用完，请设置您的 API Key 继续使用');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const prompt = generatePrompt(planForm);

            // 如果有自己的 Key 则使用自己的，否则用站长的（这里模拟）
            let result;
            if (currentKey) {
                result = await callAI(selectedProvider, currentKey, prompt);
            } else {
                // 使用免费次数（实际需要后端 API）
                // 这里先模拟一个结果
                result = generateMockResult(planForm);
                const newUses = freeUsesLeft - 1;
                setFreeUsesLeft(newUses);
                localStorage.setItem('codefreelance_free_uses', newUses.toString());
            }

            setAiResult(result);
            setMode('result');
        } catch (err) {
            setError(err.message || 'AI 分析失败，请检查 API Key 是否正确');
        } finally {
            setLoading(false);
        }
    };

    // 模拟结果（当没有真实 API 时使用）
    const generateMockResult = (form) => {
        const experience = form.experience === 'senior' ? '丰富' : form.experience === 'mid' ? '中等' : '较少';
        const market = form.target === 'global' ? '国际市场' : form.target === 'domestic' ? '国内市场' : '综合市场';

        return `## 💡 个性化接单策略

1. **定位建议**：根据您${experience}的经验，建议从${market}的中型项目切入
2. **Profile 优化**：重点突出项目经验和技术深度，添加作品集链接
3. **报价策略**：初期可按 ¥${Math.round(form.rate * 0.9)}/小时报价，积累评价后逐步提升
4. **时间分配**：建议 70% 精力投入主平台，30% 探索新渠道

## 🎯 推荐平台

1. **${form.target === 'global' ? 'Upwork' : '程序员客栈'}** - 与您的经验和英语水平匹配度最高
2. **${form.target === 'global' ? 'Toptal' : '电鸭社区'}** - 长期合作机会多，口碑效应强
3. **${form.target === 'community' ? 'V2EX' : '猪八戒'}** - 适合快速积累初期订单

## ⚠️ 风险提示

- 注意合同条款，确保知识产权归属清晰
- 坚持 30% 预付款原则，降低烂账风险

## 💰 预估月收入

保守估计：¥${Math.round(form.rate * 80)} - ¥${Math.round(form.rate * 120)}
理想情况：¥${Math.round(form.rate * 120)} - ¥${Math.round(form.rate * 160)}`;
    };

    const resetForm = () => {
        setPlanForm({
            target: "all",
            experience: "junior",
            english: "mid",
            bidding: "no",
            duration: "long",
            rate: 260,
            techStack: "",
            notes: ""
        });
        setAiResult(null);
        setError(null);
        setMode('form');
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
                {/* 头部 */}
                <div className="flex items-start justify-between gap-6 mb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
                                AI MATCH
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight">接单平台智能推荐</h3>
                        <p className="text-stone-400 text-sm">
                            AI 深度分析您的情况，给出个性化接单建议
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setMode('settings')}
                            className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition-colors"
                            title="API 设置"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 免费次数提示 */}
                {!apiKeys[selectedProvider] && (
                    <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${freeUsesLeft > 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                        {freeUsesLeft > 0 ? (
                            <>
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-green-700">
                                    您还有 <strong>{freeUsesLeft}</strong> 次免费 AI 分析机会
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-5 h-5 text-amber-600" />
                                <span className="text-sm text-amber-700">
                                    免费次数已用完，请
                                    <button onClick={() => setMode('settings')} className="underline font-bold mx-1">
                                        设置 API Key
                                    </button>
                                    继续使用
                                </span>
                            </>
                        )}
                    </div>
                )}

                {/* 错误提示 */}
                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-red-700">{error}</span>
                    </div>
                )}

                {/* 设置页面 */}
                {mode === 'settings' && (
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold">API 设置</h4>
                        <p className="text-sm text-stone-500">
                            填写您自己的 API Key 可无限次使用 AI 分析功能。所有 Key 仅保存在您的浏览器本地。
                        </p>

                        <div className="space-y-4">
                            {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
                                <div key={key} className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold">
                                        <span>{provider.icon}</span>
                                        <span>{provider.name}</span>
                                        {provider.free && (
                                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                有免费额度
                                            </span>
                                        )}
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="password"
                                            value={apiKeys[key]}
                                            onChange={(e) => setApiKeys(prev => ({ ...prev, [key]: e.target.value }))}
                                            placeholder={provider.placeholder}
                                            className="flex-1 rounded-xl border border-stone-200 px-4 py-3 text-sm"
                                        />
                                        <button
                                            onClick={() => setSelectedProvider(key)}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${selectedProvider === key
                                                    ? 'bg-amber-600 text-white'
                                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                                }`}
                                        >
                                            {selectedProvider === key ? '已选择' : '选择'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-700">
                            <strong>💡 推荐：</strong>Google Gemini 有免费额度，
                            <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer" className="underline">
                                点击这里获取 API Key
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={saveSettings}
                                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl transition-colors"
                            >
                                保存设置
                            </button>
                            <button
                                onClick={() => setMode('form')}
                                className="px-8 py-4 rounded-2xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                )}

                {/* 表单页面 */}
                {mode === 'form' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            {/* 目标渠道 */}
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

                            <div className="grid grid-cols-2 gap-4">
                                {/* 经验阶段 */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                        经验阶段
                                    </label>
                                    <select
                                        value={planForm.experience}
                                        onChange={(e) => updatePlan("experience", e.target.value)}
                                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm"
                                    >
                                        <option value="newbie">0-1 年</option>
                                        <option value="junior">1-3 年</option>
                                        <option value="mid">3-5 年</option>
                                        <option value="senior">5+ 年</option>
                                    </select>
                                </div>

                                {/* 英语能力 */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                        英语沟通
                                    </label>
                                    <select
                                        value={planForm.english}
                                        onChange={(e) => updatePlan("english", e.target.value)}
                                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm"
                                    >
                                        <option value="low">基础</option>
                                        <option value="mid">一般</option>
                                        <option value="high">流利</option>
                                    </select>
                                </div>

                                {/* 竞标偏好 */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                        竞标偏好
                                    </label>
                                    <select
                                        value={planForm.bidding}
                                        onChange={(e) => updatePlan("bidding", e.target.value)}
                                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm"
                                    >
                                        <option value="no">不接受竞标</option>
                                        <option value="yes">可以竞标</option>
                                        <option value="any">无所谓</option>
                                    </select>
                                </div>

                                {/* 项目周期 */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                        项目周期
                                    </label>
                                    <select
                                        value={planForm.duration}
                                        onChange={(e) => updatePlan("duration", e.target.value)}
                                        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm"
                                    >
                                        <option value="long">中长期</option>
                                        <option value="short">短期小单</option>
                                        <option value="any">不限</option>
                                    </select>
                                </div>
                            </div>

                            {/* 技术栈 */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                    技术栈（选填）
                                </label>
                                <input
                                    type="text"
                                    value={planForm.techStack}
                                    onChange={(e) => updatePlan("techStack", e.target.value)}
                                    placeholder="例如：React, Node.js, Python"
                                    className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm"
                                />
                            </div>

                            {/* 期望时薪 */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                        期望时薪 (RMB)
                                    </label>
                                    <span className="text-2xl font-black text-amber-600">¥{planForm.rate}</span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="1500"
                                    step="10"
                                    value={planForm.rate}
                                    onChange={(e) => updatePlan("rate", Number(e.target.value))}
                                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                            </div>

                            {/* 补充说明 */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                                    补充说明（选填）
                                </label>
                                <textarea
                                    value={planForm.notes}
                                    onChange={(e) => updatePlan("notes", e.target.value)}
                                    placeholder="您的特殊情况或具体需求..."
                                    rows={3}
                                    className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm resize-none"
                                />
                            </div>

                            {/* AI 分析按钮 */}
                            <button
                                onClick={handleAIAnalysis}
                                disabled={loading || (!apiKeys[selectedProvider] && freeUsesLeft <= 0)}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-stone-300 disabled:to-stone-400 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        AI 分析中...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        开始 AI 智能分析
                                    </>
                                )}
                            </button>
                        </div>

                        {/* 右侧：本地规则推荐 */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-black">快速匹配结果</h4>
                                <span className="text-[10px] text-stone-400">基于规则匹配</span>
                            </div>

                            {recommendations.slice(0, 4).map((platform, index) => (
                                <div key={platform.id} className="border border-stone-200 rounded-2xl p-4 bg-stone-50/70">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-bold text-stone-900">
                                                {index + 1}. {platform.name}
                                            </div>
                                            <div className="text-[10px] text-stone-400">
                                                {TYPE_LABELS[platform.type]} · Fee {platform.fee}
                                            </div>
                                        </div>
                                        <a
                                            href={platform.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-amber-600 hover:text-amber-700"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}

                            <p className="text-[10px] text-stone-400 text-center pt-4">
                                💡 点击上方按钮获取 AI 深度个性化分析
                            </p>
                        </div>
                    </div>
                )}

                {/* AI 结果页面 */}
                {mode === 'result' && aiResult && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-amber-600" />
                                <span className="font-bold text-amber-800">AI 个性化分析结果</span>
                            </div>
                            <div className="prose prose-sm max-w-none text-stone-700 whitespace-pre-wrap">
                                {aiResult}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={resetForm}
                                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl transition-colors"
                            >
                                重新分析
                            </button>
                            <button
                                onClick={onClose}
                                className="px-8 py-4 rounded-2xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                            >
                                关闭
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
