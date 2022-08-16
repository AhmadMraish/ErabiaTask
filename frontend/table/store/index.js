import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import tabledata from "./modules/tabledata";

const createStore = () => {
  return new Vuex.Store({
    modules: {
        tabledata
    },
  });
};

export default createStore;
