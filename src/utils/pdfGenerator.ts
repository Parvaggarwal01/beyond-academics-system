import jsPDF from "jspdf";
import QRCode from "qrcode";

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
}

export const generateTranscriptPDF = async (data: TranscriptData): Promise<void> => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Header - University Logo Area
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, pageWidth, 35, "F");

  // University Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("VIGNAN'S FOUNDATION FOR SCIENCE,", pageWidth / 2, 12, { align: "center" });
  doc.text("TECHNOLOGY & RESEARCH", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("(Deemed to be University)", pageWidth / 2, 28, { align: "center" });

  // Document Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("BEYOND ACADEMICS ACHIEVEMENT TRANSCRIPT", pageWidth / 2, 48, { align: "center" });

  // Decorative Line
  doc.setDrawColor(41, 98, 255);
  doc.setLineWidth(0.5);
  doc.line(margin, 52, pageWidth - margin, 52);

  let yPos = 60;

  // Student Information Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, yPos, contentWidth, 45, 2, 2, "F");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(41, 98, 255);
  
  const labelX = margin + 5;
  const valueX = margin + 60;

  doc.text("Student Name:", labelX, yPos + 8);
  doc.text("Registration No:", labelX, yPos + 16);
  doc.text("School:", labelX, yPos + 24);
  doc.text("Program:", labelX, yPos + 32);
  doc.text("Semester:", labelX, yPos + 40);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(data.student_name, valueX, yPos + 8);
  doc.text(data.registration_number, valueX, yPos + 16);
  doc.text(data.school, valueX, yPos + 24);
  doc.text(data.program, valueX, yPos + 32);
  doc.text(`${data.semester} (${data.academic_year})`, valueX, yPos + 40);

  // Parent Information (if available)
  if (data.father_name || data.mother_name) {
    yPos += 50;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 98, 255);
    
    if (data.father_name) {
      doc.text("Father's Name:", labelX, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(data.father_name, valueX, yPos);
      yPos += 8;
    }
    
    if (data.mother_name) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(41, 98, 255);
      doc.text("Mother's Name:", labelX, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(data.mother_name, valueX, yPos);
    }
  }

  yPos += 15;

  // Achievements Section Header
  doc.setFillColor(41, 98, 255);
  doc.rect(margin, yPos, contentWidth, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("ACHIEVEMENTS", pageWidth / 2, yPos + 5.5, { align: "center" });

  yPos += 12;

  // Table Headers
  doc.setFillColor(230, 230, 230);
  doc.rect(margin, yPos, contentWidth, 8, "F");
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  
  const col1 = margin + 2;
  const col2 = margin + 50;
  const col3 = margin + 90;
  const col4 = margin + 120;
  const col5 = margin + 150;
  
  doc.text("S.No", col1, yPos + 5.5);
  doc.text("Title & Category", col2, yPos + 5.5);
  doc.text("Level", col3, yPos + 5.5);
  doc.text("Position", col4, yPos + 5.5);
  doc.text("Points", col5, yPos + 5.5);

  yPos += 10;

  // Achievement Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  
  data.achievements.forEach((achievement, index) => {
    // Check if we need a new page
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = 20;
      
      // Repeat headers on new page
      doc.setFillColor(230, 230, 230);
      doc.rect(margin, yPos, contentWidth, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("S.No", col1, yPos + 5.5);
      doc.text("Title & Category", col2, yPos + 5.5);
      doc.text("Level", col3, yPos + 5.5);
      doc.text("Position", col4, yPos + 5.5);
      doc.text("Points", col5, yPos + 5.5);
      yPos += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
    }

    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPos - 2, contentWidth, 10, "F");
    }

    doc.setTextColor(0, 0, 0);
    doc.text(`${index + 1}`, col1, yPos + 3);
    
    // Title and Category (wrapped)
    const titleText = `${achievement.title}`;
    const categoryText = `(${achievement.category.toUpperCase()})`;
    doc.text(titleText, col2, yPos + 1.5, { maxWidth: 38 });
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.text(categoryText, col2, yPos + 5.5);
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    
    doc.text(achievement.level, col3, yPos + 3, { maxWidth: 28 });
    doc.text(achievement.position, col4, yPos + 3, { maxWidth: 28 });
    doc.text(`${achievement.calculated_points}`, col5, yPos + 3);

    yPos += 12;
  });

  // Summary Section
  yPos += 5;
  doc.setDrawColor(41, 98, 255);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // Total Points and Grade Box
  doc.setFillColor(41, 98, 255);
  doc.roundedRect(pageWidth - margin - 60, yPos, 60, 20, 2, 2, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL POINTS:", pageWidth - margin - 55, yPos + 7);
  doc.setFontSize(16);
  doc.text(`${data.total_points}`, pageWidth - margin - 30, yPos + 15, { align: "center" });
  
  doc.setFillColor(147, 51, 234);
  doc.roundedRect(pageWidth - margin - 120, yPos, 55, 20, 2, 2, "F");
  doc.setFontSize(10);
  doc.text("GRADE:", pageWidth - margin - 115, yPos + 7);
  doc.setFontSize(16);
  doc.text(data.grade, pageWidth - margin - 92.5, yPos + 15, { align: "center" });

  yPos += 28;

  // QR Code
  const qrCodeData = await QRCode.toDataURL(
    `https://beyondacademics.netlify.app/verify-transcript/${data.verification_code}`,
    { width: 400, margin: 1 }
  );
  
  doc.addImage(qrCodeData, "PNG", margin, yPos, 30, 30);

  // Verification Info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Scan to verify", margin + 15, yPos + 33, { align: "center" });
  
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(`Verification Code: ${data.verification_code}`, margin + 35, yPos + 5);
  doc.text(`Generated: ${new Date(data.generated_at).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })} at ${new Date(data.generated_at).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`, margin + 35, yPos + 10);
  
  doc.setFontSize(6);
  doc.text("This is a computer-generated document and does not require a signature.", margin + 35, yPos + 20);
  doc.text("Verify authenticity at: beyondacademics.netlify.app/verify", margin + 35, yPos + 24);

  // Footer
  const footerY = pageHeight - 15;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY, pageWidth - margin, footerY);
  
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Beyond Academics Portal | Vignan University | This transcript is valid only with verification code",
    pageWidth / 2,
    footerY + 5,
    { align: "center" }
  );

  // Save the PDF
  const fileName = `Transcript_${data.registration_number}_${data.semester}_${data.academic_year}.pdf`;
  doc.save(fileName);
};
