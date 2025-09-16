import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Download, Search, QrCode, Share, Eye } from 'lucide-react';
import { Certificate } from '@/types';
import { toast } from '@/hooks/use-toast';
import * as QRCode from 'qrcode.react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Demo data
const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Research Paper Publication',
    category: 'Research',
    issuedBy: 'IEEE Conference',
    issuedDate: '2024-01-15',
    status: 'pending',
    studentId: 'STU123',
    description: 'Published research paper on AI in Education'
  },
  {
    id: '2',
    title: 'Cultural Fest Winner',
    category: 'Cultural',
    issuedBy: 'University Cultural Committee',
    issuedDate: '2024-02-20',
    status: 'pending',
    studentId: 'STU123',
    description: 'First place in inter-college dance competition'
  },
  {
    id: '3',
    title: 'Programming Contest',
    category: 'Technical',
    issuedBy: 'ACM Student Chapter',
    issuedDate: '2024-01-10',
    status: 'accepted',
    studentId: 'STU123',
    description: 'Second place in regional programming contest'
  },
  {
    id: '4',
    title: 'Internship Completion',
    category: 'Academic',
    issuedBy: 'Tech Corp Solutions',
    issuedDate: '2023-12-15',
    status: 'accepted',
    studentId: 'STU123',
    description: 'Completed 6-month software development internship'
  }
];

export function StudentDashboard() {
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  
  const pendingCertificates = certificates.filter(cert => cert.status === 'pending');
  const acceptedCertificates = certificates.filter(cert => cert.status === 'accepted');
  
  const filteredAccepted = acceptedCertificates.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCertificateAction = (id: string, action: 'accept' | 'reject') => {
    setCertificates(prev => 
      prev.map(cert => 
        cert.id === id 
          ? { ...cert, status: action === 'accept' ? 'accepted' : 'rejected' }
          : cert
      )
    );
    
    toast({
      title: action === 'accept' ? 'Certificate Accepted' : 'Certificate Rejected',
      description: `Certificate has been ${action}ed successfully.`,
      variant: action === 'accept' ? 'default' : 'destructive'
    });
  };

  const handleDownload = (cert: Certificate) => {
    // Simulate download
    toast({
      title: 'Download Started',
      description: `Downloading ${cert.title} certificate...`
    });
  };

  const portfolioUrl = `https://university.edu/portfolio/STU123`;

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Certificates</CardTitle>
            <Badge variant="secondary">{pendingCertificates.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingCertificates.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted Certificates</CardTitle>
            <Badge variant="secondary">{acceptedCertificates.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{acceptedCertificates.length}</div>
            <p className="text-xs text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Score</CardTitle>
            <Badge variant="secondary">Excellent</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">85/100</div>
            <p className="text-xs text-muted-foreground">Based on achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Certificates</TabsTrigger>
          <TabsTrigger value="accepted">Accepted Certificates</TabsTrigger>
          <TabsTrigger value="portfolio">Digital Portfolio</TabsTrigger>
        </TabsList>

        {/* Pending Certificates */}
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Certificates</CardTitle>
              <CardDescription>Review and accept/reject certificates issued to you</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingCertificates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending certificates</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingCertificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Issued by: {cert.issuedBy}</span>
                          <span>Date: {new Date(cert.issuedDate).toLocaleDateString()}</span>
                          <Badge variant="outline">{cert.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleCertificateAction(cert.id, 'accept')}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCertificateAction(cert.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accepted Certificates */}
        <TabsContent value="accepted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accepted Certificates</CardTitle>
              <CardDescription>Download and manage your accepted certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Issued By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccepted.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{cert.title}</div>
                          <div className="text-sm text-muted-foreground">{cert.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{cert.category}</Badge>
                      </TableCell>
                      <TableCell>{cert.issuedBy}</TableCell>
                      <TableCell>{new Date(cert.issuedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(cert)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Digital Portfolio */}
        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Digital Portfolio</CardTitle>
                  <CardDescription>Your comprehensive achievement portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries({
                    'Research': acceptedCertificates.filter(c => c.category === 'Research'),
                    'Technical': acceptedCertificates.filter(c => c.category === 'Technical'),
                    'Cultural': acceptedCertificates.filter(c => c.category === 'Cultural'),
                    'Academic': acceptedCertificates.filter(c => c.category === 'Academic')
                  }).map(([category, certs]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-semibold text-lg">{category} ({certs.length})</h4>
                      <div className="grid gap-2">
                        {certs.map((cert) => (
                          <div key={cert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">{cert.title}</p>
                              <p className="text-sm text-muted-foreground">{cert.issuedBy}</p>
                            </div>
                            <Badge variant="secondary">{new Date(cert.issuedDate).getFullYear()}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio QR Code</CardTitle>
                  <CardDescription>Share your achievements</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex justify-center">
                    <QRCode.QRCodeSVG value={portfolioUrl} size={150} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan to view portfolio
                  </p>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Portfolio Preview</DialogTitle>
                        </DialogHeader>
                        <div className="text-center space-y-4">
                          <QRCode.QRCodeSVG value={portfolioUrl} size={200} />
                          <p className="text-sm">{portfolioUrl}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}