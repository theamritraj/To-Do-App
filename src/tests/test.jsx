import {describe, it} from "vitest";


describe("Example suite", ()=>{
  it("should pass", ()=>{
    const sum = 2+2 
    expect(sum).toEqual(4)
  })
})