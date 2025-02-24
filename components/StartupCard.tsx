import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity.types";
import { formatDate } from "@/lib/utils";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

interface IStartupCardProps {
  post: StartupCardType;
}

export default function StartupCard({ post }: IStartupCardProps) {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(new Date(_createdAt))}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-2 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <p className="text-26-semibold line-clamp-1">{title}</p>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            alt="user avatar"
            src={author?.image || "https://placehold.co/48x48"}
            height={48}
            width={48}
            className="rounded-full max-h-[48px] object-cover hover:scale-[1.1] transition-all"
          ></Image>
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium hover:underline">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}
