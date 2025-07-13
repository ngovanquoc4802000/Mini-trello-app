export interface CardAll {
  message: string;
  description: string;
  cards: Card[];
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
