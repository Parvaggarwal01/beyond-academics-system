import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Star, TrendingUp, Filter, Crown, Target, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

const BeyondAcademicsLeaderboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all-time");
  const [searchQuery, setSearchQuery] = useState("");

  const leaderboardData = useMemo(() => [
    { rank: 1, name: "Raj Patel", points: 245, achievements: 12, category: "Technical", trend: "+15", avatar: "RP", college: "IIT Delhi", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=RajPatel" },
    { rank: 2, name: "Priya Sharma", points: 220, achievements: 10, category: "Cultural", trend: "+8", avatar: "PS", college: "NIT Trichy", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma" },
    { rank: 3, name: "Arjun Kumar", points: 195, achievements: 9, category: "Sports", trend: "+12", avatar: "AK", college: "BITS Pilani", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunKumar" },
    { rank: 4, name: "Sneha Gupta", points: 180, achievements: 8, category: "Arts & Culture", trend: "+5", avatar: "SG", college: "VIT Vellore", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaGupta" },
    { rank: 5, name: "Vikram Singh", points: 165, achievements: 7, category: "Technical", trend: "+3", avatar: "VS", college: "DTU Delhi", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=VikramSingh" },
    { rank: 6, name: "Ananya Reddy", points: 155, achievements: 6, category: "Cultural", trend: "+7", avatar: "AR", college: "SRM Chennai", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaReddy" },
    { rank: 7, name: "Karan Mehta", points: 140, achievements: 6, category: "Sports", trend: "+4", avatar: "KM", college: "IIIT Hyderabad", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=KaranMehta" },
    { rank: 8, name: "Riya Jain", points: 135, achievements: 5, category: "Arts & Culture", trend: "+2", avatar: "RJ", college: "Manipal University", imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=RiyaJain" },
  ], []);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Technical", label: "Technical" },
    { value: "Cultural", label: "Cultural" },
    { value: "Sports", label: "Sports" },
    { value: "Arts & Culture", label: "Arts & Culture" },
  ];

  const filteredData = useMemo(() => {
    let data = leaderboardData;
    
    // Filter by category
    if (selectedCategory !== "all") {
      data = data.filter(student => student.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      data = data.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.college.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return data;
  }, [selectedCategory, searchQuery, leaderboardData]);

  const topPerformers = leaderboardData.slice(0, 3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200";
      case 2: return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
      case 3: return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200";
      default: return "bg-muted/30 border-border";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Beyond Academics Leaderboard
          </div>
          <h1 className="text-4xl md:text-5xl font-bold academic-heading mb-4">
            Top Achievers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Celebrate excellence and see where you stand among your peers.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/beyond-academics-add-achievement">
                Submit Achievement
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topPerformers.map((student, index) => (
            <Card key={student.rank} className={`text-center ${getRankBackground(student.rank)} relative overflow-hidden`}>
              {student.rank === 1 && (
                <div className="absolute top-2 right-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-20 h-20 mb-3 border-4 border-background shadow-lg">
                    <AvatarImage src={student.imageUrl} alt={student.name} />
                    <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                      {student.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-3">
                    {getRankIcon(student.rank)}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{student.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{student.college}</p>
                  <div className="text-3xl font-bold text-primary mb-2">{student.points}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    {student.achievements} achievements
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {student.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overall" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overall">Overall Rankings</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students or colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="overall" className="space-y-4">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Full Rankings
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {filteredData.length} student{filteredData.length !== 1 ? 's' : ''}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Complete leaderboard updated in real-time
                  {(searchQuery || selectedCategory !== "all") && (
                    <span className="ml-2 text-primary">
                      • Filtered results
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredData.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No students found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ? `No results for "${searchQuery}"` : "No students match the selected filters"}
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredData.map((student) => (
                    <div 
                      key={student.rank} 
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${getRankBackground(student.rank)}`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 shadow-sm">
                        {getRankIcon(student.rank)}
                      </div>
                      
                      <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                        <AvatarImage src={student.imageUrl} alt={student.name} />
                        <AvatarFallback className="font-bold text-primary bg-primary/10">
                          {student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{student.college}</span>
                          <span>•</span>
                          <span>{student.achievements} achievements</span>
                          <Badge variant="outline" className="text-xs">
                            {student.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{student.points}</div>
                        <div className="text-sm text-green-600 flex items-center gap-1 justify-end">
                          <TrendingUp className="w-3 h-3" />
                          {student.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="category" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.slice(1).map((category) => {
                const categoryLeaders = leaderboardData
                  .filter(student => student.category === category.value)
                  .slice(0, 3);
                
                return (
                  <Card key={category.value} className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">{category.label} Leaders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categoryLeaders.map((student, index) => (
                          <div key={student.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={student.imageUrl} alt={student.name} />
                              <AvatarFallback className="text-xs font-bold text-primary bg-primary/10">
                                {student.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.points} points</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-3">Ready to Join the Leaderboard?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start submitting your achievements today and climb the rankings to unlock exclusive perks and recognition!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/beyond-academics-add-achievement">
                Submit Your First Achievement
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/beyond-academics">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeyondAcademicsLeaderboard;