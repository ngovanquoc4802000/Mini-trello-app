export interface TasksAll {
  success: boolean;
  message: string;
  description: string;
  tasks: Task[];
}

export interface CreateTasks {
  title: string;
  description: string;
  status: string;
}

export interface Task {
  id: string;
  cardId: string;
  boardId: string;
  title: string;
  description: string;
  status: string;
}
