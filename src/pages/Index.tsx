import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Award, Users, ArrowRight, Target, 
  TrendingUp, Lightbulb, GraduationCap, Star,
  CheckCircle, Trophy, FileText, MessageCircle, Zap,
  Sparkles, Rocket, BarChart, Heart
} from "lucide-react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathways = [
    {
      title: "Beyond Academics",
      subtitle: "Holistic Achievement Pathway",
      description: "Showcase achievements beyond the classroom - sports, cultural activities, competitions, and extracurricular excellence with direct academic benefits.",
      icon: Trophy,
      href: "/beyond-academics",
      color: "secondary",
      features: [
        "Sports & cultural achievements",
        "Competition recognition",
        "Scholarship opportunities",
        "Holistic development rewards"
      ],
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      title: "Projects & Mentors",
      subtitle: "Innovation & Collaboration",
      description: "Engage in cutting-edge research projects and connect with expert faculty mentors. Build skills while contributing to impactful innovations.",
      icon: Users,
      href: "/projects",
      color: "success",
      features: [
        "Research project opportunities",
        "Expert faculty mentorship",
        "Skill development programs",
        "Industry collaboration"
      ],
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    }
  ];

  const quickLinks = [
    { name: "Submit Achievement", icon: Target, href: "/beyond-academics-add-achievement" },
    { name: "Beyond Academics", icon: Trophy, href: "/beyond-academics" },
    { name: "Policies & Guidelines", icon: BookOpen, href: "#" },
    { name: "Contact Support", icon: MessageCircle, href: "#" }
  ];

  const stats = [
    { label: "Active Students", value: "2,847", icon: Users },
    { label: "Achievements Verified", value: "12,453", icon: CheckCircle },
    { label: "Benefits Unlocked", value: "8,921", icon: Star },
    { label: "Success Rate", value: "94.7%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-90"></div>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          ></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-5xl mx-auto">
            {/* Animated Badge */}
            <div className="mb-8 animate-fade-in">
              <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 backdrop-blur-md text-lg hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 mr-2 inline" />
                Excellence Recognition Platform
              </Badge>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-8 leading-tight drop-shadow-2xl animate-fade-in-up">
              EDU REVOLUTION
            </h1>
            
            <p className="text-xl md:text-3xl text-white/95 mb-12 leading-relaxed drop-shadow-lg font-light max-w-3xl mx-auto animate-fade-in-up delay-200">
              Revolutionizing the way student achievements are{" "}
              <span className="font-bold text-yellow-300">recognized</span>,{" "}
              <span className="font-bold text-green-300">verified</span>, and{" "}
              <span className="font-bold text-pink-300">rewarded</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-in-up delay-300">
              <Button 
                variant="hero" 
                size="lg" 
                asChild 
                className="shadow-2xl hover:shadow-yellow-500/50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg group"
              >
                <Link to="/edu-rev">
                  <Rocket className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Start Your Journey
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-2 border-white/30 text-white backdrop-blur-md hover:bg-white hover:text-purple-600 font-semibold px-8 py-6 text-lg group transition-all duration-300"
              >
                <Lightbulb className="mr-2 h-6 w-6 group-hover:text-yellow-400 transition-colors" />
                Learn More
              </Button>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up delay-500">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group text-center bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:border-white/40"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <stat.icon className="h-7 w-7 text-white drop-shadow-lg" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/90 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Main Pathways with Enhanced Design */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-2 text-base">
              <Zap className="w-4 h-4 mr-2 inline" />
              Your Success Pathways
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
              Choose Your Path to Excellence
            </h2>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Specialized pathways designed to <span className="font-semibold text-purple-600">capture</span>, <span className="font-semibold text-blue-600">verify</span>, and <span className="font-semibold text-green-600">reward</span> your achievements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 group overflow-hidden border-0 bg-gradient-to-br ${pathway.bgGradient}`}
                >
                  {/* Animated Border Gradient */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-r ${pathway.gradient} opacity-10`}></div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/50 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <CardHeader className="relative z-10 p-8 space-y-6">
                    <div className={`flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${pathway.gradient} shadow-2xl mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                    
                    <div>
                      <CardTitle className="text-3xl md:text-4xl mb-3 font-bold">{pathway.title}</CardTitle>
                      <CardDescription className="text-xl font-semibold bg-gradient-to-r ${pathway.gradient} bg-clip-text text-transparent mb-4">
                        {pathway.subtitle}
                      </CardDescription>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {pathway.description}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-6 p-8 pt-0">
                    <div className="space-y-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80">
                      {pathway.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3 group/item">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${pathway.gradient} flex items-center justify-center group-hover/item:scale-110 transition-transform`}>
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-base font-medium text-gray-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      asChild 
                      className={`w-full py-7 text-lg font-bold group-hover:scale-105 transition-all duration-300 shadow-xl bg-gradient-to-r ${pathway.gradient} hover:shadow-2xl border-0`}
                    >
                      <Link to={pathway.href} className="flex items-center justify-center">
                        <Rocket className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                        Explore {pathway.title}
                        <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>

                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links with Modern Design */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2">
              <Zap className="w-4 h-4 mr-2 inline" />
              Quick Access
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Everything You Need
            </h3>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Frequently used features and important resources at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              const colors = [
                { bg: "from-purple-500 to-pink-500", ring: "ring-purple-200" },
                { bg: "from-blue-500 to-cyan-500", ring: "ring-blue-200" },
                { bg: "from-green-500 to-emerald-500", ring: "ring-green-200" },
                { bg: "from-orange-500 to-red-500", ring: "ring-orange-200" }
              ];
              const color = colors[index % colors.length];
              
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 bg-white overflow-hidden relative"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${color.bg} shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ring-4 ${color.ring} ring-opacity-50`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${color.bg} transition-all">
                      {link.name}
                    </h4>
                  </CardContent>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className={`h-6 w-6 bg-gradient-to-r ${color.bg} bg-clip-text text-transparent`} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E')" }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Icon with Animation */}
            <div className="mb-8 inline-block animate-bounce">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30">
                <GraduationCap className="h-14 w-14 text-white drop-shadow-lg" />
              </div>
            </div>
            
            <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
              Ready to Unlock Your Potential?
            </h3>
            
            <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Join <span className="font-bold text-yellow-300">2,847+</span> students who have already transformed their academic journey. 
              Start submitting your achievements today and unlock the benefits you deserve.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: BarChart, text: "Track Progress" },
                { icon: Trophy, text: "Earn Recognition" },
                { icon: Heart, text: "Build Profile" },
                { icon: Star, text: "Unlock Benefits" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                  <item.icon className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
              <Button 
                variant="hero" 
                size="lg" 
                asChild 
                className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 px-10 py-7 text-xl font-bold group border-4 border-white/50"
              >
                <Link to="/edu-rev" className="flex items-center justify-center">
                  <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Submit First Achievement
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-transparent border-4 border-white/50 text-white hover:bg-white hover:text-purple-600 backdrop-blur-md px-10 py-7 text-xl font-bold group transition-all duration-300" 
                asChild
              >
                <Link to="/projects" className="flex items-center justify-center">
                  <Users className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Browse Projects
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Instant Verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;