import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Chatbot proxy function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    if (action === 'init') {
      // Return the chatbot initialization script
      const initScript = `
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
            customCSS: \`\`,
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
              backgroundImage: 'enter image path or link',
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

      return new Response(initScript, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/javascript',
        },
      });
    }

    // If no specific action, return success
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error in chatbot-proxy function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});