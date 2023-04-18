import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";

export const Items = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.sku,
  };
  const flatProps = {
    options: top100Films.map((option) => option.sku),
  };
  const [value, setValue] = React.useState(null);

  return (
    <div>
      <Stack spacing={1} sx={{ width: 300 }} >
        <FormControl fullWidth variant="outlined">
          <Select
            value={selectedItem}
            onChange={handleChange}
            label="Items"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="Search by Sku ">Search by SKU</MenuItem>
            <MenuItem value="Search by Brand">Search by Brand</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          id="outlined-basic"
          variant="outlined"
          label={selectedItem ? selectedItem : "Type here"}
          InputLabelProps={{
            shrink: true,
          }}
          value={inputValue}
          onChange={handleInputChange}
          // sx={{ marginTop: 2 }}
          margin="normal"
        /> */}

        <Autocomplete
          {...defaultProps}
          id="disable-close-on-select"
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              label={selectedItem ? selectedItem : "Type here"}
              margin="normal"
              variant="outlined"
            />
          )}
        />
      </Stack>
    </div>
  );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { sku: "ABC-123"},
	{ sku: "EDS-345"},
  { sku: "JDT-678"},
	{ sku: "JAP-890"},
	{ sku: "AHS-111"},
];
