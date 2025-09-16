export interface User {
  id: string;
  role: 'student' | 'faculty' | 'organizer';
  name: string;
  email: string;
}

export interface Certificate {
  id: string;
  title: string;
  category: 'Research' | 'Cultural' | 'Sports' | 'Placement' | 'Academic' | 'Technical';
  issuedBy: string;
  issuedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  studentId: string;
  fileUrl?: string;
  description?: string;
  reason?: string;
}

export interface AnalyticsData {
  totalCertificates: number;
  categoryDistribution: Record<string, number>;
  monthlyTrends: Array<{ month: string; count: number }>;
  acceptanceRate: number;
}

export interface NAACCriteria {
  id: string;
  code: string;
  title: string;
  description: string;
}