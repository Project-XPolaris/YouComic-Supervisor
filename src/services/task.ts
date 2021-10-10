export type TaskType =
  | 'ScanLibrary'
  | 'MatchLibrary'
  | 'RenameLibraryBookDirectory'
  | 'MoveBook'
  | 'RemoveEmptyTag'
  | 'WriteBookMeta';

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

export interface RemoveEmptyTagTask {
  currentTagName: string;
  total: number;
  current: number;
}
