var home_foot_center = document.getElementsByClassName('home-foot-center');
var center = document.querySelector('.center')
var center_attent_num = document.querySelector('.center-attent-num')
var center_fans_num = document.querySelector('.center-fans-num')
var center_like_num = document.querySelector('.center-like-num')
//下面的三个大盒子
var lis_centerClass = document.getElementsByClassName('centerbox')
var center_main1_recommend = document.querySelector('.center-main1-recommend')
var center_box1 = document.querySelector('.center-box1')
var center_box_pic = document.getElementsByClassName('center-box-pics')
var center_box_title = document.getElementsByClassName('center-box-title')
var center_foot_pic = document.getElementsByClassName('center-foot-pics')
var center_foot_author = document.getElementsByClassName('center-foot-author')
var center_foot_icon = document.getElementsByClassName('center-foot-icon')
var center_foot_like = document.getElementsByClassName('center-foot-like')

//点击个人中心跳入个人中心
home_foot_center[0].addEventListener('click', function () {
    homepage.style.display = 'none';
    message.style.display = 'none';
    center.style.display = 'block';
    showData(yourId)
    publish_box(yourId)
    //显示关注的人的个数
    getfollows(yourId)
    getfans(yourId)
    getLikeArticle(yourId)
})
//从我的消息里面进入个人中心
home_foot_center[1].addEventListener('click', function () {
    homepage.style.display = 'none';
    message.style.display = 'none';
    center.style.display = 'block';
    showData(yourId)
    publish_box(yourId)
    //显示关注的人的个数
    getfollows(yourId)
    getfans(yourId)
    getLikeArticle(yourId)

})
//点击左上角字体图标登出
function quit() {
    axios.post('http://175.178.193.182:8080/logout', {
        userId: yourId
    })
        .then(function (response) {
            if (response.data.status == 200) {
                function success() {
                    center.style.display = 'none';
                    landing.style.display = 'block';
                }
                success()

            }
            else {
                alert('登出失败')
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}
//点击每一个不同类型的标签页下面的盒子渲染不同的内容
centerClass()
function centerClass() {
    for (var i = 0; i < lis_centerClass.length; i++) {
        lis_centerClass[i].addEventListener('click', function () {
            for (var j = 0; j < lis_centerClass.length; j++) {
                lis_centerClass[j].className = 'centerbox'
            }
            this.className = 'centerbox centerbox-change'
        })
    }
}
// 这个函数是用于中间核心的盒子中删除所有小卡片 最后只剩下一个卡片  并且将这个卡片的内容清空 作为下一次复制的模板
function remove_center() {
    var childs = center_main1_recommend.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        center_main1_recommend.removeChild(childs[i]);
    }
    center_box_pic[0].src = ''
    center_box_title[0].innerHTML = ''
    center_foot_author[0].innerHTML = ''
    center_foot_like[0].innerHTML = ''
    center_foot_pic[0].src = ''
}

//我发布过的文章
lis_centerClass[0].addEventListener('click', function () {
    publish_box(yourId)

})
function publish_box(yourId) {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/byAuthor?authorId=' + yourId)
        .then(function (response) {
            remove_center()
            console.log(response);
            var boxnum3 = response.data.articles.length
            for (var i = 0; i < boxnum3; i++) {
                center_main1_recommend.appendChild(center_main1_recommend.children[0].cloneNode(true));
                center_box_pic[i].src = response.data.articles[i].images[0]
                center_box_pic[i].setAttribute('num', i)
                center_box_pic[i].setAttribute('articleId', response.data.articles[i].articleId)
                center_box_title[i].innerHTML = response.data.articles[i].title
                center_foot_author[i].innerHTML = center_box1_name.innerHTML
                center_foot_like[i].innerHTML = response.data.articles[i].likes
                center_foot_pic[i].src = center_box1_imgs.src
                center_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.articles[i].articleId) {
                        center_foot_icon[i].style.color = 'red'
                    }
                }
                center_foot_icon[i].setAttribute('articleId', response.data.articles[i].articleId)
            }
            center_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum3; i++) {
                center_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                center_box_pic[i].addEventListener('click', function () {
                    // center.style.display = 'none'
                    // 渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = center_box1_imgs.src
                    artical_top_name.innerHTML = center_box1_name.innerHTML
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.articles[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'
                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.articles[num].authorId)
                    })
                    artical_imgs.src = response.data.articles[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.articles[num].title
                    article_main_content.innerHTML = response.data.articles[num].content
                    article_main_tag.innerHTML = '#' + response.data.articles[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.articles[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.articles[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.articles[num].likes
                    article_like.setAttribute('articleId', response.data.articles[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.articles[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.articles[num].stars
                    article_collect.setAttribute('articleId', response.data.articles[num].articleId)
                    article_comment_num.innerHTML = response.data.articles[num].reviews
                    article_comment_top.innerHTML = '共有' + response.data.articles[num].reviews + '条评论'

                    article.style.display = 'block'
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
//我的收藏的文章
lis_centerClass[1].addEventListener('click', function () {
    star_box(yourId)
    function star_box(yourId) {
        getLikeArticle(yourId)
        getfollows(yourId)
        getstar(yourId)
        axios.get('http://175.178.193.182:8080/article/getStar?userId=' + yourId)
            .then(function (response) {
                remove_center()
                console.log(response);
                var boxnum3 = response.data.staredArticles.length
                for (var i = 0; i < boxnum3; i++) {
                    center_main1_recommend.appendChild(center_main1_recommend.children[0].cloneNode(true));
                    center_box_pic[i].src = response.data.staredArticles[i].images[0]
                    center_box_pic[i].setAttribute('num', i)
                    center_box_pic[i].setAttribute('articleId', response.data.staredArticles[i].articleId)
                    center_box_title[i].innerHTML = response.data.staredArticles[i].title
                    center_foot_author[i].innerHTML = response.data.staredArticles[i].authorName
                    center_foot_like[i].innerHTML = response.data.staredArticles[i].likes
                    center_foot_pic[i].src = response.data.staredArticles[i].avatar
                    center_foot_icon[i].style.color = 'black'
                    //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                    //添加自定义属性为了点击喜欢和取消喜欢
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.staredArticles[i].articleId) {
                            center_foot_icon[i].style.color = 'red'
                        }
                    }
                    center_foot_icon[i].setAttribute('articleId', response.data.staredArticles[i].articleId)
                }
                center_main1_recommend.lastElementChild.style.display = 'none'
                for (var i = 0; i < boxnum3; i++) {
                    center_foot_icon[i].addEventListener('click', function () {
                        like_btn = this
                        likeArticle(this.getAttribute('articleId'))
                    })
                    center_box_pic[i].addEventListener('click', function () {
                        //渲染评论部分
                        review(this.getAttribute('articleId'))
                        var num = this.getAttribute('num')
                        artical_top_imgs.src = response.data.staredArticles[num].avatar
                        //添加自定义属性index 为了点击进入个人主页
                        artical_top_imgs.setAttribute('index', response.data.staredArticles[num].authorId)
                        artical_top_name.innerHTML = response.data.staredArticles[num].authorName
                        artical_top_attent.innerHTML = '未关注'
                        //在渲染是否关注的时候 遍历它是否被本人关注
                        for (var j = 0; j <= follow_num; j++) {
                            if (followsLists[j] == response.data.staredArticles[num].authorId) {
                                artical_top_attent.innerHTML = '已关注'
                            }
                        }
                        //右上角点击关注或者取消关注作者
                        artical_top_attent.addEventListener('click', function () {
                            cancelFollow3(response.data.staredArticles[num].authorId)
                        })
                        artical_imgs.src = response.data.staredArticles[num].images[0]
                        //详情页面的照片下面的内容
                        article_main_title.innerHTML = response.data.staredArticles[num].title
                        article_main_content.innerHTML = response.data.staredArticles[num].content
                        article_main_tag.innerHTML = '#' + response.data.staredArticles[num].tags.join(' #')
                        article_main_time.innerHTML = response.data.staredArticles[num].postDate.substr(0, 10)
                        //评论部分
                        //判断是否已经喜欢这篇文章
                        article_like.style.color = 'black'
                        for (var j = 0; j <= like_num; j++) {
                            if (likeArticleList[j] == response.data.staredArticles[num].articleId) {
                                article_like.style.color = 'red'
                            }
                        }
                        article_like_num.innerHTML = response.data.staredArticles[num].likes
                        article_like.setAttribute('articleId', response.data.staredArticles[num].articleId)
                        //判断是否收藏了这篇文章
                        article_collect.style.color = 'black'
                        for (var j = 0; j <= star_num; j++) {
                            if (starArticleList[j] == response.data.staredArticles[num].articleId) {
                                article_collect.style.color = 'red'
                            }
                        }
                        article_collect_num.innerHTML = response.data.staredArticles[num].stars
                        article_collect.setAttribute('articleId', response.data.staredArticles[num].articleId)
                        article_comment_num.innerHTML = response.data.staredArticles[num].reviews
                        article_comment_top.innerHTML = '共有' + response.data.staredArticles[num].reviews + '条评论'
                        article.style.display = 'block'
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
})

//我的喜欢的文章
lis_centerClass[2].addEventListener('click', function () {
    like_box(yourId)
    function like_box(yourId) {
        getLikeArticle(yourId)
        getfollows(yourId)
        getstar(yourId)
        axios.get('http://175.178.193.182:8080/article/getLike?userId=' + yourId)
            .then(function (response) {
                remove_center()
                console.log(response);
                var boxnum4 = response.data.likedArticles.length
                for (var i = 0; i < boxnum4; i++) {
                    center_main1_recommend.appendChild(center_main1_recommend.children[0].cloneNode(true));
                    center_box_pic[i].src = response.data.likedArticles[i].images[0]
                    center_box_pic[i].setAttribute('num', i)
                    center_box_pic[i].setAttribute('articleId', response.data.likedArticles[i].articleId)
                    center_box_title[i].innerHTML = response.data.likedArticles[i].title
                    center_foot_author[i].innerHTML = response.data.likedArticles[i].authorName
                    center_foot_like[i].innerHTML = response.data.likedArticles[i].likes
                    center_foot_pic[i].src = response.data.likedArticles[i].avatar
                    center_foot_icon[i].style.color = 'black'
                    //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                    //添加自定义属性为了点击喜欢和取消喜欢
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.likedArticles[i].articleId) {
                            center_foot_icon[i].style.color = 'red'
                        }
                    }
                    center_foot_icon[i].setAttribute('articleId', response.data.likedArticles[i].articleId)
                }
                center_main1_recommend.lastElementChild.style.display = 'none'
                for (var i = 0; i < boxnum4; i++) {
                    center_foot_icon[i].addEventListener('click', function () {
                        like_btn = this
                        likeArticle(this.getAttribute('articleId'))
                    })
                    center_box_pic[i].addEventListener('click', function () {
                        //渲染评论部分
                        review(this.getAttribute('articleId'))
                        var num = this.getAttribute('num')
                        artical_top_imgs.src = response.data.likedArticles[num].avatar
                        //添加自定义属性index 为了点击进入个人主页
                        artical_top_imgs.setAttribute('index', response.data.likedArticles[num].authorId)
                        artical_top_name.innerHTML = response.data.likedArticles[num].authorName
                        artical_top_attent.innerHTML = '未关注'
                        //在渲染是否关注的时候 遍历它是否被本人关注
                        for (var j = 0; j <= follow_num; j++) {
                            if (followsLists[j] == response.data.likedArticles[num].authorId) {
                                artical_top_attent.innerHTML = '已关注'
                            }
                        }
                        //右上角点击关注或者取消关注作者
                        artical_top_attent.addEventListener('click', function () {
                            cancelFollow3(response.data.likedArticles[num].authorId)
                        })
                        artical_imgs.src = response.data.likedArticles[num].images[0]
                        //详情页面的照片下面的内容
                        article_main_title.innerHTML = response.data.likedArticles[num].title
                        article_main_content.innerHTML = response.data.likedArticles[num].content
                        article_main_tag.innerHTML = '#' + response.data.likedArticles[num].tags.join(' #')
                        article_main_time.innerHTML = response.data.likedArticles[num].postDate.substr(0, 10)
                        //评论部分
                        //判断是否已经喜欢这篇文章
                        article_like.style.color = 'black'
                        for (var j = 0; j <= like_num; j++) {
                            if (likeArticleList[j] == response.data.likedArticles[num].articleId) {
                                article_like.style.color = 'red'
                            }
                        }
                        article_like_num.innerHTML = response.data.likedArticles[num].likes
                        article_like.setAttribute('articleId', response.data.likedArticles[num].articleId)
                        //判断是否收藏了这篇文章
                        article_collect.style.color = 'black'
                        for (var j = 0; j <= star_num; j++) {
                            if (starArticleList[j] == response.data.likedArticles[num].articleId) {
                                article_collect.style.color = 'red'
                            }
                        }
                        article_collect_num.innerHTML = response.data.likedArticles[num].stars
                        article_collect.setAttribute('articleId', response.data.likedArticles[num].articleId)
                        article_comment_num.innerHTML = response.data.likedArticles[num].reviews
                        article_comment_top.innerHTML = '共有' + response.data.likedArticles[num].reviews + '条评论'
                        article.style.display = 'block'

                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
})

