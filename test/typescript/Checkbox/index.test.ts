import Checkbox from "../../../src/js/CheckBox";
import { fireEvent } from "@testing-library/dom";
describe("<Checkbox/>", () => {
  const data = {
    items: [
      {
        label: "Orange",
        value: "Orange",
        isDisabled: false
      },
      {
        label: "Banana",
        value: "Banana",
        isDisabled: true
      },
      {
        label: "Lemon",
        value: "Lemon",
        isDisabled: true
      }
    ],
    value: ["Orange", "Banana"]
  };
  test("add item", () => {
    const checkbox = new Checkbox(data);
    let element = checkbox.render();
    let label = element.querySelectorAll("label[for]");
    var elmCheckbox = element.querySelectorAll("input[type=checkbox]");

    data.items.map(item => {
      for (let i = 0; i < label.length; i++) {
        if (label[i].textContent === item.label) {
          expect(label[i].textContent).toBe(item.label);
        }
      }
      for (let i = 0; i < elmCheckbox.length; i++) {
        const elm = elmCheckbox[i] as HTMLInputElement;
        if (i <= 2 && elm.checked === true) {
          expect(elm.checked).toBe(true);
        } else {
          expect(elm.checked).toBe(false);
        }
      }
    });

    checkbox.addItem({
      label: "test",
      value: "test"
    });

    let labelAfterAdd = element.querySelectorAll("label[for]");
    let labelValueAfterAdd = element.querySelectorAll("input[type=checkbox]");
    let lastLabelValue = labelValueAfterAdd[
      labelValueAfterAdd.length - 1
    ] as HTMLInputElement;

    expect(labelAfterAdd[labelAfterAdd.length - 1].textContent).toBe("test");
    expect(lastLabelValue.checked).toBe(true);
  });
  test("removeItem", () => {
    //first render
    let dataClone = JSON.parse(JSON.stringify(data));
    let checkbox = new Checkbox(dataClone);
    let elm = checkbox.render();
    let label = elm.querySelectorAll("label[for]");
    expect(label[0].textContent).toBe("Orange");
    //after remove item rerender
    checkbox.removeItem(0);
    label = elm.querySelectorAll("label[for]");
    expect(label[0].textContent).toBe("Banana");
  });
  test("getItems", () => {
    let checkbox = new Checkbox(data);
    checkbox.render();
    let items = checkbox.getItems();
    expect(data.items).toBe(items);
  });
  test("setItems", () => {
    let checkbox = new Checkbox(data);
    let elm = checkbox.render();
    let labelCheckbox = elm.querySelectorAll("label[for]");
    expect(labelCheckbox[0].textContent).toBe("Orange");
    checkbox.setItems([
      {
        label: "1",
        value: "1"
      },
      {
        label: "2",
        value: "2"
      }
    ]);
    elm = checkbox.render();
    labelCheckbox = elm.querySelectorAll("label[for]");
    expect(labelCheckbox[0].textContent).toBe("1");
  });

  test("getValue", () => {
    let checkbox = new Checkbox(data);
    let value = checkbox.getValue();
    expect(value).toBe(data.value);
  });
  
  test("setValue", () => {
    //check render default value
    let checkBox = new Checkbox(data);
    let elm = checkBox.render();
    let labelValueAfterAdd = elm.querySelectorAll("input[type=checkbox]");
    for (let index = 0; index < labelValueAfterAdd.length; index++) {
      const element = labelValueAfterAdd[index] as HTMLInputElement;
      if (index <= 1) {
        expect(element.checked).toBe(true);
        continue;
      }
      expect(element.checked).toBe(false);
    }
    checkBox.setValue(["Orange", "Banana", "Lemon"]);
    //after change value all true
    labelValueAfterAdd = elm.querySelectorAll("input[type=checkbox]");
    for (let index = 0; index < labelValueAfterAdd.length; index++) {
      const element = labelValueAfterAdd[index] as HTMLInputElement;
      expect(element.checked).toBe(true);
    }
  });
  test("disableItem", () => {
    let cloneData = JSON.parse(JSON.stringify(data));
    let checkBox = new Checkbox(cloneData);
    checkBox.disableItem("Orange");
    let elm = checkBox.render();
    let labelValueAfterAdd = elm.querySelectorAll("input[type=checkbox]");
    for (let index = 0; index < labelValueAfterAdd.length; index++) {
      const element = labelValueAfterAdd[index] as HTMLInputElement;
      expect(element.disabled).toBe(true);
    }
  });
  test("enableItem", () => {
    let checkBox = new Checkbox(data);
    checkBox.enableItem("Banana");
    checkBox.enableItem("Lemon");
    let elm = checkBox.render();
    let labelValueAfterAdd = elm.querySelectorAll("input[type=checkbox]");

    for (let index = 0; index < labelValueAfterAdd.length; index++) {
      const element = labelValueAfterAdd[index] as HTMLInputElement;
      expect(element.disabled).toBe(false);
    }
  });
  test("on", () => {
    let checkBox = new Checkbox(data);
    //call back receive data
    let onChange = jest.fn(value => {
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        element === "Lemon" ? expect(element).toBe("Lemon") : "";
      }
    });
    // register event
    checkBox.on("change", onChange);
    let elm = checkBox.render();
    let arrCheckBox = elm.querySelectorAll("input[type=checkbox]");
    //simulate click input event trigger onchanges
    for (let index = 0; index < arrCheckBox.length; index++) {
      const element = arrCheckBox[index] as HTMLInputElement;
      fireEvent.click(element);
    }
    expect(onChange).toBeCalledTimes(3);
  });
  test("show and hide",()=>{
    let checkBox = new Checkbox(data);
    let elm = checkBox.render();
    //check hide
    checkBox.hide();
    expect(elm.style.display).toBe("none");
    //check show
    checkBox.show();
    expect(elm.style.display).toBe("");    
  })
  test("disable and enable",()=>{
    let checkBox = new Checkbox(data);
    let onChange = jest.fn();
    checkBox.on("change",onChange)
    let elm = checkBox.render();
    
    //disable
    checkBox.disable();
    let arrInputCheckBox = elm.querySelectorAll("input[type=checkbox]");
    fireEvent.click(arrInputCheckBox[0]);
    expect(onChange).toBeCalledTimes(0);

    //enable
    checkBox.enable();
    fireEvent.click(arrInputCheckBox[0]);
    expect(onChange).toBeCalledTimes(1);

  })
});
