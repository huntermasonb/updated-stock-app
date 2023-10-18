import React from "react";
// import DetailedStockData from "./DetailedStockData";

//Create expected properties to be passed over
interface StockDataProps {
    symbol: string;
    prices: Record<string, number>; //Prices would be an object, with strings as keys and number values.
}

const StockData: React.FC<StockDataProps> = ({ symbol, prices }) => {
    const itemsPerRow = 3;

    // Create an array of arrays, each containing 'itemsPerRow' items and calculate the amount of rows needed
    const rows = Array.from({ length: Math.ceil(Object.keys(prices).length / itemsPerRow) }, (_, rowIndex) =>
        Object.keys(prices).slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
    );

    return (
        <>
        {/* Parent Div on StockPrice exists already and class id is 'stockPrices, reason for using an empty JSX parent element'.*/}
        <h1 className="mt-6 text-center max-sm:font-semibold font-medium text-lg text-indigo-950">
            {symbol.length ? 'Stock Prices' : 'Enter Symbols to Show Stock Prices'}
        </h1>
        {/* CARD FOR DISPLAYING STOCK DATA*/}
        <div className="lg:flex lg:flex-col lg:justify-center">
            {rows.map((row, rowIndex) => (
            // Change # of columns in the grid below
            <div key={`row-${rowIndex}`} className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-3">
                {row.map((symbols) => (   
                //Card background and "container"          
                <div
                    key={symbols}
                    className={`${
                        rowIndex % 2 === 0 ? "bg-indigo-200" : "bg-indigo-300"
                        } p-4 shadow space-y-2 duration-200 transition-all rounded-sm hover:shadow-lg`}
                >   
                    {/* Symbol Column */}
                    <div className="flex items-center justify-between">
                        <div className="font-semibold">Symbol</div>
                        <div className="uppercase ">
                            {/* If symbols = price, then there was only one symbol input by user */}
                            {symbols === "price" ? symbol : symbols}
                        </div>
                    </div>

                    {/* Price Column */}
                    <div className="flex items-center justify-between pb-4">
                        <div className="font-semibold">Price</div>
                        <div>
                            {/* Display "symbols" if there were multiple if not, only use a "symbol" */}
                            {prices[symbols] ? prices[symbols] : prices[symbol]}
                        </div>
                    </div>

                    <div>
                        Price-to-Earning Ratio, Beta, & Dividend yields in the future
                        {/* <DetailedStockData symbol={symbols} /> */}
                    </div>
                </div>
                ))}
            </div>
            ))}
        </div>
        {/* END DISPLAY/CARD */}
        </>
    );
};

export default StockData;
