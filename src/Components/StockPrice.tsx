import React , { useState } from 'react';
import axios from 'axios';

import StockData from './StockData';

const StockPrice: React.FC = () => {
  const [symbols, setSymbols] = useState<string>('');
  const [sortedSymbols, setSortedSymbols] = useState<string>('');
  const [prices, setPrices] = useState<Record<string, number>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputSymbols = event.target.value;
    setPrices({});
    setSymbols(inputSymbols);
    
    // Sorting (and some other corrections) the symbols as the user inputs them since I couldn't figure out how to sort after the data was returned.
    const sortedSymbols = inputSymbols
    .split(',/')
    .map((symbol) => symbol.trim())
    .filter((symbol) => symbol.length >= 1)
    .sort()
    .join(',');

    setSortedSymbols(sortedSymbols.trim());
    const stockPricesView = document.getElementById('stockPricesView');
    if (stockPricesView) {
      stockPricesView.style.display = "none";
    };
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    fetchData();
    const stockPricesView = document.getElementById('stockPricesView');
    if (stockPricesView) {
      stockPricesView.style.display = "flex";
    };
  };
  
  // API Request and parameters
  const fetchData = async () => {
    if (sortedSymbols) {
      const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/price',
        params: {
          symbol: sortedSymbols,
          format: 'json',
          outputsize: '8'
        },
        headers: {
          'X-RapidAPI-Key': '577a69f858msh40fe029fdfb0c7bp1d982cjsna5b05d487d92',
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        // Error Handling
        if (response.status !== 200){
          alert("Error: Please make sure you entered valid stock symbols.")
        }
        if (response.status === 429 ){
          alert("Error: We have run out of API tokens temporarily, please try again later.")
        }
        // End Error Handling
        else {
          const data = response.data;
          // Format the API response to properly handle the data.
          const formattedPrices: Record<string, number> = {}
          for (const symbol of Object.keys(data)) {
            formattedPrices[symbol] = parseFloat(data[symbol].price);
          }
          console.log(formattedPrices);
          setPrices(formattedPrices);
        }      
      } 
      catch (error) {
        console.error(error);
        alert(error);
      }
    } else {
      alert("An error occured, please try again.")
    }
  };
  
  // Search Bar
  return (
    <div className="p-16 w-full">
      <div className='flex flex-col w-full'>
          <form onSubmit={handleSubmit} className="flex gap-4 text-center w-full">
            <input
              type="text"
              id="stockSymbols"
              value={symbols}
              className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none"
              onChange={handleInputChange}
              placeholder="AMZN, AAPL..."
              required
            />
            <button type="submit" 
              className="w-1/3 max-w-[250px] px-1 font-semibold rounded shadow-sm transition-colors duration-150 ease-in-out bg-indigo-500 text-indigo-100 hover:bg-indigo-600"
            >
              Search
            </button>
          </form>
        {/* Stock Symbol and Prices Display via StockData.js */}
        <div id='stockPricesView' className='flex flex-col text-center '>
          <StockData symbol={sortedSymbols} prices={prices} />
        </div>
      </div>      
    </div> 
  );
};
export default StockPrice;