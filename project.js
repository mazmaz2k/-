var sequence = ["#red", "#blue", "#yellow", "#green","#red"];  //etc.
var human = []; 
var i = 0;

function add_sequence() 
{
   human.push(sequence[i])
   animate(human);

   $("" + human[i] + "").click(function() {
      human.push(sequence[i])
      animate(human);
      i++;     
   });
};
function animate(s) {
      var i = 0;
      var interval = setInterval(function() {

      anim(s[i]);
      i++;
      if (i >= s[i].length) {
         clearInterval(interval);
      }
   }, 500);
};

function anim(id) {

  $("" + id + "").delay(500)
     .animate({
       opacity: 1
     }, 300)
     .animate({
       opacity: 0.5
     }, 300)
};