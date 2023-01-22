

import type { Project, Budget } from './db.server'


const _project: Project = {
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
}

const _budget: Budget = {
  id: 1,
  name: "Default Budget",
  description: "Default Budget",
  cost: 0,
  cash: 0,
  year: 2020,
  note: "Default Budget",
}
