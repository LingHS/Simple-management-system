function Ttab() {
  document.getElementById("s1").style.display="none";
  document.getElementById("s2").style.display="none";
  document.getElementById("s3").style.display="none";
  document.getElementById("s4").style.display="none";
  document.getElementById("s5").style.display="none";
  document.getElementById("s6").style.display="none";
  document.getElementById("s7").style.display="none";
  document.getElementById("s8").style.display="none";
}
var array=document.getElementsByTagName('aside');
function Ttab1(){
  Ttab();
  document.getElementById("s1").style.display="";
  array[0].style.visibility="visible";
  array[1].style.visibility="hidden";
  array[2].style.visibility="hidden";
  array[3].style.visibility="hidden";
  document.getElementById("s1").style.top="0";
}
function Ttab2(){
  Ttab();
  document.getElementById("s2").style.display="";
  array[0].style.visibility="hidden";
  array[1].style.visibility="visible";
  array[2].style.visibility="hidden";
  array[3].style.visibility="hidden";
  document.getElementById("s2").style.top="0";
}
function Ttab3(){
  Ttab();
  document.getElementById("s3").style.display="";
  array[0].style.visibility="hidden";
  array[1].style.visibility="hidden";
  array[2].style.visibility="visible";
  array[3].style.visibility="hidden";
  document.getElementById("s3").style.top="0";
}
function Ttab4(){
  Ttab();
  document.getElementById("s4").style.display="";
  array[0].style.visibility="hidden";
  array[1].style.visibility="hidden";
  array[2].style.visibility="hidden";
  array[3].style.visibility="visible";
  document.getElementById("s4").style.top="0";
}
function Ttab5(){
  Ttab();
  document.getElementById("s5").style.display="";
  document.getElementById("s5").style.top="0";
}
function Ttab6(){
  Ttab();
  document.getElementById("s6").style.display="";
  document.getElementById("s6").style.top="0";
}
function Ttab7(){
  Ttab();
  document.getElementById("s7").style.display="";
  document.getElementById("s7").style.top="0";
}
function Ttab8(){
  Ttab();
  document.getElementById("s8").style.display="";
  document.getElementById("s8").style.top="0";
}
