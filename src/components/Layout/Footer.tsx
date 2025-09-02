import { Brain, Mail, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">CareerAI</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered career assistant helping job seekers land their dream roles with personalized guidance and proven strategies.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">
                <Twitter className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">
                <Linkedin className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">
                <Mail className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Resume Analysis</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Interview Prep</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Job Search Strategy</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Application Tracking</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Templates</a>
            </div>
          </div>
          
          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">About Us</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Careers</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Blog</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Press</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Partners</a>
            </div>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 CareerAI. All rights reserved.
          </p>
          <p className="text-gray-300 text-sm mt-4 md:mt-0">
            Made with ❤️ for job seekers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;