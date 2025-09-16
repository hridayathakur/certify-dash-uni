import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Upload, 
  BarChart3, 
  FileBarChart, 
  Settings, 
  Download,
  Users,
  Award,
  TrendingUp,
  PieChart
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Pie } from 'recharts';
import { Certificate, NAACCriteria } from '@/types';
import { toast } from '@/hooks/use-toast';

// Mock data
const mockAnalytics = {
  categoryData: [
    { name: 'Research', value: 45, color: '#3b82f6' },
    { name: 'Cultural', value: 30, color: '#10b981' },
    { name: 'Sports', value: 15, color: '#f59e0b' },
    { name: 'Technical', value: 35, color: '#8b5cf6' },
    { name: 'Academic', value: 25, color: '#ef4444' }
  ],
  monthlyTrends: [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 19 },
    { month: 'Mar', count: 15 },
    { month: 'Apr', count: 28 },
    { month: 'May', count: 22 },
    { month: 'Jun', count: 35 }
  ],
  participationTrends: [
    { month: 'Jan', students: 150 },
    { month: 'Feb', students: 180 },
    { month: 'Mar', students: 165 },
    { month: 'Apr', students: 220 },
    { month: 'May', students: 195 },
    { month: 'Jun', students: 250 }
  ]
};

const naacCriteria: NAACCriteria[] = [
  { id: '5.1.1', code: '5.1.1', title: 'Student Support', description: 'Number of students benefited by scholarships and freeships' },
  { id: '5.1.2', code: '5.1.2', title: 'Guidance for Career', description: 'Number of students benefitted by guidance for competitive examinations' },
  { id: '5.1.3', code: '5.1.3', title: 'Capability Enhancement', description: 'Number of students benefitted by capability enhancement and development schemes' },
  { id: '5.2.1', code: '5.2.1', title: 'Student Placement', description: 'Number of students qualifying in state/national/international level examinations' },
  { id: '5.2.2', code: '5.2.2', title: 'Student Progression', description: 'Number of students progressing to higher education' },
  { id: '5.2.3', code: '5.2.3', title: 'Student Participation', description: 'Number of students participated in extracurricular activities' }
];

export function FacultyDashboard() {
  const [activeSection, setActiveSection] = useState('upload');
  const [uploadData, setUploadData] = useState({
    studentIds: '',
    category: '',
    title: '',
    description: '',
    issuedBy: ''
  });
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: 'Files Uploaded',
        description: `${files.length} file(s) uploaded successfully for processing.`
      });
    }
  };

  const handleBulkUpload = () => {
    if (!uploadData.studentIds || !uploadData.category || !uploadData.title) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Certificates Uploaded',
      description: 'Certificates have been uploaded and sent to students for approval.'
    });

    // Reset form
    setUploadData({
      studentIds: '',
      category: '',
      title: '',
      description: '',
      issuedBy: ''
    });
  };

  const handleNAACReport = () => {
    if (selectedCriteria.length === 0) {
      toast({
        title: 'No Criteria Selected',
        description: 'Please select at least one NAAC criteria.',
        variant: 'destructive'
      });
      return;
    }

    // Simulate AI report generation
    toast({
      title: 'Generating NAAC Report',
      description: 'AI is processing your selected criteria. Report will be ready for download shortly.'
    });

    setTimeout(() => {
      toast({
        title: 'Report Generated',
        description: 'NAAC compliance report has been generated successfully.'
      });
    }, 3000);
  };

  const toggleCriteria = (criteriaId: string) => {
    setSelectedCriteria(prev => 
      prev.includes(criteriaId) 
        ? prev.filter(id => id !== criteriaId)
        : [...prev, criteriaId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-muted-foreground">Participating students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NAAC Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A++</div>
            <p className="text-xs text-muted-foreground">Grade based on data</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="naac">NAAC Reports</TabsTrigger>
          <TabsTrigger value="manage">Manage Records</TabsTrigger>
        </TabsList>

        {/* Upload Certificates */}
        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Single/Bulk Upload</CardTitle>
                <CardDescription>Upload certificates for individual or multiple students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="studentIds">Student ABC IDs (comma-separated)</Label>
                  <Textarea
                    id="studentIds"
                    placeholder="STU123, STU124, STU125..."
                    value={uploadData.studentIds}
                    onChange={(e) => setUploadData(prev => ({ ...prev, studentIds: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={uploadData.category} onValueChange={(value) => setUploadData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Placement">Placement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="title">Certificate Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter certificate title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter certificate description"
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="issuedBy">Issued By</Label>
                  <Input
                    id="issuedBy"
                    placeholder="Issuing organization"
                    value={uploadData.issuedBy}
                    onChange={(e) => setUploadData(prev => ({ ...prev, issuedBy: e.target.value }))}
                  />
                </div>
                
                <Button onClick={handleBulkUpload} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Certificates
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>Upload certificate files (PDF, CSV, Images)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.csv,.jpg,.png,.jpeg"
                    onChange={handleFileUpload}
                    className="max-w-xs"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, CSV, JPG, PNG. Max size: 10MB per file.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Certificate distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockAnalytics.categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockAnalytics.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Certificate Trends</CardTitle>
                <CardDescription>Certificates issued over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAnalytics.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Participation Trends</CardTitle>
                <CardDescription>Active student participation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockAnalytics.participationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* NAAC Reports */}
        <TabsContent value="naac" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate NAAC Reports</CardTitle>
              <CardDescription>Select criteria and generate AI-powered NAAC compliance reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Select NAAC Criteria:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {naacCriteria.map((criteria) => (
                    <div key={criteria.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={criteria.id}
                        checked={selectedCriteria.includes(criteria.id)}
                        onCheckedChange={() => toggleCriteria(criteria.id)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={criteria.id} className="font-medium">
                          {criteria.code} - {criteria.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {criteria.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Selected Criteria: {selectedCriteria.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCriteria.length > 0 ? selectedCriteria.join(', ') : 'No criteria selected'}
                  </p>
                </div>
                <Button onClick={handleNAACReport} disabled={selectedCriteria.length === 0}>
                  <FileBarChart className="h-4 w-4 mr-2" />
                  Generate Report with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Records */}
        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Records Management</CardTitle>
              <CardDescription>View and manage all student certificate records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Certificates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>STU123</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>4 certificates</TableCell>
                    <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>STU124</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>2 certificates</TableCell>
                    <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>STU125</TableCell>
                    <TableCell>Mike Johnson</TableCell>
                    <TableCell>6 certificates</TableCell>
                    <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}