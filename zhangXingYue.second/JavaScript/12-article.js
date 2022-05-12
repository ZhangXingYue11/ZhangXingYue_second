var article = document.querySelector('.article')
var artical_top_back = document.querySelector('.artical-top-back')
//文章详情页面中需要渲染的数据的声明
var artical_top_imgs = document.querySelector('.artical-top-imgs')
var artical_top_name = document.querySelector('.artical-top-name')
var artical_top_attent = document.querySelector('.artical-top-attent')
var artical_imgs = document.querySelector('.artical-imgs')
var article_like = document.querySelector('.article-like')
var article_like_num = document.querySelector('.article-like-num')
var article_collect_num = document.querySelector('.article-collect-num')
var article_collect = document.querySelector('.article-collect')
var article_comment_num = document.querySelector('.article-comment-num')

//详情页面照片下面的具体内容
var article_main_title = document.querySelector('.article-main-title')
var article_main_content = document.querySelector('.article-main-content')
var article_main_tag = document.querySelector('.article-main-tag')
var article_main_time = document.querySelector('.article-main-time')
//用来渲染评论部分 发表评论部分
var article_comment_pics = document.querySelector('.article-comment-pics')
var article_comment_top = document.querySelector('.article-comment-top')
//每一个评论的模板
var article_comment_main = document.querySelector('.article-comment-main')
var article_comment_box = document.querySelector('.article-comment-box')
var commentbox_pics = document.getElementsByClassName('commentbox-pics')
var commentbox_nickname = document.getElementsByClassName('commentbox-nickname')
var commentbox_content = document.getElementsByClassName('commentbox-content')
var commentbox_time = document.getElementsByClassName('commentbox-time')
var commentbox_icon = document.getElementsByClassName('commentbox-icon')
var commentbox_likenum = document.getElementsByClassName('commentbox-likenum')
//二级评论的模板
// var article_replay_main = document.getElementsByClassName('article-replay-main')
// var article_replay_box = document.querySelector('.article-replay-box')
// var replaybox_pics = document.getElementsByClassName('replaybox-pics')
// var replaybox_nickname = document.getElementsByClassName('replaybox-nickname')
// var replaybox_content = document.getElementsByClassName('replaybox-content')
// var replaybox_time = document.getElementsByClassName('replaybox-time')
// var replaybox_icon = document.getElementsByClassName('replaybox-icon')
// var replaybox_likenum = document.getElementsByClassName('replaybox-likenum')

// 这个函数用来删除之前所有的评论只留下一个模板
function remove_review() {
    var childs = article_comment_main.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        article_comment_main.removeChild(childs[i]);
    }
    commentbox_pics[0].src = ''
    commentbox_nickname[0].innerHTML = ''
    commentbox_content[0].innerHTML = ''
    commentbox_time[0].innerHTML = ''
    commentbox_likenum[0].innerHTML = ''
    // //二级
    // var childsreplay = article_replay_main.childNodes;
    // for (var i = childs.length - 1; i >= 2; i--) {
    //     article_replay_main.removeChild(childsreplay[i]);
    // }
    // replaybox_pics[0].src = ''
    // replaybox_nickname[0].innerHTML = ''
    // replaybox_content[0].innerHTML = ''
    // replaybox_time[0].innerHTML = ''
    // replaybox_likenum[0].innerHTML = ''
}
function review(articleId) {
    axios.get('http://175.178.193.182:8080/review/byArticle?pages=&articleId=' + articleId)
        .then(function (response) {
            console.log(response);
            remove_review()
            var array_avatar = []
            var array_nickname = []
            array_avatar = []
            array_nickname = []
            article_comment_main.firstElementChild.style.display = 'block'
            for (var i = 0; i < response.data.reviews.length; i++) {
                var num_num = response.data.reviews.length
                article_comment_main.appendChild(article_comment_main.children[0].cloneNode(true));
                commentbox_pics[i].src = ''
                commentbox_nickname[i].innerHTML = ''
                commentbox_content[i].innerHTML = response.data.reviews[i].content
                commentbox_time[i].innerHTML = response.data.reviews[i].postDate.substr(5, 5)
                commentbox_likenum[i].innerHTML = response.data.reviews[i].likes
                // article_replay_main[i].firstElementChild.style.display = 'block'
                // for (var k = 0; k < response.data.reviews[i].reviewList.length; k++) {
                //     var num_num2 = response.data.reviews[i].reviewList.length
                //     article_replay_main[i].appendChild(article_replay_main[i].children[0].cloneNode(true));
                //     replaybox_pics[i].src = ''
                //     replaybox_nickname[k].innerHTML = ''
                //     replaybox_content[k].innerHTML = response.data.reviews[i].reviewList[k].content
                //     replaybox_time[k].innerHTML = response.data.reviews[i].reviewList[k].postDate.substr(5, 5)
                //     replaybox_likenum[k].innerHTML = response.data.reviews[i].reviewList[k].likes
                //     var array1_avatar = []
                //     var array1_nickname = []
                //     array1_avatar = []
                //     array1_nickname = []
                //     showreplay(response.data.reviews[i].reviewList[k].authorId)
                //     function showreplay(reviewId) {
                //         axios.get('http://175.178.193.182:8080/user/baseInfo?userId=' + reviewId,)
                //             .then(function (response) {
                //                 array1_avatar.push(response.data.user.avatar)
                //                 array1_nickname.push(response.data.user.nickname)
                //                 for (var j = 0; j < num_num2; j++) {
                //                     replaybox_pics[j].src = array1_avatar[j]
                //                     replaybox_nickname[j].innerHTML = array1_nickname[j]
                //                 }
                //             })
                //             .catch(function (error) {
                //                 console.log(error);
                //             });
                //     }
                // }
                // article_replay_main[i].lastElementChild.style.display = 'none'
                showBasedata(response.data.reviews[i].authorId)
                function showBasedata(reviewId) {
                    axios.get('http://175.178.193.182:8080/user/baseInfo?userId=' + reviewId,)
                        .then(function (response) {
                            array_avatar.push(response.data.user.avatar)
                            array_nickname.push(response.data.user.nickname)
                            for (var j = 0; j < num_num; j++) {
                                commentbox_pics[j].src = array_avatar[j]
                                commentbox_nickname[j].innerHTML = array_nickname[j]

                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
            article_comment_main.lastElementChild.style.display = 'none'

        })
        .catch(function (error) {
            console.log(error);
        });
}

//点击左上角返回到首页
artical_top_back.addEventListener('click', function () {
    article.style.display = 'none'
    article.className = 'article'
})
//右下角点击喜欢或者不喜欢
article_like.addEventListener('click', function () {
    like_btn = this
    likeArticle(this.getAttribute('articleId'))
})
//右下角点击收藏或者取消收藏
article_collect.addEventListener('click', function () {
    like_btn = this
    starArticle(this.getAttribute('articleId'))
})


//点击右上角可以关注和取消关注 这个是它的函数
function cancelFollow3(followerIds3) {
    axios.post('http://175.178.193.182:8080/user/cancelFollow', {
        userId: yourId,
        followerId: followerIds3
    })
        .then(function (response) {
            if (response.data.status == 200) {
                artical_top_attent.innerHTML = '未关注'

            } else {
                followOther3(followerIds3)
                //这个函数用来关注别人
                function followOther3(followerIds3) {
                    axios.post('http://175.178.193.182:8080/user/follow', {
                        userId: yourId,
                        followerId: followerIds3
                    })
                        .then(function (response) {
                            if (response.data.status == 200) {
                                artical_top_attent.innerHTML = '已关注'
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
//写一个函数用来收藏和取消收藏文章
function starArticle(articleId) {
    axios.post('http://175.178.193.182:8080/article/star', {
        userId: yourId,
        articleId: articleId
    })
        .then(function (response) {
            if (response.data.status == 200) {
                like_btn.style.color = 'red'
                like_btn.nextElementSibling.innerHTML -= -1

            } else {
                unstarArticle(articleId)
                //这个函数用来取消点赞
                function unstarArticle(articleId) {
                    axios.post('http://175.178.193.182:8080/article/unstar', {
                        userId: yourId,
                        articleId: articleId
                    })
                        .then(function (response) {
                            if (response.data.status == 200) {
                                like_btn.style.color = 'black'
                                like_btn.nextElementSibling.innerHTML -= 1
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
//点击文章中的头像进入个人主页
artical_top_imgs.addEventListener('click', function () {
    other.style.display = 'block'
    othersId = this.getAttribute('index')
    showother(this.getAttribute('index'))
    console.log(this.getAttribute('index'));
})