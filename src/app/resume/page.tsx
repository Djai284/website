"use client";

import { useEffect } from "react";

const ResumePage = () => {
  useEffect(() => {
    window.location.href = "https://firebasestorage.googleapis.com/v0/b/personal-website-f0071.appspot.com/o/Dhananjai_Resume.pdf?alt=media&token=c967c209-4021-4409-90b7-6c4f34b0caf9";
  }, []);

  return null;
}

export default ResumePage;