export interface CardAll {
  message: string;
  description: string;
  board: AddBoard;
  cards: Card[];
}

export interface AddBoard {
  id: string
  name: string
  description: string
}

export interface CreateCards {
  name: string;
  description: string;
}

export interface Card {
  id: string;
  boardsId: string;
  name: string;
  description: string;
  createdAt: CreatedAt;
}

export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}
