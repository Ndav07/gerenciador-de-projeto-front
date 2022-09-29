import { Team } from "./Team";
import { Task } from "./Task";


export interface Project {
  id: string;
  name: string;
  team?: Team;
  tasks?: Task[];
}