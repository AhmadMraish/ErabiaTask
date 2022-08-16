import gql from 'graphql-tag'
// i am unable to acccess the .query property of the gql tag
// need to find solution, but its working outside of the vuex module

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
      await this.$apollo
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
          console.log(data)
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
