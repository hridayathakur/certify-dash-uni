// Utility functions for file downloads

export const downloadFile = (filename: string, content: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadCertificate = (certificateTitle: string, studentName: string = 'Student') => {
  const certificateContent = `
CERTIFICATE OF ACHIEVEMENT

This is to certify that

${studentName}

has successfully completed

${certificateTitle}

Date: ${new Date().toLocaleDateString()}
Issued by: University Portal

This is a digitally generated certificate.
  `;
  
  downloadFile(`${certificateTitle.replace(/\s+/g, '_')}_Certificate.txt`, certificateContent);
};

export const downloadNAACReport = (selectedCriteria: string[]) => {
  const reportContent = `
NAAC COMPLIANCE REPORT
Generated on: ${new Date().toLocaleDateString()}

Selected NAAC Criteria: ${selectedCriteria.join(', ')}

Executive Summary:
This report provides comprehensive analysis of student achievements and institutional performance 
based on the selected NAAC criteria.

Key Findings:
- Total students covered: 250
- Certificate distribution: Research (45%), Cultural (30%), Technical (35%), Sports (15%), Academic (25%)
- Overall compliance score: A++
- Improvement areas identified: 3
- Recommendations: 7

Detailed Analysis:
${selectedCriteria.map((criteria, index) => `
${index + 1}. Criteria ${criteria}:
   - Student participation: 85%
   - Quality indicators: Excellent
   - Documentation: Complete
   - Recommendations: Continue current practices
`).join('')}

Conclusion:
The institution demonstrates excellent performance across all selected NAAC criteria with 
strong student participation and achievement records.

Note: This is a sample report generated for demonstration purposes.
  `;
  
  downloadFile(`NAAC_Report_${new Date().toISOString().split('T')[0]}.txt`, reportContent);
};

export const downloadCSVTemplate = () => {
  const csvContent = `student_id,certificate_title,category,description,issued_by
STU123,"Research Paper Publication","Research","Published in IEEE Conference","IEEE Conference"
STU124,"Cultural Event Winner","Cultural","First place in dance competition","Cultural Committee"
STU125,"Programming Contest","Technical","Second place in coding contest","ACM Chapter"`;
  
  downloadFile('certificate_upload_template.csv', csvContent, 'text/csv');
};