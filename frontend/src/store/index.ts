import { defineStore } from 'pinia'
import { Canceler } from 'axios'

export const useCommonStore = defineStore('common', {
  state: () => ({
    cancelers: new Map<string, Canceler>()
  }),

  actions: {
    SET_CANCELERS (payload: Map<string, Canceler>) {
      this.cancelers = payload
    },

    CLEAR_CANCELERS () {
      this.cancelers.forEach(cancaler => {
        cancaler()
      })

      this.cancelers.clear()
    }
  }
})
