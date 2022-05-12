var home_Foot_Msg = document.getElementsByClassName('home-foot-msg');
var message = document.querySelector('.message')
var message_Top_Back = document.querySelector('.message-top-back')
// 点击底部首页按钮从首页进入我的消息页面
home_Foot_Msg[0].addEventListener('click', function () {
    showMsgList(yourId)
    center.style.display = 'none';
    homepage.style.display = 'none';
    message.style.display = 'block';

})
//从个人中心返回到我的消息界面
home_Foot_Msg[2].addEventListener('click', function () {
    showMsgList(yourId)
    center.style.display = 'none';
    homepage.style.display = 'none';
    message.style.display = 'block';
})
//点击返回键 返回到主页
message_Top_Back.addEventListener('click', function () {
    message.style.display = 'none';
    homepage.style.display = 'block';
})
//用这个函数来渲染聊天列表
//另外可以通过点击头像进入这个人的主页 点击这个box可以进入和这个人的聊天列表

// 首先获取相关元素
var message_msgList_main = document.querySelector('.message-msgList-main')
var message_msgList_box1 = document.getElementsByClassName('message-msgList-box1')
var msgList_pics = document.getElementsByClassName('msgList-pics')
var msgList_nickname = document.getElementsByClassName('msgList-nickname')
var msgList_description = document.getElementsByClassName('msgList-description')
var msgList_icon = document.getElementsByClassName('msgList-icon')
//这个函数用来清除之前所有的List 为了留下一个模板来重新复制
function remove_msgList() {
    var childs = message_msgList_main.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        message_msgList_main.removeChild(childs[i]);
    }
    msgList_pics[0].src = ''
    msgList_nickname[0].innerHTML = ''
    msgList_description[0].innerHTML = ''

}
function showMsgList(yourId) {
    axios.get('http://175.178.193.182:8080/chat/getList?userId=' + yourId,)
        .then(function (response) {
            console.log(response);
            if (response.data.chatList.length != 0) {
                remove_msgList()
                message_msgList_main.style.display = 'block'
                for (var i = 0; i < response.data.chatList.length; i++) {
                    message_msgList_main.appendChild(message_msgList_main.children[0].cloneNode(true));
                    msgList_pics[i].src = response.data.chatList[i].avatar
                    msgList_nickname[i].innerHTML = response.data.chatList[i].nickname
                    msgList_description[i].innerHTML = response.data.chatList[i].description
                    //添加自定义属性userId,为了点击头像进入Ta的主页
                    msgList_pics[i].setAttribute('userId', response.data.chatList[i].userId)
                }
                message_msgList_main.lastElementChild.style.display = 'none'
                // 这里已经渲染出来了所有盒子 可点击进入Ta主页或者 聊天
                for (var j = 0; j < response.data.chatList.length; j++) {
                    msgList_pics[j].addEventListener('click', function () {
                        btn_clickmsgpic = this;
                        showother(this.getAttribute('userId'))
                        other.style.display = 'block'
                    })
                    msgList_icon[j].addEventListener('click', function () {
                        chat.style.display = 'block'

                    })
                }

            } else {
                message_msgList_main.style.display = 'none'
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}