import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, Award, Target, Calendar, BarChart, 
  Trophy, Star, Zap, ArrowRight, CheckCircle,
  BookOpen, Users, Lightbulb, Home
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  calculated_points: number;
  status: string;
  semester?: string;
  academic_year?: string;
}

interface CategoryStats {
  category: string;
  count: number;
  points: number;
  icon: any;
  color: string;
  bgColor: string;
}

export default function ProgressTracker() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Using dummy data for demonstration
      const dummyProfile = {
        id: "dummy-user-123",
        full_name: "Demo Student",
        registration_number: "12345678",
        school: "School of Computer Science and Engineering",
        program: "B.Tech Computer Science and Engineering",
      };

      const dummyAchievements: Achievement[] = [
        {
          id: "1",
          title: "Smart India Hackathon Winner",
          category: "technical",
          date: "2025-08-15",
          calculated_points: 100,
          status: "approved",
          semester: "Sem-1",
          academic_year: "2025-2026",
        },
        {
          id: "2",
          title: "Inter-College Basketball Tournament",
          category: "sports",
          date: "2025-09-10",
          calculated_points: 80,
          status: "approved",
          semester: "Sem-1",
          academic_year: "2025-2026",
        },
        {
          id: "3",
          title: "Classical Dance Competition",
          category: "cultural",
          date: "2025-10-05",
          calculated_points: 60,
          status: "approved",
          semester: "Sem-1",
          academic_year: "2025-2026",
        },
        {
          id: "4",
          title: "CodeChef Long Challenge",
          category: "technical",
          date: "2026-01-20",
          calculated_points: 70,
          status: "pending",
          semester: "Sem-2",
          academic_year: "2025-2026",
        },
        {
          id: "5",
          title: "Research Paper Publication",
          category: "technical",
          date: "2026-02-01",
          calculated_points: 90,
          status: "approved",
          semester: "Sem-2",
          academic_year: "2025-2026",
        },
        {
          id: "6",
          title: "Cricket Tournament",
          category: "sports",
          date: "2025-12-15",
          calculated_points: 70,
          status: "approved",
          semester: "Sem-2",
          academic_year: "2025-2026",
        },
        {
          id: "7",
          title: "Debate Competition",
          category: "arts_culture",
          date: "2026-01-10",
          calculated_points: 75,
          status: "rejected",
          semester: "Sem-2",
          academic_year: "2025-2026",
        },
      ];

      setProfile(dummyProfile);
      setAchievements(dummyAchievements);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const approvedAchievements = achievements.filter(a => a.status === "approved");
  const totalPoints = approvedAchievements.reduce((sum, a) => sum + a.calculated_points, 0);
  const pendingCount = achievements.filter(a => a.status === "pending").length;
  const rejectedCount = achievements.filter(a => a.status === "rejected").length;

  // Category-wise statistics
  const categoryStats: CategoryStats[] = [
    {
      category: "technical",
      count: approvedAchievements.filter(a => a.category === "technical").length,
      points: approvedAchievements.filter(a => a.category === "technical").reduce((sum, a) => sum + a.calculated_points, 0),
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      category: "sports",
      count: approvedAchievements.filter(a => a.category === "sports").length,
      points: approvedAchievements.filter(a => a.category === "sports").reduce((sum, a) => sum + a.calculated_points, 0),
      icon: Trophy,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      category: "cultural",
      count: approvedAchievements.filter(a => a.category === "cultural").length,
      points: approvedAchievements.filter(a => a.category === "cultural").reduce((sum, a) => sum + a.calculated_points, 0),
      icon: Star,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      category: "arts_culture",
      count: approvedAchievements.filter(a => a.category === "arts_culture").length,
      points: approvedAchievements.filter(a => a.category === "arts_culture").reduce((sum, a) => sum + a.calculated_points, 0),
      icon: Users,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
    },
  ];

  // Grade calculation
  const getGrade = (points: number) => {
    if (points >= 400) return { grade: "O", color: "text-green-600", desc: "Outstanding" };
    if (points >= 350) return { grade: "A+", color: "text-blue-600", desc: "Excellent" };
    if (points >= 300) return { grade: "A", color: "text-indigo-600", desc: "Very Good" };
    if (points >= 250) return { grade: "B+", color: "text-purple-600", desc: "Good" };
    if (points >= 200) return { grade: "B", color: "text-pink-600", desc: "Above Average" };
    return { grade: "C", color: "text-gray-600", desc: "Average" };
  };

  const currentGrade = getGrade(totalPoints);
  const nextMilestone = totalPoints >= 400 ? 500 : totalPoints >= 350 ? 400 : totalPoints >= 300 ? 350 : totalPoints >= 250 ? 300 : totalPoints >= 200 ? 250 : 200;
  const progressToNext = ((totalPoints % 50) / 50) * 100;

  // Monthly breakdown
  const getMonthlyData = () => {
    const monthlyMap = new Map();
    approvedAchievements.forEach(achievement => {
      const month = achievement.date.substring(0, 7); // YYYY-MM
      if (!monthlyMap.has(month)) {
        monthlyMap.set(month, { count: 0, points: 0 });
      }
      const data = monthlyMap.get(month);
      data.count += 1;
      data.points += achievement.calculated_points;
    });
    return Array.from(monthlyMap.entries()).sort().slice(-6); // Last 6 months
  };

  const monthlyData = getMonthlyData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-90"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30 px-6 py-2">
              <BarChart className="w-4 h-4 mr-2 inline" />
              Progress Dashboard
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Track Your Journey
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {profile?.full_name || "Student"} • {profile?.registration_number || ""}
            </p>
            <p className="text-lg text-white/80">
              {profile?.program || "Program not specified"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Overall Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-10 w-10 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-700">Total</Badge>
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{approvedAchievements.length}</div>
                <p className="text-sm text-blue-700 font-medium">Achievements</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-10 w-10 text-green-600" />
                  <Badge className="bg-green-100 text-green-700">Points</Badge>
                </div>
                <div className="text-3xl font-bold text-green-900 mb-2">{totalPoints}</div>
                <p className="text-sm text-green-700 font-medium">Total Points</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="h-10 w-10 text-purple-600" />
                  <Badge className={`${currentGrade.color} bg-purple-100`}>Grade</Badge>
                </div>
                <div className={`text-3xl font-bold mb-2 ${currentGrade.color}`}>{currentGrade.grade}</div>
                <p className="text-sm text-purple-700 font-medium">{currentGrade.desc}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="h-10 w-10 text-amber-600" />
                  <Badge className="bg-amber-100 text-amber-700">Status</Badge>
                </div>
                <div className="text-3xl font-bold text-amber-900 mb-2">{pendingCount}</div>
                <p className="text-sm text-amber-700 font-medium">Pending Review</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress to Next Milestone */}
          <Card className="mb-12 bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <TrendingUp className="mr-3 h-6 w-6 text-indigo-600" />
                    Progress to Next Milestone
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {nextMilestone - totalPoints} points away from {nextMilestone} points milestone
                  </CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 text-lg">
                  {totalPoints}/{nextMilestone}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={(totalPoints / nextMilestone) * 100} className="h-4 mb-4" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Current: {totalPoints} pts</span>
                <span className="text-indigo-600 font-bold">Target: {nextMilestone} pts</span>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for detailed views */}
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Stats</TabsTrigger>
            </TabsList>

            {/* Category View */}
            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card 
                      key={stat.category} 
                      className={`bg-gradient-to-br ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{stat.count}</div>
                            <p className="text-sm text-gray-600 capitalize font-medium">{stat.category}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Total Points</span>
                            <span className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                              {stat.points}
                            </span>
                          </div>
                          <Progress value={(stat.points / totalPoints) * 100} className="h-2" />
                          <p className="text-xs text-gray-500 text-right">
                            {((stat.points / totalPoints) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Timeline View */}
            <TabsContent value="timeline" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                    Achievement Timeline
                  </CardTitle>
                  <CardDescription>Your achievements in chronological order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {approvedAchievements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((achievement, index) => (
                      <div key={achievement.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {achievement.calculated_points}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-gray-900">{achievement.title}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <Badge variant="outline" className="capitalize">{achievement.category}</Badge>
                            <span className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            {achievement.semester && (
                              <Badge className="bg-blue-100 text-blue-700">{achievement.semester}</Badge>
                            )}
                          </div>
                        </div>
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Monthly Stats View */}
            <TabsContent value="monthly" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-3 h-5 w-5 text-purple-600" />
                    Monthly Performance
                  </CardTitle>
                  <CardDescription>Achievement trends over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {monthlyData.map(([month, data]) => {
                      const maxPoints = Math.max(...monthlyData.map(([_, d]) => d.points));
                      const widthPercentage = (data.points / maxPoints) * 100;
                      
                      return (
                        <div key={month} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {new Date(month + "-01").toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline">{data.count} achievements</Badge>
                              <span className="text-lg font-bold text-purple-600">{data.points} pts</span>
                            </div>
                          </div>
                          <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                            <div 
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transition-all duration-500"
                              style={{ width: `${widthPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">View Full Transcript</h3>
                        <p className="text-sm text-gray-600">Access your complete achievement record</p>
                      </div>
                      <Button 
                        onClick={() => navigate("/transcript")}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:scale-110 transition-transform"
                      >
                        <BookOpen className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Add Achievement</h3>
                        <p className="text-sm text-gray-600">Submit a new achievement for review</p>
                      </div>
                      <Button 
                        onClick={() => navigate("/beyond-academics-add-achievement")}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 group-hover:scale-110 transition-transform"
                      >
                        <Target className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
