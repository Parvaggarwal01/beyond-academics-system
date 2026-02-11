import jsPDF from "jspdf";
import QRCode from "qrcode";
import { getTranscriptData, getAllSemesters } from "@/data/dummyTranscriptData";

interface Achievement {
  title: string;
  category: string;
  date: string;
  level: string;
  position: string;
  calculated_points: number;
  event_type: string;
  organizer: string;
}

interface TranscriptData {
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

export const generateTranscriptPDF = async (
  data: TranscriptData,
  mode: "download" | "view" = "download",
): Promise<void> => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  let yPos = 15;

  // Top Border Line (Orange)
  doc.setDrawColor(255, 140, 0);
  doc.setLineWidth(1);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;

  // Header Section with Logo and Photo
  // Load and add LPU Logo (left side) - 30mm x 30mm
  try {
    const logoImg = new Image();
    logoImg.src = "/seal.png";
    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
    });
    doc.addImage(logoImg, "PNG", margin + 10, yPos, 30, 30);
  } catch (error) {
    // Fallback: draw placeholder if logo fails to load
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(margin + 10, yPos, 30, 30);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text("LOGO", margin + 25, yPos + 16, { align: "center" });
  }

  // Student Photo (top right) - 25mm x 30mm
  try {
    const photoUrl = data.photo_url || "/image.png";
    const photoImg = new Image();
    photoImg.src = photoUrl;
    await new Promise((resolve, reject) => {
      photoImg.onload = resolve;
      photoImg.onerror = reject;
    });
    doc.addImage(photoImg, "PNG", pageWidth - margin - 25, yPos, 25, 30);
  } catch (error) {
    // Fallback: draw placeholder if photo fails to load
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(pageWidth - margin - 25, yPos, 25, 30);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text("PHOTO", pageWidth - margin - 12.5, yPos + 16, {
      align: "center",
    });
  }

  // University Name (center)
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("LOVELY PROFESSIONAL UNIVERSITY", pageWidth / 2, yPos + 10, {
    align: "center",
  });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Phagwara, Punjab (India)", pageWidth / 2, yPos + 16, {
    align: "center",
  });

  yPos += 35;

  // Document Title
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Beyond Academics Achievement Transcript", pageWidth / 2, yPos, {
    align: "center",
  });

  yPos += 8;

  // Student Information Section
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const leftColX = margin;
  const rightColX = pageWidth / 2 + 10;
  const labelWidth = 45;

  // Left Column
  doc.setFont("helvetica", "bold");
  doc.text("Student Name", leftColX, yPos);
  doc.text(":", leftColX + labelWidth, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.student_name, leftColX + labelWidth + 3, yPos);

  // Right Column
  doc.setFont("helvetica", "bold");
  doc.text("Programme", rightColX, yPos);
  doc.text(":", rightColX + labelWidth, yPos);
  doc.setFont("helvetica", "normal");
  const programText = doc.splitTextToSize(
    data.program,
    pageWidth - rightColX - labelWidth - margin - 5,
  );
  doc.text(programText, rightColX + labelWidth + 3, yPos);

  yPos += 6;

  // Registration Number and Mode
  doc.setFont("helvetica", "bold");
  doc.text("Registration No.", leftColX, yPos);
  doc.text(":", leftColX + labelWidth, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.registration_number, leftColX + labelWidth + 3, yPos);

  doc.setFont("helvetica", "bold");
  doc.text("Mode", rightColX, yPos);
  doc.text(":", rightColX + labelWidth, yPos);
  doc.setFont("helvetica", "normal");
  doc.text("Regular", rightColX + labelWidth + 3, yPos);

  yPos += 6;

  // Father's Name
  if (data.father_name) {
    doc.setFont("helvetica", "bold");
    doc.text("Father's Name", leftColX, yPos);
    doc.text(":", leftColX + labelWidth, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(data.father_name, leftColX + labelWidth + 3, yPos);
    yPos += 6;
  }

  // Mother's Name
  if (data.mother_name) {
    doc.setFont("helvetica", "bold");
    doc.text("Mother's Name", leftColX, yPos);
    doc.text(":", leftColX + labelWidth, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(data.mother_name, leftColX + labelWidth + 3, yPos);
    yPos += 6;
  }

  yPos += 5;

  // Semester Section Header
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 5;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Semester : ${data.semester}`, margin, yPos);
  doc.text(`Total Points : ${data.total_points}`, pageWidth / 2, yPos);
  doc.text(`Grade : ${data.grade}`, pageWidth - margin - 30, yPos);

  yPos += 5;
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 2;

  // Achievement Table
  const tableTop = yPos;
  const rowHeight = 7;

  // Column positions and widths
  const col1X = margin;
  const col1W = 12;
  const col2X = col1X + col1W;
  const col2W = 70;
  const col3X = col2X + col2W;
  const col3W = 25;
  const col4X = col3X + col3W;
  const col4W = 30;
  const col5X = col4X + col4W;
  const col5W = 25;
  const col6X = col5X + col5W;
  const col6W = 15;

  // Table Header
  doc.setFillColor(240, 240, 240);
  doc.rect(col1X, yPos, contentWidth, rowHeight, "F");

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);

  // Draw header borders
  doc.rect(col1X, yPos, col1W, rowHeight);
  doc.rect(col2X, yPos, col2W, rowHeight);
  doc.rect(col3X, yPos, col3W, rowHeight);
  doc.rect(col4X, yPos, col4W, rowHeight);
  doc.rect(col5X, yPos, col5W, rowHeight);
  doc.rect(col6X, yPos, col6W, rowHeight);

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);

  doc.text("S.No.", col1X + col1W / 2, yPos + 5, { align: "center" });
  doc.text("Achievement Title", col2X + 2, yPos + 5);
  doc.text("Category", col3X + 2, yPos + 5);
  doc.text("Level", col4X + 2, yPos + 5);
  doc.text("Position", col5X + 2, yPos + 5);
  doc.text("Points", col6X + col6W / 2, yPos + 5, { align: "center" });

  yPos += rowHeight;

  // Achievement Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  data.achievements.forEach((achievement, index) => {
    // Check if we need a new page
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;

      // Repeat header on new page
      doc.setFillColor(240, 240, 240);
      doc.rect(col1X, yPos, contentWidth, rowHeight, "F");

      doc.rect(col1X, yPos, col1W, rowHeight);
      doc.rect(col2X, yPos, col2W, rowHeight);
      doc.rect(col3X, yPos, col3W, rowHeight);
      doc.rect(col4X, yPos, col4W, rowHeight);
      doc.rect(col5X, yPos, col5W, rowHeight);
      doc.rect(col6X, yPos, col6W, rowHeight);

      doc.setFont("helvetica", "bold");
      doc.text("S.No.", col1X + col1W / 2, yPos + 5, { align: "center" });
      doc.text("Achievement Title", col2X + 2, yPos + 5);
      doc.text("Category", col3X + 2, yPos + 5);
      doc.text("Level", col4X + 2, yPos + 5);
      doc.text("Position", col5X + 2, yPos + 5);
      doc.text("Points", col6X + col6W / 2, yPos + 5, { align: "center" });

      yPos += rowHeight;
      doc.setFont("helvetica", "normal");
    }

    const currentRowY = yPos;

    // Draw row borders
    doc.rect(col1X, currentRowY, col1W, rowHeight);
    doc.rect(col2X, currentRowY, col2W, rowHeight);
    doc.rect(col3X, currentRowY, col3W, rowHeight);
    doc.rect(col4X, currentRowY, col4W, rowHeight);
    doc.rect(col5X, currentRowY, col5W, rowHeight);
    doc.rect(col6X, currentRowY, col6W, rowHeight);

    // S.No
    doc.text(`${index + 1}`, col1X + col1W / 2, currentRowY + 5, {
      align: "center",
    });

    // Title (wrapped if needed)
    const titleLines = doc.splitTextToSize(achievement.title, col2W - 4);
    doc.text(titleLines[0], col2X + 2, currentRowY + 5);

    // Category
    const categoryText =
      achievement.category.charAt(0).toUpperCase() +
      achievement.category.slice(1).replace(/_/g, " ");
    doc.text(categoryText, col3X + 2, currentRowY + 5, { maxWidth: col3W - 4 });

    // Level
    doc.text(achievement.level, col4X + 2, currentRowY + 5, {
      maxWidth: col4W - 4,
    });

    // Position
    doc.text(achievement.position, col5X + 2, currentRowY + 5, {
      maxWidth: col5W - 4,
    });

    // Points
    doc.text(
      `${achievement.calculated_points}`,
      col6X + col6W / 2,
      currentRowY + 5,
      { align: "center" },
    );

    yPos += rowHeight;
  });

  yPos += 5;

  // Footer Section with QR Code
  const qrCodeData = await QRCode.toDataURL(
    `https://beyondacademics.netlify.app/verify-transcript/${data.verification_code}`,
    { width: 400, margin: 1 },
  );

  // QR Code (bottom left)
  doc.addImage(qrCodeData, "PNG", margin, yPos, 25, 25);

  // Verification Info (next to QR code)
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text("Scan QR code to verify transcript", margin, yPos + 28);

  doc.setFontSize(6);
  doc.setTextColor(100, 100, 100);
  doc.text(
    `Verification Code: ${data.verification_code}`,
    margin + 30,
    yPos + 5,
  );
  doc.text(
    `Generated on: ${new Date(data.generated_at).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`,
    margin + 30,
    yPos + 10,
  );
  doc.text(`Academic Year: ${data.academic_year}`, margin + 30, yPos + 15);

  // Disclaimer
  const disclaimerY = pageHeight - 25;
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(
    "This is a system-generated Beyond Academics Achievement Transcript and does not require any seal.",
    pageWidth / 2,
    disclaimerY,
    { align: "center" },
  );

  doc.setFontSize(6);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "Disclaimer: This transcript is issued on the basis of information available in the Beyond Academics portal. The University reserves the right to update/change",
    pageWidth / 2,
    disclaimerY + 4,
    { align: "center" },
  );
  doc.text(
    "any information contained herein without notice. Verify authenticity at: beyondacademics.netlify.app/verify",
    pageWidth / 2,
    disclaimerY + 8,
    { align: "center" },
  );

  // Page Number and Footer
  doc.setFontSize(7);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `Date of Printing: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`,
    margin,
    pageHeight - 10,
  );
  doc.text(`Place: Phagwara (Punjab)`, margin, pageHeight - 6);
  doc.text("Page 1 of 1", pageWidth - margin - 20, pageHeight - 8);
  doc.text("Prepared By", pageWidth - margin - 20, pageHeight - 12);
  doc.text("Beyond Academics", pageWidth - margin - 20, pageHeight - 16);

  // Save or view the PDF
  const fileName = `BA_Transcript_${data.registration_number}_${data.semester}_${data.academic_year}.pdf`;

  if (mode === "view") {
    // Open in new window for viewing
    window.open(doc.output("bloburl"), "_blank");
  } else {
    // Download the file
    doc.save(fileName);
  }
};

// Demo function: Generate transcript using dummy data for a specific semester
export const generateDemoTranscript = async (
  semester: string,
  mode: "download" | "view" = "download",
): Promise<void> => {
  const transcriptData = getTranscriptData(semester);
  await generateTranscriptPDF(transcriptData, mode);
};

// Demo function: Generate ONE PDF with ALL semesters, each in separate tables
export const generateAllSemestersInOnePDF = async (
  mode: "download" | "view" = "download",
): Promise<void> => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  const allSemesters = getAllSemesters();
  const baseData = getTranscriptData("Sem-1");
  let totalPoints = 0;
  let pageNumber = 1;

  // Calculate overall grade
  const calculateGrade = (points: number): string => {
    if (points >= 250) return "O";
    if (points >= 200) return "A+";
    if (points >= 150) return "A";
    if (points >= 100) return "B+";
    if (points >= 50) return "B";
    return "C";
  };

  // Calculate total points across all semesters
  allSemesters.forEach((semester) => {
    const semData = getTranscriptData(semester);
    totalPoints += semData.total_points;
  });

  // Header function to add on each page
  const addHeader = async (yPos: number): Promise<number> => {
    // Top Border Line (Orange)
    doc.setDrawColor(255, 140, 0);
    doc.setLineWidth(1);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;

    // Load and add LPU Logo (left side) - 30mm x 30mm
    try {
      const logoImg = new Image();
      logoImg.src = "/seal.png";
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
      });
      doc.addImage(logoImg, "PNG", margin + 1, yPos, 30, 30);
    } catch (error) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.rect(margin + 10, yPos, 30, 30);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("LOGO", margin + 25, yPos + 16, { align: "center" });
    }

    // Student Photo (top right) - 25mm x 30mm
    try {
      const photoUrl = baseData.photo_url || "/image.png";
      const photoImg = new Image();
      photoImg.src = photoUrl;
      await new Promise((resolve, reject) => {
        photoImg.onload = resolve;
        photoImg.onerror = reject;
      });
      doc.addImage(photoImg, "PNG", pageWidth - margin - 25, yPos, 25, 30);
    } catch (error) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.rect(pageWidth - margin - 25, yPos, 25, 30);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text("PHOTO", pageWidth - margin - 12.5, yPos + 16, {
        align: "center",
      });
    }

    // University Name (center)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("LOVELY PROFESSIONAL UNIVERSITY", pageWidth / 2, yPos + 8, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Phagwara, Punjab - 144411", pageWidth / 2, yPos + 13, {
      align: "center",
    });

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(
      "BEYOND ACADEMICS ACHIEVEMENT TRANSCRIPT",
      pageWidth / 2,
      yPos + 19,
      { align: "center" },
    );

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("All Semesters (Sem-1 to Sem-8)", pageWidth / 2, yPos + 24, {
      align: "center",
    });

    yPos += 35;

    // Student Information
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Name:", margin, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(baseData.student_name, margin + 25, yPos);

    doc.setFont("helvetica", "bold");
    doc.text("Reg. No:", pageWidth / 2, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(baseData.registration_number, pageWidth / 2 + 20, yPos);

    yPos += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Father's Name:", margin, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(baseData.father_name || "", margin + 25, yPos);

    doc.setFont("helvetica", "bold");
    doc.text("Mother's Name:", pageWidth / 2, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(baseData.mother_name || "", pageWidth / 2 + 27, yPos);

    yPos += 5;
    doc.setFont("helvetica", "bold");
    doc.text("School:", margin, yPos);
    doc.setFont("helvetica", "normal");
    const schoolText = doc.splitTextToSize(baseData.school, contentWidth - 25);
    doc.text(schoolText, margin + 25, yPos);

    yPos += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Program:", margin, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(baseData.program, margin + 25, yPos);

    yPos += 5;
    doc.line(margin, yPos, pageWidth - margin, yPos);

    return yPos + 2;
  };

  // Table rendering function
  const renderTable = (
    semester: string,
    achievements: Achievement[],
    yPos: number,
  ): number => {
    const rowHeight = 7;
    const col1X = margin;
    const col1W = 12;
    const col2X = col1X + col1W;
    const col2W = 70;
    const col3X = col2X + col2W;
    const col3W = 25;
    const col4X = col3X + col3W;
    const col4W = 30;
    const col5X = col4X + col4W;
    const col5W = 25;
    const col6X = col5X + col5W;
    const col6W = 15;

    // Semester Header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(semester, margin, yPos + 4);
    yPos += 6;

    // Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(col1X, yPos, contentWidth, rowHeight, "F");

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);

    doc.rect(col1X, yPos, col1W, rowHeight);
    doc.rect(col2X, yPos, col2W, rowHeight);
    doc.rect(col3X, yPos, col3W, rowHeight);
    doc.rect(col4X, yPos, col4W, rowHeight);
    doc.rect(col5X, yPos, col5W, rowHeight);
    doc.rect(col6X, yPos, col6W, rowHeight);

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    doc.text("S.No.", col1X + col1W / 2, yPos + 5, { align: "center" });
    doc.text("Achievement Title", col2X + 2, yPos + 5);
    doc.text("Category", col3X + 2, yPos + 5);
    doc.text("Level", col4X + 2, yPos + 5);
    doc.text("Position", col5X + 2, yPos + 5);
    doc.text("Points", col6X + col6W / 2, yPos + 5, { align: "center" });

    yPos += rowHeight;

    // Achievement Rows
    doc.setFont("helvetica", "normal");
    achievements.forEach((achievement, index) => {
      // Check if we need a new page
      if (yPos + rowHeight > pageHeight - 30) {
        // Add footer before new page
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Page ${pageNumber}`, pageWidth - margin - 20, pageHeight - 8);
        doc.addPage();
        pageNumber++;
        yPos = 15;
      }

      doc.rect(col1X, yPos, col1W, rowHeight);
      doc.rect(col2X, yPos, col2W, rowHeight);
      doc.rect(col3X, yPos, col3W, rowHeight);
      doc.rect(col4X, yPos, col4W, rowHeight);
      doc.rect(col5X, yPos, col5W, rowHeight);
      doc.rect(col6X, yPos, col6W, rowHeight);

      doc.text((index + 1).toString(), col1X + col1W / 2, yPos + 5, {
        align: "center",
      });

      const titleText = doc.splitTextToSize(achievement.title, col2W - 4);
      doc.text(titleText, col2X + 2, yPos + 5);

      doc.text(
        achievement.category.replace("_", " ").toUpperCase(),
        col3X + 2,
        yPos + 5,
      );
      doc.text(achievement.level, col4X + 2, yPos + 5);
      doc.text(achievement.position, col5X + 2, yPos + 5);
      doc.text(
        achievement.calculated_points.toString(),
        col6X + col6W / 2,
        yPos + 5,
        { align: "center" },
      );

      yPos += rowHeight;
    });

    yPos += 3; // Space after table

    return yPos;
  };

  // Start generating the PDF
  let yPos = await addHeader(15);

  // Render each semester's table
  for (const semester of allSemesters) {
    const semData = getTranscriptData(semester);

    // Check if we need a new page before starting a new semester
    if (yPos + 40 > pageHeight - 30) {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Page ${pageNumber}`, pageWidth - margin - 20, pageHeight - 8);
      doc.addPage();
      pageNumber++;
      yPos = 15;
    }

    yPos = renderTable(semester, semData.achievements, yPos);
  }

  // Overall Summary at the end
  if (yPos + 30 > pageHeight - 30) {
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Page ${pageNumber}`, pageWidth - margin - 20, pageHeight - 8);
    doc.addPage();
    pageNumber++;
    yPos = 15;
  }

  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Overall Summary:", margin, yPos);

  yPos += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Points (All Semesters):`, margin + 10, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(totalPoints.toString(), margin + 70, yPos);

  yPos += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Overall Grade:`, margin + 10, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(calculateGrade(totalPoints), margin + 70, yPos);

  yPos += 6;
  const verificationCode = `BA-TR-${new Date().getFullYear()}-${baseData.registration_number}-ALL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  doc.setFont("helvetica", "normal");
  doc.text(`Verification Code:`, margin + 10, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(verificationCode, margin + 70, yPos);

  // QR Code
  yPos += 10;
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(
      `https://beyond-academics.lpucoders.com/verify-transcript/${verificationCode}`,
      { width: 200, margin: 1 },
    );
    doc.addImage(qrCodeDataUrl, "PNG", margin + 10, yPos, 30, 30);

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("Scan to verify", margin + 25, yPos + 33, { align: "center" });
  } catch (error) {
    console.error("Failed to generate QR code:", error);
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "This is a computer-generated transcript and does not require a signature.",
    margin,
    pageHeight - 20,
  );
  doc.text(
    "For verification, scan the QR code or visit: beyond-academics.lpucoders.com",
    margin,
    pageHeight - 16,
  );
  doc.text(`Page ${pageNumber}`, pageWidth - margin - 20, pageHeight - 8);
  doc.text("Prepared By", pageWidth - margin - 20, pageHeight - 12);
  doc.text("Beyond Academics", pageWidth - margin - 20, pageHeight - 16);

  // Save or view the PDF
  const fileName = `BA_Transcript_${baseData.registration_number}_All_Semesters.pdf`;

  if (mode === "view") {
    window.open(doc.output("bloburl"), "_blank");
  } else {
    doc.save(fileName);
  }
};

// Demo function: Generate SEPARATE PDFs for each semester (8 PDFs total)
export const generateAllDemoTranscripts = async (
  mode: "download" | "view" = "download",
): Promise<void> => {
  const semesters = getAllSemesters();

  for (const semester of semesters) {
    const transcriptData = getTranscriptData(semester);
    await generateTranscriptPDF(transcriptData, mode);

    // Add small delay between PDFs to avoid overwhelming the browser
    if (mode === "download") {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
};
