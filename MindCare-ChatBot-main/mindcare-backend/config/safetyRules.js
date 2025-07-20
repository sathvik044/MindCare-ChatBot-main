const MENTAL_HEALTH_RULES = {
  HARD_BLOCKED_TOPICS: [
    'politics', 'government', 'election', 'vote', 'democrat', 'republican',
    'sports', 'football', 'basketball', 'cricket', 'game', 'player',
    'technology', 'computer', 'phone', 'ai', 'artificial intelligence',
    'religion', 'god', 'philosophy', 'science', 'space'
  ],

  POLITICAL_KEYWORDS: [
    'democracy', 'monarchy', 'dictatorship', 'communism',
    'president', 'prime minister', 'congress', 'parliament'
  ],

  CRISIS_KEYWORDS: [
    'suicide', 'kill myself', 'end my life', 'self-harm',
    'cutting', 'want to die', 'i want to disappear', 'i want to give up'
  ],

  RESPONSES: {
    OFF_TOPIC: "I specialize in mental health support. Let's focus on your emotional wellbeing instead.",
    POLITICAL_REDIRECT: "While politics is important, I'm here to support your mental health. How are you feeling today?",
    CRISIS: "I'm really concerned about your safety. Please contact a crisis helpline immediately:\n- US: 988\n- India: 112 123\nYou're not alone."
  }
};

module.exports = { MENTAL_HEALTH_RULES };
