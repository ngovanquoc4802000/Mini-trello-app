export interface BoardAll {
  success: boolean
  description: string
  boards: Board[]
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