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
export interface TaskId {
  id: string;
  cardId: string;
  boardId: string;
  title: string;
  description: string;
  status: string;
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
}
export interface TaskByIdResponse {
  success: boolean;
  message: string;
  description: string;
  task: TaskId; 
}