export type InfoContactsPhotoType = {
   small: string | null,
   large: string | null
}
export type UsersType = {
   id: number,
   name: string,
   status: string,
   photos: InfoContactsPhotoType,
   followed: boolean
}