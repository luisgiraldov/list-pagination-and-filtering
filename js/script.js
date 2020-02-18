/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
 * IIFE to not clutter the Global Object
***/
(function(){
   /*** 
    * Global variables
   ***/
   const student_list = document.querySelectorAll(".student-item");
   const items_per_page = 10;

   /***
    * `showPage` function
    * @param {NodeList} list - holds the list of all students
    * @param {Number} page - holds the index of the current page
    * Display (items_per_page) number of students on the page
   ***/
   function showPage(list, page){
      const start_index = (page * items_per_page) - items_per_page;
      const end_index = page * items_per_page;

      for (let i = 0, len = list.length; i < len ; i++){
         if(i >= start_index && i < end_index){
            list[i].style.display = "";
         } else {
            list[i].style.display = "none";
         }
      } // endFor
   }

   /***
    * `createElem` function
    * returns a new element
    * @param {String} name - holds the tag name of the element to be created
    * @param {Object} elemAttributes - holds an object that contains all attributes that are going to be added to the element
    * Creates an element based on the values that are passed in
   ***/
   function createElem(name, elemAttributes){
      const element = document.createElement(name);
      if(elemAttributes){
         if(elemAttributes.elClass){
            element.classList = elemAttributes.elClass;
         }

         if(elemAttributes.href){
            element.href = elemAttributes.href;
         }

         if(elemAttributes.text){
            element.textContent = elemAttributes.text;
         }

         if(elemAttributes.data){
            element.dataset.name = elemAttributes.data;
         }

         if(elemAttributes.type){
            element.type = elemAttributes.type;
            if(elemAttributes.placeholder){
               element.placeholder = elemAttributes.placeholder;
            }
         }

      }
      return element;
   }

   /***
    * `paginationCallback` function
    * @param {Object} event - holds the value of the event object
    * removes the active class from all the anchor tags.
    * later adds the active class to the element who triggered the event.
    * calls the showPage function to display students based on the page selected
   ***/
   function paginationCallback(e){
      e.preventDefault();
      if(e.target.dataset["name"] === "anchor"){
         const anchors = document.querySelectorAll("[data-name]");
         for(let i = 0, len = anchors.length; i < len; i++){
            anchors[i].classList.remove("active");
         }

         e.target.classList.add("active");
         showPage(student_list, e.target.textContent);
      }
   }

   /***
    * `createAnchors` function
    * @param {Number} i - holds the actual value of the counter for the loop, whom called this function 
    * Creates an anchor elements an adds attributes based on the number of the page(i)
   ***/
   function createAnchors(i){
      let a;
      if(i === 0){
         a = createElem("a", {
            elClass: "active",
            href: "#",
            text: i + 1,
            data: "anchor"
         });
      } else {
         a = createElem("a", {
            href: "#",
            text: i + 1,
            data: "anchor"
         });
      }
      return a;
   }

   /***
    * `appendPageLinks` function
    * @param {NodeList} list - holds the list of all students
    * Calls createElem function and with the elements returned, appends it to the page
   ***/
   function appendPageLinks(list){
      const divPage = document.querySelector(".page");
      const divPagination = createElem("DIV", { 
                                       elClass: "pagination"
                                    });
                             
      const ul = createElem("UL");
      ul.addEventListener("click", paginationCallback);

      for (let i = 0, len = list.length/items_per_page; i < len; i++){
         let li = createElem("LI");
         let a = createAnchors(i);
         li.appendChild(a);
         ul.appendChild(li);
      }
      divPagination.appendChild(ul);
      divPage.appendChild(divPagination);
   }
   
   /*** 
    * add search bar to the DOM
   ***/

   function addSearchBar(){
      const divHeader = document.querySelector(".page-header");
      const divStudentSearch = createElem("DIV", {
         elClass: "student-search"
      });

      const inputSearch = createElem("INPUT", {
         type: "text",
         placeholder: "Search for students..."
      });

      const buttonSearch = createElem("BUTTON", {
         text: "Search"
      });

      divStudentSearch.appendChild(inputSearch);
      divStudentSearch.appendChild(buttonSearch);
      divHeader.appendChild(divStudentSearch);
   }

   showPage(student_list, 1);
   appendPageLinks(student_list);
   addSearchBar();
})();
