var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;
var request,database,objectStore,tbs;
request = indexedDB.open("acm_information",2);
request.onerror = function(event){
  alert("Someting bad happened while trying to open:"+event.target.message);
}
request.onsuccess = function (event) {
  database = event.target.result;
  var transaction = database.transaction(["users","teams"], "readwrite");
        objectStore = transaction.objectStore("users");
        tbs = transaction.objectStore("teams");
}
request.onupgradeneeded=function(e){
   database=e.target.result;
   objectStore = database.createObjectStore("users", {keyPath: "userno"});
   tbs = database.createObjectStore("teams", {keyPath: "Tname"});
};
function Add() {
  var no=document.getElementById("t1").value;
  var name=document.getElementById("t2").value;
  var Class=document.getElementById("t3").value;
  var minzu=document.getElementById("t4").value;
  var email=document.getElementById("t5").value;
  var user = {
    userno:no,
    username:name,
    userminzu:minzu,
    userclass:Class,
    useremail:email
  };
  var transaction = database.transaction(["users"], "readwrite");
        objectStore = transaction.objectStore("users");
  request=objectStore.add(user);
  request.onerror = function(){
    alert('add添加数据库中已有该数据');
  };
  request.onsuccess = function(){
    alert('add添加数据已存入数据库')
  };

}
function AddTeam() {
  var name=document.getElementById("tt1").value;
  var userone=document.getElementById("tt2").value;
  var usertwo=document.getElementById("tt3").value;
  var userthree=document.getElementById("tt4").value;
  //var email=document.getElementById("t5").value;
  var team = {
    Tname:name,
    one:userone,
    two:usertwo,
    three:userthree
  };
  var transaction = database.transaction(["teams"], "readwrite");
        objectStore = transaction.objectStore("teams");
  request=objectStore.add(team);
  request.onerror = function(){
    alert('addTeam添加数据库中已有该数据');
  };
  request.onsuccess = function(){
    alert('addTeam添加数据已存入数据库')
  };

}
function Delete(){
  var no=document.getElementById("d1").value;
  var transaction = database.transaction(["users"], "readwrite");
        objectStore = transaction.objectStore("users");
      request=objectStore.delete(no);
      request.onerror = function() {
        alter("未查到改数据");
      }
      request.onsuccess= function () {
        alter("删除成功");
      }
}
function DeleteTeam(){
  var no=document.getElementById("d2").value;
  var transaction = database.transaction(["teams"], "readwrite");
        objectStore = transaction.objectStore("teams");
      request=objectStore.delete(no);
      request.onerror = function() {
        alert("未查到改数据");
      }
      request.onsuccess= function () {
        alert("删除成功");
      }
}
function _Get() {
    var p=document.getElementById("d");
    p.innerHTML="";//获取数据前先清理一下页面已显示的数据
    if(!database){
        alert("请打开数据先！");
        return false;
    }
    var store = database.transaction("users").objectStore("users");
    var keyRange = IDBKeyRange.lowerBound(0);//规定keyRange从0开始
    var cursorRequest = store.openCursor(keyRange);//按照keyRange的设置开启游标
    cursorRequest.onsuccess = function (e) {
        var result = e.target.result;
        if (!!result == false)
            return;
        _Render(result.value);
        result.continue();//这边执行轮询读取
    };
    cursorRequest.onerror = function (e) {
        alert("数据检索失败！");
    };
}
function _Render (e) {
    var pp=document.getElementById("d");
    pp.innerHTML+="<tr><td>"+e.userno+"</td><td>"+e.username+"</td><td>"+e.userminzu+"</td><td>"+e.userclass+"</td><td>"+e.useremail+"</tr>";
    }
function _RenderTeam (e) {
  var pp=document.getElementById("ST");
  pp.innerHTML="";
  pp.innerHTML+="<tr><td>"+e.Tname+"</td><td>"+e.one+"</td><td>"+e.two+"</td><td>"+e.three+"</td></tr>";
  }
function _render (e,pt) {
    var p=pt;//document.getElementById("d");
    p.innerHTML+="<tr><td>"+e.userno+"</td><td>"+e.username+"</td><td>"+e.userminzu+"</td><td>"+e.userclass+"</td><td>"+e.useremail+"</tr>";
    }
function Find() {
  var no=document.getElementById("f1").value;
  var transaction = database.transaction(["users"], "readwrite");
        objectStore = transaction.objectStore("users");
  var result = objectStore.get(no);
  result.onsuccess=function(event)
  {
  var pd=document.getElementById("d");
  pd.innerHTML="";
    _render(event.target.result,pd);
  }
}
function Findbak() {
  var no=document.getElementById("C1").value;
  document.getElementById("c6").value=no;
  var transaction = database.transaction(["users"], "readwrite");
        objectStore = transaction.objectStore("users");
  var result = objectStore.get(no);
  result.onsuccess=function(event)
  {
  var p2=document.getElementById("C2");
  p2.innerHTML="";
    _render(event.target.result,p2);
  }
}
function print(e,pt,Tnn1,Tnn2,Tnn3){
  var p=pt;
  p.innerHTML+="<tr><td>"+e+"</td><td>"+Tnn1+"</td><td>"+Tnn2+"</td><td>"+Tnn3+"</td></tr>";
}
function _renderTeam (e,pt) {
    //document.getElementById("d");
    var Tnn1,Tnn2,Tnn3
    var no1=e.one,no2=e.two,no3=e.three;
    var transaction = database.transaction(["users"], "readwrite");
          tbs = transaction.objectStore("users");
            var resultTeam1 = tbs.get(no1);
                resultTeam1.onsuccess=function(event){
                  Tnn1=event.target.result.username;

                var resultTeam2 = tbs.get(no2);
                resultTeam2.onsuccess=function(event){
                  Tnn2=event.target.result.username;

                var resultTeam3 = tbs.get(no3);
                resultTeam3.onsuccess=function(event){
                  Tnn3=event.target.result.username;
                  print(e.Tname,pt,Tnn1,Tnn2,Tnn3);
                }
              }
            }

      }
function FindTeambak() {
  var no=document.getElementById("CT1").value;
  document.getElementById("cT2").value=no;
  var transaction = database.transaction(["teams"], "readwrite");
        objectStore = transaction.objectStore("teams");
      //  tbs = transaction.objectStore("users");
  var result = objectStore.get(no);

  result.onsuccess=function(event)
  {
  var p2=document.getElementById("CT2");
  p2.innerHTML="";
  //alert(event.target.result.one);
    _renderTeam (event.target.result,p2);
  }
}
function FindTeambak_() {
  var no=document.getElementById("ST0").value;
  document.getElementById("ST1").value=no;
  var transaction = database.transaction(["teams"], "readwrite");
        objectStore = transaction.objectStore("teams");
      //  tbs = transaction.objectStore("users");
  var result = objectStore.get(no);

  result.onsuccess=function(event)
  {
  var p2=document.getElementById("ST");
  p2.innerHTML="";
  //alert(event.target.result.one);
    _renderTeam (event.target.result,p2);
  }
}
function uPdate() {
  var no=document.getElementById("c6").value;
  var name=document.getElementById("c2").value;
  var Class=document.getElementById("c3").value;
  var minzu=document.getElementById("c4").value;
  var email=document.getElementById("c5").value;
  var userr = {
    userno:no,
    username:name,
    userminzu:minzu,
    userclass:Class,
    useremail:email
  };
  var transaction = database.transaction(["users"], "readwrite");
        objectStore = transaction.objectStore("users");
        var request = objectStore.put(userr);
        request.onsuccess = function(){
            alert('添加成功');
        };
        request.onerror = function(event){
            console.log(event);
        }
}
function uPdateTeam() {

  var Teamname=document.getElementById("cT2").value;
  var Tuser1=document.getElementById("cT3").value;
  var Tuser2=document.getElementById("cT4").value;
  var Tuser3=document.getElementById("cT5").value;
  var userr = {
    Tname:Teamname,
    one:Tuser1,
    two:Tuser2,
    three:Tuser3
  };
  var transaction = database.transaction(["teams"], "readwrite");
        objectStore = transaction.objectStore("teams");
        var request = objectStore.put(userr);
        request.onsuccess = function(){
            alert('修改成功');
        };
        request.onerror = function(event){
            console.log(event);
        }
}
function _GetTeam() {
    var p=document.getElementById("d2");
    p.innerHTML="";//获取数据前先清理一下页面已显示的数据
    if(!database){
        alert("请打开数据先！");
        return false;
    }
    var store = database.transaction("teams").objectStore("teams");
    var keyRange = IDBKeyRange.lowerBound(0);//规定keyRange从0开始
    var cursorRequest = store.openCursor(keyRange);//按照keyRange的设置开启游标
    cursorRequest.onsuccess = function (e) {
        var result = e.target.result;
        if (!!result == false)
            return;
        _RenderTeam(result.value);
        result.continue();//这边执行轮询读取
    };
    cursorRequest.onerror = function (e) {
        alert("数据检索失败！");
    };
}
