import { defineStore } from 'pinia'
import { rewardAPI } from '@/services/api.js'

export const useRewardStore = defineStore("rewards", {
  state: () => {
    return {
      rewards: []
    }
  },
  actions: {
    async fetch () {
      try {
        this.rewards = await rewardAPI.getAll()
      } catch (error) {
        console.log('error')
        console.error(error)
      }
    },
    async add (reward) {
      try {
        const response = await rewardAPI.saveNew(reward)
        if (response.success) {
          this.rewards.push({
            ...reward
          })
          return response.reward_id
        }
      } catch (error) {
        console.log('error')
        console.error(error) 
      }
      return false
      
    },
    delete (id) {
      this.rewards = this.rewards.filter(user => user.id != id)
    }
  },
  getters: {
    getRewards (state) {
      return state.rewards
    },
    sortByPoint (state) {
      const sortable = [...state.rewards]
      return sortable.sort((a, b) => {
        return a.point - b.point
      })
    },
    sortByName (state) {
        const sortable = [...state.rewards]
        return sortable.sort((a, b) => {
            return (a.name).localeCompare(b.name)
        })
    }
  }
})