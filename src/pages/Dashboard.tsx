
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Calendar, User, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  customization: any;
  currentView: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed';
  customerEmail?: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('uniformProjects') || '[]');
    const projectsWithStatus = savedProjects.map((project: any) => ({
      ...project,
      status: 'pending',
      customerEmail: 'customer@example.com'
    }));
    setProjects(projectsWithStatus);
  }, []);

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

  const handleDownloadPDF = (project: Project) => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `uniform-design-${project.id}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const stats = {
    total: projects.length,
    pending: projects.filter(p => p.status === 'pending').length,
    inProgress: projects.filter(p => p.status === 'in_progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">A Unique Performance</h1>
              <Badge variant="secondary">Admin Dashboard</Badge>
            </div>
            <nav className="flex space-x-4">
              <Link to="/">
                <Button variant="outline">Back to Configurator</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Uniform Design Projects</CardTitle>
            <CardDescription>
              Manage and download customer uniform designs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No projects found. Create some designs in the configurator first.
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{project.name}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>Customer: {project.customerEmail}</span>
                        <span className="mx-2">•</span>
                        <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>View: {project.currentView}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Player: {project.customization.playerName} #{project.customization.playerNumber}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(project)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Link to={`/dashboard/project/${project.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
