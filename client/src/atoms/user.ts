import { atom } from 'recoil'

export const userLoggedIn = atom<boolean>({
  key: 'user',
  default: false,
})
