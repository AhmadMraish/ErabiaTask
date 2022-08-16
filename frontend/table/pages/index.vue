<template>
  <div>
    <table class="tContainer">
      <thead class="theadContainer">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody class="tbodyContainer">
        <!-- v-for to display items use users array -->
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import gql from 'graphql-tag'

export default {
  name: 'IndexPage',
  data: () => ({
    message: 'Hello World',
    users: [],
  }),
  computed: {
    ...mapGetters(['getterTableData']),
  },
  mounted() {
    // this.getDataforTable()     // this is not working due to problem in query inside store
    console.log('mounted')
    this.testData()
  },
  methods: {
    getDataforTable() {
      this.$store.dispatch('getTableData')
    },

    async testData() {
      // fetch data from appolo server using query allUsers
      await this.$apollo
        .query({
          query: gql`
            query allUsers {
              allUsers {
                id
                name
                email
                role
                date
              }
            }
          `,
        })
        .then(({ data }) => {
          this.users = data.allUsers
          console.log('data', this.users)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped lang="scss">
.tContainer {
  // center the table in middle of screen
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  border-collapse: collapse;
  border: 1px solid black;

  .theadContainer {
    border: 1px solid black;

    tr {
      text-align: left;
      padding: 10px 5px;

      border: 1px solid black;
      th {
        // margin: 5px 5px;
        padding: 5px 5px;
        border: 1px solid black;
        // make text bold
        font-weight: bold;
      }
    }
  }

  .tbodyContainer {
    border: 1px solid black;
    tr {
      padding: 10px 5px;
      border: 1px solid black;
      td {
        // margin: 5px 5px;
        padding: 5px 5px;
        border: 1px solid black;
        width: fit-content;
        padding-left: 5px;
        padding-right: 10px;
      }
    }
  }
}
</style>
