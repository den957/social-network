export const required = (value) => {
   if (value) {
      return undefined
   }
   else {
      return 'Require filed'
   }
}
export const maxLengthCreator = (maxLength) => {
   return (value) => {
      if (value && value.length < maxLength) {
         return 'Field is too short'
      }
      return undefined
   }
}
