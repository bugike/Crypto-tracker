import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './component/Coin';


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);

  
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Crypto Tracker</h1>
        <form>
          <input 
            type='text' 
            placeholder='Seach crypto...' 
            className='coin-input'
            onChange={handleChange}
          />
        </form>
      </div>
      <div className='title-row'>
        <p className='title-name'>Name</p>
        <p className='title-symbol'>Symbol</p>
        <p className='title-price'>Price</p>
        <p className='title-volume'>24h Volume</p>
        <p className='title-change'>Price Change(24h)</p>
        <p className='title-marketCap'>Market Cap</p>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol= {coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
