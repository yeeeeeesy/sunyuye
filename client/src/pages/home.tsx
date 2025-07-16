import { Navigation } from '@/components/navigation';
import { Sidebar } from '@/components/sidebar';
import { ContentSections } from '@/components/content-sections';
import { AIChatbot } from '@/components/ai-chatbot';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      
      <div className="flex pt-20">
        <Sidebar />
        
        <main className="ml-80 flex-1 min-h-screen">
          <div className="max-w-4xl mx-auto p-8">
            <ContentSections />
          </div>
        </main>
      </div>
      
      <AIChatbot />
    </div>
  );
}
