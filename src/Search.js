import React from 'react'
import './index.css'
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const city = [
  'Delhi',
  'Bombay',
  'Pune',
  'Kolkata',
  'Chennai',
];

class Search extends React.Component{
  constructor(){
    super()
    this.state={
      cityName: "",
    }
    this.setCity = this.setCity.bind(this)
  }
  setCity = (data)=>{
    this.setState({cityName:data})
  }

  render(){
    return(
      <>
      <div>{this.props.blankTextBox? this.error(): null}</div>
      <div className="row justify-content-center">
        
        <div className="col-lg-6 col-sm-12">
            <MuiThemeProvider>
                <AutoComplete floatingLabelText="Type city name"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={city}
                onUpdateInput={this.setCity.bind(this)}
                maxSearchResults={3}
                fullWidth={true}
                style={{backgroundColor:"floralWhite", borderRadius:'14px'}}
                />
          </MuiThemeProvider> 
          </div>
          
          <div className=" mt-3 ml-3 col-lg-3 col-sm-12">
          <input type="submit" onClick={() => this.props.onSubmit(this.state.cityName)} className="btn btn-warning input-group-text" />
          </div>
      </div>
      </>
      )
  }

  error =()=>{
    return(
      <div className="alert alert-danger mx-5" role="alert">
        Please enter city..
      </div>
    )
  }
}

export default Search