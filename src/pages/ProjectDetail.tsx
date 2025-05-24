
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import { DatabaseService } from '@/services/database';
import { UniformProject } from '@/types/database';
import { toast } from 'sonner';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<UniformProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const projectData = await DatabaseService.getProjectById(id);
      setProject(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!project) return;
    
    try {
      const pdfUrl = await DatabaseService.exportProjectToPDF(project.id);
      toast.success('PDF generated successfully!', {
        description: `File: ${pdfUrl}`
      });
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Project Not Found</h2>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-black">{project.name}</h1>
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button asChild>
                <Link to="/">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Design
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Project Details</CardTitle>
              <CardDescription>Information about this uniform design</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Project Name</label>
                <p className="text-lg text-black">{project.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <p className="text-lg text-black capitalize">{project.status.replace('_', ' ')}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Created Date</label>
                <p className="text-lg text-black">{new Date(project.created_at).toLocaleDateString()}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Last Updated</label>
                <p className="text-lg text-black">{new Date(project.updated_at).toLocaleDateString()}</p>
              </div>

              {project.customer_email && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer Email</label>
                  <p className="text-lg text-black">{project.customer_email}</p>
                </div>
              )}

              {project.customer_name && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer Name</label>
                  <p className="text-lg text-black">{project.customer_name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customization Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Design Customization</CardTitle>
              <CardDescription>Current uniform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Player Name</label>
                <p className="text-lg text-black font-bold">{project.customization.playerName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Player Number</label>
                <p className="text-lg text-black font-bold">{project.customization.playerNumber}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Base Color</label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: project.customization.baseColor }}
                  />
                  <p className="text-lg text-black">{project.customization.baseColor}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Accent Color</label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: project.customization.accentColor }}
                  />
                  <p className="text-lg text-black">{project.customization.accentColor}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Pattern</label>
                <p className="text-lg text-black capitalize">{project.customization.pattern}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Current View</label>
                <p className="text-lg text-black capitalize">{project.current_view}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
