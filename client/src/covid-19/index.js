import React  from 'react';
import { fetchData } from './api';
import styles from './index.module.css';
import img from './image.png';

import {Cards, CountryPicker, Chart} from './components';

export class Covid19 extends React.Component{
    state = {
        data: '',
        country: ''
    };

  async componentDidMount(){
        const data = await fetchData()
        this.setState({data})
    }

    handleCountryChange  = async(country) => {
        const data = await fetchData(country);
        this.setState({data, country});
    }

    render(){
        const { data, country} = this.state;
        return(
            <div className={styles.container}>
                <img className ={styles.image} src = {img} alt ="COVID-19" />
                <Cards data ={data} />
                <CountryPicker  handleCountryChange = {this.handleCountryChange}/>
                <Chart data = {data} country = {country} />
            </div>
        )
    }
}

export default Covid19;