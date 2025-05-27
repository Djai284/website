"use client";

import { useEffect } from "react";

const ResumePage = () => {
  useEffect(() => {
    window.location.href = "https://firebasestorage.googleapis.com/v0/b/personal-website-f0071.appspot.com/o/dhananjai_resume.pdf?alt=media&token=338efb25-bfe3-4df1-aeb3-3707e7f0408b";
  }, []);

  return null;
}

export default ResumePage;