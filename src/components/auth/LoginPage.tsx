import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Users, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function LoginPage() {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [activeRole, setActiveRole] = useState('student');
  const { login, isLoading } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.id || !credentials.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const success = login({ ...credentials, role: activeRole });
    
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check your ID and password.",
        variant: "destructive"
      });
    }
  };

  const roleConfig = {
    student: { icon: GraduationCap, label: 'Student Portal', color: 'primary' },
    faculty: { icon: Users, label: 'Faculty Portal', color: 'success' },
    organizer: { icon: Award, label: 'Organizer Portal', color: 'warning' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">University Portal</h1>
          <p className="text-muted-foreground">Digital Certificate & NAAC Management System</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="student" className="text-xs">Student</TabsTrigger>
                <TabsTrigger value="faculty" className="text-xs">Faculty</TabsTrigger>
                <TabsTrigger value="organizer" className="text-xs">Organizer</TabsTrigger>
              </TabsList>
              
              {Object.entries(roleConfig).map(([role, config]) => (
                <TabsContent key={role} value={role} className="space-y-2">
                  <div className="flex items-center gap-2 justify-center">
                    <config.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">{config.label}</CardTitle>
                  </div>
                  <CardDescription className="text-center">
                    Access your dashboard with your university credentials
                  </CardDescription>
                </TabsContent>
              ))}
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id">University ID</Label>
                <Input
                  id="id"
                  placeholder="Enter your ID"
                  value={credentials.id}
                  onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-dashed border-2 border-muted-foreground/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Demo Credentials (For Judges)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-primary/5 rounded">
                <p className="font-semibold">Student</p>
                <p>STU123</p>
                <p>student123</p>
              </div>
              <div className="text-center p-2 bg-success/5 rounded">
                <p className="font-semibold">Faculty</p>
                <p>FAC001</p>
                <p>faculty123</p>
              </div>
              <div className="text-center p-2 bg-warning/5 rounded">
                <p className="font-semibold">Organizer</p>
                <p>ORG001</p>
                <p>organizer123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}