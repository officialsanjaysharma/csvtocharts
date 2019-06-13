import React, { Component } from 'react';
import './App.css';
import AppBar from '../src/components/appbar'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import _ from 'lodash'


// ****************Charts*****************
import AreaChart from './charts/area-chart'
import BarChart from './charts/bar-chart'
import LineChart from './charts/line-chart'
import { CSVLink} from "react-csv"

import { Button } from '@material-ui/core'

// *************Data for download sample file ***************
const csvData =
  `name,uv,pv,amt,
page-A,2400,3000,2100,
page-B,3400,3100,2800,
page-C,4400,2200,2600,
page-D,2000,3000,3900,
page-E,1400,3200,1900,
page-F,4300,1900,3000,
page-G,2700,3500,2100`
class App extends Component {

  state = {
    selectedValue: '',
    data: [],
    heading: [],
    disableButton: true,
    csvSampleData: []
  }

  handleCsvUpload = (e: any) => {
    this.setState({ data: [] })
    let files = e.target.files;
    let reader = new FileReader();
    if (files) reader.readAsText(files[0])
     reader.onload = (e: any) => {
      let data = e.target.result.split('\n')
      let tempArray: any = this.state.data
       data.map((fileData: any, index: any) => {
        let obj: any = {}
        let cellData = fileData.split(',')
        if (index === 0) {
          this.setState({ heading: cellData })
        }
        else {
          cellData.map((cell: any, i: any) => {
            obj = _.merge(obj, { [this.state.heading[i]]: cell.trim() })
          })
          tempArray.push(obj)
        }
      })
      this.setState({ data: tempArray, selectedValue: this.state.selectedValue, disableButton: false })
    }
  }

  handleChange = (event: string) => {
    if (this.state.selectedValue === event) {
      this.setState({ selectedValue: '' })
    }
    else {
      this.setState({ selectedValue: event })
    }
  }
  public render() {
    const { selectedValue}: any = this.state
    return (
      <div className="App">
        <AppBar />
        <FormControl component="fieldset" style={{ margin: 'theme.spacing(3)' }}>
          <FormGroup>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
              <FormControlLabel
                value="Area-Chart"
                checked={selectedValue === "Area-Chart"}
                disabled={this.state.disableButton}
                control={<Checkbox color="primary" />}
                onChange={() => this.handleChange('Area-Chart')}
                label="Area-Chart"
                style={{ padding: 5 }}
                labelPlacement="start"
              />
              <FormControlLabel
                value="Line-Chart"
                checked={selectedValue === "Line-Chart"}
                disabled={this.state.disableButton}
                control={<Checkbox color="primary" />}
                onChange={() => this.handleChange('Line-Chart')}
                label="Line-Chart"
                style={{ padding: 5 }}
                labelPlacement="start"
              />
              <FormControlLabel
                value="Bar-Chart"
                checked={selectedValue === "Bar-Chart"}
                onChange={() => this.handleChange('Bar-Chart')}
                disabled={this.state.disableButton}
                control={<Checkbox color="primary" />}
                label="Bar-Chart"
                style={{ padding: 5 }}
                labelPlacement="start"
              />
              <FormControlLabel
                value="All"
                checked={selectedValue === "All"}
                onChange={() => this.handleChange('All')}
                disabled={this.state.disableButton}
                control={<Checkbox color="primary" />}
                label="All"
                style={{ padding: 10 }}
                labelPlacement="start"
              />
            </div>
            <input
              accept=".csv"
              style={{ display: 'none' }}
              onChange={(e: any) => this.handleCsvUpload(e)}
              id="contained-button-file"
              multiple
              type="file"
            />
            <span>
              <label style={{ padding: 10 }} htmlFor="contained-button-file">
                <Button variant="outlined" component="span" style={{ padding: 10 }}>
                  Upload
              </Button>
              </label>
              <Button variant="outlined" component="span" style={{ padding: 10 }}>
                <CSVLink
                  style={{ textDecoration: "none",color:"black" }}
                  filename="sample.csv"
                  data={csvData}>
                  Download Sample CSV
                </CSVLink>
              </Button>
            </span>
          </FormGroup>
        </FormControl>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "bottom", alignItems: "center", height: 100 ,padding:20}}>
          {
            (this.state.selectedValue === "Area-Chart" || this.state.selectedValue === "All") ?
              <AreaChart
                data={this.state.data}
              /> : <></>
          }
          {
            (this.state.selectedValue === "Line-Chart" || this.state.selectedValue === "All") ?
              <LineChart
                data={this.state.data}
              /> : <></>
          }
          {
            (this.state.selectedValue === "Bar-Chart" || this.state.selectedValue === "All") ?
              <BarChart
                data={this.state.data}
              /> : <></>
          }
        </div>
      </div>
    );
  }
}

export default App;
