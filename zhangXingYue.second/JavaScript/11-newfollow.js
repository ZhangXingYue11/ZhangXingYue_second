var center_box2_attent = document.querySelector('.center-box2-attent');
var newfollow = document.querySelector('.newfollow')
var newfollow_top_back = document.querySelector('.newfollow-top-back')
var message_main_fans = document.querySelector('.message-main-fans')
var newfollows_blank = document.querySelector('.newfollows-blank')
//关注的人的每一条的模板
var newfollows_main_user = document.querySelector('.newfollows-main-user')
var newfollow_box1 = document.querySelector('.newfollow-box1')
var newfollow_pics = document.getElementsByClassName('newfollow-pics')
var newfollow_name = document.getElementsByClassName('newfollow-name')
var newfollow_foci = document.getElementsByClassName('newfollow-foci')
var btn_click = ''

//点击新增关注跳到此页
message_main_fans.addEventListener('click', function () {
    // message.style.display = 'none'
    newfollow.style.display = 'block';
    getfollows(yourId)
    newfollows(yourId)

})
//点击个人主页的关注跳到此页
center_box2_attent.addEventListener('click', function () {
    // center.style.display = 'none';
    newfollow.style.display = 'block';
    newfollows(yourId)
})

//点击返回跳转
newfollow_top_back.addEventListener('click', function () {
    newfollow.style.display = 'none';
    // center.style.display = 'block';
    getfollows(yourId)
    showData(yourId)
})
//渲染关注列表
//这个函数用来删除之前渲染的所有信息 只剩下最后的模板
function remove_follows() {
    var childs = newfollows_main_user.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        newfollows_main_user.removeChild(childs[i]);
    }
    newfollow_pics[0].src = ''
    newfollow_name[0].innerHTML = ''
    newfollow_foci[0].innerHTML = ''
}
function newfollows(yourId) {
    axios.get('http://175.178.193.182:8080/user/followerList?userId=' + yourId,)
        .then(function (response) {

            if (response.data.followsList.length != 0) {
                remove_follows()
                newfollows_main_user.style.display = 'block'
                newfollows_blank.style.display = 'none'
                for (var i = 0; i < response.data.followsList.length; i++) {
                    newfollows_main_user.appendChild(newfollows_main_user.children[0].cloneNode(true));
                    newfollow_pics[i].src = response.data.followsList[i].avatar
                    newfollow_pics[i].setAttribute('userId', response.data.followsList[i].userId)
                    newfollow_name[i].innerHTML = response.data.followsList[i].nickname
                    newfollow_foci[i].innerHTML = '已关注'
                    newfollow_foci[i].color = '#fff'
                    newfollow_foci[i].style.backgroundColor = 'rgb(115, 13, 210)'
                    //添加自定义属性index 为了点击关注或者取消关注
                    newfollow_foci[i].setAttribute('followerIds', response.data.followsList[i].userId)
                }
                newfollows_main_user.lastElementChild.style.display = 'none'
                // 这里已经渲染出来了所有盒子 可以进行关注和取消关注了

                for (var j = 0; j < response.data.followsList.length; j++) {
                    newfollow_foci[j].addEventListener('click', function () {
                        btn_click = this;
                        cancelFollow(this.getAttribute('followerIds'))
                    })
                    //点击进入他人主页
                    newfollow_pics[j].addEventListener('click', function () {
                        other.style.display = 'block'
                        showother(this.getAttribute('userId'))

                    })
                }

            } else {
                newfollows_main_user.style.display = 'none'
                newfollows_blank.style.display = 'block'
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
//用这个函数来取消关注
function cancelFollow(followerIds) {
    axios.post('http://175.178.193.182:8080/user/cancelFollow', {
        userId: yourId,
        followerId: followerIds
    })
        .then(function (response) {
            console.log(response);
            if (response.data.status == 200) {
                btn_click.innerHTML = '未关注'
                btn_click.style.backgroundColor = '#fff'
                btn_click.style.color = 'rgb(115, 13, 210)'
            } else {
                //这个函数用来关注别人
                followOther(followerIds)
                function followOther(followerIds) {
                    axios.post('http://175.178.193.182:8080/user/follow', {
                        userId: yourId,
                        followerId: followerIds
                    })
                        .then(function (response) {
                            if (response.data.status == 200) {
                                btn_click.innerHTML = '已关注'
                                btn_click.style.backgroundColor = 'rgb(115, 13, 210)'
                                btn_click.style.color = '#fff'
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}