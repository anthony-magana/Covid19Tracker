import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changableUrl = url;
    if(country){
        changableUrl = `${url}/countries/${country}`;
    }
    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changableUrl);
        
        // without decontructing data in axios call
        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     recovered: data.recovered,
        //     deaths: data.deaths,
        //     lastUpdate: data.lastUpdate
        // }
        return  {confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async ()=> {
    try {
        const {data} = await axios.get(`${url}/daily`);
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;

    } catch (error) {
        console.log(error);
    }
}
// Instead of Global, it fetches the daily data for the US
// export const fetchDailyData = async () => {
//     try {
//       const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

//       return data.reverse().map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));    } catch (error) {
//       return error;
//     }
//   };

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);

    } catch (error) {
        console.log(error);
    }
}