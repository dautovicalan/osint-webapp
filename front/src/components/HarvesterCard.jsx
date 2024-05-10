/* eslint-disable react/prop-types */
import { Button, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { hasAdditionalProperties } from "../utils/objectCheck";
import { formatDate } from "../utils/dateFormater";

export const HarvesterCard = ({ result }) => {
  console.log(result);
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 justify-center items-center">
        <h2>Start time: {formatDate(result.start_time.$date)}</h2>
        <p>Domain: {result.domain}</p>
        <p>End Time: {formatDate(result.end_time.$date)}</p>
        {hasAdditionalProperties(result) && (
          <Link to={`/harvester/${result._id.$oid}`}>
            <Button variant="contained">View details</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
