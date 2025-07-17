// Static data for GitHub Pages deployment (replaces server API calls)

export interface PortfolioContent {
  id: number;
  section: string;
  content: string;
  language: string;
  isActive: boolean;
}

export const staticPortfolioData: PortfolioContent[] = [
  {
    id: 1,
    section: "about",
    content: "As an Economics student at Zhejiang University, I focus on platform economy research and data analysis. I'm passionate about using quantitative methods to understand labor market dynamics and economic behavior in digital platforms.",
    language: "en",
    isActive: true
  },
  {
    id: 2,
    section: "about", 
    content: "作为浙江大学经济学学生，我专注于平台经济研究和数据分析。我热衷于使用定量方法来理解数字平台中的劳动力市场动态和经济行为。",
    language: "zh",
    isActive: true
  }
];

export interface ChatMessage {
  message: string;
  response: string;
  timestamp: Date;
}

// Static responses for the AI chatbot (when no API key is available)
export const generateStaticChatResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('education') || lowerMessage.includes('学历') || lowerMessage.includes('university')) {
    return "I'm currently pursuing a Bachelor's degree in Economics at Zhejiang University (2023-2027). I've also participated in summer programs at UC Berkeley and NTU Singapore, focusing on data & decisions, digital transformation, and sustainable finance.";
  }
  
  if (lowerMessage.includes('research') || lowerMessage.includes('platform') || lowerMessage.includes('研究')) {
    return "My research focuses on platform economy and gig worker analysis. I'm currently working as a research assistant under Professor Zhe Yuan, analyzing over 12,000 platform transaction records and conducting comprehensive studies on gig economy dynamics.";
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('技能') || lowerMessage.includes('python') || lowerMessage.includes('data')) {
    return "I have strong technical skills in Python (90%), LaTeX (85%), MATLAB (82%), STATA (80%), and SPSS (75%). My research areas include big data analysis, economic analysis, platform economy, labor economics, financial markets, and sustainable finance.";
  }
  
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('经历')) {
    return "I'm currently serving as a Research Assistant at Zhejiang University, focusing on platform economy and gig labor research. Previously, I was the Director of Comprehensive Management at the ZJU Youth Volunteer Guidance Center, where I led website development projects and managed volunteer evaluations for over 40,000 students.";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('联系') || lowerMessage.includes('email')) {
    return "You can reach me at yesunnyu@gmail.com. I'm currently located in Berkeley, California, USA. Feel free to connect with me on LinkedIn or check out my GitHub for my latest projects.";
  }
  
  return "Thank you for your question! I'm Sunyu Ye, an Economics student at Zhejiang University with a focus on platform economy research and data analysis. Feel free to ask me about my education, research experience, technical skills, or any opportunities for collaboration.";
};

export const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};