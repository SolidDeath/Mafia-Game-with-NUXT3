import { defineStore } from 'pinia'


export const useCartStore = defineStore('user', {
    state: () => ({
        accessLevel: 0,
        userId: null
    }),
    getters: {
        getUserId: (state) => {
            return state.userId
        },
        getAccessLevel: (state) => {
            return state.accessLevel
        }
    },
    actions: {
    }
})