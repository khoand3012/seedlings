import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { formatDate } from "@/lib/utils";

interface IHomepageParams {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: IHomepageParams) {
  const { query } = await searchParams;

  const posts = [
    {
      _createdAt: formatDate(new Date()),
      views: 55,
      author: { _id: 1, name: "Alex Wazowsky" },
      _id: 1,
      description: "Elon Musk's new Robots company",
      category: "Robots",
      title: "We Robots",
      image:
        "https://pub-49dfeb8e513f4009ba56b124403c8cb0.r2.dev/wall-e.png",
    },
  ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vot on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: any) => {
              return <StartupCard post={post} key={post._id} />;
            })
          ) : (
            <p className="no-results">No startups found.</p>
          )}
        </ul>
      </section>
    </>
  );
}
