import { Task } from "./Task";
import { Team } from "./Team";

export interface Contributor {
  id?: string;
  name: string;
  office: string;
  avatar?: string;
  team?: Team;
  tasks?: Task[];
}