// Dummy transcript data for all 8 semesters
// This data can be used to test the PDF generator

export interface Achievement {
  title: string;
  category: string;
  date: string;
  level: string;
  position: string;
  calculated_points: number;
  event_type: string;
  organizer: string;
}

export interface TranscriptData {
  student_name: string;
  registration_number: string;
  school: string;
  program: string;
  semester: string;
  academic_year: string;
  achievements: Achievement[];
  total_points: number;
  grade: string;
  generated_at: string;
  verification_code: string;
  father_name?: string;
  mother_name?: string;
  photo_url?: string;
}

// Student Profile
export const studentProfile = {
  student_name: "Dummy Student",
  registration_number: "12313123",
  school: "School of Computer Science and Engineering",
  program: "B.Tech Computer Science and Engineering",
  father_name: "Dummy Father",
  mother_name: "Dummy Mother",
  photo_url: "/image.png",
};

// All achievements across 8 semesters
export const allAchievements: Record<string, Achievement[]> = {
  "Sem-1": [
    {
      title: "Smart India Hackathon Winner",
      category: "technical",
      date: "2023-08-15",
      level: "National",
      position: "1st Prize",
      calculated_points: 100,
      event_type: "Hackathon",
      organizer: "AICTE",
    },
    {
      title: "Inter-College Basketball Tournament",
      category: "sports",
      date: "2023-09-10",
      level: "State",
      position: "Gold Medal",
      calculated_points: 80,
      event_type: "Basketball",
      organizer: "Punjab Sports Authority",
    },
    {
      title: "Classical Dance Competition",
      category: "cultural",
      date: "2023-10-05",
      level: "University",
      position: "2nd Prize",
      calculated_points: 60,
      event_type: "Dance",
      organizer: "Cultural Committee LPU",
    },
  ],

  "Sem-2": [
    {
      title: "CodeChef Long Challenge",
      category: "technical",
      date: "2024-01-20",
      level: "International",
      position: "Top 100",
      calculated_points: 70,
      event_type: "Coding Contest",
      organizer: "CodeChef",
    },
    {
      title: "Research Paper Publication",
      category: "technical",
      date: "2024-02-01",
      level: "International",
      position: "Published",
      calculated_points: 90,
      event_type: "Research",
      organizer: "IEEE",
    },
    {
      title: "Cricket Tournament",
      category: "sports",
      date: "2023-12-15",
      level: "State",
      position: "Silver Medal",
      calculated_points: 70,
      event_type: "Cricket",
      organizer: "Punjab Cricket Board",
    },
  ],

  "Sem-3": [
    {
      title: "National Level Robotics Competition",
      category: "technical",
      date: "2024-08-20",
      level: "National",
      position: "2nd Prize",
      calculated_points: 85,
      event_type: "Robotics",
      organizer: "IIT Delhi",
    },
    {
      title: "Startup Pitch Competition",
      category: "startup",
      date: "2024-09-05",
      level: "State",
      position: "Winner",
      calculated_points: 75,
      event_type: "Entrepreneurship",
      organizer: "Startup Punjab",
    },
    {
      title: "Annual Sports Meet - Athletics",
      category: "sports",
      date: "2024-09-25",
      level: "University",
      position: "Gold Medal",
      calculated_points: 65,
      event_type: "Athletics",
      organizer: "LPU Sports Department",
    },
    {
      title: "Photography Exhibition",
      category: "arts_culture",
      date: "2024-10-10",
      level: "University",
      position: "Best Photography Award",
      calculated_points: 50,
      event_type: "Art Exhibition",
      organizer: "Arts & Culture Club",
    },
  ],

  "Sem-4": [
    {
      title: "Google Summer of Code",
      category: "technical",
      date: "2025-01-15",
      level: "International",
      position: "Selected Contributor",
      calculated_points: 95,
      event_type: "Open Source",
      organizer: "Google",
    },
    {
      title: "State Level Table Tennis Championship",
      category: "sports",
      date: "2024-12-20",
      level: "State",
      position: "Bronze Medal",
      calculated_points: 60,
      event_type: "Table Tennis",
      organizer: "Punjab Table Tennis Association",
    },
    {
      title: "Community Service - Blood Donation Camp",
      category: "community",
      date: "2025-01-26",
      level: "University",
      position: "Organizer",
      calculated_points: 40,
      event_type: "Social Work",
      organizer: "NSS LPU",
    },
  ],

  "Sem-5": [
    {
      title: "ACM ICPC Regional Round",
      category: "technical",
      date: "2025-09-15",
      level: "International",
      position: "Top 50",
      calculated_points: 90,
      event_type: "Programming Contest",
      organizer: "ACM",
    },
    {
      title: "National Level Badminton Tournament",
      category: "sports",
      date: "2025-10-10",
      level: "National",
      position: "Semi-Finalist",
      calculated_points: 75,
      event_type: "Badminton",
      organizer: "Badminton Association of India",
    },
    {
      title: "Drama Competition",
      category: "cultural",
      date: "2025-10-25",
      level: "University",
      position: "Best Actor Award",
      calculated_points: 55,
      event_type: "Theatre",
      organizer: "Drama Club LPU",
    },
    {
      title: "Tech Startup Incubation",
      category: "startup",
      date: "2025-11-05",
      level: "State",
      position: "Incubated",
      calculated_points: 80,
      event_type: "Entrepreneurship",
      organizer: "Punjab Startup Hub",
    },
  ],

  "Sem-6": [
    {
      title: "International Conference Paper Presentation",
      category: "technical",
      date: "2026-01-20",
      level: "International",
      position: "Presented",
      calculated_points: 85,
      event_type: "Research",
      organizer: "Springer Conference",
    },
    {
      title: "State Level Football Championship",
      category: "sports",
      date: "2025-12-15",
      level: "State",
      position: "Runner Up",
      calculated_points: 70,
      event_type: "Football",
      organizer: "Punjab Football Association",
    },
    {
      title: "Coding Bootcamp Instructor",
      category: "community",
      date: "2026-02-01",
      level: "University",
      position: "Volunteer Instructor",
      calculated_points: 45,
      event_type: "Teaching",
      organizer: "Code for Change",
    },
  ],

  "Sem-7": [
    {
      title: "Machine Learning Research Internship",
      category: "technical",
      date: "2026-08-15",
      level: "National",
      position: "Research Intern",
      calculated_points: 85,
      event_type: "Internship",
      organizer: "DRDO",
    },
    {
      title: "Volleyball Inter-University Championship",
      category: "sports",
      date: "2026-09-10",
      level: "National",
      position: "Bronze Medal",
      calculated_points: 70,
      event_type: "Volleyball",
      organizer: "AIU",
    },
    {
      title: "Music Fest Performance",
      category: "cultural",
      date: "2026-10-05",
      level: "University",
      position: "Best Performance",
      calculated_points: 60,
      event_type: "Music",
      organizer: "Music Society LPU",
    },
  ],

  "Sem-8": [
    {
      title: "Final Year Project Exhibition",
      category: "technical",
      date: "2027-03-15",
      level: "University",
      position: "Best Project Award",
      calculated_points: 75,
      event_type: "Project",
      organizer: "CSE Department",
    },
    {
      title: "Chess Tournament",
      category: "sports",
      date: "2027-02-20",
      level: "State",
      position: "Gold Medal",
      calculated_points: 65,
      event_type: "Chess",
      organizer: "Punjab Chess Association",
    },
    {
      title: "Campus Placement Drive Coordination",
      category: "community",
      date: "2027-03-01",
      level: "University",
      position: "Student Coordinator",
      calculated_points: 40,
      event_type: "Leadership",
      organizer: "Training & Placement Cell",
    },
  ],
};

// Academic years mapping
export const academicYears: Record<string, string> = {
  "Sem-1": "2023-2024",
  "Sem-2": "2023-2024",
  "Sem-3": "2024-2025",
  "Sem-4": "2024-2025",
  "Sem-5": "2025-2026",
  "Sem-6": "2025-2026",
  "Sem-7": "2026-2027",
  "Sem-8": "2026-2027",
};

// Calculate grade based on points
export const calculateGrade = (points: number): string => {
  if (points >= 250) return "O";
  if (points >= 200) return "A+";
  if (points >= 150) return "A";
  if (points >= 100) return "B+";
  if (points >= 50) return "B";
  return "C";
};

// Generate transcript data for a specific semester
export const getTranscriptData = (semester: string): TranscriptData => {
  const achievements = allAchievements[semester] || [];
  const totalPoints = achievements.reduce(
    (sum, a) => sum + a.calculated_points,
    0,
  );
  const grade = calculateGrade(totalPoints);
  const academicYear = academicYears[semester] || "2023-2024";

  return {
    ...studentProfile,
    semester,
    academic_year: academicYear,
    achievements,
    total_points: totalPoints,
    grade,
    generated_at: new Date().toISOString(),
    verification_code: `BA-TR-${new Date().getFullYear()}-${studentProfile.registration_number}-${semester.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  };
};

// Get all available semesters
export const getAllSemesters = (): string[] => {
  return Object.keys(allAchievements);
};

// Get summary of all semesters
export const getAllSemestersSummary = () => {
  return getAllSemesters().map((semester) => {
    const achievements = allAchievements[semester];
    const totalPoints = achievements.reduce(
      (sum, a) => sum + a.calculated_points,
      0,
    );
    const grade = calculateGrade(totalPoints);

    return {
      semester,
      academic_year: academicYears[semester],
      achievements_count: achievements.length,
      total_points: totalPoints,
      grade,
    };
  });
};
