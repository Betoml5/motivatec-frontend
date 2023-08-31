import { useEffect, useRef, useState } from "react";

const useSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks on the document
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    }

    //add event if user scroll the page
    function handleScroll() {
      setSidebarOpen(false);
    }

    document.addEventListener("scroll", handleScroll);

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { sidebarOpen, setSidebarOpen, containerRef };
};

export default useSideBar;
