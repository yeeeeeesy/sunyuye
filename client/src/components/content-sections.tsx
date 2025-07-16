import { useLanguage } from '@/hooks/use-language';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, Award, MapPin, Calendar, Mail, Linkedin, Instagram, Github } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

export function ContentSections() {
  const { language, t } = useLanguage();

  const { data: portfolioContent, isLoading } = useQuery({
    queryKey: ['/api/portfolio', language],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/portfolio?lang=${language}`);
      return response.json();
    },
    enabled: true,
  });

  const handleResumeDownload = async () => {
    try {
      const response = await apiRequest('GET', '/api/resume');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Sunyu_Ye_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Resume download failed:', error);
    }
  };

  const getContentBySection = (section: string) => {
    if (!portfolioContent) return '';
    const content = portfolioContent.find((item: any) => item.section === section);
    return content?.content || '';
  };

  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      
      {/* Personal Introduction */}
      <section id="home" className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            {getContentBySection('about') || t('sections.about')}
          </p>
        </div>
      </section>

      {/* Research Focus */}
      <section id="research" className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('sections.researchFocus')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">{t('research.platformEconomy.title')}</h3>
            <p className="text-gray-600 text-sm">{t('research.platformEconomy.description')}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">{t('research.laborEconomics.title')}</h3>
            <p className="text-gray-600 text-sm">{t('research.laborEconomics.description')}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">{t('research.dataAnalysis.title')}</h3>
            <p className="text-gray-600 text-sm">{t('research.dataAnalysis.description')}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-2">{t('research.financialMarkets.title')}</h3>
            <p className="text-gray-600 text-sm">{t('research.financialMarkets.description')}</p>
          </div>
        </div>
      </section>

      {/* Job Application Statement */}
      <section className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            I am actively seeking research assistant opportunities in LLM applications and economic data analysis. Feel free to reach out, or learn more from{' '}
            <Button 
              onClick={handleResumeDownload} 
              variant="link" 
              className="p-0 h-auto font-semibold text-primary hover:underline text-[15px]"
            >
              My Resume
            </Button>
            .
          </p>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('sections.education')}</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-xl font-semibold text-gray-900">Bachelor of Arts - Economics</h3>
            <p className="text-primary font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Zhejiang University
            </p>
            <p className="text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              2023 - 2027
            </p>
          </div>
          <div className="border-l-4 border-accent pl-6">
            <h3 className="text-xl font-semibold text-gray-900">Digital Transformation, Data and Decision</h3>
            <p className="text-accent font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              University of California, Berkeley
            </p>
            <p className="text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              July 2025 - August 2025
            </p>
          </div>
          <div className="border-l-4 border-secondary pl-6">
            <h3 className="text-xl font-semibold text-gray-900">Sustainable Finance Program</h3>
            <p className="text-secondary font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Nanyang Technological University Singapore
            </p>
            <p className="text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              July 2024
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('sections.experience')}</h2>
        <div className="space-y-8">
          <div className="relative">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Research Assistant</h3>
                <p className="text-primary font-medium">Zhejiang University</p>
                <p className="text-gray-600 mb-4">February 2025 - Present</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Research Assistant for Prof. Zhe Yuan on platform economy and gig workers research
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Analyzed 12,447 platform transaction datasets and 10,028+ survey responses
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Authored comprehensive 29,898-word industry white paper on gig economy
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Utilized Python and MATLAB for data processing and statistical analysis
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-accent rounded-full mt-2"></div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Director of General Affairs Department</h3>
                <p className="text-accent font-medium">Zhejiang University Youth Volunteer Guidance Center</p>
                <p className="text-gray-600 mb-4">June 2024 - May 2025</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                    Led development of university-wide volunteer project website
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                    Supervised records of 40,000+ star-rated student volunteers
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-accent mt-0.5 mr-2 flex-shrink-0" />
                    Collaborated with university departments to streamline evaluation processes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Awards */}
      <section id="programs" className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('sections.programs')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Award className="w-5 h-5 mr-2 text-primary" />
              Mathematical Contest In Modeling
            </h3>
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Finalist</span>
            <p className="text-gray-600 text-sm mt-3">Recognized for excellence in mathematical modeling and analytical problem-solving.</p>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-6 border border-accent/20">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Award className="w-5 h-5 mr-2 text-accent" />
              UC Berkeley Summer Program
            </h3>
            <span className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">Completed</span>
            <p className="text-gray-600 text-sm mt-3">Digital transformation and data-driven decision making program.</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('sections.skills')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('skills.technical')}</h3>
            <div className="space-y-3">
              {[
                { name: 'Python', level: 85 },
                { name: 'MATLAB', level: 85 },
                { name: 'STATA', level: 80 },
                { name: 'SPSS', level: 80 },
                { name: 'LaTeX', level: 75 }
              ].map(skill => (
                <div key={skill.name} className="flex justify-between items-center">
                  <span className="text-gray-700">{skill.name}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('skills.research')}</h3>
            <div className="space-y-2">
              {['Data Analysis', 'Economic Analysis', 'Platform Economy', 'Labor Economics', 'Financial Markets', 'Sustainable Finance'].map(skill => (
                <span key={skill} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('skills.languages')}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700">Chinese</span>
                  <span className="text-sm text-gray-500">{t('skills.native')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700">English</span>
                  <span className="text-sm text-gray-500">{t('skills.professional')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section id="contact" className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contact.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-6">
              {t('contact.description')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span>yesunnyu@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span>{t('personal.location')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-4">{t('contact.social')}</p>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/in/sunyu-ye-a3a806373" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
