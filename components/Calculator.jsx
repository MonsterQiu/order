import { useState, useMemo } from 'react';

export default function Calculator() {
    const [rate, setRate] = useState(260);
    const [hours, setHours] = useState(25);
    const [feePercent, setFeePercent] = useState(0.12);

    const netIncome = useMemo(() => {
        const gross = Number(rate) * Number(hours) * 4.3; // 4.3 weeks/month
        return Math.floor(gross * (1 - feePercent));
    }, [rate, hours, feePercent]);

    return (
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
                            type="range"
                            min="50"
                            max="1500"
                            step="10"
                            value={rate}
                            onChange={e => setRate(Number(e.target.value))}
                            aria-label="时薪"
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Weekly Billable Hours</label>
                            <span className="text-3xl font-black text-amber-600">{hours} <span className="text-sm text-stone-300 font-medium">hrs</span></span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="60"
                            value={hours}
                            onChange={e => setHours(Number(e.target.value))}
                            aria-label="每周工时"
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
                                FEE {v * 100}%
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
                    <span>Yearly: ¥{(netIncome * 12).toLocaleString()}</span>
                    <span>Platform Loss: ¥{Math.floor(netIncome / (1 - feePercent) * feePercent).toLocaleString()}</span>
                </div>
                <p className="text-[10px] italic text-stone-400 max-w-[240px] mx-auto leading-relaxed">
                    *基于 4.3 周/月计算。建议实际计费工时不超过总工作时间的 70% 以维持生活质量。
                </p>
            </div>
        </section>
    );
}
