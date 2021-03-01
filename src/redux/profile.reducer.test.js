import profileReducer, { addProfilePost, getProfileStatusSuccess, removeProfilePost } from "./profile.reducer"

it('length of profilePosts should be incremented', () => {
   // test data
   let state = {
      profilePosts: []
   }
   let action = addProfilePost('hello')
   // test action 
   let newState = profileReducer(state, action)
   // test expectation
   expect(newState.profilePosts.length).toBe(1)
})
it('length of profilePosts should be decremented', () => {
   //test date
   let state = {
      profilePosts: [{ post: 'Hello my friends', id: '4141rjefwad1' }]
   }
   let action = removeProfilePost('4141rjefwad1')
   //test action 
   let newState = profileReducer(state, action)
   //expectation 
   expect(newState.profilePosts.length).toBe(0)
})
it('status exist should be correct', () => {
   // test data 
   let state = {
      profileStatus: null
   }
   let action = getProfileStatusSuccess('happy')
   // test action 
   let newState = profileReducer(state, action)
   // expectation 
   expect(newState.profileStatus).toBe('happy')
})
it('status length should be less than 10', () => {
   //test data
   let state = {
      profileStatus: null
   }
   let action = getProfileStatusSuccess('happy')
   //test action
   let newState = profileReducer(state, action)
   //test expectation
   expect(newState.profileStatus.length).toBeLessThan(6)
})
