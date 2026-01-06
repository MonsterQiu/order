import { useState } from 'react';
import { Heart, X, Coffee, QrCode } from 'lucide-react';

export default function SupportButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* 浮动按钮 */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-pink-500 text-white p-4 shadow-2xl shadow-pink-200/70 hover:scale-110 transition-all group"
                aria-label="支持作者"
            >
                <Heart className="w-5 h-5 group-hover:animate-pulse" fill="white" />
            </button>

            {/* 弹窗 */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 px-4">
                    <div
                        className="absolute inset-0"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
                        <button
                            onClick={() => setIsOpen(false)}
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

                            <div className="grid grid-cols-2 gap-4">
                                {/* 微信/支付宝 - 国内用户 */}
                                <div className="border border-stone-200 rounded-2xl p-4 hover:border-green-500 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <QrCode className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="text-sm font-bold text-stone-900">微信赞赏</div>
                                    <div className="text-[10px] text-stone-400 mt-1">扫码支持</div>
                                </div>

                                {/* Buy Me a Coffee - 国际用户 */}
                                <a
                                    href="https://buymeacoffee.com/codefreelance"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-stone-200 rounded-2xl p-4 hover:border-amber-500 transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Coffee className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div className="text-sm font-bold text-stone-900">Buy Me a Coffee</div>
                                    <div className="text-[10px] text-stone-400 mt-1">国际支付</div>
                                </a>
                            </div>

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
