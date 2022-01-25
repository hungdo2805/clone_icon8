/* Copy */
var copyText = function() {
  // Coppy to clipboard
  let text = this.querySelector('.icons__after i').className;
  navigator.clipboard.writeText(text);
  let copied = document.querySelector('.copied');
  // Show popup
  copied.classList.add('show-copied');
     let timeShow = setTimeout(function() {
     copied.classList.remove('show-copied');
  },500); // Time show
}
let icons = document.querySelectorAll('.iconss .icons__item'); // Dom object
let icons_name = []; // name icon array
let icons_length = icons.length;

for (let i = 0; i < icons_length; i++) {
   icons[i].addEventListener('click', copyText);
   icons_name[i] = icons[i].querySelector('.icons__text').textContent;
}


/* Search icon */
let input_box = document.querySelector('.query');
let results_container = document.querySelector('.iconss-search');
let close_btn = document.querySelector('span.close');
let input, iconss_search_item, icons_search; // icons_search: icons item displayed when search
input_box.addEventListener('keyup', searchIcon);

close_btn.addEventListener('click', function() {
   document.querySelector('.iconss').style.display = "block";
   results_container.innerHTML = "";
  close_btn.style.display = "none";
  input_box.value = "";
})

input_box.addEventListener('cut', function() {
   setTimeout(searchIcon,0);
});
input_box.addEventListener('paste', function() {
   setTimeout(searchIcon,0);
});

function searchIcon() {
   input = input_box.value.toLowerCase().trim();
   if (input) {
      document.querySelector('.iconss').style.display = "none";
      close_btn.style.display = "block";
      results_container.innerHTML = "";

      // Mang liet ke vi tri
      let pos_arr = [];
      for (let i = 0; i < icons_length; i++) {
         if (icons_name[i].includes(input)) {
            pos_arr.push(i);
            while ( icons_name.indexOf(icons_name[i], i+1) > 0 ) {
               icons_name[icons_name.indexOf(icons_name[i], i+1)] = '';
            }
         }
      }
      let arr_length = pos_arr.length;
      for (let i = 0; i < arr_length; i++) {
         results_container.insertAdjacentHTML('beforeend', `<div class='icons__item'>${icons[pos_arr[i]].innerHTML}</div>`);
      }

      if (results_container.innerHTML == "")
          results_container.insertAdjacentHTML('beforeend', `
             <div class="no-results">
                <div class="icon" style="font-size: 60px">
                   <i class="las la-meh"></i>
                </div>
                <h2>Nothing Found!</h2>
             </div>
          `);
      icons_search = document.querySelectorAll('.iconss-search .icons__item');
      for (let icon of icons_search) {
         icon.addEventListener('click', copyText);
      }
   }
   else {
      document.querySelector('.iconss').style.display = "block";
      results_container.innerHTML = "";
      close_btn.style.display = "none";
   }
   // console.log(loop_count);
}

/* Back to top */
let backTop_btn = document.querySelector('.backTop');
let header = document.querySelector('.header');
if (window.scrollY > 0)
   backTop_btn.classList.add('show-backTop');
window.addEventListener('scroll', function () {
   if (window.scrollY > 0) {
      backTop_btn.classList.add('show-backTop');
      header.classList.add('header-fixed');
   }
   else {
      backTop_btn.classList.remove('show-backTop');
      header.classList.remove('header-fixed');
   }
})
backTop_btn.addEventListener('click', function() {
   window.scrollTo({ top: 0, behavior: 'smooth' });
})