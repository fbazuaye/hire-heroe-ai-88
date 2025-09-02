import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with basic AI guidance",
    features: [
      "1 resume analysis per month",
      "Basic interview prep questions",
      "Job search strategy guide",
      "Application tracking (up to 5)",
      "Email templates"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Professional",
    price: "$29",
    period: "per month",
    description: "Comprehensive AI-powered career assistance",
    features: [
      "Unlimited resume analyses",
      "Advanced interview prep with feedback",
      "Personalized job search strategies",
      "Unlimited application tracking",
      "Custom outreach templates",
      "Role-specific insights",
      "Cover letter optimization",
      "Priority support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "hero" as const,
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For teams and career coaching professionals",
    features: [
      "Everything in Professional",
      "Team management dashboard",
      "Custom AI model training",
      "White-label branding",
      "API access",
      "Advanced analytics",
      "Dedicated account manager",
      "Custom integrations"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-spacing bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Choose Your Career Success Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and upgrade when you're ready to accelerate your job search
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`card-elevated relative ${plan.popular ? 'ring-2 ring-primary shadow-primary/25' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Button variant={plan.buttonVariant} className="w-full" size="lg">
                  {plan.buttonText}
                </Button>
                
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;