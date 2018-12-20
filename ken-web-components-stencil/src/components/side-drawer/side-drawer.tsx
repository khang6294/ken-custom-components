import { Component, Prop, State, Method } from "@stencil/core";

@Component({
    tag: 'kn-side-drawer',
    styleUrl:'./side-drawer.css',
    shadow:true
})  
export class SideDrawer {
    @State() showContactInfo = false;
    @Prop({reflectToAttr: true}) title:string;
    @Prop({reflectToAttr: true, mutable: true}) opened: boolean;

    onCloseDrawer = () => {
        this.opened = false;
    }

    onContentChange = (content: String) => {
        if(content === 'contact'){
            this.showContactInfo = true
        } else {
            this.showContactInfo = false
        }
    }

    @Method() 
    open() {
        this.opened= true
    }

    render(){
        let mainContent = <slot/>
        if(this.showContactInfo){
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email</p>
                    <ul>
                        <li>Phone: 49802122311</li>
                        <li>Email:
                            <a href="mailto:abc@gmail.com">abc@gmail.com</a>
                        </li>
                    </ul>
                </div>
            )
        }
        return [
            <div class="backdrop"/>,
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick = {this.onCloseDrawer}>X</button>
                </header>
                <section id="tabs">
                    <button 
                        class={!this.showContactInfo ? "active" : '' }
                        onClick={() => this.onContentChange('nav')}
                    >
                        Navigation
                    </button>
                    <button 
                        class={this.showContactInfo ? "active" : '' }
                        onClick={() => this.onContentChange('contact')}
                    >
                        Contact
                    </button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        ];
    }
}
