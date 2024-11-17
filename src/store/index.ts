import {configureStore} from '@reduxjs/toolkit';
import skillsReducer, {SearchAction, Skills} from '../slices/skillsSlice';
import {createEpicMiddleware, combineEpics, Epic} from 'redux-observable';
import {changeSearchEpic, searchSkillsEpic} from '../epics';

const epic: Epic<SearchAction, SearchAction, Skills> = combineEpics(
  changeSearchEpic,
  searchSkillsEpic,
);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(epic)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
