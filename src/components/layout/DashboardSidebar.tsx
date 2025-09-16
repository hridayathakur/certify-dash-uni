import React from 'react';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { 
  GraduationCap, 
  FileText, 
  CheckCircle, 
  User, 
  Upload, 
  BarChart3, 
  FileBarChart,
  History,
  Settings,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const navigationItems = {
  student: [
    { title: 'Pending Certificates', icon: FileText, id: 'pending' },
    { title: 'Accepted Certificates', icon: CheckCircle, id: 'accepted' },
    { title: 'Digital Portfolio', icon: User, id: 'portfolio' },
  ],
  faculty: [
    { title: 'Upload Certificates', icon: Upload, id: 'upload' },
    { title: 'Analytics', icon: BarChart3, id: 'analytics' },
    { title: 'NAAC Reports', icon: FileBarChart, id: 'naac' },
    { title: 'Manage Records', icon: Settings, id: 'manage' },
  ],
  organizer: [
    { title: 'Upload Certificates', icon: Upload, id: 'upload' },
    { title: 'Upload History', icon: History, id: 'history' },
  ]
};

interface DashboardSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  const items = navigationItems[user.role] || [];

  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarContent>
        {/* Logo and Title */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div className="group-data-[collapsible=icon]:hidden">
              <h2 className="font-bold text-lg">University Portal</h2>
              <p className="text-sm text-muted-foreground capitalize">{user.role} Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeSection === item.id}
                    onClick={() => onSectionChange?.(item.id)}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info and Logout */}
        <div className="mt-auto p-4 border-t">
          <div className="mb-3 group-data-[collapsible=icon]:hidden">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={logout}
            className="w-full"
          >
            <Award className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-2" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}