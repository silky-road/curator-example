
const articleList = document.getElementById("articleList");
const ethereumButton = document.querySelector('.enableEthereumButton');
const addArticleButton = document.getElementById("addArticle");
const getToken = document.getElementById("getToken");
const blogMany = document.getElementById("blog-many");
const blogSingle = document.getElementById("blog-single");
const currentendpoint = document.getElementById("endpoint");
const token = document.getElementById("token");
const getArticle = document.getElementById("getArticle");
const endpointButton = document.getElementById("endpointButton");
const tokenButton = document.getElementById("tokenButton");
const articleDetailList = document.getElementById("articleDetailList");
const backtoblog = document.getElementById("backtoblog");

backtoblog.addEventListener('click', () => {
    blogSingle.hidden = true;
    blogMany.hidden = false;
    let articles = document.getElementsByClassName("entry-single");
    for (var i = 0; i < articles.length; i++){
        articles[i].hidden = true;
    }
})



let account = '';
let endpoint = '';

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
  if (window.ethereum.isMetaMask){
      console.log("yes")
      ethereumButton.addEventListener('click', () => {
      getAccount();
});
if(account) {
       ethereumButton.hidden = true;
    addArticleButton.hidden = false; 
    }
  }
}

addArticleButton.addEventListener('click', ()=>{
 getToken.hidden = false;
 getArticle.hidden = false;
 getArticle.hidden = false;
 endpointButton.disabled = false;
})

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
 account = accounts[0];
  console.log(account);
  ethereumButton.hidden = true;
    addArticleButton.hidden = false;
    if(account) {
        
    }
}

endpointButton.addEventListener('click', ()=>{
    endpoint = currentendpoint.value
    getEndpointToken(endpoint);
})

tokenButton.addEventListener('click', () => {
    getContent(token.value)
   
})

function createArticleEntry(res){
    const articleEntry = document.createElement("article");
    articleEntry.className = "entry";
    const title = document.createElement("h2");
    title.className = "entry-title";
    const titleLink = document.createElement("a");
    titleLink.innerHTML = res.title;
    titleLink.addEventListener('click',() => {
        blogMany.hidden = true;
        blogSingle.hidden = false;
    })
    title.appendChild(titleLink);

    const entryContent = document.createElement("div");
    entryContent.className = "entry-content";
    const readMore = document.createElement("div");

    readMore.id = res.title+"more";

    const readButton = document.createElement("a");
    readMore.className = "read-more";
    readButton.innerText = "Read More";
   
    readMore.appendChild(readButton);

    entryContent.appendChild(readMore);

    articleEntry.appendChild(title);
    articleEntry.appendChild(entryContent);
   articleList.appendChild(articleEntry);
   const readMorethis = document.getElementById(res.title+"more")
    
   readMorethis.addEventListener('click', () => {
        blogMany.hidden = true;
        blogSingle.hidden = false;
         let articles = document.getElementsByClassName("entry-single");
        const articlethis = document.getElementById(res.title+"articleDetail");
        articlethis.hidden = false;
    
         for (var i = 0; i < articles.length; i++){
        if(articles[i].id === res.title+"articleDetail"){
            articles[i].hidden = false;
        }
        else{
            articles[i].hidden = true;
        }
        
    }
        
    })
}

function createArticleDetail(res) {
    const newArticleDetail = document.createElement("article");
    newArticleDetail.id = res.title+"articleDetail";

    const title = document.createElement("h2");

    const content = document.createElement("div");

    title.innerText = res.title;
    content.innerHTML = res.content;

    newArticleDetail.appendChild(title);
    newArticleDetail.appendChild(content);
    newArticleDetail.hidden = true;

    articleDetailList.appendChild(newArticleDetail);
}

function createArticleall() {
    if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
    var res = httpRequest.response;
    createArticleDetail(res);
    createArticleEntry(res);
    getArticle.hidden = true;
    getToken.hidden =true;
    endpoint = '';
    currentendpoint.value = '';
    token.value = '';

    } else {
      alert('올바르지 않은 토큰입니다');
    }
}
}



function alertTxHash(){
    if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
        const resMessage = httpRequest.responseText;
      alert(resMessage);
      
      tokenButton.disabled = false;
      
      token.disabled = false;
      


    } else {
      alert('컨텐츠 승인이 거절당했습니다');
      endpoint.disabled = false;
endpointButton.disabled = false;
    }
  }
}

async function getEndpointToken(newEndpoint) {
    httpRequest = new XMLHttpRequest();
    if(!httpRequest || account === ''){
        if(!httpRequest){
            alert("네트워크 불안정");
        }
        else{
            alert("지갑 연결 필요");
        }
        return;
    }
    httpRequest.onreadystatechange = alertTxHash;
    httpRequest.open('GET', newEndpoint);
    httpRequest.setRequestHeader('curator', account);
    if(newEndpoint !== ''){
httpRequest.send();
endpoint.disabled = true;
endpointButton.disabled = true;
    alert('wait');
    
    }
    

}

async function getContent(newToken) {
   httpRequest = new XMLHttpRequest();
    if(!httpRequest || account === ''){
        if(!httpRequest){
            alert("네트워크 불안정");
        }
        else{
            alert("지갑 연결 필요");
        }
        return;
    }
    httpRequest.responseType = 'json';
    httpRequest.onreadystatechange = createArticleall;
    console.log(endpoint)
    httpRequest.open('GET', endpoint);
    httpRequest.setRequestHeader('curator', account);
    httpRequest.setRequestHeader('token', newToken );
    if(newToken !== ''){  
        httpRequest.send();
    alert('wait');
}
  

}

