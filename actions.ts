"use server";

import { Startup } from "./sanity.types";
import { writeClient } from "./sanity/lib/writeClient";

declare type OmitStartup =
  | "_id"
  | "_type"
  | "_createdAt"
  | "_updatedAt"
  | "_rev";

export async function createStartup(props: Omit<Startup, OmitStartup>) {
  return writeClient.create({
    _type: "startup",
    ...props,
  });
}
