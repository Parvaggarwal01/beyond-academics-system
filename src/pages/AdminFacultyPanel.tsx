import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, Eye, FileText, User, Calendar, Award, AlertCircle, ThumbsUp, ThumbsDown, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

interface Achievement {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  event_type: string;
  date: string;
  organizer: string;
  level: string;
  position: string;
  certificate_url: string;
  calculated_points: number;
  semester: string;
  academic_year: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    registration_number: string;
    school: string;
    program: string;
  } | null;
}

export default function AdminFacultyPanel() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<"recommend" | "reject" | "">("");
  const [comments, setComments] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchAchievements();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin");
      return;
    }
  };

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("beyond_academics_achievements")
        .select(`
          *,
          profiles:user_id (
            full_name,
            registration_number,
            school,
            program
          )
        `)
        .in("status", ["pending", "faculty_recommended", "faculty_rejected"])
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAchievements(data as any || []);
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

  const handleReview = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setRecommendation("");
    setComments("");
    setReviewDialogOpen(true);
  };

  const submitRecommendation = async () => {
    if (!selectedAchievement || !recommendation) {
      toast({
        title: "Error",
        description: "Please select a recommendation",
        variant: "destructive",
      });
      return;
    }

    try {
      const newStatus = recommendation === "recommend" ? "faculty_recommended" : "faculty_rejected";
      
      const { error } = await supabase
        .from("beyond_academics_achievements")
        .update({
          status: newStatus,
          faculty_comments: comments,
          faculty_reviewed_at: new Date().toISOString(),
        })
        .eq("id", selectedAchievement.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Achievement ${recommendation === "recommend" ? "recommended" : "rejected"} successfully`,
      });

      setReviewDialogOpen(false);
      fetchAchievements();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending Review", icon: Clock },
      faculty_recommended: { color: "bg-blue-100 text-blue-800", text: "Recommended", icon: ThumbsUp },
      faculty_rejected: { color: "bg-red-100 text-red-800", text: "Not Recommended", icon: ThumbsDown },
    };
    const { color, text, icon: Icon } = config[status as keyof typeof config] || config.pending;
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {text}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      technical: "bg-purple-100 text-purple-800",
      sports: "bg-green-100 text-green-800",
      cultural: "bg-pink-100 text-pink-800",
      arts_culture: "bg-blue-100 text-blue-800",
      startup: "bg-indigo-100 text-indigo-800",
      community: "bg-rose-100 text-rose-800",
      club: "bg-emerald-100 text-emerald-800",
    };
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100"}>{category}</Badge>;
  };

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesStatus = filterStatus === "all" || achievement.status === filterStatus;
    const matchesCategory = filterCategory === "all" || achievement.category === filterCategory;
    const matchesSearch = searchQuery === "" || 
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.profiles?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.profiles?.registration_number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const stats = {
    pending: achievements.filter(a => a.status === "pending").length,
    recommended: achievements.filter(a => a.status === "faculty_recommended").length,
    rejected: achievements.filter(a => a.status === "faculty_rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold academic-heading mb-2">Faculty Recommendation Panel</h1>
          <p className="text-muted-foreground">Review and recommend student achievements for HOD approval</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recommended</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.recommended}</p>
                </div>
                <ThumbsUp className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Not Recommended</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <ThumbsDown className="w-12 h-12 text-red-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Search by name, reg no, or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="faculty_recommended">Recommended</SelectItem>
                    <SelectItem value="faculty_rejected">Not Recommended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="arts_culture">Arts & Culture</SelectItem>
                    <SelectItem value="startup">Startup & Innovation</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                    <SelectItem value="club">Club & Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Achievements</CardTitle>
            <CardDescription>
              {filteredAchievements.length} achievement(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">Loading...</p>
            ) : filteredAchievements.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No achievements found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAchievements.map((achievement) => (
                      <TableRow key={achievement.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{achievement.profiles?.full_name}</p>
                            <p className="text-sm text-muted-foreground">{achievement.profiles?.registration_number}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.level} - {achievement.position}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(achievement.category)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{achievement.semester}</p>
                            <p className="text-muted-foreground">{achievement.academic_year}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-bold">
                            {achievement.calculated_points} pts
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(achievement.status)}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReview(achievement)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Achievement</DialogTitle>
            <DialogDescription>
              Recommend or reject this achievement for HOD approval
            </DialogDescription>
          </DialogHeader>

          {selectedAchievement && (
            <div className="space-y-6">
              {/* Student Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedAchievement.profiles?.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Number</p>
                    <p className="font-medium">{selectedAchievement.profiles?.registration_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">School</p>
                    <p className="font-medium">{selectedAchievement.profiles?.school}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Program</p>
                    <p className="font-medium">{selectedAchievement.profiles?.program}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Achievement Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p className="font-medium text-lg">{selectedAchievement.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm">{selectedAchievement.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      {getCategoryBadge(selectedAchievement.category)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Level</p>
                      <p className="font-medium">{selectedAchievement.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-medium">{selectedAchievement.position}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Organizer</p>
                      <p className="font-medium">{selectedAchievement.organizer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(selectedAchievement.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Points</p>
                      <Badge variant="outline" className="font-bold text-lg">
                        {selectedAchievement.calculated_points} pts
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Semester</p>
                      <p className="font-medium">{selectedAchievement.semester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Academic Year</p>
                      <p className="font-medium">{selectedAchievement.academic_year}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Certificate</p>
                    {selectedAchievement.certificate_url ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedAchievement.certificate_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-4 h-4 mr-2" />
                          View Certificate
                        </a>
                      </Button>
                    ) : (
                      <p className="text-sm text-muted-foreground">No certificate uploaded</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendation Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Recommendation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Decision *</label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={recommendation === "recommend" ? "default" : "outline"}
                        className={recommendation === "recommend" ? "bg-blue-600 hover:bg-blue-700" : ""}
                        onClick={() => setRecommendation("recommend")}
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Recommend for Approval
                      </Button>
                      <Button
                        variant={recommendation === "reject" ? "destructive" : "outline"}
                        onClick={() => setRecommendation("reject")}
                      >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Do Not Recommend
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Comments (Optional)</label>
                    <Textarea
                      placeholder="Add your comments or suggestions..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={submitRecommendation}
              disabled={!recommendation}
              className={recommendation === "recommend" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"}
            >
              {recommendation === "recommend" ? (
                <>
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Submit Recommendation
                </>
              ) : (
                <>
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Submit Rejection
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
