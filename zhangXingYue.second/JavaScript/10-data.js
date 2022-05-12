var center_data_btn = document.querySelector('.center-data-btn')
var data = document.querySelector('.data')
var data_top_back = document.querySelector('.data-top-back')
var show_data_all = document.getElementsByClassName('show_data-all')
var edit_data_all = document.getElementsByClassName('edit-data-all')
var savaData = document.querySelector('.savaData')
var center_box1_name = document.querySelector('.center-box1-name')
var center_box1_imgs = document.querySelector('.center-box1-imgs')
var data_pics = document.querySelector('.data-pics')
var data_backgroun_pics = document.querySelector('.data-backgroun-pics')
// console.log(show_edit[1]);
//点击我的消息跳入编辑资料 
center_data_btn.addEventListener('click', function () {
    center.style.display = 'none';
    data.style.display = 'block';
    showData(yourId)
})
//点击左上角跳回首页
data_top_back.addEventListener('click', function () {
    data.style.display = 'none';
    center.style.display = 'block';
    //这个函数是为了让最上面的头像和名字更新
    showData(yourId)
    //这个函数是为了让我发布的文章的头像更新
    publish_box(yourId)
})
//这个函数用来头像上传后显示图片
function previewthis() {
    avatar_url = []
    var fileDom = document.querySelector('.upload-avatar')
    var file = fileDom.files[0]
    if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过2MB')
        return false
    }
    var imgUrl = window.URL.createObjectURL(file)
    data_pics.setAttribute('src', imgUrl)
    data_pics.onload = function () {
        URL.revokeObjectURL(imgUrl)
    }
    // 上传头像
    upload_avatar(file)
    function upload_avatar(file) {
        const forms = new FormData()
        forms.append('avatar', file)
        forms.append('userId', yourId)
        const aoptions = {
            method: 'POST',
            data: forms,
            url: " http://175.178.193.182:8080/user/upload",
        }
        axios(aoptions)
            .then(function (response) {
                console.log(response);
            })
    }
}
//这个函数用来上传背景后显示图片
function background() {
    background_url = []
    var fileDom = document.querySelector('.upload-background')
    var file = fileDom.files[0]
    if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过2MB')
        return false
    }
    var imgUrl = window.URL.createObjectURL(file)
    data_backgroun_pics.setAttribute('src', imgUrl)
    data_backgroun_pics.onload = function () {
        URL.revokeObjectURL(imgUrl)
    }
    // 上传背景
    upload_background(file)
    function upload_background(file) {
        const forms = new FormData()
        forms.append('backGroundPicture', file)
        forms.append('userId', yourId)
        const aoptions = {
            method: 'POST',
            data: forms,
            url: " http://175.178.193.182:8080/user/upload",
        }
        axios(aoptions)
            .then(function (response) {
                console.log(response);
            })
    }
}
//想要的效果：点击其中任意一个盒子 input表单出现 更改其中的值 然后点击保存 
//这个更改后的值自动上传到数据库 盒子里面的 内容始终是数据库传来的
//第一步：一开始的内容为数据库的 在登录成功的时候调用这个函数
function showData(yourId) {
    axios.get('http://175.178.193.182:8080/user/baseInfo?userId=' + yourId,
    )
        .then(function (response) {
            center_box1_imgs.src = response.data.user.avatar
            article_comment_pics.src = response.data.user.avatar
            data_pics.src = response.data.user.avatar
            data_backgroun_pics.src = response.data.user.backGroundPicture
            document.querySelector('.show-ickname').innerHTML = response.data.user.nickname
            center_box1_name.innerHTML = response.data.user.nickname
            document.querySelector('.show-gender').innerHTML = response.data.user.gender
            document.querySelector('.show-birthday').innerHTML = response.data.user.birthday
            document.querySelector('.show-area').innerHTML = response.data.user.area
            document.querySelector('.show-description').innerHTML = response.data.user.description

            //点击这个放数据的盒子 input出现
            show_edit()
            function show_edit() {
                for (var i = 0; i < show_data_all.length; i++) {
                    show_data_all[i].addEventListener('click', function () {
                        for (var j = 0; j < edit_data_all.length; j++) {
                            edit_data_all[j].style.display = 'block'
                            // 保存的那个按钮
                            savaData.style.display = 'block'
                            // input里面的值一开始不变
                            edit_data_all[0].value = response.data.user.nickname
                            edit_data_all[1].value = response.data.user.gender
                            edit_data_all[2].value = response.data.user.birthday
                            edit_data_all[3].value = response.data.user.area
                            edit_data_all[4].value = response.data.user.description
                            for (var y = 0; y < show_data_all.length; y++) {
                                show_data_all[y].style.display = 'none'

                            }
                        }
                    })
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
//鼠标点击保存按钮自动保存提交 并且调用请求数据的函数
savaData.addEventListener('click', function () {
    editData(edit_data_all[0].value, edit_data_all[1].value, edit_data_all[2].value, edit_data_all[3].value, edit_data_all[4].value,)

})
function editData(nickname, gender, birthday, area, description) {
    axios.post('http://175.178.193.182:8080/user/edit', {
        userId: yourId,
        nickname: nickname,
        gender: gender,
        birthday: birthday,
        area: area,
        profession: '学生',
        description: description
    }
    )
        .then(function (response) {
            savaData.style.display = 'none'
            showData(yourId)
            for (var i = 0; i < 5; i++) {
                edit_data_all[i].style.display = 'none',
                    show_data_all[i].style.display = 'block'
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

