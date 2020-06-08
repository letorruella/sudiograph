<template>
  <div id="app">


    <h2>Page Views</h2>
    <Plotly v-if="loaded" 
    :data="pageViewData" 
    :layout="layout" 
    :display-mode-bar="false" />

  <h2>Views by Category</h2>
    <Plotly v-if="loaded"
    :data="pageViewsByCategoryData"
    :layout="layout"
    :display-mode-bar="false" />

  <h2>New vs Returning Visitors</h2>
    <Plotly v-if="loaded"
    :data="visitorsData"
    :layout="layout"
    :display-mode-bar="false" />

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { Plotly } from 'vue-plotly'
export default {
  name: 'App',
  components: {
    Plotly
  },
   data() {
        return {
            loaded: false, 
            pageViewData:null, 
            pageViewsByCategoryData: null,
            visitorsData: null,
            layout: {
                autosize: false, 
                width:750,
                barmode:'stack'
            }
        }
},
  async created() {
        let resp = await fetch("https://api.jsonbin.io/b/5e2b4f673d75894195de48ff/1");
        let data = await resp.json();

        let pageViews = data.pageViews;
        let pageViewsByCategory = data.pageViewsByCategory;
        let visitors = data.newVsReturning;

        // setup data for line chart
        this.pageViewData = [
            { x:[], y:[], type:'scatter' }
        ];

        pageViews.forEach(pv => {
            this.pageViewData[0].x.push(pv.date);
            this.pageViewData[0].y.push(pv.views);
        });

        // setup data for pie chart
        this.pageViewsByCategoryData = [
            {
                values: [],
                labels: [], 
                type: 'pie'
            }
        ];

        for(let cat in pageViewsByCategory) {
            this.pageViewsByCategoryData[0].labels.push(cat);
            this.pageViewsByCategoryData[0].values.push(pageViewsByCategory[cat]);
        }

        this.visitorsData = [
            { 
                x: [], 
                y: [],
                name:'New Users',
                type:'bar'
            },
            { 
                x: [], 
                y: [],
                name:'Old Users',
                type:'bar'
            }
        ]

        // setup data for stacked bar
        visitors.forEach(v => {
            this.visitorsData[0].x.push(v.date);
            this.visitorsData[0].y.push(v.new);
            this.visitorsData[1].x.push(v.date);
            this.visitorsData[1].y.push(v.old);
        });

        this.loaded = true;
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
