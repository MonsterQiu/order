// 平台数据常量
export const PLATFORMS = [
  // === 国内平台 ===
  { id: 1, name: "猪八戒", type: "domestic", tags: ["众包", "类目多", "低门槛"], difficulty: 2, fee: "5-20%", desc: "综合型众包平台，类目广、项目多，适合快速试水。", url: "https://www.zbj.com/", icon: "🧰" },
  { id: 2, name: "程序员客栈", type: "domestic", tags: ["国内", "项目制", "规范"], difficulty: 3, fee: "10-20%", desc: "国内成熟的程序开发众包平台，有专门的项目经理对接，适合有经验的开发者起步。", url: "https://www.proginn.com/", icon: "🏠" },
  { id: 3, name: "码市 (Codemart)", type: "domestic", tags: ["Coding", "国内", "标准"], difficulty: 3, fee: "10%", desc: "依托 Coding 生态，项目流程标准化，涵盖了从原型到交付的全过程。支付有平台担保。", url: "https://codemart.com/", icon: "🧱" },
  { id: 4, name: "开源众包", type: "domestic", tags: ["开源", "项目制", "开发者"], difficulty: 3, fee: "视项目", desc: "开源中国众包平台，项目多为软件开发类。", url: "https://zb.oschina.net/", icon: "🧩" },
  { id: 5, name: "猿急送", type: "domestic", tags: ["国内", "高端", "远程"], difficulty: 4, fee: "10-20%", desc: "面向中高端项目的国内平台，强调技术匹配与交付质量。", url: "https://www.yuanjisong.com/", icon: "🚀" },
  { id: 6, name: "实现网", type: "domestic", tags: ["高端", "BAT背景", "驻场"], difficulty: 4, fee: "10-15%", desc: "连接企业与顶级工程师，提供驻场开发、远程兼职、技术咨询等服务，拥有2万+工程师资源。", url: "https://shixian.com/", icon: "🎯" },
  { id: 7, name: "一品威客", type: "domestic", tags: ["众包", "任务多", "低门槛"], difficulty: 2, fee: "5-20%", desc: "国内较早的众包平台，任务量大，涵盖网站、小程序、APP开发等需求，适合新手积累经验。", url: "https://www.epwk.com/", icon: "🏆" },
  { id: 8, name: "程聚宝", type: "domestic", tags: ["低抽成", "人工审核", "纠纷处理"], difficulty: 3, fee: "5-10%", desc: "不收会员费，按项目抽成比例较低，有技术团队人工审核项目和处理纠纷。", url: "https://www.progbao.com/", icon: "💰" },
  { id: 9, name: "码易", type: "domestic", tags: ["远程", "分类详细", "兼职"], difficulty: 3, fee: "10%", desc: "为程序员提供丰富的线上工作机会，项目分类详细，支持远程和兼职工作。", url: "https://www.mayigeek.com/", icon: "🐜" },
  { id: 10, name: "云工网", type: "domestic", tags: ["远程", "免费入驻", "招聘"], difficulty: 2, fee: "0%", desc: "提供全职兼职远程工作招聘信息，支持各类远程工作者免费入驻。", url: "https://www.yungong.com/", icon: "☁️" },

  // === 国际平台 ===
  { id: 11, name: "Fiverr", type: "global", tags: ["标准化", "全球", "轻量"], difficulty: 2, fee: "20%", desc: "将技能打包成'商品'售卖，适合自动化脚本或小型 Web 开发，以5美元为单位起步。", url: "https://www.fiverr.com/", icon: "🏷️" },
  { id: 12, name: "Freelancer", type: "global", tags: ["全球", "竞标", "自由职业"], difficulty: 3, fee: "10%", desc: "老牌自由职业平台，竞标为主，项目多但竞争激烈，适合积累作品集。", url: "https://www.freelancer.com/", icon: "🧭" },
  { id: 13, name: "PeoplePerHour", type: "global", tags: ["欧洲", "小时工", "中小单"], difficulty: 3, fee: "20%", desc: "以小时计费为主的欧洲平台，适合中小型交付和持续合作。", url: "https://www.peopleperhour.com/", icon: "⏱️" },
  { id: 14, name: "Guru", type: "global", tags: ["美国", "长期", "信誉"], difficulty: 3, fee: "5-9%", desc: "偏长期合作的美国平台，可展示 Workroom 和信誉评级。", url: "https://www.guru.com/", icon: "🧠" },
  { id: 15, name: "Upwork", type: "global", tags: ["全球", "高时薪", "美元"], difficulty: 4, fee: "10%", desc: "全球最大的自由职业者平台，英语环境，单价高。建议建立深度个人 Profile 并在特定领域深耕。", url: "https://www.upwork.com/", icon: "🌍" },
  { id: 16, name: "Toptal", type: "global", tags: ["精英制", "高门槛", "时薪制"], difficulty: 5, fee: "0%", desc: "只招全球前 3% 的顶尖开发者。通过面试后，你将获得全球顶尖公司的长期高薪合同。", url: "https://www.toptal.com/", icon: "💎" },
  { id: 17, name: "Arc.dev", type: "global", tags: ["远程", "长期", "开发者专属"], difficulty: 4, fee: "0%", desc: "专为开发者设计的平台，提供全职和自由职业远程工作，专注长期项目合作。", url: "https://arc.dev/", icon: "🔮" },
  { id: 18, name: "Turing", type: "global", tags: ["AI驱动", "远程", "顶尖公司"], difficulty: 4, fee: "0%", desc: "AI驱动的平台，帮助开发者获得与顶尖公司合作的长期远程职位，注重稳定性。", url: "https://www.turing.com/", icon: "🤖" },
  { id: 19, name: "Flexiple", type: "global", tags: ["高薪", "严格筛选", "远程"], difficulty: 4, fee: "0%", desc: "为开发者和设计师提供高质量、高薪的远程自由职业机会，筛选严格。", url: "https://flexiple.com/", icon: "💼" },
  { id: 20, name: "Gun.io", type: "global", tags: ["工程师", "DevOps", "合同制"], difficulty: 4, fee: "0%", desc: "连接认证软件工程师与远程自由合同，专注工程和DevOps领域。", url: "https://gun.io/", icon: "🔫" },
  { id: 21, name: "Hired", type: "global", tags: ["高薪", "顶级公司", "全职/远程"], difficulty: 4, fee: "0%", desc: "为高技能开发者匹配顶级科技公司，提供自由职业和全职远程机会。", url: "https://hired.com/", icon: "🎯" },
  { id: 22, name: "Lemon.io", type: "global", tags: ["初创公司", "快速匹配", "欧洲开发者"], difficulty: 4, fee: "0%", desc: "连接初创公司与审核过的开发者，48小时内快速匹配，专注欧洲市场。", url: "https://lemon.io/", icon: "🍋" },
  { id: 23, name: "X-Team", type: "global", tags: ["远程", "社区", "长期"], difficulty: 4, fee: "0%", desc: "远程开发者社区，为成员提供长期项目和职业发展机会，注重团队文化。", url: "https://x-team.com/", icon: "❌" },
  { id: 24, name: "Workana", type: "global", tags: ["拉美", "西班牙语", "多类型"], difficulty: 3, fee: "5-20%", desc: "拉丁美洲领先的自由职业平台，支持西班牙语和葡萄牙语项目。", url: "https://www.workana.com/", icon: "🌎" },

  // === 社区平台 ===
  { id: 25, name: "电鸭社区", type: "community", tags: ["远程办公", "直联", "口碑"], difficulty: 2, fee: "0%", desc: "国内最纯粹的远程工作社区。这里没有中间商，更看重个人品牌和社区声誉，适合长期合作。", url: "https://eleduck.com/", icon: "🦆" },
  { id: 26, name: "V2EX - 酷工作", type: "community", tags: ["极客", "直联", "高质量"], difficulty: 3, fee: "0%", desc: "程序员最活跃的社区之一。发帖即招聘，回复即面试，沟通效率极高，项目质量往往很不错。", url: "https://www.v2ex.com/go/jobs", icon: "⚡" },
  { id: 27, name: "GitHub Jobs", type: "community", tags: ["开发者", "开源", "技术公司"], difficulty: 3, fee: "0%", desc: "专为开发者量身定制的求职平台，直接来自技术公司的编程相关岗位。", url: "https://jobs.github.com/", icon: "🐙" },
  { id: 28, name: "AngelList", type: "community", tags: ["初创公司", "股权", "远程"], difficulty: 3, fee: "0%", desc: "专注于初创公司的招聘平台，可以找到股权激励机会和早期创业项目。", url: "https://angel.co/", icon: "👼" },
  { id: 29, name: "HackerNews - Who is Hiring", type: "community", tags: ["硅谷", "高质量", "月度更新"], difficulty: 3, fee: "0%", desc: "Y Combinator 社区每月发布的招聘帖，项目质量高，多为硅谷科技公司。", url: "https://news.ycombinator.com/jobs", icon: "🔶" },
  { id: 30, name: "Remote OK", type: "community", tags: ["远程", "全球", "实时更新"], difficulty: 3, fee: "0%", desc: "专注远程工作的求职平台，实时更新全球远程开发岗位，界面简洁高效。", url: "https://remoteok.com/", icon: "🌐" }
];

export const PLATFORM_PROFILES = {
  1: { english: "low", bidding: true, longTerm: false, rate: "low" },
  2: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  3: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  4: { english: "low", bidding: true, longTerm: false, rate: "low" },
  5: { english: "low", bidding: false, longTerm: true, rate: "high" },
  6: { english: "low", bidding: false, longTerm: true, rate: "high" },
  7: { english: "low", bidding: true, longTerm: false, rate: "low" },
  8: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  9: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  10: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  11: { english: "mid", bidding: false, longTerm: false, rate: "low" },
  12: { english: "mid", bidding: true, longTerm: false, rate: "low" },
  13: { english: "mid", bidding: true, longTerm: true, rate: "mid" },
  14: { english: "mid", bidding: true, longTerm: true, rate: "mid" },
  15: { english: "high", bidding: true, longTerm: true, rate: "high" },
  16: { english: "high", bidding: false, longTerm: true, rate: "high" },
  17: { english: "high", bidding: false, longTerm: true, rate: "high" },
  18: { english: "high", bidding: false, longTerm: true, rate: "high" },
  19: { english: "high", bidding: false, longTerm: true, rate: "high" },
  20: { english: "high", bidding: false, longTerm: true, rate: "high" },
  21: { english: "high", bidding: false, longTerm: true, rate: "high" },
  22: { english: "high", bidding: false, longTerm: true, rate: "high" },
  23: { english: "high", bidding: false, longTerm: true, rate: "high" },
  24: { english: "mid", bidding: true, longTerm: true, rate: "mid" },
  25: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  26: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  27: { english: "high", bidding: false, longTerm: true, rate: "high" },
  28: { english: "high", bidding: false, longTerm: true, rate: "high" },
  29: { english: "high", bidding: false, longTerm: true, rate: "high" },
  30: { english: "high", bidding: false, longTerm: true, rate: "high" }
};

export const TYPE_LABELS = {
  domestic: "国内",
  global: "国际",
  community: "社区"
};

export const EXPERIENCE_LEVELS = {
  newbie: 1,
  junior: 2,
  mid: 3,
  senior: 4
};

export const ENGLISH_LEVELS = {
  low: 0,
  mid: 1,
  high: 2
};

export const RATE_LEVELS = ["low", "mid", "high"];
