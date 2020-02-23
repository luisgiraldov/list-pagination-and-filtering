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
   const listNames = document.querySelectorAll("h3");
   const divPage = document.querySelector(".page");

   /***
    * `showPage` function
    * @param {NodeList} list - holds the list of all students, if it is empty display message to user
    * @param {Number} page - holds the index of the current page
    * Display (items_per_page) number of students on the page
   ***/
   function showPage(list, page){
      if(list.length > 0){
         const start_index = (page * items_per_page) - items_per_page;
         const end_index = page * items_per_page;

         for (let i = 0, len = list.length; i < len ; i++){
            if(i >= start_index && i < end_index){
               list[i].style.display = "";
            } else {
               list[i].style.display = "none";
            }
         } // endFor
      } else{
         const divError = createElem("DIV");
         const message = createElem("H2");
         message.textContent = "Sorry we couldn't find anything like that!";
         divError.appendChild(message);
         divPage.appendChild(divError);
      }
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
    * @param {Object} e - holds the value of the event object
    * @param {NodeList, Array} - holds a list of students to pass to showPage when a link is clicked along with the page number
    * removes the active class from all the anchor tags.
    * later adds the active class to the element who triggered the event.
    * calls the showPage function to display students based on the page selected
   ***/
   function paginationCallback(e, list){
      e.preventDefault();
      if(e.target.dataset["name"] === "anchor"){
         const anchors = document.querySelectorAll("[data-name]");
         for(let i = 0, len = anchors.length; i < len; i++){
            anchors[i].classList.remove("active");
         }

         e.target.classList.add("active");
         showPage(list, e.target.textContent);
      }
   }

   /***
    * `createAnchors` function
    * Returns a new link (anchor tag)
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
    * @param {NodeList} list - holds the list of the students to calculate how many links (pages) are going to be needed
    * Calls createElem function. With the elements returned, append them to the page
   ***/
   function appendPageLinks(list){
      const divPagination = createElem("DIV", { 
                                       elClass: "pagination"
                                    });
                             
      const ul = createElem("UL");
      ul.addEventListener("click", (e) => {
         paginationCallback(e, list);
      });

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
    * `replaceSpecialCharacters` function
    * Returns a string without HTML entities or special characters
    * @param {String} userInput - Holds the string value the user typed into the search bar
    * Find any HTML entity and replace with an empty string, simulates a basic html sanitizer, and avoid creating an unexpected regex.
   ***/
   function replaceSpecialCharacters(userInput){
      return userInput.replace(/[\!\@\#\$\%\^\&\*\(\)\+\=\~\`\<\>\"\/\|\\\?]/gm, "sorry we couldn't find anyhting keep looking!");
   }


   /***
    * `removePaginationLinks` function 
    * Remove divPagination to create a new one
   ***/
   function removePaginationLinks(){
     const divPagination = divPage.lastElementChild;
     divPage.removeChild(divPagination);
   }

   /***
    * `searchBarCallback` function
    * @param {String} - holds the string the user typed into the search bar
    * This function calls replaceSpecialCharacters to replace html entities and special characters
    * Calls findStudents to get the students that match the query from the user
    * Appends new pagination links
    * Display new List of students based on user's query
   ***/
   function searchBarCallback(userInput){
      if(userInput !== ""){
         let sanitizedInput = replaceSpecialCharacters(userInput);
         let studentsFound = findStudents(sanitizedInput);
         removePaginationLinks();
         appendPageLinks(studentsFound);
         showPage(studentsFound, 1);
      }else if(userInput === ""){
         removePaginationLinks();
         showPage(student_list, 1);
         appendPageLinks(student_list);
      }
   }

   /***
    * `addSearchBar` function 
    * Add search bar to the DOM
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
      
      inputSearch.addEventListener("keyup", () => {
         searchBarCallback(inputSearch.value);
      });

      buttonSearch.addEventListener("click", ()=> {
         searchBarCallback(inputSearch.value);
      });

      divStudentSearch.appendChild(inputSearch);
      divStudentSearch.appendChild(buttonSearch);
      divHeader.appendChild(divStudentSearch);
   }

   /***
    * `findStudents` function
    * Returns array with students that match the query made by the user 
    * @param {String} - Holds the input from the user
    * Everytime creates a new regex based on the user input
    * Search for students that match the pattern and save them into an array
   ***/
   function findStudents(userQuery){
      const regex = new RegExp(`^${userQuery}`);
      const studentsFound = [];

      for(let a = 0, len = student_list.length; a < len; a++){
         student_list[a].style.display = "none";
      }

      for(let i = 0, len2 = listNames.length; i < len2; i++){
         if(regex.test(listNames[i].textContent)){
            let li = listNames[i].parentNode.parentNode;
            li.style.display = ""; 
            studentsFound.push(li);          
         };
      }

      return studentsFound;
   }

   /***
    * Function calls to initialize the page 
   ***/
   showPage(student_list, 1);
   appendPageLinks(student_list);
   addSearchBar();
})();
