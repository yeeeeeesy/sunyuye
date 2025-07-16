import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat with AI assistant about Sunyu's background
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ error: "Message and sessionId are required" });
      }

      // Get chat history for context
      const chatHistory = await storage.getChatHistory(sessionId, 5);
      
      // Get portfolio content for context
      const portfolioContent = await storage.getAllPortfolioContent('en');
      
      // Build context about Sunyu
      const contextPrompt = `You are an AI assistant representing Sunyu Ye, an Economics student at Zhejiang University. Use the following information to answer questions about her background, experience, and qualifications. Be professional and helpful.

Personal Information:
- Name: Sunyu Ye
- Current Status: Economics undergraduate at Zhejiang University (2023-2027)
- Location: Berkeley, California, United States
- Email: yesunnyu@gmail.com
- LinkedIn: https://www.linkedin.com/in/sunyu-ye-a3a806373

Education:
- Bachelor of Arts in Economics, Zhejiang University (2023-2027)
- Digital Transformation, Data and Decision program, UC Berkeley (July 2025-August 2025)
- Sustainable Finance program, NTU Singapore (July 2024)

Experience:
- Research Assistant at Zhejiang University (Feb 2025-Present): Working with Prof. Zhe Yuan on platform economy and gig workers research. Analyzed 12,447+ datasets and 10,028+ survey responses. Authored 29,898-word industry white paper.
- Director of General Affairs Department, Zhejiang University Youth Volunteer Guidance Center (June 2024-May 2025): Led website development, supervised 40,000+ volunteers.

Skills: Python, MATLAB, STATA, SPSS, LaTeX, Data Analysis, Economic Analysis
Languages: Chinese (Native), English (Professional)
Honors: Mathematical Contest in Modeling Finalist

Research Focus: Platform economy, labor economics, data analysis, financial markets, sustainable finance.

${portfolioContent.map(content => `${content.section}: ${content.content}`).join('\n')}

Previous conversation:
${chatHistory.map(msg => `User: ${msg.message}\nAssistant: ${msg.response}`).join('\n')}

Current question: ${message}

Please provide a helpful and informative response about Sunyu Ye. Keep responses concise but comprehensive. If asked about something not covered in the provided information, politely indicate that you don't have that specific information but can help with questions about her education, experience, skills, or research interests.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant providing information about Sunyu Ye's professional background. Be concise, professional, and accurate."
          },
          {
            role: "user",
            content: contextPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      const response = completion.choices[0].message.content || "I apologize, but I couldn't generate a response at this time.";

      // Store the chat message
      await storage.createChatMessage({
        sessionId,
        message,
        response
      });

      res.json({ response });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Get portfolio content
  app.get("/api/portfolio/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const language = req.query.lang as string || 'en';
      
      const content = await storage.getPortfolioContent(section, language);
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.json(content);
    } catch (error) {
      console.error("Portfolio API error:", error);
      res.status(500).json({ error: "Failed to fetch portfolio content" });
    }
  });

  // Get all portfolio content
  app.get("/api/portfolio", async (req, res) => {
    try {
      const language = req.query.lang as string || 'en';
      const content = await storage.getAllPortfolioContent(language);
      res.json(content);
    } catch (error) {
      console.error("Portfolio API error:", error);
      res.status(500).json({ error: "Failed to fetch portfolio content" });
    }
  });

  // Serve resume PDF
  app.get("/api/resume", (req, res) => {
    try {
      const path = require('path');
      const resumePath = path.join(process.cwd(), 'attached_assets', 'resume_1752651300851.pdf');
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Sunyu_Ye_Resume.pdf"');
      
      res.sendFile(resumePath, (err) => {
        if (err) {
          console.error("Resume download error:", err);
          res.status(404).json({ error: "Resume not found" });
        }
      });
    } catch (error) {
      console.error("Resume API error:", error);
      res.status(500).json({ error: "Failed to download resume" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
