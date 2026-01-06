import { useState } from 'react';
import { Heart, X, Coffee } from 'lucide-react';

export default function SupportButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [showQR, setShowQR] = useState(null); // 'wechat' | 'alipay' | null

    return (
        <>
            {/* 浮动赞助按钮 - 更显眼版本 */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-3 shadow-2xl shadow-pink-300/50 hover:scale-105 hover:shadow-pink-400/60 transition-all group animate-pulse hover:animate-none"
                aria-label="支持作者"
            >
                <Heart className="w-5 h-5" fill="white" />
                <span className="text-sm font-bold">赞助</span>
            </button>

            {/* 弹窗 */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 px-4">
                    <div
                        className="absolute inset-0"
                        onClick={() => { setIsOpen(false); setShowQR(null); }}
                    />
                    <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
                        <button
                            onClick={() => { setIsOpen(false); setShowQR(null); }}
                            className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center space-y-6">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                                <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-stone-900">支持 CodeFreelance</h3>
                                <p className="text-stone-500 text-sm mt-2">
                                    如果这个网站对你有帮助，请考虑请我喝杯咖啡 ☕
                                </p>
                            </div>

                            {/* 二维码显示区域 */}
                            {showQR && (
                                <div className="bg-stone-50 rounded-2xl p-6">
                                    <div className="w-48 h-48 mx-auto bg-white rounded-xl overflow-hidden border border-stone-200 p-2">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={showQR === 'wechat' ? '/images/wechat-qr.png' : '/images/alipay-qr.png'}
                                            alt={showQR === 'wechat' ? '微信收款码' : '支付宝收款码'}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className="text-sm text-stone-500 mt-4">
                                        {showQR === 'wechat' ? '微信扫码支付' : '支付宝扫码支付'}
                                    </p>
                                    <button
                                        onClick={() => setShowQR(null)}
                                        className="text-[10px] font-bold text-stone-400 mt-2 hover:text-stone-900"
                                    >
                                        ← 返回
                                    </button>
                                </div>
                            )}

                            {/* 支付选项 */}
                            {!showQR && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* 微信支付 */}
                                        <button
                                            onClick={() => setShowQR('wechat')}
                                            className="border border-stone-200 rounded-2xl p-4 hover:border-green-500 transition-colors cursor-pointer group"
                                        >
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <span className="text-2xl">💚</span>
                                            </div>
                                            <div className="text-sm font-bold text-stone-900">微信支付</div>
                                            <div className="text-[10px] text-stone-400 mt-1">扫码赞赏</div>
                                        </button>

                                        {/* 支付宝 */}
                                        <button
                                            onClick={() => setShowQR('alipay')}
                                            className="border border-stone-200 rounded-2xl p-4 hover:border-blue-500 transition-colors cursor-pointer group"
                                        >
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                <span className="text-2xl">💙</span>
                                            </div>
                                            <div className="text-sm font-bold text-stone-900">支付宝</div>
                                            <div className="text-[10px] text-stone-400 mt-1">扫码赞赏</div>
                                        </button>
                                    </div>

                                    {/* Buy Me a Coffee - 国际用户 */}
                                    <a
                                        href="https://buymeacoffee.com/codefreelance"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full border border-stone-200 rounded-2xl p-4 hover:border-amber-500 transition-colors group"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Coffee className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm font-bold text-stone-900">Buy Me a Coffee</div>
                                                <div className="text-[10px] text-stone-400">国际支付 (PayPal/Card)</div>
                                            </div>
                                        </div>
                                    </a>
                                </>
                            )}

                            <div className="pt-4 border-t border-stone-100">
                                <p className="text-[10px] text-stone-400">
                                    您的支持将帮助我们持续更新平台信息和开发新功能 💪
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
