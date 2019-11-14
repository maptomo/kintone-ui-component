import Dialog from '../../../src/js/Dialog'

describe("<Dialog/>",()=>{
  test("setHeader",()=>{
    let dialog = new Dialog({header:"default"});
    let elm = dialog.render();
    let header =elm.getElementsByClassName("kuc-dialog-header")[0];
    expect(header.textContent).toBe("default")    
    dialog.setHeader("test header ");
    expect(header.textContent).toBe("test header default");    
  })
  
  test("getHeader",()=>{
    let dialog = new Dialog({header:"default"});
    expect(dialog.getHeader()).toBe("default")    
  })

  test("setContent",()=>{
    let dialog = new Dialog({content:"hahaha"});
    let elm = dialog.render();

    let content = elm.getElementsByClassName("kuc-dialog-body")[0];
    expect(content.textContent).toBe("hahaha");
    
    dialog.setContent("hihihi");
    expect(content.textContent).toBe("hihihi");
  })

  test("getContent",()=>{
    let dialog = new Dialog({content:"hahaha"});
    expect(dialog.getContent()).toBe("hahaha")    
  })

})