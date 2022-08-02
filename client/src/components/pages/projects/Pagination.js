import { createRef, useRef, useCallback } from "react";
import { Pagination } from "react-bootstrap";

const MAX_PAGINATION_BUTTONS = 20;
const START_INDEX = 10;
const END_INDEX = 15;

const BasePagination = ({ numPages = 5 }) => {
   return numPages >= MAX_PAGINATION_BUTTONS ? (
      <Pagination>
         <Pagination.First />
         <Pagination.Prev />
         <Pagination.Item>{1}</Pagination.Item>
         <Pagination.Ellipsis />
         <PaginationBtns numPages={numPages} />
         <Pagination.Ellipsis />
         <Pagination.Item>{numPages}</Pagination.Item>
         <Pagination.Next />
         <Pagination.Last />
      </Pagination>
   ) : (
      <Pagination>
         <PaginationBtns numPages={numPages} />
      </Pagination>
   );
};

const PaginationBtns = ({ numPages }) => {
   const btnRefs = useRef([]);

   if (btnRefs.current.length !== numPages) {
      Array(numPages)
         .fill()
         .map((_, i) => btnRefs[i] || createRef());
   }

   const toggleActive = useCallback((i) => {
      resetActiveState(btnRefs.current);
      btnRefs[i] && btnRefs[i].current.classList.add("active");
   }, []);

   let items = [];
   if (numPages < MAX_PAGINATION_BUTTONS) {
      for (let i = 1; i <= numPages; i++) {
         items.push(
            <Pagination.Item key={i} ref={btnRefs[i]} onClick={() => toggleActive(i)}>
               {i}
            </Pagination.Item>
         );
      }
   } else {
      for (let i = START_INDEX; i <= END_INDEX; ++i) {
         items.push(
            <Pagination.Item key={i} ref={btnRefs[i]} onClick={() => toggleActive(i)}>
               {i}
            </Pagination.Item>
         );
      }
   }

   return items;
};

const resetActiveState = (refs) => {
   for (let ref of refs) {
      if (ref && ref.current) ref.current.classList.remove("active");
   }
};

export default BasePagination;
