var message_Main_Collect = document.querySelector('.message-main-collect');
var collect = document.querySelector('.collect')
var collect_Top_Back = document.querySelector('.collect-top-back');
var collect_Class_Like = document.querySelector('.collect-class-like')
var collect_Class_Collect = document.querySelector('.collect-class-collect')
var collect_Main_like = document.querySelector('.collect-main-like')
var collect_Main_Collect = document.querySelector('.collect-main-collect')
//每一个模板 (收到的点赞)
var box1 = document.querySelector('.box1')
var box1_imgs = document.getElementsByClassName('box1-imgs')
var box1_name = document.getElementsByClassName('box1-name')
var box1_text = document.getElementsByClassName('box1-text')
var box1_pics = document.getElementsByClassName('box1-pics')
//每一个模板 (收到的收藏)
var box2 = document.querySelector('.box2')
var box2_imgs = document.getElementsByClassName('box2-imgs')
var box2_name = document.getElementsByClassName('box2-name')
var box2_text = document.getElementsByClassName('box2-text')
var box2_pics = document.getElementsByClassName('box2-pics')

//点击点赞和收藏进入这一页
message_Main_Collect.addEventListener('click', function () {
    message.style.display = 'none';
    collect.style.display = 'block'
    showliked(yourId)
    showcollected(yourId)
})
//点击返回会回到消息那一页
collect_Top_Back.addEventListener('click', function () {
    collect.style.display = 'none';
    message.style.display = 'block'
})
//这个函数用来删除之前渲染的所有信息 只剩下最后的模板
function remove_liked() {
    var childs = collect_Main_like.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        collect_Main_like.removeChild(childs[i]);
    }
    box1_imgs[0].src = ''
    box1_name[0].innerHTML = ''
    box1_text[0].innerHTML = ''
    box1_pics[0].src = ''
}
function remove_collected() {
    var childs = collect_Main_Collect.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        collect_Main_Collect.removeChild(childs[i]);
    }
    box2_imgs[0].src = ''
    box2_name[0].innerHTML = ''
    box2_text[0].innerHTML = ''
    box2_pics[0].src = ''
}

//点击收藏 第二个盒子出现并且文字和边框的颜色变成紫色
collect_Class_Collect.addEventListener('click', function () {
    collect_Class_Like.className = 'collect-class-collect'
    collect_Main_like.style.display = 'none'
    collect_Class_Collect.className = 'collect-class-like';
    collect_Main_Collect.style.display = 'block';
    showliked(yourId)

})
function showliked(yourId) {
    axios.get('http://175.178.193.182:8080/notice/article/like?userId=' + yourId,)
        .then(function (response) {
            remove_liked()
            for (var i = 0; i < response.data.like.length; i++) {
                collect_Main_like.appendChild(collect_Main_like.children[0].cloneNode(true));
                box1_imgs[i].src = response.data.like[i].userInfo.avatar
                box1_name[i].innerHTML = response.data.like[i].userInfo.nickname
                box1_text[i].innerHTML = '赞了你的笔记'
                box1_pics[i].src = response.data.like[i].articleInfo.images[0]

            }
            collect_Main_like.lastElementChild.style.display = 'none'

        })
        .catch(function (error) {
            console.log(error);
        });
}
//点击获赞 第一个盒子出现并且文字和边框的颜色变成紫色
collect_Class_Like.addEventListener('click', function () {
    collect_Class_Like.className = 'collect-class-like'
    collect_Main_Collect.style.display = 'none'
    collect_Class_Collect.className = 'collect-class-collect';
    collect_Main_like.style.display = 'block';
    showcollected(yourId)
})
function showcollected(yourId) {
    axios.get('http://175.178.193.182:8080/notice/article/star?userId=' + yourId,)
        .then(function (response) {
            remove_collected()
            for (var i = 0; i < response.data.star.length; i++) {
                collect_Main_Collect.appendChild(collect_Main_Collect.children[0].cloneNode(true));
                box2_imgs[i].src = response.data.star[i].userInfo.avatar
                box2_name[i].innerHTML = response.data.star[i].userInfo.nickname
                box2_text[i].innerHTML = '收藏了你的笔记'
                box2_pics[i].src = response.data.star[i].articleInfo.images[0]

            }
            collect_Main_Collect.lastElementChild.style.display = 'none'

        })
        .catch(function (error) {
            console.log(error);
        });
}