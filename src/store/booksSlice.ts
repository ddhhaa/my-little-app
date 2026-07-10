import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type BooksState = {
  statuses: Record<number, string>;
};

const initialState: BooksState = {
  statuses: JSON.parse(
    localStorage.getItem("book-statuses") || "{}"
  ),
};

const booksSlice = createSlice({
  name: "books",

  initialState,

  reducers: {
    setBookStatus(
      state,
      action: PayloadAction<{
        bookId: number;
        status: string;
      }>
    ) {
      state.statuses[action.payload.bookId] =
        action.payload.status;

      localStorage.setItem(
        "book-statuses",
        JSON.stringify(state.statuses)
      );
    }
  },
});

export const { setBookStatus } = booksSlice.actions;

export default booksSlice.reducer;