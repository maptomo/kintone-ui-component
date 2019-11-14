import React from "react";
import Checkbox from "../../../src/react/CheckBox";
import { render, fireEvent } from "@testing-library/react";

describe("<Checkbox/>", () => {
  test("addItem", async () => {
    const item = [
      {
        label: "Lemon",
        value: "Lemon",
        isDisabled: false
      }
    ];
    let value = ["Lemon"];
    const onChange = jest.fn(nextValue => {
      value = nextValue.slice();
    });
    let { getAllByTestId, rerender } = render(<Checkbox items={item} value={value} />);
    
    let button = document.createElement("button");
    button.onclick = () => {
      item.push({
        label: "Lemon2",
        value: "Lemon2",
        isDisabled: false
      });
    };
    let domCheckbox = getAllByTestId("onChange-item")[1] as HTMLInputElement;

    expect(domCheckbox ? domCheckbox.checked : false).toBeFalsy();
    expect(domCheckbox ? domCheckbox : null).toBeNull();
    fireEvent.click(button);

    rerender(<Checkbox items={item} onChange={onChange} />);
    domCheckbox = getAllByTestId("onChange-item")[1] as HTMLInputElement;
    expect(domCheckbox ? domCheckbox : null).not.toBeNull();

    fireEvent.click(domCheckbox);
    rerender(<Checkbox items={item} value={value} />);
    expect(domCheckbox.checked).toBeTruthy();
  });
});
