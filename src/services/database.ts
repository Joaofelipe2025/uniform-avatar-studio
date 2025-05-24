
import { UniformProject, ProjectStats } from '@/types/database';

// Mock database service - replace with Supabase when connected
export class DatabaseService {
  private static STORAGE_KEY = 'uniformProjects';

  static async getAllProjects(): Promise<UniformProject[]> {
    try {
      const projects = localStorage.getItem(this.STORAGE_KEY);
      return projects ? JSON.parse(projects) : [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  static async getProjectById(id: string): Promise<UniformProject | null> {
    try {
      const projects = await this.getAllProjects();
      return projects.find(p => p.id === id) || null;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  static async saveProject(project: Omit<UniformProject, 'id' | 'created_at' | 'updated_at'>): Promise<UniformProject> {
    try {
      const projects = await this.getAllProjects();
      const newProject: UniformProject = {
        ...project,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      projects.push(newProject);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
      return newProject;
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  }

  static async updateProject(id: string, updates: Partial<UniformProject>): Promise<UniformProject | null> {
    try {
      const projects = await this.getAllProjects();
      const index = projects.findIndex(p => p.id === id);
      
      if (index === -1) return null;
      
      projects[index] = {
        ...projects[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
      return projects[index];
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  }

  static async deleteProject(id: string): Promise<boolean> {
    try {
      const projects = await this.getAllProjects();
      const filteredProjects = projects.filter(p => p.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProjects));
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  static async getProjectStats(): Promise<ProjectStats> {
    try {
      const projects = await this.getAllProjects();
      
      return {
        totalProjects: projects.length,
        draftProjects: projects.filter(p => p.status === 'draft').length,
        sentProjects: projects.filter(p => p.status === 'sent').length,
        inProgressProjects: projects.filter(p => p.status === 'in_progress').length,
        completedProjects: projects.filter(p => p.status === 'completed').length,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        totalProjects: 0,
        draftProjects: 0,
        sentProjects: 0,
        inProgressProjects: 0,
        completedProjects: 0,
      };
    }
  }

  static async exportProjectToPDF(projectId: string): Promise<string> {
    // Mock PDF generation - implement with actual PDF library or service
    console.log('Generating PDF for project:', projectId);
    return `pdf-export-${projectId}-${Date.now()}.pdf`;
  }
}
