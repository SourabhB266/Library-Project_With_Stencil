import { Component, Host, Method, h } from '@stencil/core';

@Component({
  tag: 'testing-demo',
  styleUrl: 'testing-demo.css',
  // shadow: true,
})
export class TestingDemo {

  add(a:number,b:number){
    let d= a+b;
    return d;
  }
  render() {
    return (
      <Host>
        <p onClick={()=>this.add(2,3)} >Adding </p>
        <h1></h1>
      </Host>
    );
  }

}
