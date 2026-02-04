import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Trophy,
  Plus,
  BarChart3,
  Eye,
  Star,
  Award,
  Target,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Zap,
  Gift,
  Code,
  Dumbbell,
  Music,
  UsersRound,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Shield,
  BookOpen,
  GraduationCap,
  Rocket,
  Heart,
} from "lucide-react";
import Header from "@/components/Header";

const BeyondAcademics = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setIsDialogOpen(true);
  };

  const navigateToCategoryForm = (category: string) => {
    const routes: Record<string, string> = {
      "Technical": "/achievement-form/technical",
      "Sports": "/achievement-form/sports",
      "Cultural": "/achievement-form/cultural",
      "Arts & Culture": "/achievement-form/arts-culture",
      "Startup": "/achievement-form/startup",
      "Community": "/achievement-form/community",
      "Club": "/achievement-form/club",
    };
    navigate(routes[category] || "/beyond-academics");
  };

  const getCategoryDetails = (title: string) => {
    const details: Record<string, any> = {
      Technical: {
        icon: <Code className="w-8 h-8" />,
        benefits: [
          "₹5,000 - ₹50,000 scholarship based on competition level",
          "5-10 academic credits for major achievements",
          "Certificate of technical excellence",
          "Featured in university tech magazine",
          "Priority access to internship programs",
          "Mentorship opportunities with industry experts",
        ],
        eligibility: [
          "Must be enrolled as a full-time student",
          "Achievement within the last 12 months",
          "Proper documentation and certificates required",
          "Verification from competition organizers",
        ],
        examples: [
          {
            name: "Hackathons",
            details: "Win or participate in coding hackathons (MLH, DevPost, etc.)",
            points: "3-100 points based on level & rank (Codes: A1-M3)",
          },
          {
            name: "Coding Contests",
            details: "Achievements in competitive programming (CodeChef, Codeforces, LeetCode)",
            points: "3-100 points based on competition level & achievement",
          },
          {
            name: "Research Publications",
            details: "Published papers in conferences or journals",
            points: "3-100 points based on venue category (L1-L4)",
          },
        ],
      },
      Sports: {
        icon: <Dumbbell className="w-8 h-8" />,
        benefits: [
          "₹3,000 - ₹40,000 scholarship for sports achievements",
          "3-7 academic credits",
          "Sports excellence certificate",
          "Featured on university sports portal",
          "Access to advanced training facilities",
          "Sports kit and equipment support",
        ],
        eligibility: [
          "Participation in recognized tournaments",
          "Medical fitness certificate",
          "Coach recommendation letter",
          "Achievement within last 12 months",
        ],
        examples: [
          {
            name: "Tournaments",
            details: "Inter-college, state, or national level competitions",
            points: "3-100 points based on level & rank (Codes: A1-M3)",
          },
          {
            name: "Championships",
            details: "Gold, Silver, Bronze medals in championships",
            points: "3-100 points - Winner/Merit gets highest points",
          },
          {
            name: "Athletic Competitions",
            details: "Track and field, marathons, sports meets",
            points: "3-100 points based on competition scope (Zonal/National)",
          },
        ],
      },
      Cultural: {
        icon: <Music className="w-8 h-8" />,
        benefits: [
          "₹2,000 - ₹30,000 scholarship for cultural excellence",
          "2-7 academic credits",
          "Cultural achievement certificate",
          "Performance opportunities at university events",
          "Studio/practice space access",
          "Featured in cultural showcases",
        ],
        eligibility: [
          "Performance at recognized events",
          "Faculty advisor endorsement",
          "Video/photo documentation required",
          "Achievement within last 12 months",
        ],
        examples: [
          {
            name: "Music Competitions",
            details: "Solo/group performances, band competitions",
            points: "3-100 points based on level & rank (Codes: A1-M3)",
          },
          {
            name: "Dance Performances",
            details: "Classical, contemporary, folk dance competitions",
            points: "3-100 points - National events get higher points",
          },
          {
            name: "Art Exhibitions",
            details: "Painting, sculpture, photography exhibitions",
            points: "3-100 points based on venue & achievement level",
          },
        ],
      },
      "Arts & Culture": {
        icon: <UsersRound className="w-8 h-8" />,
        benefits: [
          "₹2,000 - ₹25,000 scholarship for arts & culture impact",
          "3-8 academic credits",
          "Leadership certificate",
          "LinkedIn endorsement from university",
          "Networking opportunities with alumni",
          "Letter of recommendation support",
        ],
        eligibility: [
          "Minimum 6 months in arts & culture role",
          "Demonstrable impact and results",
          "Supervisor/mentor recommendation",
          "Documentation of activities",
        ],
        examples: [
          {
            name: "Student Leadership",
            details: "Club president, council member, team lead positions",
            points: "3-100 points based on level & impact (Codes: A1-M3)",
          },
          {
            name: "Community Service",
            details: "Volunteer work, social initiatives, NGO projects",
            points: "3-100 points - National level gets 2x zonal points",
          },
          {
            name: "Event Organization",
            details: "Successfully organizing technical/cultural/sports events",
            points: "3-100 points based on competition scope & achievement",
          },
        ],
      },
      "Startup": {
        icon: <Rocket className="w-8 h-8" />,
        benefits: [
          "₹5,000 - ₹50,000 funding support for startups",
          "5-10 academic credits for entrepreneurship",
          "Incubation center access",
          "Mentorship from successful entrepreneurs",
          "Networking with investors and industry leaders",
          "Certificate of entrepreneurial excellence",
        ],
        eligibility: [
          "Registered business or startup",
          "Demonstrable product/service launch",
          "Business plan documentation",
          "Achievement within last 12 months",
        ],
        examples: [
          {
            name: "Pitch Competitions",
            details: "Win or participate in startup pitch competitions",
            points: "3-100 points based on level & rank (Codes: A1-M3)",
          },
          {
            name: "Funding Secured",
            details: "Secured investment or grants for startup",
            points: "3-100 points based on funding amount & stage",
          },
          {
            name: "Product Launch",
            details: "Successfully launched product with user traction",
            points: "3-100 points based on impact & market reach",
          },
        ],
      },
      "Community": {
        icon: <Heart className="w-8 h-8" />,
        benefits: [
          "₹2,000 - ₹30,000 scholarship for social impact",
          "3-8 academic credits for community service",
          "Social service certificate",
          "Featured in university social initiatives",
          "Networking with NGOs and social organizations",
          "Letter of recommendation for social work",
        ],
        eligibility: [
          "Minimum 50 hours of community service",
          "Measurable social impact",
          "NGO or organization recommendation",
          "Documentation of activities and impact",
        ],
        examples: [
          {
            name: "Volunteer Work",
            details: "Teaching, healthcare, environmental conservation",
            points: "3-100 points based on duration & impact (Codes: A1-M3)",
          },
          {
            name: "NGO Collaboration",
            details: "Partnering with NGOs for social initiatives",
            points: "3-100 points based on level & beneficiaries reached",
          },
          {
            name: "Awareness Campaigns",
            details: "Social awareness drives, health camps, education programs",
            points: "3-100 points based on reach & impact",
          },
        ],
      },
      "Club": {
        icon: <Target className="w-8 h-8" />,
        benefits: [
          "₹1,000 - ₹20,000 scholarship for organizational work",
          "2-6 academic credits",
          "Leadership and organizational certificate",
          "Featured in university club activities",
          "Access to club resources and mentorship",
          "LinkedIn endorsement for leadership skills",
        ],
        eligibility: [
          "Minimum 6 months active membership",
          "Demonstrable contribution to club activities",
          "Faculty advisor recommendation",
          "Documentation of events and activities",
        ],
        examples: [
          {
            name: "Club Leadership",
            details: "President, secretary, coordinator positions",
            points: "3-100 points based on level & achievements (Codes: A1-M3)",
          },
          {
            name: "Event Management",
            details: "Organizing workshops, competitions, cultural events",
            points: "3-100 points based on event scale & participation",
          },
          {
            name: "Student Chapter Activities",
            details: "IEEE, ACM, Rotaract, technical society activities",
            points: "3-100 points based on impact & recognition",
          },
        ],
      },
    };
    return details[title];
  };

  const stats = [
    {
      label: "Total Achievements",
      value: "2,456",
      icon: <Trophy className="w-6 h-6" />,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Active Students",
      value: "850",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Benefits Awarded",
      value: "₹12.5L",
      icon: <Award className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      label: "This Month",
      value: "156",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  const benefits = [
    {
      icon: <Gift className="w-10 h-10" />,
      title: "Scholarships",
      description: "Financial support from ₹1,000 to ₹50,000",
      gradient: "from-green-500 to-emerald-600",
      iconBg: "bg-green-100",
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Academic Credits",
      description: "2-10 credits based on achievement level",
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-100",
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Duty Leaves",
      description: "1-7 days excused absences",
      gradient: "from-purple-500 to-violet-600",
      iconBg: "bg-purple-100",
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: "Recognition",
      description: "Featured on university platforms",
      gradient: "from-yellow-500 to-amber-600",
      iconBg: "bg-yellow-100",
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Certificates",
      description: "Official certificates of excellence",
      gradient: "from-orange-500 to-red-600",
      iconBg: "bg-orange-100",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Priority Access",
      description: "Early access to programs and events",
      gradient: "from-indigo-500 to-purple-600",
      iconBg: "bg-indigo-100",
    },
  ];

  const achievementTypes = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Technical",
      description: "Coding competitions, hackathons, research papers",
      examples: ["Hackathons", "Coding Contests", "Research Publications"],
      gradient: "from-blue-600 via-cyan-500 to-teal-500",
      iconColor: "text-blue-600",
      count: "850+ achievements",
    },
    {
      icon: <Dumbbell className="w-12 h-12" />,
      title: "Sports",
      description: "Sports competitions, tournaments, physical achievements",
      examples: ["Tournaments", "Championships", "Athletic Competitions"],
      gradient: "from-green-600 via-emerald-500 to-teal-500",
      iconColor: "text-green-600",
      count: "620+ achievements",
    },
    {
      icon: <Music className="w-12 h-12" />,
      title: "Cultural",
      description: "Arts, music, dance, theatrical performances",
      examples: ["Music Competitions", "Dance Performances", "Art Exhibitions"],
      gradient: "from-purple-600 via-pink-500 to-rose-500",
      iconColor: "text-purple-600",
      count: "490+ achievements",
    },
    {
      icon: <UsersRound className="w-12 h-12" />,
      title: "Arts & Culture",
      description: "Arts & culture roles, community service, organizing events",
      examples: ["Student Activities", "Community Service", "Event Organization"],
      gradient: "from-orange-600 via-amber-500 to-yellow-500",
      iconColor: "text-orange-600",
      count: "496+ achievements",
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Startup",
      description: "Entrepreneurship, product launches, business ventures",
      examples: ["Startup Competitions", "Product Development", "Business Pitches"],
      gradient: "from-indigo-600 via-violet-500 to-purple-500",
      iconColor: "text-indigo-600",
      count: "320+ achievements",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Community",
      description: "Social work, NGO activities, volunteering",
      examples: ["Volunteer Programs", "NGO Work", "Social Initiatives"],
      gradient: "from-rose-600 via-red-500 to-pink-500",
      iconColor: "text-rose-600",
      count: "410+ achievements",
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Club",
      description: "Club activities, society events, organizational work",
      examples: ["Club Events", "Society Activities", "Student Organizations"],
      gradient: "from-emerald-600 via-teal-500 to-cyan-500",
      iconColor: "text-emerald-600",
      count: "550+ achievements",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Submit Achievement",
      description: "Share your accomplishments with detailed evidence and documentation",
      icon: <Plus className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      step: "2",
      title: "Faculty Review",
      description: "Our faculty panel verifies your achievements for authenticity",
      icon: <Shield className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      step: "3",
      title: "Points Calculation",
      description: "System calculates benefits based on achievement level and impact",
      icon: <Target className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      gradient: "from-orange-500 to-red-500",
    },
    {
      step: "4",
      title: "Claim Benefits",
      description: "Access your earned benefits through the student dashboard",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />

      <main id="main-content">
        {/* Hero Section with Enhanced Design */}
        <div className="relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
          
          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-amber-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20 shadow-lg">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                  Beyond Academics Program
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-amber-500 to-orange-600 bg-clip-text text-transparent">
                    Showcase Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-primary bg-clip-text text-transparent">
                    Excellence
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Transform your extracurricular achievements into{" "}
                  <span className="font-semibold text-primary">academic rewards</span>. 
                  Get recognized for your technical prowess, sports excellence, cultural talents, and leadership skills.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/beyond-academics-add-achievement">
                    <Plus className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Add Achievement
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-primary/20 hover:border-primary hover:bg-primary/5 shadow-lg px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/beyond-academics-leaderboard">
                    <BarChart3 className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                    View Leaderboard
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-amber-500/20 hover:border-amber-500 hover:bg-amber-500/5 shadow-lg px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/transcript">
                    <Award className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                    View Transcript
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="group hover:bg-primary/5 px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/dashboard">
                    <Eye className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                    My Achievements
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Cards with Modern Design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bgColor} text-primary group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground font-medium mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section with Modern Cards */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                Unlock Amazing Benefits
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your achievements don't just showcase your talents—they earn you{" "}
              <span className="font-semibold text-primary">tangible rewards</span>{" "}
              that enhance your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <CardContent className="p-8 space-y-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${benefit.iconBg} text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${benefit.gradient} rounded-full transition-all duration-500`} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Categories with Enhanced Cards */}
        <div className="container mx-auto px-4 py-20 bg-gradient-to-br from-primary/5 to-amber-50">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                Achievement Categories
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We recognize excellence across diverse fields. Whatever your passion,{" "}
              <span className="font-semibold text-primary">we celebrate your achievements</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {achievementTypes.map((type, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden cursor-pointer border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
                onClick={() => handleCategoryClick(type.title)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${type.gradient} opacity-10 rounded-bl-full`} />
                
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${type.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <div className={type.iconColor}>
                          {type.icon}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {type.count}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                      {type.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {type.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, exampleIndex) => (
                      <Badge
                        key={exampleIndex}
                        variant="outline"
                        className="px-3 py-1 group-hover:border-primary group-hover:text-primary transition-colors"
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all pt-2">
                    Click to view details
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Details Dialog - Enhanced */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            {selectedCategory && (
              <>
                <DialogHeader className="space-y-4 pb-6 border-b">
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${getCategoryDetails(selectedCategory).gradient} p-0.5`}>
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <div className="text-primary text-2xl">
                          {getCategoryDetails(selectedCategory).icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <DialogTitle className="text-3xl mb-1">
                        {selectedCategory} Achievements
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        Detailed information about {selectedCategory.toLowerCase()}{" "}
                        achievements, benefits, and eligibility criteria
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-8 py-6">
                  {/* Benefits Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                        <Gift className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">Benefits & Rewards</h3>
                    </div>
                    <div className="grid gap-3 pl-2">
                      {getCategoryDetails(selectedCategory).benefits.map(
                        (benefit: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 group">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {benefit}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Examples Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">Achievement Types</h3>
                    </div>
                    <div className="grid gap-4">
                      {getCategoryDetails(selectedCategory).examples.map(
                        (example: any, idx: number) => (
                          <Card key={idx} className="border-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                            <CardContent className="p-5 space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2 flex-1">
                                  <h4 className="font-bold text-lg">
                                    {example.name}
                                  </h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {example.details}
                                  </p>
                                </div>
                                <Badge variant="secondary" className="text-sm font-semibold px-3 py-1 whitespace-nowrap">
                                  {example.points}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  </div>

                  {/* Eligibility Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                        <Target className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">Eligibility Criteria</h3>
                    </div>
                    <div className="grid gap-3 pl-2">
                      {getCategoryDetails(selectedCategory).eligibility.map(
                        (criteria: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 group">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {criteria}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6 border-t">
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-white shadow-lg hover:shadow-xl transition-all text-lg py-6 group"
                      onClick={() => {
                        setIsDialogOpen(false);
                        navigateToCategoryForm(selectedCategory);
                      }}
                    >
                      <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      Submit {selectedCategory} Achievement
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* How It Works with Enhanced Steps */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From submission to rewards—our streamlined process ensures your achievements are{" "}
              <span className="font-semibold text-primary">properly recognized and rewarded</span>.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-5`} />
                    
                    <CardContent className="p-8 space-y-6 relative text-center">
                      {/* Step Number */}
                      <div className={`absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
                        {step.step}
                      </div>

                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mx-auto`}>
                        <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                          <div className="text-primary">
                            {step.icon}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Bottom Accent */}
                      <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    </CardContent>
                  </Card>

                  {/* Arrow between steps */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-8 h-8 text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA with Modern Design */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-amber-500 to-orange-500 py-20 px-4">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative container mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Ready to Get Recognized?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Start showcasing your achievements today and unlock{" "}
                <span className="font-bold">amazing benefits</span>!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all shadow-2xl text-lg px-8 py-6 group"
                asChild
              >
                <Link to="/beyond-academics-add-achievement">
                  <Zap className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Submit Your First Achievement
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all text-lg px-8 py-6"
                asChild
              >
                <Link to="/beyond-academics-leaderboard">
                  <Trophy className="w-6 h-6 mr-2" />
                  View Leaderboard
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white/90">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats[0].value}</div>
                <div className="text-sm">Total Achievements</div>
              </div>
              <div className="h-12 w-px bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold">{stats[1].value}</div>
                <div className="text-sm">Active Students</div>
              </div>
              <div className="h-12 w-px bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold">{stats[2].value}</div>
                <div className="text-sm">Benefits Awarded</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeyondAcademics;
