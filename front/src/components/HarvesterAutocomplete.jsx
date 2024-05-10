/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import { Autocomplete, Chip, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { toolsArray } from "../../data/harvester";

export default function HarvesterAutocomplete({
  value,
  handleChange,
  handleDelete,
}) {
  const renderChips = value.map((option) => {
    return (
      <Chip
        key={option.id}
        label={option.name}
        deleteIcon={<RemoveIcon />}
        onDelete={() => handleDelete(option)}
      />
    );
  });

  return (
    <div className="w-full">
      <Autocomplete
        multiple
        freeSolo
        filterSelectedOptions
        options={toolsArray}
        onChange={handleChange}
        getOptionLabel={(option) => option.name}
        renderTags={() => {}}
        value={value}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Sources"
            margin="normal"
            fullWidth
          />
        )}
      />
      <div className="selectedTags">{renderChips}</div>
    </div>
  );
}
