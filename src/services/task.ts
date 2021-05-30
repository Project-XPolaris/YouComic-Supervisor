export type TaskType = 'ScanLibrary' | 'MatchLibrary';
export interface Task {
  id: string;
  status: string;
  type: TaskType;
  data: ScanLibraryTask | MatchLibraryTask;
}

export interface ScanLibraryTask {
  targetDir: string;
  libraryId: number;
  name: string;
  total: number;
  current: number;
}

export interface MatchLibraryTask {
  targetDir: string;
  libraryId: number;
  name: string;
  total: number;
  current: number;
}
