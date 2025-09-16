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
import { Upload, History, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UploadRecord {
  id: string;
  title: string;
  category: string;
  studentIds: string[];
  uploadDate: string;
  status: 'pending' | 'processed' | 'completed';
  totalStudents: number;
  acceptedCount: number;
}

// Mock data
const mockUploadHistory: UploadRecord[] = [
  {
    id: '1',
    title: 'Cultural Fest Participation',
    category: 'Cultural',
    studentIds: ['STU123', 'STU124', 'STU125'],
    uploadDate: '2024-01-15',
    status: 'completed',
    totalStudents: 3,
    acceptedCount: 3
  },
  {
    id: '2',
    title: 'Technical Workshop Certificate',
    category: 'Technical',
    studentIds: ['STU123', 'STU126'],
    uploadDate: '2024-01-20',
    status: 'pending',
    totalStudents: 2,
    acceptedCount: 1
  },
  {
    id: '3',
    title: 'Sports Day Winner',
    category: 'Sports',
    studentIds: ['STU127', 'STU128'],
    uploadDate: '2024-01-25',
    status: 'processed',
    totalStudents: 2,
    acceptedCount: 0
  }
];

export function OrganizerDashboard() {
  const [activeSection, setActiveSection] = useState('upload');
  const [uploadData, setUploadData] = useState({
    studentIds: '',
    category: '',
    title: '',
    description: '',
    issuedBy: 'Event Organization Team'
  });
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>(mockUploadHistory);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast({
        title: 'Files Uploaded',
        description: `${files.length} file(s) uploaded successfully for processing.`
      });
    }
  };

  const handleCertificateUpload = () => {
    if (!uploadData.studentIds || !uploadData.category || !uploadData.title) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const studentIdArray = uploadData.studentIds.split(',').map(id => id.trim()).filter(id => id);
    
    const newRecord: UploadRecord = {
      id: Date.now().toString(),
      title: uploadData.title,
      category: uploadData.category,
      studentIds: studentIdArray,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      totalStudents: studentIdArray.length,
      acceptedCount: 0
    };

    setUploadHistory(prev => [newRecord, ...prev]);

    toast({
      title: 'Certificates Uploaded',
      description: `Certificates sent to ${studentIdArray.length} students for approval.`
    });

    // Reset form
    setUploadData({
      studentIds: '',
      category: '',
      title: '',
      description: '',
      issuedBy: 'Event Organization Team'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'processed': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'processed': return <Clock className="h-4 w-4" />;
      case 'pending': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadHistory.length}</div>
            <p className="text-xs text-muted-foreground">Certificate uploads</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Reached</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {uploadHistory.reduce((acc, record) => acc + record.totalStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total recipients</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {uploadHistory.length > 0 
                ? Math.round((uploadHistory.reduce((acc, record) => acc + record.acceptedCount, 0) / 
                   uploadHistory.reduce((acc, record) => acc + record.totalStudents, 0)) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Average acceptance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {uploadHistory.filter(record => record.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Certificates</TabsTrigger>
          <TabsTrigger value="history">Upload History</TabsTrigger>
        </TabsList>

        {/* Upload Certificates */}
        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Upload</CardTitle>
                <CardDescription>Upload certificates for students by ABC ID</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="studentIds">Student ABC IDs (comma-separated)</Label>
                  <Textarea
                    id="studentIds"
                    placeholder="STU123, STU124, STU125..."
                    value={uploadData.studentIds}
                    onChange={(e) => setUploadData(prev => ({ ...prev, studentIds: e.target.value }))}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter student IDs separated by commas
                  </p>
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
                    value={uploadData.issuedBy}
                    onChange={(e) => setUploadData(prev => ({ ...prev, issuedBy: e.target.value }))}
                  />
                </div>
                
                <Button onClick={handleCertificateUpload} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Certificates
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>CSV Upload</CardTitle>
                <CardDescription>Upload student data via CSV file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload CSV file with student data
                  </p>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="max-w-xs"
                  />
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><strong>CSV Format:</strong></p>
                  <p>student_id, certificate_title, category, description</p>
                  <p><strong>Example:</strong></p>
                  <p>STU123, "Research Paper", "Research", "Published in IEEE"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Upload History */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>Track the status of your certificate uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Acceptance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {record.studentIds.length > 3 
                              ? `${record.studentIds.slice(0, 3).join(', ')}...`
                              : record.studentIds.join(', ')
                            }
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.category}</Badge>
                      </TableCell>
                      <TableCell>{record.totalStudents}</TableCell>
                      <TableCell>{new Date(record.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1 capitalize">{record.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {record.acceptedCount}/{record.totalStudents}
                          <div className="text-xs text-muted-foreground">
                            {record.totalStudents > 0 
                              ? Math.round((record.acceptedCount / record.totalStudents) * 100)
                              : 0}% accepted
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}