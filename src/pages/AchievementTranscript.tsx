import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  QrCode,
  Eye,
} from "lucide-react";
import { getAllSemesters } from "@/utils/semesterUtils";
import {
  generateTranscriptPDF,
  generateAllSemestersInOnePDF,
} from "@/utils/pdfGenerator";
import {
  studentProfile,
  allAchievements,
  academicYears,
  getTranscriptData,
} from "@/data/dummyTranscriptData";

interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  level: string;
  position: string;
  calculated_points: number;
  status: string;
  event_type: string;
  organizer: string;
  semester: string;
  academic_year: string;
}

interface TranscriptData {
  id: string;
  semester: string;
  academic_year: string;
  generated_at: string;
  verification_code: string;
  is_final: boolean;
  transcript_data: {
    achievements: Achievement[];
    total_points: number;
    grade: string;
  };
}

export default function AchievementTranscript() {
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [transcripts, setTranscripts] = useState<TranscriptData[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [generatingTranscript, setGeneratingTranscript] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // DUMMY DATA FOR DEMONSTRATION - Using comprehensive data for all 8 semesters
      const dummyProfile = {
        id: "dummy-user-123",
        full_name: studentProfile.student_name,
        registration_number: studentProfile.registration_number,
        school: studentProfile.school,
        program: studentProfile.program,
        father_name: studentProfile.father_name,
        mother_name: studentProfile.mother_name,
      };

      // Convert allAchievements object to array format with status
      const dummyAchievements: Achievement[] = Object.entries(
        allAchievements,
      ).flatMap(([semester, achievements]) =>
        achievements.map((achievement, index) => ({
          id: `${semester}-${index}`,
          title: achievement.title,
          category: achievement.category,
          date: achievement.date,
          level: achievement.level,
          position: achievement.position,
          calculated_points: achievement.calculated_points,
          status: "approved", // All dummy achievements are approved
          event_type: achievement.event_type,
          organizer: achievement.organizer,
          semester: semester,
          academic_year: academicYears[semester],
        })),
      );

      // Generate transcripts for Sem-1 through Sem-6
      const completedSemesters = [
        "Sem-1",
        "Sem-2",
        "Sem-3",
        "Sem-4",
        "Sem-5",
        "Sem-6",
      ];
      const dummyTranscripts: TranscriptData[] = completedSemesters.map(
        (sem, index) => {
          const semAchievements = dummyAchievements.filter(
            (a) => a.semester === sem && a.status === "approved",
          );
          const totalPoints = semAchievements.reduce(
            (sum, a) => sum + a.calculated_points,
            0,
          );
          const grade =
            totalPoints >= 250
              ? "O"
              : totalPoints >= 200
                ? "A+"
                : totalPoints >= 150
                  ? "A"
                  : totalPoints >= 100
                    ? "B+"
                    : "B";

          return {
            id: `transcript-${index + 1}`,
            semester: sem,
            academic_year: academicYears[sem],
            generated_at: new Date(
              2023 + Math.floor(index / 2),
              (index % 2) * 6 + 5,
              15,
            ).toISOString(),
            verification_code: `BA-TR-${2023 + Math.floor(index / 2)}-${studentProfile.registration_number}-${sem.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            is_final: true,
            transcript_data: {
              achievements: semAchievements,
              total_points: totalPoints,
              grade: grade,
            },
          };
        },
      );

      setProfile(dummyProfile as any);
      setAchievements(dummyAchievements);
      setTranscripts(dummyTranscripts as any);

      // Set initial semester
      const semesters = getAllSemesters();
      if (semesters.length > 0) {
        setSelectedSemester(semesters[0].value);
      }

      // Comment out real API calls for now
      /*
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Allow viewing without login for demo purposes
        setLoading(false);
        return;
      }

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from("beyond_academics_achievements")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (achievementsError) throw achievementsError;
      setAchievements(achievementsData || []);

      // Fetch existing transcripts
      const { data: transcriptsData, error: transcriptsError } = await supabase
        .from("achievement_transcripts")
        .select("*")
        .eq("user_id", user.id)
        .order("generated_at", { ascending: false });

      if (transcriptsError) throw transcriptsError;
      setTranscripts((transcriptsData || []) as any);

      // Set initial semester
      const semesters = getAllSemesters();
      if (semesters.length > 0) {
        setSelectedSemester(semesters[0].value);
      }
      */
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

  const getSemesterAchievements = (semester: string) => {
    return achievements.filter((a) => a.semester === semester);
  };

  const getSemesterStats = (semester: string) => {
    const semesterAchievements = getSemesterAchievements(semester);
    const approved = semesterAchievements.filter(
      (a) => a.status === "approved",
    );
    const pending = semesterAchievements.filter((a) => a.status === "pending");
    const rejected = semesterAchievements.filter(
      (a) => a.status === "rejected",
    );
    const totalPoints = approved.reduce(
      (sum, a) => sum + (a.calculated_points || 0),
      0,
    );

    return {
      total: semesterAchievements.length,
      approved: approved.length,
      pending: pending.length,
      rejected: rejected.length,
      totalPoints,
      isEligible:
        semesterAchievements.length > 0 &&
        pending.length === 0 &&
        approved.length > 0,
    };
  };

  const calculateGrade = (points: number): string => {
    if (points >= 90) return "O";
    if (points >= 80) return "A+";
    if (points >= 70) return "A";
    if (points >= 60) return "B+";
    if (points >= 50) return "B";
    if (points >= 40) return "C";
    return "P";
  };

  const generateTranscript = async (semester: string) => {
    try {
      setGeneratingTranscript(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const stats = getSemesterStats(semester);
      if (!stats.isEligible) {
        toast({
          title: "Cannot Generate Transcript",
          description:
            "All achievements must be reviewed and at least one must be approved.",
          variant: "destructive",
        });
        return;
      }

      const semesterAchievements = getSemesterAchievements(semester);
      const approvedAchievements = semesterAchievements.filter(
        (a) => a.status === "approved",
      );
      const academicYear = approvedAchievements[0]?.academic_year || "";

      const transcriptData = {
        achievements: approvedAchievements,
        total_points: stats.totalPoints,
        grade: calculateGrade(stats.totalPoints),
        student_name: profile.full_name,
        registration_number: profile.registration_number,
        school: profile.school,
        program: profile.program,
      };

      const { data, error } = await supabase
        .from("achievement_transcripts")
        .insert({
          user_id: user.id,
          semester,
          academic_year: academicYear,
          transcript_data: transcriptData as any,
          is_final: true,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transcript generated successfully!",
      });

      // Refresh transcripts
      await fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setGeneratingTranscript(false);
    }
  };

  const downloadTranscript = async (transcriptId: string) => {
    try {
      const transcript = transcripts.find((t) => t.id === transcriptId);
      if (!transcript) {
        toast({
          title: "Error",
          description: "Transcript not found",
          variant: "destructive",
        });
        return;
      }

      const pdfData = {
        student_name: profile.full_name,
        registration_number: profile.registration_number,
        school: profile.school,
        program: profile.program,
        semester: transcript.semester,
        academic_year: transcript.academic_year,
        achievements: transcript.transcript_data.achievements,
        total_points: transcript.transcript_data.total_points,
        grade: transcript.transcript_data.grade,
        generated_at: transcript.generated_at,
        verification_code: transcript.verification_code,
        father_name: profile.father_name,
        mother_name: profile.mother_name,
      };

      await generateTranscriptPDF(pdfData, "download");

      toast({
        title: "Success",
        description: "Transcript downloaded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to download transcript",
        variant: "destructive",
      });
    }
  };

  const viewTranscript = async (transcriptId: string) => {
    try {
      const transcript = transcripts.find((t) => t.id === transcriptId);
      if (!transcript) {
        toast({
          title: "Error",
          description: "Transcript not found",
          variant: "destructive",
        });
        return;
      }

      const pdfData = {
        student_name: profile.full_name,
        registration_number: profile.registration_number,
        school: profile.school,
        program: profile.program,
        semester: transcript.semester,
        academic_year: transcript.academic_year,
        achievements: transcript.transcript_data.achievements,
        total_points: transcript.transcript_data.total_points,
        grade: transcript.transcript_data.grade,
        generated_at: transcript.generated_at,
        verification_code: transcript.verification_code,
        father_name: profile.father_name,
        mother_name: profile.mother_name,
      };

      await generateTranscriptPDF(pdfData, "view");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to view transcript",
        variant: "destructive",
      });
    }
  };

  const viewAllSemestersTranscript = async () => {
    try {
      await generateAllSemestersInOnePDF("view");
      toast({
        title: "Success",
        description: "Combined transcript opened in new tab!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to view combined transcript",
        variant: "destructive",
      });
    }
  };

  const downloadAllSemestersTranscript = async () => {
    try {
      await generateAllSemestersInOnePDF("download");
      toast({
        title: "Success",
        description: "Combined transcript downloaded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to download combined transcript",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  const semesters = getAllSemesters();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Achievement Transcripts
            </h1>
            <p className="text-gray-600 mt-2">
              View and generate your semester-wise achievement transcripts
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        {/* Student Info Card */}
        {profile && (
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{profile.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registration Number</p>
                <p className="font-semibold">{profile.registration_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">School</p>
                <p className="font-semibold">{profile.school}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Program</p>
                <p className="font-semibold">{profile.program}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Combined All Semesters Transcript Card */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  All Semesters Combined Transcript
                </CardTitle>
                <CardDescription>
                  View or download transcript with all achievements from Sem-1
                  to Sem-8
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                onClick={viewAllSemestersTranscript}
                variant="outline"
                size="lg"
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Semesters PDF
              </Button>
              <Button onClick={downloadAllSemestersTranscript} size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download All Semesters PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Semester Tabs */}
        <Tabs value={selectedSemester} onValueChange={setSelectedSemester}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            {semesters.map((sem) => (
              <TabsTrigger key={sem.value} value={sem.value}>
                {sem.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {semesters.map((sem) => {
            const stats = getSemesterStats(sem.value);
            const existingTranscript = transcripts.find(
              (t) => t.semester === sem.value && t.is_final,
            );

            return (
              <TabsContent
                key={sem.value}
                value={sem.value}
                className="space-y-6"
              >
                {/* Semester Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-blue-600">
                        {stats.total}
                      </div>
                      <div className="text-sm text-gray-600">Total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">
                        {stats.approved}
                      </div>
                      <div className="text-sm text-gray-600">Approved</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-yellow-600">
                        {stats.pending}
                      </div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-red-600">
                        {stats.rejected}
                      </div>
                      <div className="text-sm text-gray-600">Rejected</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-purple-600">
                        {stats.totalPoints}
                      </div>
                      <div className="text-sm text-gray-600">Points</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Eligibility Alert */}
                {!stats.isEligible && stats.total > 0 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {stats.pending > 0
                        ? `You have ${stats.pending} pending achievement(s). Transcript can only be generated after all achievements are reviewed.`
                        : stats.approved === 0
                          ? "At least one approved achievement is required to generate a transcript."
                          : "Transcript generation not available for this semester."}
                    </AlertDescription>
                  </Alert>
                )}

                {stats.total === 0 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No achievements recorded for this semester yet.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Existing Transcript */}
                {existingTranscript && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Transcript Generated
                          </CardTitle>
                          <CardDescription>
                            Generated on{" "}
                            {new Date(
                              existingTranscript.generated_at,
                            ).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-lg px-3 py-1"
                          >
                            Grade: {existingTranscript.transcript_data.grade}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Points</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {existingTranscript.transcript_data.total_points}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Verification Code
                          </p>
                          <p className="font-mono text-sm">
                            {existingTranscript.verification_code}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => viewTranscript(existingTranscript.id)}
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View PDF
                        </Button>
                        <Button
                          onClick={() =>
                            downloadTranscript(existingTranscript.id)
                          }
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            navigate(
                              `/verify-transcript/${existingTranscript.verification_code}`,
                            )
                          }
                        >
                          <QrCode className="h-4 w-4 mr-2" />
                          View QR Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Generate Transcript Button */}
                {!existingTranscript && stats.isEligible && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Generate Transcript</CardTitle>
                      <CardDescription>
                        All achievements have been reviewed. You can now
                        generate your transcript.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => generateTranscript(sem.value)}
                        disabled={generatingTranscript}
                        size="lg"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {generatingTranscript
                          ? "Generating..."
                          : "Generate Transcript"}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Achievements List */}
                {stats.total > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Achievements ({stats.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {getSemesterAchievements(sem.value).map(
                          (achievement) => (
                            <div
                              key={achievement.id}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {getStatusIcon(achievement.status)}
                                  <h4 className="font-semibold">
                                    {achievement.title}
                                  </h4>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p>
                                    <span className="font-medium">
                                      Category:
                                    </span>{" "}
                                    {achievement.category
                                      .charAt(0)
                                      .toUpperCase() +
                                      achievement.category.slice(1)}
                                  </p>
                                  <p>
                                    <span className="font-medium">Level:</span>{" "}
                                    {achievement.level} |{" "}
                                    <span className="font-medium">
                                      Position:
                                    </span>{" "}
                                    {achievement.position}
                                  </p>
                                  <p>
                                    <span className="font-medium">Date:</span>{" "}
                                    {new Date(
                                      achievement.date,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                {getStatusBadge(achievement.status)}
                                {achievement.status === "approved" && (
                                  <Badge
                                    variant="outline"
                                    className="bg-purple-50"
                                  >
                                    {achievement.calculated_points} pts
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
