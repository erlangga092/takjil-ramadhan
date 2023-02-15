import { Link } from "@inertiajs/react";
import React from "react";

const FormSearch = ({
  onChange,
  onSearch,
  placeholder,
  onReset,
  addLink = "",
  value,
  importLink = "",
  onDeleteAll,
  onEnrolle,
  onBack = "",
  pdfLink = "",
}) => {
  return (
    <form onSubmit={onSearch}>
      <div className="input-group mb-3">
        {onBack != "" && (
          <Link href={onBack} className="btn btn-info input-group-text">
            <i className="fa fa-arrow-left"></i> BACK
          </Link>
        )}
        {pdfLink != "" && (
          <a
            href={pdfLink}
            className="btn btn-info input-group-text"
            target="_blank"
          >
            <i className="fa fa-file-pdf"></i> PDF
          </a>
        )}
        {addLink != "" && (
          <Link href={addLink} className="btn btn-primary input-group-text">
            <i className="fa fa-plus-circle"></i> NEW
          </Link>
        )}
        {onEnrolle && (
          <button
            className="btn btn-primary input-group-text"
            onClick={onEnrolle}
            type="button"
          >
            <i className="fa fa-plus-circle me-2"></i> ENROLLE
          </button>
        )}
        <button
          className="btn btn-secondary input-group-text"
          onClick={onReset}
          type="button"
        >
          <i className="fa fa-undo me-2"></i> RESET
        </button>
        {onDeleteAll && (
          <button
            className="btn btn-danger input-group-text"
            type="button"
            onClick={onDeleteAll}
          >
            <i className="fa fa-trash me-2"></i> DELETE ALL
          </button>
        )}
        {importLink != "" && (
          <Link href={importLink} className="btn btn-primary input-group-text">
            <i className="fa fa-file-excel"></i> IMPORT
          </Link>
        )}
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <button className="btn btn-primary input-group-text" type="submit">
          <i className="fa fa-search me-2"></i> SEARCH
        </button>
      </div>
    </form>
  );
};

export default FormSearch;
