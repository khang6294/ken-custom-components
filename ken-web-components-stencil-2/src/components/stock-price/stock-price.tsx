import { Component, Element, Prop, State, Watch } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';
@Component({
    tag: 'kn-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice {
    stockInput: HTMLInputElement;
    // initialStockSymbol: string;
    @Element() el: HTMLElement;
    @State() fetchedPrice: number;
    @State() stockUserInput: string;
    @State() stockInputValid = false
    @State() error: string;

    @Prop({mutable:true, reflectToAttr: true}) stockSymbol: string;

    @Watch('stockSymbol')
    
    stockSymbolChanged(newValue: string, oldValue: string){
        if(newValue !== oldValue){
            this.stockUserInput = newValue;
            this.fetchStockPrice(newValue);
        }
    }
    

    onUserInputChange = (event: Event) => {
        this.stockUserInput = (event.target as HTMLInputElement).value
        if(this.stockUserInput.trim() !== ''){
            this.stockInputValid = true;
        } else {
            this.stockInputValid = false
        }
    }

    onFetchStockPrice =(event: Event) => {
        event.preventDefault();
        //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
        this.stockSymbol = this.stockInput.value
        //this.fetchStockPrice(stockSymbol)
    }

    fetchStockPrice = (stockSymbol: string) =>{
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
            if(res.status !== 200){
                throw new Error('Invalid!')
            }
            return res.json();
        })
        .then(parsedRes => {
            if(!parsedRes['Global Quote']['05. price']){
                throw new Error('Invalid symbol!')
            }
            this.error = null
            this.fetchedPrice = +parsedRes['Global Quote']['05. price']
        })
        .catch(err => {
            this.error = err.message
        })
    }


    componentDidLoad(){
        if(this.stockSymbol){
            // this.initialStockSymbol = this.stockSymbol
            this.fetchStockPrice(this.stockSymbol)
            this.stockUserInput = this.stockSymbol;
            this.stockInputValid = true
        }
    }

    componentDidUpdate(){
        // if(this.stockSymbol !== this.initialStockSymbol){
        //     this.initialStockSymbol = this.stockSymbol;
        //     this.fetchStockPrice(this.stockSymbol)
        // }
    }
    
    render(){
        let dataContent = <p>Enter a symbol</p>
        if(this.error){
            dataContent = <p>{this.error}</p>
        }
        if(this.fetchedPrice){
            dataContent = <p>Price: ${this.fetchedPrice}</p>
        }
        return[
            <form onSubmit={this.onFetchStockPrice}>
                <input 
                    id='stock-symbol' 
                    ref={el => this.stockInput = el} 
                    value={this.stockUserInput}
                    onInput={this.onUserInputChange}
                />
                <button type='submit' disabled={!this.stockInputValid}>Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
        ];
    }
}