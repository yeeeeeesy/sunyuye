import { users, chatMessages, portfolioContent, type User, type InsertUser, type ChatMessage, type InsertChatMessage, type PortfolioContent, type InsertPortfolioContent } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(sessionId: string, limit?: number): Promise<ChatMessage[]>;
  
  getPortfolioContent(section: string, language: string): Promise<PortfolioContent | undefined>;
  getAllPortfolioContent(language: string): Promise<PortfolioContent[]>;
  createPortfolioContent(content: InsertPortfolioContent): Promise<PortfolioContent>;
  updatePortfolioContent(id: number, content: Partial<InsertPortfolioContent>): Promise<PortfolioContent>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private portfolioContent: Map<number, PortfolioContent>;
  private currentUserId: number;
  private currentChatId: number;
  private currentContentId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.portfolioContent = new Map();
    this.currentUserId = 1;
    this.currentChatId = 1;
    this.currentContentId = 1;
    
    // Initialize with Sunyu's portfolio content
    this.initializePortfolioContent();
  }

  private initializePortfolioContent() {
    const defaultContent = [
      {
        section: "about",
        content: "As an Economics undergraduate at Zhejiang University, I am passionate about leveraging quantitative analysis and research to solve real-world economic problems. With hands-on experience in research and a strong foundation in STATA, MATLAB, Python, and LaTeX, I aim to contribute to innovative projects in finance and economic policy.",
        language: "en",
        isActive: true
      },
      {
        section: "jobStatement",
        content: "I am actively seeking research assistant opportunities in LLM applications and economic data analysis. Feel free to reach out, or learn more from My Resume.",
        language: "en",
        isActive: true
      },
      {
        section: "about",
        content: "作为浙江大学经济学本科生，我热衷于运用定量分析和研究来解决现实世界的经济问题。凭借丰富的研究经验以及在STATA、MATLAB、Python和LaTeX方面的扎实基础，我致力于为金融和经济政策的创新项目做出贡献。",
        language: "zh",
        isActive: true
      },
      {
        section: "jobStatement",
        content: "我正在积极寻求经济研究、数据分析和金融领域的机会，以应用我的定量技能和研究经验。我在平台经济研究方面的背景以及对多种分析工具的熟练掌握，使我非常适合在研究机构、金融服务或政策组织中担任相关职位。",
        language: "zh",
        isActive: true
      }
    ];

    defaultContent.forEach(content => {
      const id = this.currentContentId++;
      this.portfolioContent.set(id, { id, ...content });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = { 
      ...insertMessage, 
      id, 
      timestamp: new Date() 
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatHistory(sessionId: string, limit: number = 10): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0))
      .slice(0, limit)
      .reverse();
  }

  async getPortfolioContent(section: string, language: string): Promise<PortfolioContent | undefined> {
    return Array.from(this.portfolioContent.values()).find(
      content => content.section === section && content.language === language && content.isActive
    );
  }

  async getAllPortfolioContent(language: string): Promise<PortfolioContent[]> {
    return Array.from(this.portfolioContent.values()).filter(
      content => content.language === language && content.isActive
    );
  }

  async createPortfolioContent(insertContent: InsertPortfolioContent): Promise<PortfolioContent> {
    const id = this.currentContentId++;
    const content: PortfolioContent = { 
      id, 
      section: insertContent.section,
      content: insertContent.content,
      language: insertContent.language || 'en',
      isActive: insertContent.isActive ?? true
    };
    this.portfolioContent.set(id, content);
    return content;
  }

  async updatePortfolioContent(id: number, updateData: Partial<InsertPortfolioContent>): Promise<PortfolioContent> {
    const existing = this.portfolioContent.get(id);
    if (!existing) {
      throw new Error("Portfolio content not found");
    }
    const updated = { ...existing, ...updateData };
    this.portfolioContent.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
