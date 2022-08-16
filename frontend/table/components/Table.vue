<template>
  <div>
    <p class="sortStatus">{{ this.sortStatus }}</p>
    <div class="tWrapper">
      <input
        @input="onSearch"
        type="text"
        class="tSearch"
        placeholder="Search the table"
      />

      <table class="tContainer">
        <thead class="theadContainer">
          <tr class="theadRow">
            <!-- <th :class="{ asc, desc }" @click="sortByid()">ID</th> -->
            <th
              :class="[
                this.default
                  ? 'default'
                  : this.sorted === 1
                  ? 'asc'
                  : this.sorted === 2
                  ? 'desc'
                  : '',
              ]"
              @click="sortOnclick()"
            >
              ID
            </th>
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
            <td class="td-width">{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td class="td-width">{{ user.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

export default {
  data: () => ({
    oldUsers: [],
    users: [],
    manipulatedArray: [],
    sorted: 1,
    sortStatus: 'null',
    default: true, // default class for asc desc which has no icon
  }),
  computed: {
    ...mapGetters(['getterTableData']),

    asc: {
      get() {
        return this.sorted === 1 ? true : false
      },
      set(value) {
        this.sorted = value === true ? 1 : 2
        // console.log(asc)
      },
    },
    desc: {
      get() {
        return this.sorted === 2 ? true : false
      },
      set(value) {
        this.sorted = value === true ? 2 : 1
        // console.log(desc)
      },
    },
  },
  mounted() {
    this.getDataforTable()
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
          this.oldUsers = data.allUsers
          console.log('data', this.users)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sortOnclick() {
      // clicking on id column will change sorted value to 1 or 2
      // 1 - sorted ascending
      // 2 - sorted descending
      if (this.sorted === 1) {
        this.sorted = 2
        console.log('sorted', this.sorted)
      } else if (this.sorted === 2) {
        this.sorted = 1
        console.log('sorted', this.sorted)
      }
    },

    onSearch(e) {
      // search the table using search input by name
      this.users = this.oldUsers.filter((user) => {
        return user.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
    },
  },
  watch: {
    // we watch the value of sorted and if it is 1 or 2 we will sort the array and we will update the table data with the new array
    // I know that we are mutating the original array but for the sake of simplicity there is no need to over complicate things because
    // there is only two options in the task asc/desc, if there was more options I would not mutate the original array
    // I would have 0 1 2 statuses and then we would sort the array based on the status
    // 0 status would be the unsorted case  ...this.users
    // or I can just save the original value in a bystandard array
    sorted() {
      if (this.sorted === 1) {
        this.manipulatedArray = this.users.sort((a, b) => a.id - b.id)
        this.users = this.manipulatedArray
        this.sortStatus = 'asc'
        this.default = false
      } else if (this.sorted === 2) {
        this.manipulatedArray = this.users.sort((a, b) => b.id - a.id)
        this.users = this.manipulatedArray
        this.sortStatus = 'desc'
        this.default = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.sortStatus {
  position: absolute;
  top: 15%;
  left: 30%;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  padding: 0.5rem;
}
.tWrapper {
  //   center the table in middle of screen
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .tSearch {
    width: 250px;
    margin-bottom: 5px;
    border: none;
    // remove active border from search input
    &:focus {
      outline: none;
    }
  }
  .tContainer {
    width: fit-content;
    border-collapse: collapse;
    border-radius: 2px;
    border-style: hidden;
    box-shadow: 0 0 0 1px #666;

    .theadContainer {
      background: #f3f4f6;
      .theadRow {
        .default {
          &.default:hover {
            cursor: pointer;
          }
        }
        .asc {
          &.asc:hover {
            cursor: pointer;
          }
          &.asc::after {
            display: inline-block;
            content: '▼';
          }
        }
        .desc {
          &.desc:hover {
            cursor: pointer;
          }
          &.desc::after {
            display: inline-block;
            content: '▲';
          }
        }
      }

      tr {
        text-align: left;
        padding: 10px 5px;

        th {
          padding: 5px 5px;

          font-weight: bold;
        }
      }
    }

    .tbodyContainer {
      border: 1px solid black;
      tr {
        border: 0.5px solid black;
        .td-width {
          width: 250px;
        }
        td {
          padding: 5px 5px;
          width: fit-content;
          padding-left: 5px;
          padding-right: 10px;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,
            sans-serif;
        }
      }
    }
  }
}
</style>
