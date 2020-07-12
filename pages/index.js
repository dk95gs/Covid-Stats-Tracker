import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Head from 'next/head'
import axios from 'axios'
import {  
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import BarGraph from '../components/BarGraph/BarGraph';
import countries from '../public/countries.json';
import MyNavbar from '../components/MyNavbar/MyNavbar'
export default function Home() {
  const [chartWidth, setChartWidth] = useState(0);
  const [countryCodes, setCountryCodes] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [graphOn, setGraphOn] = useState(false);
  const [testData, setTestData] = useState([{
    "name": "Page A",
    "recovered": 4000,
    "confirmed": 2400,
    "deaths" : 2400
  }]);
  useEffect(() => {
    setChartWidth(screen.width);
  });
  const data = [
    {
      "name": "Page A",
      "recovered": 4000,
      "confirmed": 2400,
      "deaths" : 2400
    }
  ]
  let btnClick = async(code) =>{
    let btn = document.getElementById(code);
    if(btn.className == "btn"){
        btn.classList.add("btn-primary");
        setCountryCodes(countryCodes.concat(code));
        
    } else {
      btn.classList.remove("btn-primary");
      _.remove(countryCodes, (n)=>{
        return n == code;
      });
      
        setBarChartData(barChartData => barChartData.filter(item => item.code !== code));
    }
    
   
  }
  async function formatBarGraphData(countries) {
    
    for (let index = 0; index < countries.length; index++) {
        await axios.get("https://corona-api.com/countries/"+countries[index]).then(res=>{
        let data = res.data.data;    
            let obj = {
                "name": data.name,
                "confirmed": data.latest_data.confirmed,
                "recovered": data.latest_data.recovered,
                "deaths": data.latest_data.deaths,
                "code":data.code
            }
            if(_.find(barChartData, {name:data.name}) == undefined){
              setBarChartData(barChartData =>[...barChartData, obj])
            }
            
        })
    }
    console.log('done')
}
  let btnConfirm = async() =>{
    await formatBarGraphData(countryCodes);
    setGraphOn(true);
   
  }
  return (

    <Container fluid className="text-center">
          <MyNavbar/>
      <Head>
        <title>Covid 19 Stats Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 >
          Compare Covid-19 Cases By Country
        </h1>
        <Row>
          <Col>
           {graphOn == true ?  <BarGraph chartWidth={chartWidth} data={barChartData}/> : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={()=>{btnConfirm()}}>Add to chart</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p><b>Select the countries you want and click the button to add to the chart</b></p>
            <p><b>Unselecting a country will automatically remove it from the chart</b></p>
            <div>
              {countries.map((item)=>{
                return <button className="btn" onClick={()=>{btnClick(item.code)}} id={item.code} style={{margin:'3px', border:"2px solid #4CAF50"}}>{item.name}</button>
              })}
            </div>
          </Col>
        </Row>
      </main>
    </Container>
  )
}
