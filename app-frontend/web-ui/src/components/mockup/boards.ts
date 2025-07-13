export interface BoardAll {
  success: boolean
  description: string
  boards: Board[]
}

export interface CreateBoardTs {
    name: string;
    description: string;
}

export interface Board {
  id: string
  name: string
  description: string
  createdAt: CreatedAt
}

export interface CreatedAt {
  _seconds: number
  _nanoseconds: number
}

export const initialBoard: Board[] = [];