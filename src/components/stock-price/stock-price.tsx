import { Component, h, State, Element, Prop, Watch, Listen } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'swap-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    stockInput: HTMLInputElement;
    // initialStockSymbol: string;



    @Element() el: HTMLElement;

    @State() fetchdePrice: number;
    @State() stockUserIp: string;
    @State() validStockUserIp: boolean;
    @State() error: string;
    @State() loading = false; 

    @Prop() stockSymbol: string;

    @Watch('stockSymbol')
    stockSymbolChanged(newValue: string, oldValue: string) {
        if (newValue !== oldValue) {
            this.fetchStockPrice(newValue);
        }
    }


    // Welcome to Alpha Vantage! Your API key is: 4NJGRL1919WERDK0. Please record this API key at a safe place for future data access.

    constructor() { }

    onFetchStockPrice = (e) => {
        console.log(e);
        e.preventDefault();
        let stockIp = this.stockInput.value;
        this.fetchStockPrice(stockIp);
    }

    fetchStockPrice = (stockIp) => {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockIp}&apikey=${AV_API_KEY}`).then(resp => {
            if (resp.status !== 200) {
                throw new Error('Invalid');
            }
            return resp.json()
        }).then(parsedData => {
            this.loading = false;
            if (!parsedData['Global Quote']['05. price']) {
                this.fetchdePrice = null;
                throw new Error('Invalid Symbol');
            }
            this.fetchdePrice = +parsedData['Global Quote']['05. price'];
            this.error = null;
        }).catch(err => {
            this.loading = false;
            this.error = err.message;
            this.fetchdePrice = null;
            console.log(err)
        })
    }

    onUserIp = (e) => {
        this.stockUserIp = e.target.value;
        if (this.stockUserIp.trim() !== '') {
            this.validStockUserIp = true;
        } else {
            this.validStockUserIp = false;
        }
    }

    componentWillLoad() {
        console.log('componentWillLoad');
        console.log(this.stockSymbol);
    }
    
    componentDidLoad() {
        if (this.stockSymbol) {
            // this.initialStockSymbol = this.stockSymbol;
            this.fetchStockPrice(this.stockSymbol);
            this.stockUserIp = this.stockSymbol;
            this.validStockUserIp = true;
        }
    }

    componentWillUpdate() {
        console.log('compoenntWillLoad')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
        // if (this.stockSymbol !== this.initialStockSymbol) {
        //     this.fetchStockPrice(this.stockSymbol);
        // }
    }
    //componentDidUnload - Depricated
    disconnectedCallback() {
        console.log('disconnectedCallback')
    }

    @Listen('body:swapSymbolSelected')
    onStockSymbolSelected(event) {
        if (event && event.detail && event.detail !==  this.stockSymbol) {
            this.stockSymbol = event.detail;
            // this.fetchStockPrice(event.detail);
        }
    }

    hostData() {
        // return { class: 'error' };
        return {
            class: this.error ? 'error': ''
        }
    }

    render() {
        let content = <p>Price: ${this.fetchdePrice}</p>;
        if (this.error) {
            content = <p>{this.error}</p>
        }
        if (!this.stockUserIp) {
            content = <p>Please enter a symbol</p>;
        }
        if (this.loading) {
            content = <swap-spinner />
        }
        return(
            <div>
                <form onSubmit={this.onFetchStockPrice}>
                    <input id='stock-symbol'
                        ref={el => this.stockInput = el}
                        value={this.stockUserIp}
                        onInput={this.onUserIp}
                    />
                    <button disabled={!this.validStockUserIp || this.loading} type='submit'>Fetch</button>
                </form>
                <div>
                    {content}
                </div>
            </div>
        );
    }
}