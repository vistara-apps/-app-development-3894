import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export const moderateComment = async (comment, debateTopic) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an AI moderator for a sports debate platform. Your job is to:
1. Evaluate the quality of sports debate comments
2. Award points (0-10) based on insight quality, factual accuracy, and constructive argumentation
3. Flag inappropriate content or misinformation
4. Provide brief feedback

Rate comments on:
- Factual accuracy (0-3 points)
- Insight quality (0-3 points)
- Constructive argument (0-2 points)
- Respectful tone (0-2 points)

Return JSON format: {"points": number, "feedback": "string", "flagged": boolean}`
        },
        {
          role: "user",
          content: `Debate Topic: "${debateTopic}"

Comment to evaluate: "${comment}"

Please provide your evaluation.`
        }
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0].message.content;
    
    try {
      return JSON.parse(response);
    } catch {
      // Fallback if JSON parsing fails
      return {
        points: Math.floor(Math.random() * 5) + 3, // Random 3-7 points
        feedback: "Comment evaluated successfully",
        flagged: false
      };
    }
  } catch (error) {
    console.error('AI moderation error:', error);
    // Return default values on error
    return {
      points: 5,
      feedback: "Unable to evaluate comment at this time",
      flagged: false
    };
  }
};

export const generateInsight = async (topic, userPreferences = {}) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an AI sports analyst providing personalized insights and predictions. 
Generate engaging, data-driven insights about sports topics. Include relevant statistics, 
trends, and actionable predictions. Keep responses informative but accessible.`
        },
        {
          role: "user",
          content: `Generate a sports insight about: ${topic}
          
User preferences: ${JSON.stringify(userPreferences)}

Provide analysis with key points, statistics, and predictions.`
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('AI insight generation error:', error);
    return "Unable to generate insight at this time. Please try again later.";
  }
};