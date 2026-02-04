import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPETITION_LEVELS, ACHIEVEMENT_RANKS, calculatePoints } from "@/data/pointsSystem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsersRound, Upload, CheckCircle, Loader2, Award, Target, Users, Sparkles, Calendar } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";
import confetti from "canvas-confetti";
import { getAllSemesters, getAcademicYears, detectSemesterAndYear } from "@/utils/semesterUtils";

const artsCultureSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  roleType: z.string().min(1, "Please select role type"),
  date: z.string().min(1, "Date is required"),
  organization: z.string().min(3, "Organization name is required"),
  level: z.string().min(1, "Please select level"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000),
  activityType: z.string().min(1, "Please select activity type"),
  impact: z.string().min(20, "Please describe the impact (minimum 20 characters)"),
  teamSize: z.string().optional(),
  semester: z.string().min(1, "Please select semester"),
  academicYear: z.string().min(1, "Please select academic year"),
});

const ArtsCultureAchievementForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    roleType: "",
    date: "",
    organization: "",
    level: "",
    position: "",
    duration: "",
    description: "",
    activityType: "",
    impact: "",
    teamSize: "",
    semester: "",
    academicYear: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleTypes = [
    { value: "student-council", label: "Student Council Member" },
    { value: "club-president", label: "Club President" },
    { value: "club-coordinator", label: "Club Coordinator" },
    { value: "event-organizer", label: "Event Organizer" },
    { value: "volunteer-coordinator", label: "Volunteer Coordinator" },
    { value: "team-lead", label: "Team Lead" },
    { value: "mentor", label: "Mentor/Tutor" },
    { value: "ngo-volunteer", label: "NGO Volunteer" },
    { value: "community-service", label: "Community Service" },
    { value: "other", label: "Other Arts & Culture Role" },
  ];

  const activityTypes = [
    { value: "student-governance", label: "Student Governance" },
    { value: "event-management", label: "Event Management" },
    { value: "community-service", label: "Community Service" },
    { value: "social-work", label: "Social Work" },
    { value: "mentorship", label: "Mentorship Program" },
    { value: "fundraising", label: "Fundraising" },
    { value: "awareness-campaign", label: "Awareness Campaign" },
    { value: "environmental", label: "Environmental Initiative" },
  ];

  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);
  const [categoryCode, setCategoryCode] = useState<string>("");
  const [competitionScope, setCompetitionScope] = useState<"zonal" | "national">("zonal");

  const semesterOptions = getAllSemesters();
  const academicYearOptions = getAcademicYears();

  // Auto-detect semester and academic year when date changes
  useEffect(() => {
    if (formData.date) {
      const detected = detectSemesterAndYear(formData.date);
      setFormData(prev => ({
        ...prev,
        semester: detected.semester,
        academicYear: detected.academicYear
      }));
    }
  }, [formData.date]);

  useEffect(() => {
    if (formData.level && formData.position) {
      const result = calculatePoints(formData.level, formData.position, competitionScope);
      if (result) {
        setCalculatedPoints(result.points);
        setCategoryCode(result.code);
      }
    }
  }, [formData.level, formData.position, competitionScope]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: "File size must be less than 5MB" });
        return;
      }
      setSelectedFile(file);
      setErrors({ ...errors, file: "" });
    }
  };

  const uploadCertificate = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `certificates/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('achievements')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('achievements')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const validateForm = () => {
    try {
      artsCultureSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors before submitting",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Certificate Required",
        description: "Please upload a certificate or proof document",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const certificateUrl = await uploadCertificate(selectedFile);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Fetch user profile to get school and program
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('school, program')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        throw new Error("Unable to fetch user profile. Please ensure your profile is complete.");
      }

      const achievement = {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: "arts_culture",
        event_type: formData.activityType,
        date: formData.date,
        organizer: formData.organization,
        level: formData.level,
        position: formData.position,
        certificate_url: certificateUrl,
        school: profile.school,
        program: profile.program,
        calculated_points: calculatedPoints,
        category_code: categoryCode,
        competition_scope: competitionScope,
        semester: formData.semester,
        academic_year: formData.academicYear,
        status: "pending",
      };

      const { error } = await supabase
        .from('beyond_academics_achievements')
        .insert([achievement]);

      if (error) throw error;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast({
        title: "Success!",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Arts & Culture achievement submitted successfully!</span>
          </div>
        ),
      });

      setTimeout(() => navigate("/beyond-academics"), 2000);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/beyond-academics")}
          className="mb-6"
        >
          ← Back to Beyond Academics
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl">
            <CardHeader className="space-y-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-t-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <UsersRound className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Arts & Culture Achievement</CardTitle>
                  <CardDescription className="text-lg">
                    Submit your arts & culture roles, community service, and organizing experiences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Achievement Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    Achievement Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="title">Achievement Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Student Council President - Led 500+ Student Initiatives"
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                      <p className="text-xs text-muted-foreground">{formData.title.length}/100 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="roleType">Arts & Culture Role *</Label>
                      <Select value={formData.roleType} onValueChange={(value) => setFormData({ ...formData, roleType: value })}>
                        <SelectTrigger className={errors.roleType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleTypes.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.roleType && <p className="text-sm text-red-500">{errors.roleType}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="activityType">Activity Type *</Label>
                      <Select value={formData.activityType} onValueChange={(value) => setFormData({ ...formData, activityType: value })}>
                        <SelectTrigger className={errors.activityType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select activity" />
                        </SelectTrigger>
                        <SelectContent>
                          {activityTypes.map((activity) => (
                            <SelectItem key={activity.value} value={activity.value}>
                              {activity.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.activityType && <p className="text-sm text-red-500">{errors.activityType}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Start Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        max={new Date().toISOString().split('T')[0]}
                        className={errors.date ? "border-red-500" : ""}
                      />
                      {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Semester *
                      </Label>
                      <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
                        <SelectTrigger className={errors.semester ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesterOptions.map((sem) => (
                            <SelectItem key={sem.value} value={sem.value}>
                              {sem.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.date && (
                        <p className="text-xs text-muted-foreground">
                          Auto-detected from achievement date
                        </p>
                      )}
                      {errors.semester && <p className="text-sm text-red-500">{errors.semester}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="academicYear">Academic Year *</Label>
                      <Select value={formData.academicYear} onValueChange={(value) => setFormData({ ...formData, academicYear: value })}>
                        <SelectTrigger className={errors.academicYear ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select academic year" />
                        </SelectTrigger>
                        <SelectContent>
                          {academicYearOptions.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.date && (
                        <p className="text-xs text-muted-foreground">
                          Auto-detected from achievement date
                        </p>
                      )}
                      {errors.academicYear && <p className="text-sm text-red-500">{errors.academicYear}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 1 year, 6 months"
                        className={errors.duration ? "border-red-500" : ""}
                      />
                      {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization/Institution *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g., Student Council, NSS, Rotaract"
                        className={errors.organization ? "border-red-500" : ""}
                      />
                      {errors.organization && <p className="text-sm text-red-500">{errors.organization}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level">Competition Level *</Label>
                      <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                        <SelectTrigger className={errors.level ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPETITION_LEVELS.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.level && <p className="text-sm text-red-500">{errors.level}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Achievement Rank *</Label>
                      <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                        <SelectTrigger className={errors.position ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select rank" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACHIEVEMENT_RANKS.map((rank) => (
                            <SelectItem key={rank.value} value={rank.value}>
                              {rank.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scope">Competition Scope</Label>
                      <Select value={competitionScope} onValueChange={(value) => setCompetitionScope(value as "zonal" | "national")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select scope" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zonal">Zonal/Regional</SelectItem>
                          <SelectItem value="national">National</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {calculatedPoints !== null && (
                      <div className="md:col-span-2">
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Calculated Points</p>
                              <p className="text-3xl font-bold text-orange-600">{calculatedPoints}</p>
                            </div>
                            <Badge variant="secondary" className="text-lg px-4 py-2">
                              Code: {categoryCode}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="teamSize" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Team Size (if applicable)
                      </Label>
                      <Input
                        id="teamSize"
                        type="number"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        placeholder="e.g., 20"
                        min="1"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your role, responsibilities, and key activities..."
                        rows={5}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                      <p className="text-xs text-muted-foreground">{formData.description.length}/1000 characters</p>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="impact" className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Impact & Achievements *
                      </Label>
                      <Textarea
                        id="impact"
                        value={formData.impact}
                        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                        placeholder="Describe the impact of your work, measurable outcomes, people helped, changes made..."
                        rows={4}
                        className={errors.impact ? "border-red-500" : ""}
                      />
                      {errors.impact && <p className="text-sm text-red-500">{errors.impact}</p>}
                    </div>
                  </div>
                </div>

                {/* Certificate Upload */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Upload className="w-5 h-5 text-orange-600" />
                    Certificate/Proof *
                  </h3>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                    <input
                      type="file"
                      id="certificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="certificate" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedFile ? selectedFile.name : "Click to upload certificate or proof"}
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                    </label>
                  </div>
                  {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/beyond-academics")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Achievement
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ArtsCultureAchievementForm;
