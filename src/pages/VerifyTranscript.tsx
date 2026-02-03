import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Download, Home, FileText } from "lucide-react";
import QRCode from "qrcode";
import { generateTranscriptPDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface TranscriptData {
  id: string;
  semester: string;
  academic_year: string;
  generated_at: string;
  verification_code: string;
  is_final: boolean;
  transcript_data: {
    achievements: any[];
    total_points: number;
    grade: string;
    student_name: string;
    registration_number: string;
    school: string;
    program: string;
  };
  profiles: {
    full_name: string;
    registration_number: string;
    school: string;
    program: string;
    father_name: string;
    mother_name: string;
  };
}

export default function VerifyTranscript() {
  const { verificationCode } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState<TranscriptData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    verifyTranscript();
  }, [verificationCode]);

  const verifyTranscript = async () => {
    try {
      if (!verificationCode) {
        setError("Invalid verification code");
        setLoading(false);
        return;
      }

      // Check if this is the dummy verification code
      if (verificationCode === "BA-TR-2025-12345678-SEM1-ABC123") {
        // Use dummy data
        const dummyTranscript: TranscriptData = {
          id: "transcript-1",
          semester: "Sem-1",
          academic_year: "2025-2026",
          generated_at: "2025-12-20T10:30:00Z",
          verification_code: "BA-TR-2025-12345678-SEM1-ABC123",
          is_final: true,
          transcript_data: {
            achievements: [
              {
                id: "1",
                title: "Smart India Hackathon Winner",
                category: "technical",
                date: "2025-08-15",
                level: "National",
                position: "1st Prize",
                calculated_points: 100,
                status: "approved",
                event_type: "Hackathon",
                organizer: "AICTE",
              },
              {
                id: "2",
                title: "Inter-College Basketball Tournament",
                category: "sports",
                date: "2025-09-10",
                level: "State",
                position: "Gold Medal",
                calculated_points: 80,
                status: "approved",
                event_type: "Basketball",
                organizer: "Sports Authority",
              },
              {
                id: "3",
                title: "Classical Dance Competition",
                category: "cultural",
                date: "2025-10-05",
                level: "University",
                position: "2nd Prize",
                calculated_points: 60,
                status: "approved",
                event_type: "Dance",
                organizer: "Cultural Committee",
              },
            ],
            total_points: 240,
            grade: "O",
            student_name: "Demo Student",
            registration_number: "12345678",
            school: "School of Computer Science and Engineering",
            program: "B.Tech Computer Science and Engineering",
          },
          profiles: {
            full_name: "Demo Student",
            registration_number: "12345678",
            school: "School of Computer Science and Engineering",
            program: "B.Tech Computer Science and Engineering",
            father_name: "Demo Father",
            mother_name: "Demo Mother",
          },
        };

        setTranscript(dummyTranscript);

        // Generate QR Code
        const qrUrl = await QRCode.toDataURL(
          `https://beyondacademics.netlify.app/verify-transcript/${verificationCode}`,
          { width: 300, margin: 2 }
        );
        setQrCodeUrl(qrUrl);
        setLoading(false);
        return;
      }

      // Real database query for production data
      const { data, error: fetchError } = await supabase
        .from("achievement_transcripts")
        .select(`
          *,
          profiles!achievement_transcripts_user_id_fkey (
            full_name,
            registration_number,
            school,
            program,
            father_name,
            mother_name
          )
        `)
        .eq("verification_code", verificationCode)
        .eq("is_final", true)
        .single();

      if (fetchError) {
        setError("Transcript not found or invalid verification code");
        setLoading(false);
        return;
      }

      setTranscript(data as any);

      // Generate QR Code
      const qrUrl = await QRCode.toDataURL(
        `https://beyondacademics.netlify.app/verify-transcript/${verificationCode}`,
        { width: 300, margin: 2 }
      );
      setQrCodeUrl(qrUrl);
    } catch (err: any) {
      setError(err.message || "Failed to verify transcript");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!transcript) return;

    try {
      const pdfData = {
        student_name: transcript.profiles.full_name,
        registration_number: transcript.profiles.registration_number,
        school: transcript.profiles.school,
        program: transcript.profiles.program,
        semester: transcript.semester,
        academic_year: transcript.academic_year,
        achievements: transcript.transcript_data.achievements,
        total_points: transcript.transcript_data.total_points,
        grade: transcript.transcript_data.grade,
        generated_at: transcript.generated_at,
        verification_code: transcript.verification_code,
        father_name: transcript.profiles.father_name,
        mother_name: transcript.profiles.mother_name,
      };

      await generateTranscriptPDF(pdfData);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !transcript) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">Verify Transcript</h1>
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>

          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Transcript not found"}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Invalid Verification Code</CardTitle>
              <CardDescription>
                The verification code you provided is invalid or the transcript does not exist.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Please check the verification code and try again. If you believe this is an error,
                please contact the student or the institution.
              </p>
              <Button onClick={() => navigate("/")}>
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Transcript Verification</h1>
            <p className="text-gray-600 mt-2">Official Beyond Academics Achievement Transcript</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>

        {/* Verification Status */}
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Verified Authentic</strong> - This transcript has been verified as genuine and issued by
            Lovely Professional University.
          </AlertDescription>
        </Alert>

        {/* Student Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Student Information</CardTitle>
                <CardDescription>Personal and academic details</CardDescription>
              </div>
              <Badge className="bg-blue-600 text-lg px-4 py-2">
                <FileText className="h-4 w-4 mr-2" />
                Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="text-lg font-semibold">{transcript.profiles.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Registration Number</p>
                <p className="text-lg font-semibold">{transcript.profiles.registration_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">School</p>
                <p className="text-lg font-semibold">{transcript.profiles.school}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Program</p>
                <p className="text-lg font-semibold">{transcript.profiles.program}</p>
              </div>
              {transcript.profiles.father_name && (
                <div>
                  <p className="text-sm text-gray-600">Father's Name</p>
                  <p className="text-lg font-semibold">{transcript.profiles.father_name}</p>
                </div>
              )}
              {transcript.profiles.mother_name && (
                <div>
                  <p className="text-sm text-gray-600">Mother's Name</p>
                  <p className="text-lg font-semibold">{transcript.profiles.mother_name}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Semester Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Semester Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Semester</p>
                <p className="text-2xl font-bold text-blue-600">{transcript.semester}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Academic Year</p>
                <p className="text-lg font-semibold">{transcript.academic_year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Generated On</p>
                <p className="text-lg font-semibold">
                  {new Date(transcript.generated_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Achievements</p>
                <p className="text-2xl font-bold text-purple-600">
                  {transcript.transcript_data.achievements.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-green-600">
                  {transcript.transcript_data.total_points}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Grade</p>
                <Badge className="text-2xl px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600">
                  {transcript.transcript_data.grade}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements List */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements ({transcript.transcript_data.achievements.length})</CardTitle>
            <CardDescription>List of all approved achievements for this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transcript.transcript_data.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <h4 className="font-semibold">{achievement.title}</h4>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Category:</span>{" "}
                        {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                      </p>
                      <p>
                        <span className="font-medium">Level:</span> {achievement.level} |{" "}
                        <span className="font-medium">Position:</span> {achievement.position}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-purple-50">
                    {achievement.calculated_points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* QR Code and Verification */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Code</CardTitle>
            <CardDescription>Scan QR code or use verification code to verify authenticity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {qrCodeUrl && (
                <div className="flex flex-col items-center">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 border rounded-lg" />
                  <p className="text-sm text-gray-600 mt-2">Scan to verify</p>
                </div>
              )}
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Verification Code</p>
                  <code className="block p-3 bg-gray-100 rounded-lg font-mono text-sm break-all">
                    {transcript.verification_code}
                  </code>
                </div>
                <Button onClick={handleDownload} size="lg" className="w-full md:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <p className="text-xs text-gray-500">
                  This transcript can be verified at any time using the verification code or QR code.
                  Visit beyondacademics.netlify.app/verify to verify any transcript.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This is an official transcript issued by Lovely Professional University.
            The authenticity of this document can be verified using the verification code provided above.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
