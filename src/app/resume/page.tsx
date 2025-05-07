"use client";

import { useEffect } from "react";

const ResumePage = () => {
  useEffect(() => {
    window.location.href = "https://firebasestorage.googleapis.com/v0/b/personal-website-f0071.appspot.com/o/Dhananjai_Resume.pdf?alt=media&token=7ed94f15-b2a5-48e1-b4c1-0a3a69395401";
  }, []);

  return null;
}

export default ResumePage;