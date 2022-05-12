//在别人的主页点击发送消息这个界面出现 nickname和头像要渲染
//在message里面点击那个消息也会进入聊天 只不过是机器人聊天
var chat = document.querySelector('.chat')
var chat_top_back = document.querySelector('.chat-top-back')
var chat_top_nickname = document.querySelector('.chat-top-nickname')

other_data_btn.addEventListener('click', function () {
    chat.style.display = 'block'

})
chat_top_back.addEventListener('click', function () {
    chat.style.display = 'none'
    chat_top_nickname.innerHTML = '智能机器人'
})
function showChat(yourId) {
    axios.get('https://api.ownthink.com/bot?userId=' + yourId,)
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

            } else {
                message_msgList_main.style.display = 'none'
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}


// 为发送按钮绑定鼠标点击事件
$('#btnSend').on('click', function () {
    var text = $('#ipt').val().trim()
    if (text.length <= 0) {
        return $('#ipt').val('')
    }
    // 如果用户输入了聊天内容，则将聊天内容追加到页面上显示
    $('#talk_list').append('<li class="right_word"><img src="images/chat1.jpg" /> <span>' + text + '</span></li>')
    $('#ipt').val('')
    // 发起请求，获取聊天内容
    getMsg(text)
})

// 获取聊天机器人发送回来的消息
function getMsg(text) {
    $.ajax({
        method: 'GET',
        url: 'https://api.ownthink.com/bot',
        data: {
            spoken: text,
            userid: yourId
        },
        success: function (res) {
            // console.log(res)
            if (res.message === 'success') {
                // 接收聊天消息
                var msg = res.data.info.text
                $('#talk_list').append('<li class="left_word"><img src="images/chat2.jpg" /> <span>' + msg + '</span></li>')


            }
        }
    })
}
// 为文本框绑定 keyup 事件
$('#ipt').on('keyup', function (e) {
    // console.log(e.keyCode)
    if (e.keyCode === 13) {
        // console.log('用户弹起了回车键')
        $('#btnSend').click()
    }
})




