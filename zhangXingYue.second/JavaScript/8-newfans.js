var center_box2_fans = document.querySelector('.center-box2-fans')
var newfans = document.querySelector('.newfans')
var newfans_top_back = document.querySelector('.newfans-top-back')
var newfans_blank = document.querySelector('.newfans-blank')
//关注的人的每一条的模板
var newfans_main_user = document.querySelector('.newfans-main-user')
var newfans_box1 = document.querySelector('.newfans-box1')
var newfans_pics = document.getElementsByClassName('newfans-pics')
var newfans_name = document.getElementsByClassName('newfans-name')
var newfans_foci = document.getElementsByClassName('newfans-foci')
var btn_clickfan = ''
// //点击粉丝跳到此页
center_box2_fans.addEventListener('click', function () {
    newfans.style.display = 'block';
    showNewfan(yourId)
})
//点击返回跳转
newfans_top_back.addEventListener('click', function () {
    newfans.style.display = 'none';
    getfollows(yourId)
})//渲染关注列表
//这个函数用来删除之前渲染的所有信息 只剩下最后的模板
function remove_fans() {
    var childs = newfans_main_user.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        newfans_main_user.removeChild(childs[i]);
    }
    newfans_pics[0].src = ''
    newfans_name[0].innerHTML = ''
    newfans_foci[0].innerHTML = ''
}
function showNewfan(yourId) {
    axios.get('http://175.178.193.182:8080/user/fanList?userId=' + yourId,)
        .then(function (response) {

            if (response.data.fansList.length != 0) {
                remove_fans()
                newfans_main_user.style.display = 'block'
                newfans_blank.style.display = 'none'
                for (var i = 0; i < response.data.fansList.length; i++) {
                    newfans_main_user.appendChild(newfans_main_user.children[0].cloneNode(true));
                    newfans_pics[i].src = response.data.fansList[i].avatar
                    newfans_pics[i].setAttribute('userId', response.data.fansList[i].userId)
                    newfans_name[i].innerHTML = response.data.fansList[i].nickname
                    newfans_foci[i].innerHTML = '未关注'
                    newfans_foci[i].style.backgroundColor = '#fff'
                    newfans_foci[i].style.color = 'rgb(115, 13, 210)'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= followsLists.length; j++) {
                        if (followsLists[j] == response.data.fansList[i].userId) {
                            newfans_foci[i].innerHTML = '已关注'
                            newfans_foci[i].style.backgroundColor = 'rgb(115, 13, 210)'
                            newfans_foci[i].style.color = '#fff'
                        }
                    }
                    //添加自定义属性index 为了点击关注或者取消关注
                    newfans_foci[i].setAttribute('fansIds', response.data.fansList[i].userId)
                }
                newfans_main_user.lastElementChild.style.display = 'none'
                // 这里已经渲染出来了所有盒子 可以进行关注和取消关注了
                for (var j = 0; j < response.data.fansList.length; j++) {
                    newfans_foci[j].addEventListener('click', function () {
                        btn_clickfan = this;
                        cancelfans(this.getAttribute('fansIds'))
                    })
                    //点击进入他人主页
                    newfans_pics[j].addEventListener('click', function () {
                        other.style.display = 'block'
                        showother(this.getAttribute('userId'))

                    })
                }

            } else {
                newfans_main_user.style.display = 'none'
                newfans_blank.style.display = 'block'
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
//用这个函数来取消关注
function cancelfans(fansIds) {
    axios.post('http://175.178.193.182:8080/user/cancelFollow', {
        userId: yourId,
        followerId: fansIds
    })
        .then(function (response) {
            if (response.data.status == 200) {
                btn_clickfan.innerHTML = '未关注'
                btn_clickfan.style.backgroundColor = '#fff'
                btn_clickfan.style.color = 'rgb(115, 13, 210)'
            } else {
                //这个函数用来关注别人
                fanOther(fansIds)
                function fanOther(fansIds) {
                    axios.post('http://175.178.193.182:8080/user/follow', {
                        userId: yourId,
                        followerId: fansIds
                    })
                        .then(function (response) {
                            if (response.data.status == 200) {
                                btn_clickfan.innerHTML = '已关注'
                                btn_clickfan.style.backgroundColor = 'rgb(115, 13, 210)'
                                btn_clickfan.style.color = '#fff'
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