let $createButton = document.getElementById("create_button");
let $editButton = document.getElementById("edit_button");
let $deleteButton = document.getElementById("delete_button");
let $confirmButton = document.getElementById("confirm_button");

let $authorInput = document.getElementById("author_input");
let $titleInput = document.getElementById("title_input");
let $contentInput = document.getElementById("content_input");
let $editInput = document.getElementById("edit_input");
let $deleteInput = document.getElementById("delete_input");

let $darkWrapper = document.querySelector(".dark_wrapper");
let $mainContainer = document.querySelector(".main_container")

let posts = {}
let postCounter = 0;

function clearInputs(){
    $authorInput.value = "";
    $titleInput.value = "";
    $contentInput.value = "";
    $deleteInput.value = "";
    $editInput.value = "";
}

$createButton.onclick = ()=>{
    $darkWrapper.style.display = "block";
    $confirmButton.onclick = async ()=>{
        if($titleInput.value==""||$contentInput.value==""||$authorInput.value=="") return;
        $darkWrapper.style.display = "none";
        let post = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: $titleInput.value,
                body: $contentInput.value,
                userId: $authorInput.value,
            }),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        }).then((response) => response.json());
        $mainContainer.insertAdjacentHTML("beforeend",`<div class="post" id="post${postCounter}"><p>Автор:${post.userId}</p><p>Заголовок:${post.title}</p><p>Содержание:${post.body}</p><p>ID:${postCounter}</p></div>`);
        posts[postCounter] = {id:postCounter, author: post.userId, title: post.title, content: post.body};
        postCounter+=1;
        clearInputs();
    }
}
$editButton.onclick = ()=>{
    var post = posts[$editInput.value];
    if(post==null) return;
    $authorInput.value = post.author;
    $titleInput.value = post.title;
    $contentInput.value = post.content;
    $darkWrapper.style.display = "block";
    $confirmButton.onclick = ()=>{
        $darkWrapper.style.display = "none";
        let child = document.getElementById(`post${post.id}`);
        let parent = child.parentNode;
        for (var i = 0; i < parent.childNodes.length; i++) {
            if(parent.childNodes[i]===child){
                child.insertAdjacentHTML("afterend",`<div class="post" id="post${post.id}"><p>Автор:${$authorInput.value}</p><p>Заголовок:${$titleInput.value}</p><p>Содержание:${$contentInput.value}</p><p>ID:${post.id}</p></div>`);
                parent.removeChild(child);
                break;
            }
        }
        posts[post.id] = {id:post.id, author: $authorInput.value, title: $titleInput.value, content: $contentInput.value};
        clearInputs();
    }
}
$deleteButton.onclick = ()=>{
    var post = posts[$deleteInput.value];
    if(post==null) return;
    let child = document.getElementById(`post${post.id}`);
    child.parentNode.removeChild(child);
    posts[$deleteInput] = undefined;
    clearInputs();
}