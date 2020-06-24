<template>
  <div id="app">


  <div :style="{
    'display':'flex',
    'justify-items':'end'
  }">
  <h2>{{menuItem}}</h2>
    <Plotly v-if="loaded"
    sty
    :data="nutritionByCategory"
    :layout="layout"
    :display-mode-bar="false" 
    />
</div>  


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
            pageViewsByCategoryData: null,
            layout: {
                autosize: false, 
                width:750,
                barmode:'stack'
            },
            menuItem:''
        }
},
  async created() {
        let resp = await fetch("https://v2-api.sheety.co/fb879a747168332af39e699cb4ca1d0f/menudp/mcdonalds/");
        let data = await resp.json();

        let breakfast = data.mcdonalds.filter(m => m.category === "Breakfast")
        //let pageViewsByCategory = data.pageViewsByCategory;

        // setup data for line chart
        console.log(breakfast)

        // setup data for pie chart
        this.nutritionByCategory = [
            {
                values: [234,456,456],
                labels: ['l','n','d'], 
                marker:{ colors:[
                  '#AF832D',
                  '#75635B',
                  '#C1B5A8'
                ]
                },
                type: 'pie',
                showlegend: false,
                hole:.4
            }
        ];
        let food = breakfast.filter(br => br.item ==="Egg McMuffin")[0]
        this.menuItem = food.item
        //let filter =['protein']
        const foodFilter = Object.values(food)
        console.log(foodFilter)
        console.log(foodFilter.reduce((acu, cV) => {console.log(acu, cV)},{}) ) 

        //for (let f in food){
          
          //this.nutritionByCategory[0].labels.push(f)
          //this.nutritionByCategory[0].values.push(food[f])
        //}


        /*for(let cat in pageViewsByCategory) {
           
            console.log(pageViewsByCategory, cat)
            
            this.pageViewsByCategoryData[0].labels.push("dummy");
            this.pageViewsByCategoryData[0].values.push(4);
        }*/


        // setup data for stacked bar
        

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
