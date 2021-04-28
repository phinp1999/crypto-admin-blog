import React from "react";
import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import api from "services/api";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
// Undo and redo functions for Custom Toolbar
function undoChange(this: any) {
  this.quill.history.undo();
}
function redoChange(this: any) {
  this.quill.history.redo();
}
const apiPostNewsImage = (formData: any) => {
  return api.post("uploads/image", formData).then((res) => res.data);
};
function imageHandler(this: any) {
  const input: any = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();
    formData.append("image", file);
    // Save current cursor state
    const range = this.quill.getSelection(true);
    // Insert temporary loading placeholder image
    // this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);
    // Move cursor to right side of image (easier to continue typing)
    // this.quill.setSelection(range.index + 1);
    const res: any = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
    // Remove placeholder image
    // this.quill.deleteText(range.index, 1);
    // Insert uploaded image
    // this.quill.insertEmbed(range.index, 'image', res.body.image);
    this.quill.insertEmbed(range.index, "image", res.attributes.imageUrl);
  };
}
function fullscreenHandler(this: any) {
  const document: any = window.document;

  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add register modules/imageResize
Quill.register("modules/imageResize", ImageResize);
var BaseImageFormat = Quill.import("formats/image");
const ImageFormatAttributesList = ["alt", "height", "width", "style"];

class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    return ImageFormatAttributesList.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  format(name, value) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(ImageFormat, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      image: imageHandler,
      fullscreen: fullscreenHandler,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};
// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
  "width",
  "style",
  "fullscreen",
];
// Quill Toolbar component
export const QuillToolbar = ({ iconFullscreen }) => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="0">
        <option value="1">Title</option>
        <option value="2">Subtitle lvl1</option>
        <option value="3">Subtitle lvl2</option>
        <option value="4">Short des</option>
        <option value="5">Summary</option>
        <option value="6">Line break</option>
        <option value="0">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
      <button className="ql-align" value="justify" />
    </span>
    <span className="ql-formats">
      <select className="ql-color" />
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
      <button className="ql-fullscreen fullscreen-btn">{iconFullscreen}</button>
    </span>
  </div>
);
export default QuillToolbar;
