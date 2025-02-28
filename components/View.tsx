import { sanityFetch } from "@/lib/live";
import Ping from "./Ping";
import { STARTUP_VIEW_QUERY } from "@/sanity/lib/queries";

export default async function ({ id }: { id: string }) {
  const { data } = await sanityFetch({
    query: STARTUP_VIEW_QUERY,
    params: { id },
  });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">
          {data.views} {data.views === 1 ? "view" : "views"}
        </span>
      </p>
    </div>
  );
}
