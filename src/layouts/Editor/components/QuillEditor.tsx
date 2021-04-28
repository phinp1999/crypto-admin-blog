import React from "react";
import ReactQuill from "react-quill";
import { QuillToolbar, modules, formats } from "./QuillToolbar";

const QuillEditor = ({
  onChange,
  value,
  placeholder,
  onFocus,
  iconFullscreen,
}) => {
  return (
    <React.Fragment>
      <QuillToolbar iconFullscreen={iconFullscreen} />
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={(value, delta, source, editor) => onChange(value, source)}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
};

export default QuillEditor;
