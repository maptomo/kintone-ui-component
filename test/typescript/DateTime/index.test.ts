import DateTime from "../../../src/js/DateTime";
describe("<DateTime/>", () => {
  const date = { value: new Date(), type: "datetime", locale: "en" };
  let fakeDate = new Date("November 10, 2019 12:30:00");
  let resultDate = fakeDate.getMonth() + 1 + "/" + fakeDate.getDate() + "/" + fakeDate.getFullYear();
  let resultTime = fakeDate.getHours() + ":" + fakeDate.getMinutes();
  test("getValue", () => {
    let dateTime = new DateTime(date);
    expect(dateTime.getValue()).not.toBeNull();
  });

  test("setValue", () => {
    let dateTime = new DateTime(date);
    let elm = dateTime.render();
    dateTime.setValue(fakeDate);

    let dateText = elm.querySelectorAll("input[type=text]")[0] as HTMLInputElement;
    let TimeText = elm.querySelectorAll("input[type=text]")[1] as HTMLInputElement;

    expect(dateText.value).toBe(resultDate);
    expect(TimeText.value).toBe(resultTime);
  });
  
  test("getLocale",()=>{
    let dateTime = new DateTime(date);
    expect(dateTime.getLocale()).toBe(date.locale);    
  })
});
