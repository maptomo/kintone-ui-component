import Alert from '../../../src/js/Alert'
describe("<Alert/>",()=>{
  test("render check type",()=>{
    let alert = new Alert({text:"a",type:"success"});
    expect(alert.render().className).toBe("kuc-alert bg-success");

    let alert2 = new Alert({text:"a"});
    expect(alert2.render().className).toBe("kuc-alert bg-danger");
  })

  test("set Text",()=>{
    let alert = new Alert({text:"a",type:"success"});
    expect(alert.render().textContent).toBe("a");

    alert.setText("haha");
    expect(alert.render().textContent).toBe("haha")
  })
  
  
})