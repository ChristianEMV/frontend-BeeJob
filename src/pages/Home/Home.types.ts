export enum EArea {
  DEVELOPERS = "DEVELOPERS",
  TESTING = "TESTING",
  SCRUM_MASTER = "SCRUM_MASTER",
  ARCHITECTS = "ARCHITECTS",
  CODE_REVIEWER = "CODE_REVIEWER",
  QUALITY_CONTROL = "QUALITY_CONTROL",
  PLATAFORMS = "PLATAFORMS",
  LABORATORY = "LABORATORY",
  BUSINESS_INTELLIGENCE = "BUSINESS_INTELLIGENCE",
  BEECKER_ACADEMY = "BEECKER_ACADEMY",
}

export interface Job {
  id: number
  positionName: string
  area: EArea
  location: string
  relocation: boolean
  jobDescription: string
  salary: number
  publicationDate: string
  deadline: string
  requirements: string
  status: boolean
  aditionalInformation: string
}

export interface HomeProps {
  jobs: Job[]
}