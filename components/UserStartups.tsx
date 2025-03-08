import { client } from "@/sanity/lib/client";
import { STARTUP_BY_USER_ID_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";

interface IUserStartupsProps {
  id: string;
}

export default async function UserStartups({ id }: IUserStartupsProps) {
  const startups = await client.fetch(STARTUP_BY_USER_ID_QUERY, { id });
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
}
