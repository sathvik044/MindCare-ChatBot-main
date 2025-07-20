const { MENTAL_HEALTH_RULES } = require('../config/safetyRules');

const containsKeyword = (text, keywords) => {
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword));
};

const validateMentalHealthContent = (text) => {
  if (containsKeyword(text, MENTAL_HEALTH_RULES.CRISIS_KEYWORDS)) {
    return {
      valid: false,
      response: MENTAL_HEALTH_RULES.RESPONSES.CRISIS
    };
  }

  if (
    containsKeyword(text, MENTAL_HEALTH_RULES.HARD_BLOCKED_TOPICS) ||
    containsKeyword(text, MENTAL_HEALTH_RULES.POLITICAL_KEYWORDS)
  ) {
    return {
      valid: false,
      response: MENTAL_HEALTH_RULES.RESPONSES.OFF_TOPIC
    };
  }

  return { valid: true, response: text };
};

module.exports = { validateMentalHealthContent };
