import {Component} from '@stencil/core';

@Component({
    tag:'kn-loading',
    styleUrl: './loading.css',
    shadow: true
})


export class Loading{
    render(){
        return (
            <div class="lds-ring">
                <div />
                <div />
                <div />
                <div />
            </div>
        )
    }
}