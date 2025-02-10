export interface Job{
    id: number;
    location: string;
    positionName: string;
    area: string;
}

export interface HomeProps{
    jobs: Job[];
}