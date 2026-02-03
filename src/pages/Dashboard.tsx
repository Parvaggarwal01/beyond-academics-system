import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy, Star, Download, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userStats = {
    totalAchievements: 8,
    totalPoints: 165,
    rank: 5,
    pendingReview: 2
  };

  const recentAchievements = [
    {
      id: 1,
      title: "React.js Certification Complete",
      category: "Technical",
      points: 25,
      status: "approved",
      date: "2024-01-15",
      file: "react-certificate.pdf"
    },
    {
      id: 2,
      title: "College Cultural Fest Winner",
      category: "Cultural",
      points: 30,
      status: "pending",
      date: "2024-01-10",
      file: "cultural-fest-certificate.jpg"
    },
    {
      id: 3,
      title: "Hackathon Participation",
      category: "Technical",
      points: 20,
      status: "approved",
      date: "2024-01-05",
      file: "hackathon-certificate.pdf"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "rejected": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold academic-heading mb-2">
                Your Achievement Dashboard
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Track your progress and manage your achievements
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-2" asChild>
                <Link to="/transcript">
                  View Transcript
                </Link>
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-2" asChild>
                <Link to="/beyond-academics-leaderboard">
                  View Leaderboard
                </Link>
              </Button>
              <Button className="w-full sm:w-auto bg-gradient-hero shadow-hero" asChild>
                <Link to="/beyond-academics-add-achievement">
                  Add Achievement
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="shadow-card hover:shadow-hero transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{userStats.totalAchievements}</p>
                  <p className="text-sm text-muted-foreground">Total Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{userStats.totalPoints}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">#{userStats.rank}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">Rank {userStats.rank}</p>
                  <p className="text-sm text-muted-foreground">Current Position</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{userStats.pendingReview}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">My Achievements</TabsTrigger>
            <TabsTrigger value="benefits">Claimed Benefits</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recent Submissions</h2>
              <Button asChild>
                <Link to="/beyond-academics-add-achievement">
                  Add New Achievement
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <Card key={achievement.id} className="bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{achievement.title}</h3>
                          {getStatusIcon(achievement.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(achievement.date).toLocaleDateString()}
                          </span>
                          <Badge variant="outline">{achievement.category}</Badge>
                          <Badge 
                            className={`${getStatusColor(achievement.status)} border-0`}
                          >
                            {achievement.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Points: <span className="font-semibold text-primary">{achievement.points}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Claimed Benefits</CardTitle>
                <CardDescription>
                  View all the benefits you've unlocked through your achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  No benefits claimed yet. Submit more achievements to unlock exclusive perks!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Profile settings coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;