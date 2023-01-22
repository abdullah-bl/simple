
import * as fs from "fs";

const path = process.cwd() + "/public/data.json";



export interface Data {
  projects: Project[];
  budget: Budget[];
  phases: Phase[];
}

export interface Project {
  id: number;
  reference?: string;
  name: string;
  description?: string;
  budget: number;
  year: number;
  startedAt?: Date;
  publishedAt?: Date;
  openingDate?: Date;
  completedAt?: Date;
  started?: boolean;
  completed?: boolean;
  currentPhase?: Phase;
}

export interface Budget {
  id: number;
  reference: string;
  name: string;
  description?: string;
  cost: number;
  cash: number;
  year: number;
  note?: string;
}



export interface Phase {
  id: number;
  name: string;
  description: string;
}


const defaultData = {
  projects: [{
    id: 1,
    name: "Default Project",
    description: "Default Project",
    budget: 0,
    year: 2020,
    startedAt: new Date(),
    publishedAt: new Date(),
    openingDate: new Date(),
    completedAt: new Date(),
    started: false,
    completed: false,
    currentPhase: {
      id: 1,
      name: "Default Phase",
      description: "Default Phase",
    }
  }],
  phases: [
    {
      id: 1,
      name: "Default Phase",
      description: "Default Phase",
    }
  ],
  budget: [
    {
      id: 1,
      name: "Default Budget",
      description: "Default Budget",
      reference: "22222",
      cost: 20000,
      cash: 10000,
      year: 2020,
    }
  ],
}

interface Db {
  path: string;
  set: (data: Data) => void;
  get: () => Data;
  reset: () => void;
}

export const db: Db = {
  path: path,
  set: (data: Data) => {
    try {
      return fs.writeFileSync(path, JSON.stringify(data))
    } catch (error) {
      console.error(error)
      throw error;
    }
  },
  get: (): Data => {
    try {
      return JSON.parse(fs.readFileSync(path, "utf8")) as Data;
    } catch (error) {
      console.error(error);
      console.info('Creating default data file')
      fs.writeFileSync(path, JSON.stringify(defaultData));
      return defaultData;
    }
  },
  reset: () => {
    try {
      return fs.writeFileSync(path, JSON.stringify(defaultData))
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}




