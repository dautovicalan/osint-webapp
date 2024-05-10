import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Button, Card, CardActionArea, CardContent } from "@mui/material";
import { formatDate } from "../utils/dateFormater";

export const HarvesterDetails = () => {
  const { id } = useParams();
  const { response, isLoading, error } = useFetch(
    `http://localhost:8000/api/harvester/${id}`
  );

  return (
    <div className="w-full flex justify-center p-8">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {response && (
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-bold">Domain: {response.domain}</h1>
              <p>Start time: {formatDate(response.start_time.$date)}</p>
              <p>End time: {formatDate(response.end_time.$date)}</p>
              <p>Total ASNS: {response.total_asns.join(", ")}</p>
              <p>Intresing URLs: {response.interesting_urls.join(", ")}</p>
              <p>
                Twitter people:{" "}
                {response.twitter_people_list_tracker.join(", ")}
              </p>
              <p>
                LinkedIn people:{" "}
                {response.linkedin_people_list_tracker.join(", ")}
              </p>
              <p>
                LinkedIn links: {response.linkedin_links_tracker.join(", ")}
              </p>
              <p>Trello URLs: {response.trello_urls.join(", ")}</p>
              <p>IPs: {response.ips.join(", ")}</p>
              <p>Emails: {response.emails.join(", ")}</p>
              <p>Hosts: {response.hosts.join(", ")}</p>
            </div>
          </CardContent>
          <CardActionArea>
            <Link to="/harvester" className="w-full">
              <Button variant="contained" fullWidth>
                Back
              </Button>
            </Link>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
};
