import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
    tag: 'swap-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {


    /* state changes triggered only inside this class will be rerendered*/
    @State() showContactInfo = true;

    //stencil will render the component if it finds change in the prop value
    @Prop() title: string;
    @Prop({reflect: true, mutable: true}) opened: boolean;

    onCloseDrawer = () => {
        this.opened = false;
    }

    onContentChange = (content: string) => {
        this.showContactInfo = content === 'contanct';
    }

    @Method()
    open() {
        this.opened = true;
    }

    render() {
        let mainConent = <slot></slot>;

        if (this.showContactInfo) {
            mainConent = (
                <div id='contact-info'>
                    <h2>contact information</h2>
                    <p>You can reach out with mail</p>
                    <ul>
                        <li>Phone: 2435633456</li>
                        <li>email: sdfsdfz2we@efsdf.com</li>
                    </ul>
                </div>
            )
        }

        return (
            [<div class='backdrop' onClick={this.onCloseDrawer}></div>,
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.onCloseDrawer}>X</button>
                </header>
                <section id='tabs'>
                    <button onClick={this.onContentChange.bind(this, 'nav')} class={!this.showContactInfo ? 'active' : ''}>Navigation</button>
                    <button onClick={this.onContentChange.bind(this, 'contanct')} class={this.showContactInfo ? 'active' : ''} >Contact</button>
                </section>
                <main>
                    {mainConent}
                </main>
            </aside>]
        );
    }
}