import React from "react";
import classes from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={classes.search}>
      <BiSearch size={18} className={classes.icon} />
      <input
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
