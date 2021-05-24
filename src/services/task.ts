export interface Task {
  id: string;
  targetDir: string;
  libraryId: number;
  name: string;
  total: number;
  current: number;
  status: string;
}
