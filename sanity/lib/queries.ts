import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
*[_type == "startup" 
  && defined(slug.current) 
  && !defined($search) 
  || title match $search
  || category match $search 
  || author -> name match $search] 
  | order(_createdAt desc){
    _id, 
    title,
    slug,
    _createdAt,
    image,
    views,
    description,
    category,
    author -> {
      _id, name, image, bio
    }
  }
`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    _id, 
    title,
    slug,
    _createdAt,
    image,
    views,
    description,
    category,
    author -> {
      _id, username, name, image, bio
    },
    pitch
  }
`)

export const STARTUP_BY_USER_ID_QUERY = defineQuery(`
  *[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    _id, 
    title,
    slug,
    _createdAt,
    image,
    views,
    description,
    category,
    author -> {
      _id, username, name, image, bio
    },
    pitch
  }
`)

export const STARTUP_VIEW_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0] {
    views,
  }  
`)

export const AUTHOR_BY_EMAIL_QUERY = defineQuery(`
  *[_type == "author" && email == $email][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`)