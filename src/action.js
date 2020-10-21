

const actions = {
    async getData(){
        //let resp = await fetch("https://v2-api.sheety.co/fb879a747168332af39e699cb4ca1d0f/menudp/mcdonalds/");
        //let data = await resp.json();
        let data = { mcdonalds:[ {id: 2, category: "Breakfast", item: "Egg McMuffin", servingSize: "4.8 oz (136 g)", calories: 300,},
        {id: 3, category: "Breakfast", item: "Egg White Delight", servingSize: "4.8 oz (135 g)", calories: 250, },
        {id: 4, category: "Breakfast", item: "Sausage McMuffin", servingSize: "3.9 oz (111 g)", calories: 370, },
        {id: 5, category: "Breakfast", item: "Sausage McMuffin with Egg", servingSize: "5.7 oz (161 g)", calories: 450,}]
               
                }
        return data
        //console.log(data)
    }
}


export  {actions}