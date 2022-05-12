
var land_pass = document.querySelector('.land-pass');
var userName = document.getElementById('username');
var passWord = document.getElementById('password');
var landing = document.querySelector('.landing')
var homepage = document.querySelector('.homepage')
var yourId = ''
var othersId = ''
// 点击登录
land_pass.addEventListener('click', function () { land(userName.value, passWord.value); })
function land(name, word) {
    axios.post('http://175.178.193.182:8080/login', {
        username: name,
        password: word
    })
        .then(function (response) {
            if (response.data.status == 200 || response.data.status == 406) {
                function success() {
                    userName.value = '';
                    passWord.value = ''
                    landing.style.display = 'none';
                    homepage.style.display = 'block';
                    yourId = response.data.userId

                }
                success()
                recommend_tag()
            }
            else {
                alert('账号或密码错误')
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

