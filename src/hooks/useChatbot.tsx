import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useChatbot = () => {
  useEffect(() => {
    const initChatbot = async () => {
      try {
        // Use our edge function to avoid CORS issues
        const { data, error } = await supabase.functions.invoke('chatbot-proxy', {
          body: { action: 'init' }
        });

        if (error) {
          console.error('Error loading chatbot:', error);
          return;
        }

        // Create script element and execute the chatbot initialization
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
          import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
          
          Chatbot.init({
            chatflowid: "81474cb0-b321-4dfe-abd3-0487f4de430b",
            apiHost: "https://srv938896.hstgr.cloud",
            chatflowConfig: {},
            observersConfig: {},
            theme: {
              button: {
                backgroundColor: '#3B81F6',
                right: 20,
                bottom: 20,
                size: 48,
                dragAndDrop: true,
                iconColor: 'white',
                customIconSrc: 'https://livegig.com.ng/wp-content/uploads/2025/09/Logo.png',
                autoWindowOpen: {
                  autoOpen: false,
                  openDelay: 2,
                  autoOpenOnMobile: false
                }
              },
              tooltip: {
                showTooltip: true,
                tooltipMessage: 'CareerAi Chatagent',
                tooltipBackgroundColor: 'black',
                tooltipTextColor: 'white',
                tooltipFontSize: 16
              },
              disclaimer: {
                title: 'Disclaimer',
                message: "By using this chatbot, you agree to the <a target=\\"_blank\\" href=\\"CareerAi\\">Terms & Condition</a>",
                textColor: 'black',
                buttonColor: '#3b82f6',
                buttonText: 'Start Chatting',
                buttonTextColor: 'white',
                blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
                backgroundColor: 'white'
              },
              customCSS: '',
              chatWindow: {
                showTitle: true,
                showAgentMessages: true,
                title: 'CareerAi',
                titleAvatarSrc: 'https://livegig.com.ng/wp-content/uploads/2025/09/Logo.png',
                welcomeMessage: \`Hi there! I'm CareerAI, your personal job search assistant.
I'm here to make your career journey smoother 
Just ask me anything about your job search, and I'll give you tailored guidance, tools, and resources to boost your chances of success.\`,
                errorMessage: 'This is a custom error message',
                backgroundColor: '#ffffff',
                height: 490,
                width: 400,
                fontSize: 16,
                starterPrompts: [
                  "How can I improve my LinkedIn profile?",
                  "What certifications can boost my employability"
                ],
                starterPromptFontSize: 15,
                clearChatOnReload: false,
                sourceDocsTitle: 'Sources:',
                renderHTML: true,
                botMessage: {
                  backgroundColor: '#f7f8ff',
                  textColor: '#303235',
                  showAvatar: true,
                  avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png'
                },
                userMessage: {
                  backgroundColor: '#3B81F6',
                  textColor: '#ffffff',
                  showAvatar: true,
                  avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
                },
                textInput: {
                  placeholder: 'Type your question',
                  backgroundColor: '#ffffff',
                  textColor: '#303235',
                  sendButtonColor: '#3B81F6',
                  maxChars: 300,
                  maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 300 characters.',
                  autoFocus: true,
                  sendMessageSound: true,
                  sendSoundLocation: 'send_message.mp3',
                  receiveMessageSound: true,
                  receiveSoundLocation: 'receive_message.mp3'
                },
                feedback: {
                  color: '#303235'
                },
                dateTimeToggle: {
                  date: true,
                  time: true
                },
                footer: {
                  textColor: '#303235',
                  text: 'Powered by',
                  company: 'LiveGig Ltd',
                  companyLink: 'https://livegig.com.ng/'
                }
              }
            }
          });
        `;

        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to initialize chatbot:', error);
      }
    };

    // Initialize chatbot after a short delay to ensure page is loaded
    const timer = setTimeout(initChatbot, 1000);

    return () => {
      clearTimeout(timer);
      // Cleanup if needed
      const existingScripts = document.querySelectorAll('script[type="module"]');
      existingScripts.forEach(script => {
        if (script.textContent?.includes('Chatbot.init')) {
          script.remove();
        }
      });
    };
  }, []);
};