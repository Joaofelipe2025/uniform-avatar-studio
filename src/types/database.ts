
export interface UniformProject {
  id: string;
  name: string;
  customization: {
    baseColor: string;
    accentColor: string;
    pattern: string;
    playerName: string;
    playerNumber: string;
    logoUrl?: string;
    [key: string]: any;
  };
  current_view: string;
  status: 'draft' | 'sent' | 'in_progress' | 'completed';
  customer_email?: string;
  customer_name?: string;
  customer_phone?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectStats {
  totalProjects: number;
  draftProjects: number;
  sentProjects: number;
  inProgressProjects: number;
  completedProjects: number;
}

export interface DatabaseTables {
  uniform_projects: {
    Row: UniformProject;
    Insert: Omit<UniformProject, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<UniformProject, 'id' | 'created_at' | 'updated_at'>>;
  };
  project_assets: {
    Row: {
      id: string;
      project_id: string;
      asset_type: 'logo' | 'pattern' | 'model';
      asset_url: string;
      created_at: string;
    };
    Insert: Omit<DatabaseTables['project_assets']['Row'], 'id' | 'created_at'>;
    Update: Partial<Omit<DatabaseTables['project_assets']['Row'], 'id' | 'created_at'>>;
  };
}
