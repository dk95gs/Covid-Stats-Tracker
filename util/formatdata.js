import axios from 'axios';
export async function formatBarGraphData(countries) {
    let formatedData = [];
    for (let index = 0; index < countries.length; index++) {
        await axios.get("https://corona-api.com/countries/"+countries[index]).then(res=>{
        let data = res.data.data;    
            let obj = {
                name: data.name,
                confirmed: data.latest_data.confirmed,
                recovered: data.latest_data.recovered,
                deaths: data.latest_data.deaths
            }
            formatedData.push(obj);
        })
        
    }
    console.log('done')
    console.log(formatedData);
}
