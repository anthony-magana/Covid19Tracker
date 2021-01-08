import React from 'react'
import {Cards, Chart, CountryPicker} from './components';
import {fetchData} from './api';

import styles from './App.module.css';
import covidImage from './images/covid.jpg'

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        //console.log(data);
        this.setState({data: fetchedData});
    }

    handleCountryChange = async (country) => {
        //fetch the data & set state
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    }

    render() {
        const {data, country} = this.state;

        return(
            <div className={styles.container}>
                <div className={styles.title}>
                <h1>C</h1>
                <img className={styles.image} src={covidImage} alt="COVID-19"/>
                <h1>VID-19</h1>
                </div>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;