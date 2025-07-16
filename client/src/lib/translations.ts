export const translations = {
  en: {
    nav: {
      home: "Home",
      research: "Research Focus", 
      education: "Education",
      experience: "Experience",
      programs: "Programs",
      skills: "Skills",
      contact: "Get In Touch"
    },
    personal: {
      name: "Sunyu Ye",
      title: "Economics Student",
      university: "Zhejiang University",
      location: "Berkeley, California, United States",
      slogan: "Tomorrow is another day."
    },
    sections: {
      researchFocus: "Research Focus",
      education: "Education",
      experience: "Experience",
      programs: "Programs & Honors",
      skills: "Skills",
      contact: "Get In Touch",
      downloadResume: "Download Resume",
      lastUpdated: "Last updated: January 2025"
    },
    skills: {
      technical: "Technical Skills",
      research: "Research Areas",
      languages: "Languages",
      native: "Native",
      professional: "Professional"
    },
    contact: {
      title: "Get In Touch",
      description: "I'm always interested in discussing research opportunities, collaboration projects, or potential career opportunities. Feel free to reach out!",
      social: "Connect with me on social platforms"
    },
    research: {
      platformEconomy: {
        title: "Platform Economy",
        description: "Analyzing gig workers and digital platforms through large-scale datasets and quantitative methods."
      },
      laborEconomics: {
        title: "Labor Economics", 
        description: "Contributing to academic discussions on digital labor markets and policy implications."
      },
      dataAnalysis: {
        title: "Data Analysis",
        description: "Utilizing Python, MATLAB, and SPSS for statistical analysis and data visualization."
      },
      financialMarkets: {
        title: "Financial Markets",
        description: "Exploring sustainable finance and digital transformation in economic systems."
      }
    }
  },
  zh: {
    nav: {
      home: "首页",
      research: "研究重点",
      education: "教育背景", 
      experience: "工作经历",
      programs: "项目",
      skills: "技能",
      contact: "联系我"
    },
    personal: {
      name: "叶孙渝",
      title: "经济学学生",
      university: "浙江大学",
      location: "美国加利福尼亚州伯克利",
      slogan: "明天又是新的一天。"
    },
    sections: {
      researchFocus: "研究重点",
      education: "教育背景",
      experience: "工作经历",
      programs: "项目与荣誉",
      skills: "技能",
      contact: "联系我",
      downloadResume: "下载简历",
      lastUpdated: "最后更新：2025年1月"
    },
    skills: {
      technical: "技术技能",
      research: "研究领域",
      languages: "语言能力",
      native: "母语",
      professional: "专业水平"
    },
    contact: {
      title: "联系我",
      description: "我总是乐于讨论研究机会、合作项目或潜在的职业机会。欢迎联系！",
      social: "在社交平台上关注我"
    },
    research: {
      platformEconomy: {
        title: "平台经济",
        description: "通过大规模数据集和定量方法分析零工工作者和数字平台。"
      },
      laborEconomics: {
        title: "劳动经济学",
        description: "参与数字劳动力市场和政策影响的学术讨论。"
      },
      dataAnalysis: {
        title: "数据分析",
        description: "利用Python、MATLAB和SPSS进行统计分析和数据可视化。"
      },
      financialMarkets: {
        title: "金融市场",
        description: "探索经济系统中的可持续金融和数字化转型。"
      }
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
