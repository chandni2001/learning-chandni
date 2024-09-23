import { createSelector } from 'reselect';


const selectUserState = (state) => state.user;
export const selectUser = (state) => state?.user?.user || null;

export const selectUserToken = createSelector(
  [selectUserState],
  (userState) => userState.token
);
