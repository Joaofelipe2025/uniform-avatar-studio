
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Mail, Phone } from 'lucide-react';
import { UniformViewer3D } from '@/components/UniformViewer3D';

interface Project {
  id: number;
  name: string;
  customization: any;
  currentView: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed';
  customerEmail?: string;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('uniformProjects') || '[]');
    const foundProject = savedProjects.find((p: any) => p.id.toString() === id);
    if (foundProject) {
      setProject({
        ...foundProject,
        status: 'pending',
        customerEmail: 'customer@example.com'
      });
    }
  }, [id]);

  const handleDownloadPDF = () => {
    if (!project) return;
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `uniform-design-${project.id}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-black">{project.name}</h1>
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
            <Button onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <Card>
            <CardHeader>
              <CardTitle>3D Preview</CardTitle>
              <CardDescription>Interactive uniform visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg">
                <UniformViewer3D 
                  currentView={project.currentView}
                  customization={project.customization}
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{project.customerEmail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </CardContent>
            </Card>

            {/* Design Details */}
            <Card>
              <CardHeader>
                <CardTitle>Design Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Player Name</label>
                    <p className="font-semibold">{project.customization.playerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Player Number</label>
                    <p className="font-semibold">{project.customization.playerNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Base Color</label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: project.customization.baseColor }}
                      />
                      <span>{project.customization.baseColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Accent Color</label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: project.customization.accentColor }}
                      />
                      <span>{project.customization.accentColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Pattern</label>
                    <p className="font-semibold capitalize">{project.customization.pattern}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current View</label>
                    <p className="font-semibold capitalize">{project.currentView}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Created</span>
                    <span className="text-sm font-medium">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
