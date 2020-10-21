<template>
  <div id="app">
    
    <Header/>

    <div class="flex justify-items-start ml-3 mb-5">
      <p class="font-bold text-3xl  lg:text-6xl text-left" >Find the nutrional value of you favorite restaurants</p>
    </div>

  <div :style="{
    'display':'flex',
    'justify-items':'end'
  }">
  
    <!--Plotly v-if="loaded"
    sty
    :data="nutritionByCategory"
    :layout="layout"
    :display-mode-bar="false" 
    /-->
</div>  

<Graph
v-if="loaded"
:data-info="nutritionByCategory"
:menuItem="menuItem"
/>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import { Plotly } from 'vue-plotly'
import Graph from './components/Graph'
import { actions }from "./action"
import Header from './components/Header';


export default {
  name: 'App',
  components: {
    //Plotly,
    Graph,
    Header
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
            menuItem: null
        }
},
async created() {

        let data = await actions.getData()
        console.log(data)
        let breakfast = data.mcdonalds.filter(m => m.category === "Breakfast")
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
        //let resp =  await actions.getData()
        //console.log(resp)

        /*let resp = await fetch("https://v2-api.sheety.co/fb879a747168332af39e699cb4ca1d0f/menudp/mcdonalds/");
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
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
