import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { StudentDashboard } from './StudentDashboard';
import { FacultyDashboard } from './FacultyDashboard';
import { OrganizerDashboard } from './OrganizerDashboard';

export function MainDashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(
    user?.role === 'student' ? 'pending' :
    user?.role === 'faculty' ? 'upload' : 'upload'
  );

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'organizer':
        return <OrganizerDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}