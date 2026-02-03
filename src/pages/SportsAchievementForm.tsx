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
import { Dumbbell, Upload, CheckCircle, Loader2, Trophy, Award, Users, Timer, Calendar } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";
import confetti from "canvas-confetti";
import { getAllSemesters, getAcademicYears, detectSemesterAndYear } from "@/utils/semesterUtils";

const sportsSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  sportType: z.string().min(1, "Please select sport type"),
  date: z.string().min(1, "Date is required"),
  organizer: z.string().min(3, "Organizer name is required"),
  level: z.string().min(1, "Please select competition level"),
  position: z.string().min(1, "Position/rank is required"),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000),
  eventCategory: z.string().min(1, "Please select event category"),
  participationType: z.string().min(1, "Please select participation type"),
  performanceMetrics: z.string().optional(),
  semester: z.string().min(1, "Please select semester"),
  academicYear: z.string().min(1, "Please select academic year"),
});

const SportsAchievementForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    sportType: "",
    date: "",
    organizer: "",
    level: "",
    position: "",
    description: "",
    eventCategory: "",
    participationType: "",
    performanceMetrics: "",
    semester: "",
    academicYear: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sportTypes = [
    { value: "athletics", label: "Athletics" },
    { value: "cricket", label: "Cricket" },
    { value: "football", label: "Football" },
    { value: "basketball", label: "Basketball" },
    { value: "volleyball", label: "Volleyball" },
    { value: "badminton", label: "Badminton" },
    { value: "tennis", label: "Tennis" },
    { value: "table-tennis", label: "Table Tennis" },
    { value: "chess", label: "Chess" },
    { value: "kabaddi", label: "Kabaddi" },
    { value: "swimming", label: "Swimming" },
    { value: "martial-arts", label: "Martial Arts" },
    { value: "other", label: "Other" },
  ];

  const eventCategories = [
    { value: "tournament", label: "Tournament" },
    { value: "championship", label: "Championship" },
    { value: "league", label: "League" },
    { value: "competition", label: "Competition" },
    { value: "meet", label: "Sports Meet" },
  ];

  const participationTypes = [
    { value: "individual", label: "Individual" },
    { value: "team", label: "Team" },
    { value: "relay", label: "Relay" },
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
      sportsSchema.parse(formData);
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
        category: "sports",
        event_type: formData.sportType,
        date: formData.date,
        organizer: formData.organizer,
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
            <span>Sports achievement submitted successfully!</span>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
            <CardHeader className="space-y-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-t-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Sports Achievement</CardTitle>
                  <CardDescription className="text-green-100">
                    Submit your sports competitions, tournaments, and athletic achievements
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Achievement Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-green-600" />
                    Achievement Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="title">Achievement Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Gold Medal in State Athletics Championship 2024"
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                      <p className="text-xs text-muted-foreground">{formData.title.length}/100 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sportType">Sport Type *</Label>
                      <Select value={formData.sportType} onValueChange={(value) => setFormData({ ...formData, sportType: value })}>
                        <SelectTrigger className={errors.sportType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select sport" />
                        </SelectTrigger>
                        <SelectContent>
                          {sportTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.sportType && <p className="text-sm text-red-500">{errors.sportType}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventCategory">Event Category *</Label>
                      <Select value={formData.eventCategory} onValueChange={(value) => setFormData({ ...formData, eventCategory: value })}>
                        <SelectTrigger className={errors.eventCategory ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.eventCategory && <p className="text-sm text-red-500">{errors.eventCategory}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="participationType">Participation Type *</Label>
                      <Select value={formData.participationType} onValueChange={(value) => setFormData({ ...formData, participationType: value })}>
                        <SelectTrigger className={errors.participationType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {participationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.participationType && <p className="text-sm text-red-500">{errors.participationType}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Achievement Date *</Label>
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
                      <Label htmlFor="organizer">Organizer/Institution *</Label>
                      <Input
                        id="organizer"
                        value={formData.organizer}
                        onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                        placeholder="e.g., Sports Authority of India, AIU"
                        className={errors.organizer ? "border-red-500" : ""}
                      />
                      {errors.organizer && <p className="text-sm text-red-500">{errors.organizer}</p>}
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
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Calculated Points</p>
                              <p className="text-3xl font-bold text-green-600">{calculatedPoints}</p>
                            </div>
                            <Badge variant="secondary" className="text-lg px-4 py-2">
                              Code: {categoryCode}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="performanceMetrics" className="flex items-center gap-2">
                        <Timer className="w-4 h-4" />
                        Performance Metrics (if applicable)
                      </Label>
                      <Input
                        id="performanceMetrics"
                        value={formData.performanceMetrics}
                        onChange={(e) => setFormData({ ...formData, performanceMetrics: e.target.value })}
                        placeholder="e.g., 10.5 seconds in 100m, 45 points scored"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your achievement, competition details, performance highlights..."
                        rows={5}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                      <p className="text-xs text-muted-foreground">{formData.description.length}/1000 characters</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Upload */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Upload className="w-5 h-5 text-green-600" />
                    Certificate/Proof *
                  </h3>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
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
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
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

export default SportsAchievementForm;
