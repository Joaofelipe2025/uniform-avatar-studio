
import { supabase } from '@/integrations/supabase/client';
import { UniformProject, ProjectStats } from '@/types/database';

export class DatabaseService {
  static async getAllProjects(): Promise<UniformProject[]> {
    try {
      const { data, error } = await supabase
        .from('uniform_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      // Convert the Supabase data to our UniformProject type
      return (data || []).map(project => ({
        ...project,
        customization: project.customization as UniformProject['customization']
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  static async getProjectById(id: string): Promise<UniformProject | null> {
    try {
      const { data, error } = await supabase
        .from('uniform_projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return null;
      }

      // Convert the Supabase data to our UniformProject type
      return {
        ...data,
        customization: data.customization as UniformProject['customization']
      };
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  static async saveProject(project: Omit<UniformProject, 'id' | 'created_at' | 'updated_at'>): Promise<UniformProject> {
    try {
      const { data, error } = await supabase
        .from('uniform_projects')
        .insert(project)
        .select()
        .single();

      if (error) {
        console.error('Error saving project:', error);
        throw error;
      }

      // Convert the Supabase data to our UniformProject type
      return {
        ...data,
        customization: data.customization as UniformProject['customization']
      };
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  }

  static async updateProject(id: string, updates: Partial<UniformProject>): Promise<UniformProject | null> {
    try {
      const { data, error } = await supabase
        .from('uniform_projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return null;
      }

      // Convert the Supabase data to our UniformProject type
      return {
        ...data,
        customization: data.customization as UniformProject['customization']
      };
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  }

  static async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('uniform_projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  static async getProjectStats(): Promise<ProjectStats> {
    try {
      const { data, error } = await supabase
        .from('uniform_projects')
        .select('status');

      if (error) {
        console.error('Error fetching stats:', error);
        throw error;
      }

      const projects = data || [];
      
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
