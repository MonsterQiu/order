import { PLATFORM_PROFILES, EXPERIENCE_LEVELS, ENGLISH_LEVELS, RATE_LEVELS } from '../data/platforms';

/**
 * 根据时薪获取报价层级
 */
export const getRateLevel = (rate) => {
    if (rate >= 400) return "high";
    if (rate >= 200) return "mid";
    return "low";
};

/**
 * 获取平台推荐列表
 * @param {Object} form - 用户表单数据
 * @param {Array} platforms - 平台列表
 * @returns {Array} 排序后的推荐平台列表
 */
export const getRecommendations = (form, platforms) => {
    const target = form.target || "all";
    const level = EXPERIENCE_LEVELS[form.experience] || 2;
    const englishLevel = ENGLISH_LEVELS[form.english] ?? 1;
    const rateLevel = getRateLevel(form.rate || 0);

    return platforms
        .map((platform) => {
            const profile = PLATFORM_PROFILES[platform.id] || {
                english: "low",
                bidding: false,
                longTerm: true,
                rate: "mid"
            };
            const reasons = [];
            let score = 0;

            // 渠道偏好匹配
            if (target === "all") {
                score += 1;
            } else if (platform.type === target) {
                score += 4;
                reasons.push("渠道偏好匹配");
            } else {
                score -= 2;
            }

            // 难度适配
            const diff = platform.difficulty - level;
            if (diff <= 0) {
                score += 2;
                reasons.push("难度适配");
            } else if (diff === 1) {
                score += 1;
                reasons.push("略有挑战");
            } else {
                score -= 2;
            }

            // 语言要求匹配
            const requiredEnglish = ENGLISH_LEVELS[profile.english] ?? 0;
            if (englishLevel >= requiredEnglish) {
                score += 2;
                reasons.push("语言要求匹配");
            } else {
                score -= 2;
            }

            // 竞标偏好
            if (form.bidding === "no" && profile.bidding) {
                score -= 2;
            } else if (form.bidding === "yes" && profile.bidding) {
                score += 1;
                reasons.push("竞标偏好匹配");
            }

            // 项目周期偏好
            if (form.duration && form.duration !== "any") {
                if (form.duration === "long" && profile.longTerm) {
                    score += 1;
                    reasons.push("周期偏好匹配");
                } else if (form.duration === "short" && !profile.longTerm) {
                    score += 1;
                    reasons.push("短单偏好匹配");
                } else {
                    score -= 1;
                }
            }

            // 报价层级匹配
            if (profile.rate === rateLevel) {
                score += 1;
                reasons.push("报价层级匹配");
            } else if (Math.abs(RATE_LEVELS.indexOf(profile.rate) - RATE_LEVELS.indexOf(rateLevel)) >= 2) {
                score -= 1;
            }

            return {
                ...platform,
                score,
                reasons: reasons.slice(0, 3)
            };
        })
        .sort((a, b) => b.score - a.score);
};
