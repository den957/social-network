import profileReducer, { addProfilePost, getProfileStatusSuccess, removeProfilePost } from "./profile.reducer"
let state = {
   profileMeInfo: null,
   profileInfo: null,
   profileImage: null,
   profileStatus: '',
   profilePosts: []
}
it('length of profilePosts should be incremented', () => {
   let action = addProfilePost({ id: '1241411', date: '12.03.2021', post: 'Hello world' })
   // test action 
   let newState = profileReducer(state, action)
   // test expectation
   expect(newState.profilePosts.length).toBe(1)
})
it('length of profilePosts should be decremented', () => {
   let action = removeProfilePost('1241411')
   //test action 
   let newState = profileReducer(state, action)
   //expectation 
   expect(newState.profilePosts.length).toBe(0)
})
it('status exist should be correct', () => {
   let action = getProfileStatusSuccess('happy')
   // test action 
   let newState = profileReducer(state, action)
   // expectation 
   expect(newState.profileStatus).toBe('happy')
})
it('status length should be less than 10', () => {
   let action = getProfileStatusSuccess('happy')
   //test action
   let newState = profileReducer(state, action)
   //test expectation
   expect(newState.profileStatus.length).toBeLessThan(6)
})
