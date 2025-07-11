"use client";

import { useEffect } from "react";

const BlogPage = () => {
  useEffect(() => {
    window.location.href = "https://blog.jai.place/";
  }, []);

  return null;
}

export default BlogPage;