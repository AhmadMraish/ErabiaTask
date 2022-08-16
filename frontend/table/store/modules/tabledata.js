import gql from 'graphql-tag'

// found temporary solution for not being able to query with this.$apollo.query
// I need to learn if there are missing options and configurations that should be added
// I also learned that apollo is reactive on its own and has its own cache
// Also learned that you can file structure add queries import them etc...
// No need to refactor index page, we already know how to query and fetch data both ways

const tabledata = {
  namespace: true,

  state: {
    tableData: [],
  },

  mutations: {
    setTableData(state, payload) {
      state.tableData = payload
    },
  },

  actions: {
    async getTableData(context) {
      // await this.$apollo
      await this.app.apolloProvider.defaultClient
        .query({
          query: gql`
            query allUsers {
              allUsers {
                id
                name
              }
            }
          `,
        })
        .then(({ data }) => {
          console.log('data coming from the store', data)
          // context.commit('setTableData', data.getTableData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  getters: {
    getterTableData(state) {
      return state.tableData
    },
  },
}
export default tabledata
