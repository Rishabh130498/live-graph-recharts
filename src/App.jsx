import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import filteredSixHours from './ApiData/six';
import filteredTwelveHours from './ApiData/twelve';
import filteredTwentyFourHours from './ApiData/twentyFour';

// css for selectbox
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: '370',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const socket = io('http://localhost:4500', {
  transports: ['websocket', 'polling']
});

const App = ({}) => {
  // const [data, setData] = useState([]);
  const [apiData, setApiData] = useState(filteredSixHours)
  const classes = useStyles();
  const handleChange = (event) => {
    setApiData(event.target.value);
  };

  useEffect(() => {
    const head = ([x, ...xs]) => xs;
    socket.on('cpu', cpuPercent => {
      /* seprate setState for only present socket data */
      // setData(continuousData => [...continuousData, cpuPercent]); 
      setApiData(currentData => [...head(currentData), cpuPercent])
      
    });
  }, []);
  // console.log(apiData, 'filtered items')
  
  return (
    <div>
      <h1>Live Device Statistics</h1>

      <FormControl className={classes.formControl}>
        <Select
          value={apiData}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Filter by time' }}
        >
          <MenuItem value={filteredSixHours}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={filteredSixHours}>last 6 hours</MenuItem>
          <MenuItem value={filteredTwelveHours}>last 12 hours</MenuItem>
          <MenuItem value={filteredTwentyFourHours}>last 24 hours</MenuItem>
        </Select>
        <FormHelperText>Filter by time</FormHelperText>
      </FormControl>

      <LineChart width={500} height={300} data={apiData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));