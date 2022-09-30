import { Contributor } from "./Contributor";
import { Project } from "./Project";

export interface Team {
  id?: string;
  name: string;
  project: Project;
  contributors?: Contributor[];
}