import { Component, EventEmitter, h, State, Event } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'swap-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})
export class StockFinder {


    @State() searchRes: {symbol: string, name: string}[] = [];
    @State() loading = false;

    @Event({bubbles: true, composed: true}) swapSymbolSelected: EventEmitter<string>;

    constructor() { }

    stockNameInput: HTMLInputElement;

    onFindStocks = (e) => {
        e.preventDefault();

        let stockName = this.stockNameInput.value;
        this.loading = true;

        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                this.loading = false;
                console.log(data);
                this.searchRes = data.bestMatches.map(res => {
                    return {name: res['2. name'], symbol: res['1. symbol']};
                });
            }).catch(err => {
                this.loading = false;
                console.log(err);
            })
    }

    onSelectSymbol = (symbol) => {
        // console.log('symbol ', symbol);
        this.swapSymbolSelected.emit(symbol);
    }

    render() {
        let content = (
            <ul>
                {this.searchRes.map(res => {
                    return <li onClick={this.onSelectSymbol.bind(this, res.symbol)}><strong>{res.symbol}</strong> - {res.name}</li>
                })}
            </ul>
        );
        if (this.loading) {
            content = <swap-spinner />;
        }
        return(
            <div>
                <form onSubmit={this.onFindStocks}>
                    <input id='stock-symbol'
                        ref={el => this.stockNameInput = el}
                    />
                    <button type='submit'>Find!</button>
                </form>
                {content}
            </div>
        );
    }
}