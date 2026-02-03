// Utility functions for semester and academic year handling

export interface SemesterOption {
  value: string;
  label: string;
}

export interface AcademicYearOption {
  value: string;
  label: string;
}

/**
 * Get current semester based on the date
 * Assumes:
 * - Sem-1: July to December (Odd Semester)
 * - Sem-2: January to June (Even Semester)
 */
export function getCurrentSemester(): string {
  const month = new Date().getMonth() + 1; // 1-12
  return month >= 7 ? 'Sem-1' : 'Sem-2';
}

/**
 * Get current academic year
 * Format: "2024-25"
 * Academic year runs from July to June
 */
export function getCurrentAcademicYear(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  
  if (month >= 7) {
    // July onwards: current year to next year
    return `${year}-${(year + 1) % 100}`;
  } else {
    // January to June: previous year to current year
    return `${year - 1}-${year % 100}`;
  }
}

/**
 * Get semester from date
 */
export function getSemesterFromDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  return month >= 7 ? 'Sem-1' : 'Sem-2';
}

/**
 * Get academic year from date
 */
export function getAcademicYearFromDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  if (month >= 7) {
    return `${year}-${(year + 1) % 100}`;
  } else {
    return `${year - 1}-${year % 100}`;
  }
}

/**
 * Get list of all semesters (for 4-year B.Tech program)
 */
export function getAllSemesters(): SemesterOption[] {
  return [
    { value: 'Sem-1', label: 'Semester 1' },
    { value: 'Sem-2', label: 'Semester 2' },
    { value: 'Sem-3', label: 'Semester 3' },
    { value: 'Sem-4', label: 'Semester 4' },
    { value: 'Sem-5', label: 'Semester 5' },
    { value: 'Sem-6', label: 'Semester 6' },
    { value: 'Sem-7', label: 'Semester 7' },
    { value: 'Sem-8', label: 'Semester 8' },
  ];
}

/**
 * Get list of academic years (last 5 years + current + next)
 */
export function getAcademicYears(): AcademicYearOption[] {
  const currentYear = new Date().getFullYear();
  const years: AcademicYearOption[] = [];
  
  for (let i = -5; i <= 1; i++) {
    const year = currentYear + i;
    const nextYear = year + 1;
    const value = `${year}-${nextYear % 100}`;
    years.push({
      value,
      label: `${year}-${nextYear}`
    });
  }
  
  return years.reverse();
}

/**
 * Format semester for display
 */
export function formatSemester(semester: string): string {
  return semester.replace('Sem-', 'Semester ');
}

/**
 * Format academic year for display
 */
export function formatAcademicYear(year: string): string {
  if (!year.includes('-')) return year;
  const [startYear, endYear] = year.split('-');
  return `${startYear}-20${endYear}`;
}

/**
 * Validate if semester is valid
 */
export function isValidSemester(semester: string): boolean {
  return /^Sem-[1-8]$/.test(semester);
}

/**
 * Validate if academic year is valid
 */
export function isValidAcademicYear(year: string): boolean {
  return /^\d{4}-\d{2}$/.test(year);
}

/**
 * Get semester number (1-8)
 */
export function getSemesterNumber(semester: string): number {
  const match = semester.match(/Sem-(\d)/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * Auto-detect semester and academic year from achievement date
 */
export function detectSemesterAndYear(achievementDate: string): {
  semester: string;
  academicYear: string;
} {
  return {
    semester: getSemesterFromDate(achievementDate),
    academicYear: getAcademicYearFromDate(achievementDate)
  };
}
