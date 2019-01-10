import {Component} from '@stencil/core'
import {AV_API_KEY} from '../../global/global'
@Component({
    tag:'kn-stock-finder',
    styleUrl: './stock-finder.css',
    shadow:true
})


export class StockFinder {
    stockNameInput: HTMLInputElement
    onFindStocks = (event: Event) => {
        event.preventDefault();
        const stockName = this.stockNameInput.value
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render(){
        return [
            <form onSubmit={this.onFindStocks}>
                <input 
                    id='stock-symbol' 
                    ref={el => this.stockNameInput = el} 
                />
                <button type='submit'>Find</button>
            </form>
        ]
    }
}