// import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

interface IHomepageParams {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: IHomepageParams) {
  const { query } = await searchParams;
  const params = { search: query || null };

  // const session = await auth();
  // if (session) console.log("Session ID", session.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType) => {
              return <StartupCard post={post} key={post._id} />;
            })
          ) : (
            <p className="no-results">No startups found.</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
