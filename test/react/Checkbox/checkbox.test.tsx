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
      },
      {
        label: "Lemon2",
        value: "Lemon2",
        isDisabled: false
      }
    ];
    let value = ["Lemon"];

    const onChange = jest.fn(value2 => (value = value2));
    let { findAllByTestId } = render(<Checkbox items={item} value={value} onChange={onChange} />);
    let doms = await findAllByTestId("onChange-item");
    fireEvent.change(doms[1]);
    expect(doms[1].getAttribute("selected")).toBeFalsy();

    let { findAllByTestId:nextRender } = render(<Checkbox items={item} value={value} onChange={onChange} />);
    let domsNext = await nextRender("onChange-item");
    expect(domsNext[1].getAttribute("selected")).toBeTruthy();
  });
});
