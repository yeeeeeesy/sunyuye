import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="font-semibold text-xl text-primary">{t('personal.name')}</div>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => scrollToSection('research')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('nav.research')}
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('nav.education')}
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('nav.experience')}
              </button>
              <button 
                onClick={() => scrollToSection('programs')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('nav.programs')}
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('nav.skills')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="px-3 py-1 text-sm"
            >
              EN
            </Button>
            <Button
              variant={language === 'zh' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('zh')}
              className="px-3 py-1 text-sm"
            >
              中文
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
