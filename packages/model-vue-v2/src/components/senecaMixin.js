export const senecaMixin = {
  methods: {
    async senecaPost(cmd, data) {
      if (!this.$seneca) {
        console.error('Seneca is not available')
        return null
      }
      return await this.$seneca.post(cmd, data)
    },
  },
}
