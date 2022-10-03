import { Project } from "./Project";
import { Contributor } from "./Contributor";

export interface Task {
  id?: string;
  name: string;
  description?: string;
  status: string;
  project: Project;
  contributor?: Contributor;
}