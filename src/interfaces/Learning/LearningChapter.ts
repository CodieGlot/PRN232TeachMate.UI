import { LearningMaterial } from './LearningMaterial';
import { LearningModule } from './LearningModule';

export interface LearningChapter {
    id: number;
    name: string;
    description: string;
    learningMaterials: LearningMaterial[];
    learningModule: LearningModule;
    learningModuleId: number;
}