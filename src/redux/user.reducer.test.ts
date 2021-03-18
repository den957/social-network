import usersReducer, { followUserSuccess, getOnceUnfollowedSuccess, getUsersUnfollowedSuccess, InitialStateType, unfollowUserSuccess } from './users.reducer';

let state: InitialStateType
beforeEach(() => {
   state = {
      countFollowed: 5,
      countUnfollowed: 24,
      pageFollowed: 1,
      pageUnfollowed: 1,
      usersFollowed: [
         { id: 0, name: 'dan0', status: 'status0', photos: { small: null, large: null }, followed: true },
         { id: 1, name: 'dan1', status: 'status1', photos: { small: null, large: null }, followed: true },
         { id: 2, name: 'dan2', status: 'status2', photos: { small: null, large: null }, followed: true },
         { id: 3, name: 'dan3', status: 'status3', photos: { small: null, large: null }, followed: true },
      ],
      usersUnfollowed: [
         { id: 4, name: 'dan4', status: 'status4', photos: { small: null, large: null }, followed: false },
         { id: 5, name: 'dan5', status: 'status5', photos: { small: null, large: null }, followed: false },
         { id: 6, name: 'dan6', status: 'status6', photos: { small: null, large: null }, followed: false },
         { id: 7, name: 'dan7', status: 'status7', photos: { small: null, large: null }, followed: false },
      ],
      totalCount: null,
      isReadyPage: false,
      readyToggle: [],
      isFetching: false
   }
})

it('length of usersUnfollowed should be incremented', () => {
   let action = getUsersUnfollowedSuccess([{ id: 8, name: 'dan8', status: 'status8', photos: { small: null, large: null }, followed: false }], 1, 1, false)
   let newState = usersReducer(state, action)
   expect(newState.usersUnfollowed.length).toBe(5)
})
it('length of usersUnfollowed should be zero', () => {
   let action = getOnceUnfollowedSuccess()
   let newState = usersReducer(state, action)
   expect(newState.usersUnfollowed.length).toBe(0)
})
it('user became a followed', () => {
   let action = followUserSuccess(4)
   let newState = usersReducer(state, action)
   expect(newState.usersUnfollowed[0].followed).toBeTruthy()
})
it('user became a unfollowed', () => {
   let action = unfollowUserSuccess(3)
   let newState = usersReducer(state, action)
   expect(newState.usersUnfollowed[2].followed).toBeFalsy()
})