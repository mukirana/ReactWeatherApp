
import React from 'react'
import ReactDOM from 'react-dom'
import AllDays from './AllDays.js'
import ShowData from './ShowData.js'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './NavBar.js'
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom" 

const ApiKey = "daa05ecbb7ef177d7a1201194913c9b5"
class App extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        error: false,
        blankTextBox:false,
        isLoading:false,
        list: {},
        cityName:"",
      }
    
      this.onSubmit = this.onSubmit.bind(this)
    }
   
    error =()=>{
      return(
        <div className="alert alert-danger mx-5" role="alert">
          Data Not Found please enter correct city..
        </div>
      )
    }

    getDate= (val)=>{
      var date = new Date()
      date.setDate(date.getDate() + val)
      return date.toJSON().slice(0,10).toString()

      
    }

    parseResponse = (response) => {
     // debugger;
      let returnList = {};
      const { list } = response;
      for(const element in list) {
        const date = list[element].dt_txt.split(" ")[0];
        
        let dateData = returnList[date];
        if(dateData === undefined) {
          dateData = [];
        }
        returnList = {
          ...returnList,
          [date]:[ 
            ...dateData,
            list[element]
          ]
        }
      }
      return returnList
    }
    
    onSubmit = (city)=>{
      this.setState({
        error: false,
        blankTextBox:false,
        isLoading:true,
        list: {},
        cityName:"",
      })
      if(city){
       fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},india&APPID=${ApiKey}`)
        .then(response => {
          if(!response.ok){
            throw Error(response.statusText)
          }
          return response.json()})
        .then(response =>{
          // console.log(response)
          return this.setState({
            list: this.parseResponse(response),
            cityName:city,
            isLoading:false,
            error:false
          })
        })
        .catch(error => this.setState({error:true,  isLoading:false }));
      }
      else{
        this.setState({blankTextBox:true , isLoading:false})
      }
    }

    render(){
      const {
        list,
        error,
        isLoading,
        blankTextBox
      }  = this.state;

      return(
        <div>
          <NavBar onSubmit={this.onSubmit} blankTextBox={blankTextBox}/>
          <main> 
              {error ? this.error():null}  
              {isLoading ? 
                 <h1>Fetching Data...</h1> : 
              null}
              {((Object.keys(list)).length > 0) &&  <Router>    
                    <div className="mb-5">
                      <div className="navbar  navbar-expand-lg navbar-light justify-content-center" style={{backgroundColor:"#e3f2fd"}}>
                        <div className="row">
                          <ul className="navbar-nav mr-auto">
                            <li className="nav-item"><Link className="nav-link ml-2" to="/">Today</Link></li>
                            <li className="nav-item"> <Link className="nav-link ml-2 " to="tomorrow">Tomorrow</Link></li>
                            <li className="nav-item"> <Link className="nav-link ml-2 " to="AllDays">AllDays</Link></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <nav>
                        <div class="nav-wrapper">

                          <ul class="right hide-on-med-and-down">
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">Javascript</a></li>
                            <li><a href="mobile.html">Mobile</a></li>
                          </ul>
                        </div>
                    </nav> */}


                  <Switch>
                      <Route path="/tomorrow">
                          <ShowData name={"Tomorrow"}  tempData = {list[this.getDate(1)]} cityName={this.state.cityName} />  
                      </Route>
                      <Route path="/AllDays">
                          <AllDays tempAllDays = {list} cityName={this.state.cityName}/>
                      </Route>
                      <Route path="/">
                          <ShowData name={"Today"} tempData = {list[this.getDate(0)]} cityName={this.state.cityName} />
                      </Route>
                  </Switch>
              </Router> }       
          </main>  
        </div>  
      )
    }
}
 
ReactDOM.render(<App />, document.getElementById('root'))
