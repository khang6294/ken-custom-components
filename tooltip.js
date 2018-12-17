class ToolTip extends HTMLElement {
    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipVisible = false;
        this._tooltipIcon;
        this._tooltipText = 'Default tooltip text.'
        this.attachShadow({mode: 'open'}) // activate shadow DOM
        this.shadowRoot.innerHTML =`
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    top: 1.5rem;
                    left: 0.75 rem;
                    padding: 0.15 rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26)
                }
                ::slotted(.highlight){
                    border-bottom: 1px dotted red;
                } /* style for the slot (slot is what is passed between opening and closing tag of custom element)(<span> in this case)*/
                
                :host(.important){
                    background: var(--color-primary,#ccc);
                    padding: 0.15rem;
                } /* style for the whole shadow DOM */
                
                :host-context(p){
                    font-weight: bold;
                } /* condition for host styling */
                
                .icon{
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some default</slot>
            <span class="icon">?</span>
        `;
    }

    connectedCallback(){
        if(this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text')
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));
        this.style.position = 'relative'; //style for custom component
        this._render();
    }

    attributeChangeCallback(name,oldValue,newValue){
        if(oldValue === newValue){
            return;
        }
        if(name ==='text'){
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes(){
        return ['text']
    }

    disconnectedCallback(){
        this._tooltipIcon.removeEventListener('mouseenter',this._showTooltip)
        this._tooltipIcon.removeEventListener('mouseenter',this._hideTooltip)
    }

    _render(){
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if(this._tooltipVisible){
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if(tooltipContainer){
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltip(){
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip(){
        this._tooltipVisible = false;
        this._render();
    }

}

customElements.define('kn-tooltip',ToolTip)