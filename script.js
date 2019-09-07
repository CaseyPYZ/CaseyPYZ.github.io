var body;
var tables;
var pageNum = 0;
var pageQ = 1; // page quant

//body = document.body;
//body.addEventListener("click", pageChange);

tables = document.getElementsByClassName("table");
currentT = tables[pageNum];

for(var n=0; n<pageQ; n++){
  tables[n].addEventListener("scroll", pageChange);
  tables[n].addEventListener("click", pageChange);
  console.log(n);
}

function updatePageNum(val){
  pageNum+=val;
  console.log("pageNum: " + pageNum);
  pageNum = Math.min(Math.max(pageNum, 0), pageQ);
  console.log("newPageNum: " + pageNum);
  return pageNum;
}


function pageChange(){
  console.log("pageChange triggered");
  
  var sdist = currentT.scrollLeft;

  if(sdist >= 10 && updatePageNum(0)<pageQ){
    //next page on the right
    for(var n=0; n<tables.length; n++){
      tables[n].scrollLeft = 500;
    }
    updatePageNum(1);

  } else if (sdist <= -10 && updatePageNum(0)>1)
  //last page on the left
    for(var n=0; n<tables.length; n++){
      tables[n].scrollLeft = -500;
    }
    updatePageNum(-1);

}
