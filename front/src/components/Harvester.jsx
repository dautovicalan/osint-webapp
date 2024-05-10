import { Checkbox, FormControlLabel, TextField, Button } from "@mui/material";
import HarvesterAutocomplete from "./HarvesterAutocomplete";
import { HarvesterCard } from "./HarvesterCard";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { isValidDomain } from "../utils/validator";

export const Harvester = () => {
  const { response, isLoading, error } = useFetch(
    "http://127.0.0.1:8000/api/harvester"
  );
  const [harvester, setHarvester] = useState({
    domain: "",
    limit: "",
    start: "",
    dns_lookup: false,
    dns_brute: false,
  });

  const [sources, setSources] = useState([]);

  const [isScaning, setIsScaning] = useState(false);
  const [isScanError, setIsScanError] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "dns_lookup" || name === "dns_brute") {
      return setHarvester({
        ...harvester,
        [name]: checked,
      });
    }

    setHarvester({
      ...harvester,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidDomain(harvester.domain)) {
      return alert("Invalid domain");
    }

    if (sources.length === 0) {
      return alert("Please select at least one source");
    }

    setIsScaning(true);
    setIsScanError(false);

    try {
      const response = await fetch("http://localhost:8000/api/harvester", {
        method: "POST",
        body: JSON.stringify({ ...harvester, sources }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Scan was successful. Refresh page");
    } catch (error) {
      setIsScanError(true);
      console.error(error);
    } finally {
      setIsScaning(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-12">
      <form
        className="w-full sm:w-1/2 flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <TextField
          variant="outlined"
          placeholder="Domain"
          required
          name="domain"
          value={harvester.domain}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          placeholder="Limit"
          required
          name="limit"
          value={harvester.limit}
          onChange={handleChange}
          type="number"
        />
        <TextField
          variant="outlined"
          placeholder="Start"
          name="start"
          value={harvester.start}
          onChange={handleChange}
          type="number"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={harvester.dns_lookup}
              name="dns_lookup"
              onChange={handleChange}
            />
          }
          label="DNS-Lookup"
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={harvester.dns_brute}
              name="dns_brute"
              onChange={handleChange}
            />
          }
          label="DNS-Brute"
        />
        <HarvesterAutocomplete
          value={sources}
          handleChange={(e, value) => setSources(value)}
          handleDelete={(option) =>
            setSources(sources.filter((entry) => entry !== option))
          }
        />
        <Button variant="contained" type="submit" disabled={isScaning}>
          Scan
        </Button>
      </form>
      {isScanError && <p>Something went wrong while scanning</p>}

      {response && (
        <div className="flex flex-col w-full sm:w-1/2 p-8 gap-2">
          <h1 className="text-xl text-center">Result section</h1>
          <div className="flex flex-row flex-wrap gap-6">
            {response.map((result) => (
              <HarvesterCard key={result._id.$oid} result={result} />
            ))}
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong while getting the results</p>}
    </div>
  );
};
