import { FileText, Calculator, MessageSquare, Shield, Download, ExternalLink } from 'lucide-react';

const TOOLS = [
    {
        icon: Calculator,
        title: "报价计算器",
        desc: "根据项目复杂度和工时，智能计算合理报价",
        action: "使用工具",
        href: "#calc",
        color: "amber"
    },
    {
        icon: FileText,
        title: "合同模板",
        desc: "专业的软件开发合同模板，保护双方权益",
        action: "下载模板",
        href: "/templates/contract-template.docx",
        color: "blue",
        comingSoon: true
    },
    {
        icon: MessageSquare,
        title: "沟通话术",
        desc: "初次沟通、议价、催款等场景的专业话术",
        action: "查看话术",
        href: "#",
        color: "green",
        comingSoon: true
    },
    {
        icon: Shield,
        title: "风险评估",
        desc: "识别高风险客户和项目，避免踩坑",
        action: "开始评估",
        href: "#",
        color: "red",
        comingSoon: true
    }
];

const colorClasses = {
    amber: {
        bg: "bg-amber-100",
        text: "text-amber-600",
        button: "bg-amber-600 hover:bg-amber-500",
        border: "hover:border-amber-200"
    },
    blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-500",
        border: "hover:border-blue-200"
    },
    green: {
        bg: "bg-green-100",
        text: "text-green-600",
        button: "bg-green-600 hover:bg-green-500",
        border: "hover:border-green-200"
    },
    red: {
        bg: "bg-red-100",
        text: "text-red-600",
        button: "bg-red-600 hover:bg-red-500",
        border: "hover:border-red-200"
    }
};

export default function ToolsSection() {
    return (
        <section id="tools" className="py-20 bg-stone-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">实用工具</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-stone-900">
                        接单必备工具箱
                    </h2>
                    <p className="text-stone-500 mt-4 max-w-xl mx-auto">
                        从报价到交付，我们为你准备了全流程的实用工具
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TOOLS.map((tool, index) => {
                        const colors = colorClasses[tool.color];
                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-3xl p-8 border border-stone-100 ${colors.border} hover:shadow-xl transition-all relative overflow-hidden group`}
                            >
                                {tool.comingSoon && (
                                    <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-stone-400 bg-stone-100 px-2 py-1 rounded-full">
                                        即将推出
                                    </div>
                                )}

                                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <tool.icon className={`w-7 h-7 ${colors.text}`} />
                                </div>

                                <h3 className="text-xl font-bold text-stone-900 mb-2">
                                    {tool.title}
                                </h3>

                                <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                                    {tool.desc}
                                </p>

                                {tool.comingSoon ? (
                                    <button
                                        disabled
                                        className="w-full py-3 rounded-xl text-sm font-bold bg-stone-100 text-stone-400 cursor-not-allowed"
                                    >
                                        敬请期待
                                    </button>
                                ) : (
                                    <a
                                        href={tool.href}
                                        className={`block w-full py-3 rounded-xl text-sm font-bold text-white text-center ${colors.button} transition-colors`}
                                    >
                                        {tool.action}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
