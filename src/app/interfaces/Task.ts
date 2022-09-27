export interface Task {
  id?: string;
  name: string;
  description?: string;
  status: string;
  project: string;
  contribuidor?: string;
}