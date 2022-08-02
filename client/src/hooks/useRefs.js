import { useEffect, createRef, useState } from "react";

export const useRefs = (len) => {
   const [refs, setRefs] = useState([]);

   useEffect(() => {
      setRefs((ref) =>
         Array(len)
            .fill()
            .map((_, i) => ref[i] || createRef())
      );
   }, [len]);

   return refs;
};
