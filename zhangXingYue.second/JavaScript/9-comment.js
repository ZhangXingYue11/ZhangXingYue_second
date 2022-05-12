var message_main_comment = document.querySelector('.message-main-comment');
var comment = document.querySelector('.comment')
var comment_top_back = document.querySelector('.comment-top-back')
//定义下面的模板
var comment_main = document.querySelector('.comment-main')
var comment_box1 = document.querySelector('.comment-box1')
var comment_box1_imgs = document.getElementsByClassName('comment-box1-imgs')
var comment_box1_name = document.getElementsByClassName('comment-box1-name')
var comment_box1_text = document.getElementsByClassName('comment-box1-text')
var comment_box1_pics = document.getElementsByClassName('comment-box1-pics')

//点击新增关注跳到此页
message_main_comment.addEventListener('click', function () {
    message.style.display = 'none';
    showcomment(yourId)
    comment.style.display = 'block';
})
//点击返回跳转
comment_top_back.addEventListener('click', function () {
    comment.style.display = 'none';
    message.style.display = 'block';
})
//只留下下一次复制的模板
function remove_comment() {
    var childs = comment_main.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        comment_main.removeChild(childs[i]);
    }
    comment_box1_imgs[0].src = ''
    comment_box1_name[0].innerHTML = ''
    comment_box1_text[0].innerHTML = ''
    comment_box1_pics[0].src = ''
}
function showcomment(yourId) {
    axios.get('http://175.178.193.182:8080/notice/comment?userId=' + yourId,)
        .then(function (response) {
            remove_comment()
            // comment_main.firstElementChild.style.display = 'none'
            for (var i = 0; i < response.data.like.length; i++) {
                comment_main.appendChild(comment_main.children[0].cloneNode(true));
                comment_box1_imgs[i].src = response.data.like[i].userInfo.avatar
                comment_box1_name[i].innerHTML = response.data.like[i].userInfo.nickname
                comment_box1_text[i].innerHTML = '评论了你的笔记'
                comment_box1_pics[i].src = response.data.like[i].articleInfo.images[0]

            }
            comment_main.lastElementChild.style.display = 'none'

        })
        .catch(function (error) {
            console.log(error);
        });
}