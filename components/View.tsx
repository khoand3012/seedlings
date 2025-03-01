import Ping from "./Ping";
import { STARTUP_VIEW_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/writeClient";
import { after } from "next/server";

export default async function ({ id }: { id: string }) {
  const data = await client.fetch(
    STARTUP_VIEW_QUERY,
    { id },
    { useCdn: false }
  );

  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: data.views + 1 })
      .commit();
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
