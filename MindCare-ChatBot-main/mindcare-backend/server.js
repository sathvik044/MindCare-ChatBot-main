const express = require('express');
const fetch = require('node-fetch');
const { validateMentalHealthContent } = require('./utils/validation');

const app = express();
app.use(express.json());

// Safety filter middleware
app.use((req, res, next) => {
  if (req.body?.message) {
    const validation = validateMentalHealthContent(req.body.message);
    if (!validation.valid) {
      return res.json({ reply: validation.response });
    }
  }
  next();
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'dolphin-phi',
        prompt: `[INST] <<SYS>>
You are MindCare, a mental health assistant.
STRICT RULES:
1. NEVER discuss sensitive topics such as politics, religion, sports, or technology.
2. If the user brings up such topics, politely redirect the conversation.
3. Focus only on mental health, emotional wellbeing, and support.
<</SYS>>
${message}
[/INST]`,
        options: {
          temperature: 0.2,
          top_p: 0.8,
          stop: ['User:', 'INST]', 'Politics', 'Religion', 'Game', 'Technology']
        }
      })
    });

    const data = await response.json();
    res.json({ reply: data.response });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
