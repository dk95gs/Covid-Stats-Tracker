import React, {useState,  useEffect} from 'react';
import LineGraph from '../components/LineGraph/LineGraph';
import MyAreaChart from '../components/AreaChart/AreaChart';
import {  
    Container,
    Row,
    Col,
    Button, Spinner
  } from 'react-bootstrap';
import axios from 'axios';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import countries from '../public/countries.json';
export default function Graphs() {
    const [chartWidth, setChartWidth] = useState(0);
    const [lineChartData, setLineChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [graphType, setGraphType] = useState("line");
    useEffect(() => {
        setChartWidth(screen.width);
      });
    async function formateLineGraphData(code) {
        setIsLoading(true);
         await axios.get("https://corona-api.com/countries/"+code).then(res=>{
            
            let data = res.data.data.timeline; 
            setLineChartData([]);   
            for (let index = data.length -1; index >= 0; index--) {
                let obj = {
                    "name": data[index].date,
                    "confirmed": data[index].new_confirmed,
                    "recovered": data[index].new_recovered,
                    "deaths": data[index].new_deaths
                }
                setLineChartData(lineChartData =>[...lineChartData, obj])
                setIsLoading(false);
            } 
                 
        });
        console.log(lineChartData)
    }
    const changeGraphType = (type)=>{
        setGraphType(type);
    }
    async function getGlobalTimeline() {
        setIsLoading(true);
        await axios.get("https://corona-api.com/timeline").then(res=>{
           
           let data = res.data.data; 
           setLineChartData([]);   
           for (let index = data.length -1; index >= 0; index--) {
               let obj = {
                   "name": data[index].date,
                   "confirmed": data[index].new_confirmed,
                   "recovered": data[index].new_recovered,
                   "deaths": data[index].new_deaths
               }
               setLineChartData(lineChartData =>[...lineChartData, obj])
               setIsLoading(false);
           } 
       });
    }
    return (
        <Container fluid className="text-center">
            <MyNavbar/>
            <main>
                <Row>
                    <Col>
                        {isLoading?<Spinner animation="grow" />: null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            <b>Select a country to see the timeline of its Covid-19 history from when cases first started appearing until now</b>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Button onClick={()=>{changeGraphType("line")}}>Line Graph</Button>
                    <Button onClick={()=>{changeGraphType("area")}}>Area Graph</Button>
                   
                    {graphType == "line"? <LineGraph width = {chartWidth} data={lineChartData}/> : null}
                    {graphType == "area"? <MyAreaChart width = {chartWidth} data={lineChartData}/> : null}
                    <Button className="btn btn-danger" onClick={()=>{getGlobalTimeline()}}>Global Timeline</Button>
                    </Col>
                </Row>
                <Row>
                   <Col>
                        {countries.map((item)=>{
                            return <button className="btn btn-outline-primary" onClick={()=>{formateLineGraphData(item.code)}}>{item.name}</button>
                        })}
                        <Button onClick={()=>{formateLineGraphData()}}>Click</Button>
                   </Col>
                </Row>
            </main>
        </Container>
    )
}