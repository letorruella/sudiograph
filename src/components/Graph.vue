<template>

  <div>
  <div>
    <p>{{menuItem}}</p>
  </div>

  <div>
    <Plotly
    sty
    :data="dataInfo"
    :layout="layout"
    :display-mode-bar="false" 
    />
  </div>
    <!--div>{{dataInfo}}</div-->
  </div> 



</template>

<script>
import { Plotly } from 'vue-plotly';
export default {
    components: {Plotly},
    name:'Graph',
    props:['dataInfo', 'menuItem'],
    data(){
        return{
        loaded: false, 
            pageViewsByCategoryData: null,
            layout: {
                autosize: true, 
                width:'50vw',
                barmode:'stack'
            },
            
    }}
}
</script>