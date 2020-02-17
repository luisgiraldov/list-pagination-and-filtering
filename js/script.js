/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

(function(){
   /*** 
      Add your global variables that store the DOM elements you will 
      need to reference and/or manipulate. 
      
      But be mindful of which variables should be global and which 
      should be locally scoped to one of the two main functions you're 
      going to create. A good general rule of thumb is if the variable 
      will only be used inside of a function, then it can be locally 
      scoped to that function.
   ***/
   const student_list = document.querySelectorAll('.student-item');
   const items_per_page = 10;



   /*** 
      Create the `showPage` function to hide all of the items in the 
      list except for the ten you want to show.

      Pro Tips: 
      - Keep in mind that with a list of 54 students, the last page 
         will only display four.
      - Remember that the first student has an index of 0.
      - Remember that a function `parameter` goes in the parens when 
         you initially define the function, and it acts as a variable 
         or a placeholder to represent the actual function `argument` 
         that will be passed into the parens later when you call or 
         "invoke" the function 
   ***/
   function showPage(list, page){
      const start_index = (page * items_per_page) - items_per_page;
      const end_index = page * items_per_page;
      console.log("list length: " + list.length);

      for (let i = 0, len = list.length; i < len ; i++){
         if(i >= start_index && i < end_index){
            list[i].style.display = '';
         } else {
            list[i].style.display = 'none';
         }
      } // endFor
   }

   showPage(student_list, 3);

   function createElem(name, class_name){
      const element = document.createElement(name);
      if(class_name){
         element.className = class_name;
      }
      return element;
   }
   /*** 
      Create the `appendPageLinks function` to generate, append, and add 
      functionality to the pagination buttons.
   ***/

   function appendPageLinks(list){
      const div = createElem('DIV', "pagination");
      const ul = createElem('UL');
      console.log(div);
      console.log(ul);
   }

   appendPageLinks(student_list);
  // pagination HTML to create dynamically 
//   <div class="pagination">
//     <ul>
//       <li>
//         <a class="active" href="#">1</a>
//       </li>
//        <li>
//         <a href="#">2</a>
//       </li>
//        <li>
//         <a href="#">3</a>
//       </li>
//        <li>
//         <a href="#">4</a>
//       </li>
//        <li>
//         <a href="#">5</a>
//       </li>
//     </ul>
//   </div>
  // end pagination 




   // Remember to delete the comments that came with this file, and replace them with your own code comments.
})();
