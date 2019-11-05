import React from "react";
import { render,fireEvent } from "@testing-library/react";

import Alert from "../../../src/react/Alert";
describe("<Alert/>", () => {
  test("render type success", () => {
    const { container } = render(<Alert type="success" />);
    if (container.firstElementChild) {
      expect(container.firstElementChild.className).toBe("kuc-alert bg-success");
    }
  });

  test("render type danger",()=>{
    const { container } = render(<Alert type="danger" />);
    if (container.firstElementChild) {
      expect(container.firstElementChild.className).toBe("kuc-alert bg-danger");
    }
  })

  test("setText",()=>{
    const onClick = jest.fn();
    let {getByText} = render(<Alert text="abc" onClick={onClick}/>)
    fireEvent.click(getByText("abc"));
    expect(onClick).toHaveBeenCalled();

    render(<Alert text="bdf"/>)    
    expect(getByText("bdf")).toBeTruthy();
  })

  test("show",()=>{
    let {container} = render(<Alert isVisible={true}/>)    
    expect(container.firstElementChild).toBeTruthy()
  })
  
  test("hide",()=>{
    let {container} = render(<Alert isVisible={false}/>)    
    expect(container.firstElementChild).toBeFalsy()
  })

});

