import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Award, Users, ArrowRight, Target, 
  TrendingUp, Lightbulb, GraduationCap, Star,
  CheckCircle, Trophy, FileText, MessageCircle, Zap,
  Sparkles, Rocket, BarChart, Heart, Code, Dumbbell,
  Music, UsersRound, Building2, HandHeart, Medal,
  FileCheck, UserCheck, ShieldCheck, Download, QrCode,
  ChevronRight, Clock, ThumbsUp
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

  const categories = [
    { name: "Technical", icon: Code, color: "from-purple-500 to-indigo-600", count: "850+" },
    { name: "Sports", icon: Dumbbell, color: "from-green-500 to-emerald-600", count: "620+" },
    { name: "Cultural", icon: Music, color: "from-pink-500 to-rose-600", count: "490+" },
    { name: "Arts & Culture", icon: UsersRound, color: "from-orange-500 to-amber-600", count: "496+" },
    { name: "Startup", icon: Rocket, color: "from-indigo-500 to-violet-600", count: "320+" },
    { name: "Community", icon: HandHeart, color: "from-rose-500 to-red-600", count: "410+" },
    { name: "Club", icon: Building2, color: "from-cyan-500 to-blue-600", count: "550+" },
  ];

  const workflow = [
    {
      step: "1",
      title: "Student Submission",
      description: "Submit your achievements with detailed information and certificate uploads across 7 categories",
      icon: FileCheck,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "2", 
      title: "Faculty Recommendation",
      description: "Faculty members review submissions and provide recommendations for approval",
      icon: UserCheck,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "3",
      title: "HOD Final Approval",
      description: "Department heads give final approval after reviewing faculty recommendations",
      icon: ShieldCheck,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "4",
      title: "Transcript Generation",
      description: "Download your official co-curricular transcript with QR verification code",
      icon: Download,
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Active Students", value: "2,847", icon: Users, change: "+12.5%" },
    { label: "Transcripts Generated", value: "1,453", icon: Award, change: "+8.3%" },
    { label: "Approved Achievements", value: "8,921", icon: Medal, change: "+15.7%" },
    { label: "Approval Rate", value: "94.7%", icon: TrendingUp, change: "+2.1%" }
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
                Official Transcript Management
              </Badge>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-8 leading-tight drop-shadow-2xl animate-fade-in-up">
              CO-CURRICULAR EXCELLENCE
            </h1>
            
            <p className="text-xl md:text-3xl text-white/95 mb-12 leading-relaxed drop-shadow-lg font-light max-w-3xl mx-auto animate-fade-in-up delay-200">
              Document your journey at LPU with official{" "}
              <span className="font-bold text-yellow-300">co-curricular transcripts</span>,{" "}
              <span className="font-bold text-green-300">multi-level approvals</span>, and{" "}
              <span className="font-bold text-pink-300">verified achievements</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-in-up delay-300">
              <Button 
                variant="hero" 
                size="lg" 
                asChild 
                className="shadow-2xl hover:shadow-yellow-500/50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg group"
              >
                <Link to="/beyond-academics">
                  <Rocket className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Submit Achievement
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

      {/* Achievement Categories Showcase */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2">
              <Trophy className="w-4 h-4 mr-2 inline" />
              7 Achievement Categories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Showcase Your Excellence
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Submit achievements across multiple categories and build your comprehensive co-curricular profile
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-7xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-transparent overflow-hidden relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <CardContent className="p-6 text-center relative">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-sm mb-2">{category.name}</h3>
                    <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Process Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-6 py-2">
              <Clock className="w-4 h-4 mr-2 inline" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From submission to official transcript in 4 easy steps
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card 
                    key={index}
                    className="relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0"
                  >
                    {/* Connection Line */}
                    {index < workflow.length - 1 && (
                      <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                    )}
                    
                    <CardContent className="p-8 text-center relative">
                      {/* Step Number Badge */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white font-bold text-xl flex items-center justify-center shadow-lg`}>
                          {step.step}
                        </div>
                      </div>

                      <div className="mt-4 mb-6">
                        <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-6 text-lg shadow-xl">
              <Link to="/beyond-academics">
                <Rocket className="w-5 h-5 mr-2" />
                Start Your First Submission
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-6 py-2">
              <Users className="w-4 h-4 mr-2 inline" />
              For Everyone
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Role-Based Access
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Designed for students, faculty, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Student Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-blue-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Students</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Submit achievements easily</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Track approval status</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Generate transcripts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">View semester-wise points</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link to="/login">
                    Student Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Faculty Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-purple-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">Faculty</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Review submissions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Provide recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Add comments & feedback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Filter by category</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-purple-500 hover:bg-purple-600">
                  <Link to="/admin/faculty">
                    Faculty Portal
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* HOD Card */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-green-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl mb-4">HOD</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Final approval authority</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Review faculty recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Analytics & reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Export capabilities</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <Link to="/admin/hod">
                    HOD Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* LPU Exclusive Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-6 py-2 text-base">
              <Star className="w-4 h-4 mr-2 inline" />
              System Features
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-orange-600 to-blue-900 bg-clip-text text-transparent">
              Comprehensive Transcript Management
            </h3>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              A complete co-curricular documentation system designed specifically for LPU students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
            {[
              {
                icon: FileText,
                title: "Multi-Level Approval",
                description: "Faculty recommendation and HOD final approval workflow",
                gradient: "from-purple-500 to-indigo-600",
                bgColor: "from-purple-50 to-indigo-50"
              },
              {
                icon: CheckCircle,
                title: "7 Achievement Categories",
                description: "Technical, Sports, Cultural, Leadership, Startup, Community, Club",
                gradient: "from-blue-500 to-cyan-600",
                bgColor: "from-blue-50 to-cyan-50"
              },
              {
                icon: BookOpen,
                title: "Semester-Wise Tracking",
                description: "Automatic semester detection and academic year classification",
                gradient: "from-green-500 to-emerald-600",
                bgColor: "from-green-50 to-emerald-50"
              },
              {
                icon: Trophy,
                title: "Points & Grades",
                description: "Auto-calculated merit points with grade system (O to D)",
                gradient: "from-amber-500 to-orange-600",
                bgColor: "from-amber-50 to-orange-50"
              },
              {
                icon: QrCode,
                title: "QR Verification",
                description: "Secure QR code for transcript authenticity verification",
                gradient: "from-pink-500 to-rose-600",
                bgColor: "from-pink-50 to-rose-50"
              },
              {
                icon: Download,
                title: "PDF Transcripts",
                description: "Professional downloadable transcripts with LPU branding",
                gradient: "from-violet-500 to-purple-600",
                bgColor: "from-violet-50 to-purple-50"
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border-0 bg-gradient-to-br ${benefit.bgColor} overflow-hidden relative`}
                >
                  {/* Animated Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${benefit.gradient} transition-all">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Progress Bar Animation */}
                    <div className="mt-6 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${benefit.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Document Your Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Start building your official co-curricular transcript today
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg shadow-2xl">
                <Link to="/beyond-academics">
                  <FileCheck className="w-5 h-5 mr-2" />
                  Submit Achievement
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-6 text-lg transition-all">
                <Link to="/transcript">
                  <Download className="w-5 h-5 mr-2" />
                  View Transcript
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;