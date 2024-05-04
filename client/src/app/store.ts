/// Redux is a state management that allows us to keep all changes in one place, the store
/// Also, the store is inmutable and all changes should be done by using reducers

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
