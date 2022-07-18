import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type boxElems = {
  value: number;
  isHeld: boolean;
  id: string;
};

interface boxType {
  items: boxElems[];
  game: boolean;
}

const boxItems: boxType = {
  items: [],
  game: false,
};

const boxSlice = createSlice({
  name: 'boxes',
  initialState: boxItems,
  reducers: {
    setBoxes(state, action: PayloadAction<boxElems[]>) {
      state.items = action.payload;
    },
    setGame(state, action: PayloadAction<boolean>) {
      state.game = action.payload;
    },
  },
});

export const gameSelector = (state: RootState) => state.boxSlice.game;
export const boxSelector = (state: RootState) => state.boxSlice.items;
export const { setBoxes, setGame } = boxSlice.actions;
export default boxSlice.reducer;
