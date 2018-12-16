class ToolTip extends HTMLElement {
    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipText = 'Default tooltip text.'
        this.attachShadow({mode: 'open'})
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
        const tooltipIcon = this.shadowRoot.querySelector('span')
        tooltipIcon.addEventListener('mouseenter',this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave',this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative'; //style for custom component
    }

    attributeChangeCallback(name,oldValue,newValue){

    }

    static get observedAttributes(){
        return ['text']
    }

    _showTooltip(){
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }

}

customElements.define('kn-tooltip',ToolTip)