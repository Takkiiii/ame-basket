import Vue from './../../node_modules/vue/dist/vue'

let app:Vue = new Vue({
  el: '#app',
  render: (h)=>h('p', 'Hello, world.')
});