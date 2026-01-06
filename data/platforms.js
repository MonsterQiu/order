// 平台数据常量
export const PLATFORMS = [
  { id: 1, name: "猪八戒", type: "domestic", tags: ["众包", "类目多", "低门槛"], difficulty: 2, fee: "5-20%", desc: "综合型众包平台，类目广、项目多，适合快速试水。", url: "https://www.zbj.com/", icon: "🧰" },
  { id: 2, name: "程序员客栈", type: "domestic", tags: ["国内", "项目制", "规范"], difficulty: 3, fee: "10-20%", desc: "国内成熟的程序开发众包平台，有专门的项目经理对接，适合有经验的开发者起步。", url: "https://www.proginn.com/", icon: "🏠" },
  { id: 3, name: "码市 (Codemart)", type: "domestic", tags: ["Coding", "国内", "标准"], difficulty: 3, fee: "10%", desc: "依托 Coding 生态，项目流程标准化，涵盖了从原型到交付的全过程。支付有平台担保。", url: "https://codemart.com/", icon: "🧱" },
  { id: 4, name: "开源众包", type: "domestic", tags: ["开源", "项目制", "开发者"], difficulty: 3, fee: "视项目", desc: "开源中国众包平台，项目多为软件开发类。", url: "https://zb.oschina.net/", icon: "🧩" },
  { id: 5, name: "猿急送", type: "domestic", tags: ["国内", "高端", "远程"], difficulty: 4, fee: "10-20%", desc: "面向中高端项目的国内平台，强调技术匹配与交付质量。", url: "https://www.yuanjisong.com/", icon: "🚀" },
  { id: 6, name: "Fiverr", type: "global", tags: ["标准化", "全球", "轻量"], difficulty: 2, fee: "20%", desc: "将你的技能打包成'商品'售卖，如：修复一个 Bug $50。适合自动化脚本或小型 Web 开发。", url: "https://www.fiverr.com/", icon: "🏷️" },
  { id: 7, name: "Freelancer", type: "global", tags: ["全球", "竞标", "自由职业"], difficulty: 3, fee: "10%", desc: "老牌自由职业平台，竞标为主，项目多但竞争激烈，适合积累作品集。", url: "https://www.freelancer.com/", icon: "🧭" },
  { id: 8, name: "PeoplePerHour", type: "global", tags: ["欧洲", "小时工", "中小单"], difficulty: 3, fee: "20%", desc: "以小时计费为主的欧洲平台，适合中小型交付和持续合作。", url: "https://www.peopleperhour.com/", icon: "⏱️" },
  { id: 9, name: "Guru", type: "global", tags: ["美国", "长期", "信誉"], difficulty: 3, fee: "5-9%", desc: "偏长期合作的美国平台，可展示 Workroom 和信誉评级。", url: "https://www.guru.com/", icon: "🧠" },
  { id: 10, name: "Upwork", type: "global", tags: ["全球", "高时薪", "美元"], difficulty: 4, fee: "10%", desc: "全球最大的自由职业者平台，英语环境，单价高。建议建立深度个人 Profile 并在特定领域深耕。", url: "https://www.upwork.com/", icon: "🌍" },
  { id: 11, name: "Toptal", type: "global", tags: ["精英制", "高门槛", "时薪制"], difficulty: 5, fee: "0%", desc: "只招全球前 3% 的顶尖开发者。通过面试后，你将获得全球顶尖公司的长期高薪合同。", url: "https://www.toptal.com/", icon: "💎" },
  { id: 12, name: "电鸭社区", type: "community", tags: ["远程办公", "直联", "口碑"], difficulty: 2, fee: "0%", desc: "国内最纯粹的远程工作社区。这里没有中间商，更看重个人品牌和社区声誉，适合长期合作。", url: "https://eleduck.com/", icon: "🦆" },
  { id: 13, name: "V2EX - 酷工作", type: "community", tags: ["极客", "直联", "高质量"], difficulty: 3, fee: "0%", desc: "程序员最活跃的社区之一。发帖即招聘，回复即面试，沟通效率极高，项目质量往往很不错。", url: "https://www.v2ex.com/go/jobs", icon: "⚡" }
];

export const PLATFORM_PROFILES = {
  1: { english: "low", bidding: true, longTerm: false, rate: "low" },
  2: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  3: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  4: { english: "low", bidding: true, longTerm: false, rate: "low" },
  5: { english: "low", bidding: false, longTerm: true, rate: "high" },
  6: { english: "mid", bidding: false, longTerm: false, rate: "low" },
  7: { english: "mid", bidding: true, longTerm: false, rate: "low" },
  8: { english: "mid", bidding: true, longTerm: true, rate: "mid" },
  9: { english: "mid", bidding: true, longTerm: true, rate: "mid" },
  10: { english: "high", bidding: true, longTerm: true, rate: "high" },
  11: { english: "high", bidding: false, longTerm: true, rate: "high" },
  12: { english: "low", bidding: false, longTerm: true, rate: "mid" },
  13: { english: "low", bidding: false, longTerm: true, rate: "mid" }
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
