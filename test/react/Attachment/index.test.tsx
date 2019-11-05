import React from "react";
import Attachment, { AttachmentProps } from "../../../src/react/Attachment";
import { render, fireEvent } from "@testing-library/react";
const renderAttachment = (props: Partial<AttachmentProps>) => {
  const defaultProps: AttachmentProps = {
    dropZoneText: "",
    errorMessage: "",
    isErrorVisible: true,
    isVisible: true,
    onFilesAdd: () => {},
    files: [],
    onFileRemove: () => {}
  };
  return render(<Attachment {...defaultProps} {...props} />);
};

describe("<Attachment/>", () => {
  test("setFiles", async () => {
    let onFilesAdd = jest.fn();
    let { findByTestId } = renderAttachment({ onFilesAdd });
    let domInputFile = await findByTestId("file");
    let fakeFile = new File(["test"], "test.png", { type: "image/png" });
    fireEvent.change(domInputFile, { target: { files: [fakeFile] } });
    expect(onFilesAdd).toHaveBeenCalledWith([fakeFile]);
  });
  test("drag and drop file", async () => {
    let fileFake = new File(["file-drop"], "drop.png", { type: "image/png" });
    let { findByTestId } = renderAttachment({ files: [fileFake] });
    let domDropFile = await findByTestId("drop-file");
    let attributes= domDropFile.attributes.length;
    let arr =[];
    for(let i=0;i<attributes;i++){
      arr.push(domDropFile.attributes[i].nodeName);
    }
    console.log(arr);
    
  });
});
