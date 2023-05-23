import { TestingDemo } from "../testing-demo";

describe('testing-demo', () => {
  it('Expect 10',  () => {
    const component = new TestingDemo();
    expect(component.add(5,5)).toBe(10) 
    });  
  });

