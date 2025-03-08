"use server";

import { auth } from "@/auth";
import { Startup } from "../../sanity.types";
import { writeClient } from "./writeClient";
import { parseServerActionResponse, slugify } from "@/lib/utils";

declare type OmitStartup =
  | "_id"
  | "_type"
  | "_createdAt"
  | "_updatedAt"
  | "_rev";

export async function createStartup(props: Omit<Startup, OmitStartup>) {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }
  try {
    const result = await writeClient.create({
      _type: "startup",
      ...props,
      slug: {
        _type: "slug",
        current: slugify(props.title || ""),
      },
      author: {
        _type: "reference",
        _ref: (session as any).id,
      },
      views: 0,
    });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}
