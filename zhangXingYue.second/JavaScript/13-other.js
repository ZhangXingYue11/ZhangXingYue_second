var other = document.querySelector('.other')
var other_box1_imgs = document.querySelector('.other-box1-imgs')
var other_box1_name = document.querySelector('.other-box1-name')
//右上角点击发送信息
var other_data_btn = document.querySelector('.other-data-btn')
//返回的按钮
var other_top_icon1 = document.querySelector('.other-top-icon1')
//下面的三个大盒子
var lis_otherClass = document.getElementsByClassName('otherbox')
var other_main1_recommend = document.querySelector('.other-main1-recommend')
var other_box1 = document.querySelector('.other-box1')
var other_box_pic = document.getElementsByClassName('other-box-pics')
var other_box_title = document.getElementsByClassName('other-box-title')
var other_foot_pic = document.getElementsByClassName('other-foot-pics')
var other_foot_author = document.getElementsByClassName('other-foot-author')
var other_foot_icon = document.getElementsByClassName('other-foot-icon')
var other_foot_like = document.getElementsByClassName('other-foot-like')
//从他人主页返回
other_top_icon1.addEventListener('click', function () {
    other.style.display = 'none'
    remove_other()
    // homepage.style.display = 'block'
})

function showother(othersId) {
    axios.get('http://175.178.193.182:8080/user/fullInfo?userId=' + othersId,
    )
        .then(function (response) {
            console.log(response);
            other_box1_imgs.src = response.data.user.avatar
            other_box1_name.innerHTML = response.data.user.nickname
            //这个是聊天的里面的nickname
            chat_top_nickname.innerHTML = response.data.user.nickname
            document.querySelector('.other-attent-num').innerHTML = response.data.user.follows.length
            document.querySelector('.other-fans-num').innerHTML = response.data.user.fans.length
            document.querySelector('.other-like-num').innerHTML = response.data.user.likedArticles.length + response.data.user.staredArticles.length
            for (var j = 0; j < lis_otherClass.length; j++) {
                lis_otherClass[j].className = 'otherbox'
            }
            lis_otherClass[0].className = 'otherbox otherbox-change'
            other_publish(othersId)
        })
        .catch(function (error) {
            console.log(error);
        });
}
otherClass()
function otherClass() {
    for (var i = 0; i < lis_otherClass.length; i++) {
        lis_otherClass[i].addEventListener('click', function () {
            for (var j = 0; j < lis_otherClass.length; j++) {
                lis_otherClass[j].className = 'otherbox'
            }
            this.className = 'otherbox otherbox-change'
        })
    }
}
// 这个函数是用于中间核心的盒子中删除所有小卡片 最后只剩下一个卡片  并且将这个卡片的内容清空 作为下一次复制的模板
function remove_other() {
    var childs = other_main1_recommend.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        other_main1_recommend.removeChild(childs[i]);
    }
    other_box_pic[0].src = ''
    other_box_title[0].innerHTML = ''
    other_foot_author[0].innerHTML = ''
    other_foot_like[0].innerHTML = ''
    other_foot_pic[0].src = ''
    other_main1_recommend.firstElementChild.style.display = 'block'
}
//Ta发布过的文章
lis_otherClass[0].addEventListener('click', function () {
    other_publish(othersId)
})
function other_publish(othersId) {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/byAuthor?authorId=' + othersId)
        .then(function (response) {
            remove_other()
            var boxnum4 = response.data.articles.length
            for (var i = 0; i < boxnum4; i++) {
                other_main1_recommend.appendChild(other_main1_recommend.children[0].cloneNode(true));
                other_box_pic[i].src = response.data.articles[i].images[0]
                other_box_pic[i].setAttribute('num', i)
                other_box_pic[i].setAttribute('articleId', response.data.articles[i].articleId)
                other_box_title[i].innerHTML = response.data.articles[i].title
                other_foot_author[i].innerHTML = other_box1_name.innerHTML
                other_foot_like[i].innerHTML = response.data.articles[i].likes
                other_foot_pic[i].src = other_box1_imgs.src
                other_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.articles[i].articleId) {
                        other_foot_icon[i].style.color = 'red'
                    }
                }
                other_foot_icon[i].setAttribute('articleId', response.data.articles[i].articleId)
            }
            other_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum4; i++) {
                other_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                other_box_pic[i].addEventListener('click', function () {
                    // other.style.display = 'none'
                    article.className = 'article_change'
                    // 渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = other_box1_imgs.src
                    artical_top_name.innerHTML = other_box1_name.innerHTML
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

//Ta的收藏的文章
lis_otherClass[1].addEventListener('click', function () {
    other_star(othersId)
    function other_star(othersId) {
        getLikeArticle(yourId)
        getfollows(yourId)
        getstar(yourId)
        axios.get('http://175.178.193.182:8080/article/getStar?userId=' + othersId)
            .then(function (response) {
                remove_other()
                var boxnum5 = response.data.staredArticles.length
                for (var i = 0; i < boxnum5; i++) {
                    other_main1_recommend.appendChild(other_main1_recommend.children[0].cloneNode(true));
                    other_box_pic[i].src = response.data.staredArticles[i].images[0]
                    other_box_pic[i].setAttribute('num', i)
                    other_box_pic[i].setAttribute('articleId', response.data.staredArticles[i].articleId)
                    other_box_title[i].innerHTML = response.data.staredArticles[i].title
                    other_foot_author[i].innerHTML = response.data.staredArticles[i].authorName
                    other_foot_like[i].innerHTML = response.data.staredArticles[i].likes
                    other_foot_pic[i].src = response.data.staredArticles[i].avatar
                    other_foot_icon[i].style.color = 'black'
                    //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                    //添加自定义属性为了点击喜欢和取消喜欢
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.staredArticles[i].articleId) {
                            other_foot_icon[i].style.color = 'red'
                        }
                    }
                    other_foot_icon[i].setAttribute('articleId', response.data.staredArticles[i].articleId)
                }
                other_main1_recommend.lastElementChild.style.display = 'none'
                for (var i = 0; i < boxnum5; i++) {
                    other_foot_icon[i].addEventListener('click', function () {
                        like_btn = this
                        likeArticle(this.getAttribute('articleId'))
                    })
                    other_box_pic[i].addEventListener('click', function () {
                        article.className = 'article_change'
                        // other.style.display = 'none'
                        // 渲染评论部分
                        review(this.getAttribute('articleId'))
                        var num = this.getAttribute('num')
                        artical_top_imgs.src = response.data.staredArticles[num].avatar
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
lis_otherClass[2].addEventListener('click', function () {
    other_like(othersId)
    function other_like(othersId) {
        getLikeArticle(yourId)
        getfollows(yourId)
        getstar(yourId)
        axios.get('http://175.178.193.182:8080/article/getLike?userId=' + othersId)
            .then(function (response) {
                remove_other()
                var boxnum6 = response.data.likedArticles.length
                for (var i = 0; i < boxnum6; i++) {
                    other_main1_recommend.appendChild(other_main1_recommend.children[0].cloneNode(true));
                    other_box_pic[i].src = response.data.likedArticles[i].images[0]
                    other_box_pic[i].setAttribute('num', i)
                    other_box_pic[i].setAttribute('articleId', response.data.likedArticles[i].articleId)
                    other_box_title[i].innerHTML = response.data.likedArticles[i].title
                    other_foot_author[i].innerHTML = response.data.likedArticles[i].authorName
                    other_foot_like[i].innerHTML = response.data.likedArticles[i].likes
                    other_foot_pic[i].src = response.data.likedArticles[i].avatar
                    other_foot_icon[i].style.color = 'black'
                    //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                    //添加自定义属性为了点击喜欢和取消喜欢
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.likedArticles[i].articleId) {
                            other_foot_icon[i].style.color = 'red'
                        }
                    }
                    other_foot_icon[i].setAttribute('articleId', response.data.likedArticles[i].articleId)
                }
                other_main1_recommend.lastElementChild.style.display = 'none'
                for (var i = 0; i < boxnum6; i++) {
                    other_foot_icon[i].addEventListener('click', function () {
                        like_btn = this
                        likeArticle(this.getAttribute('articleId'))
                    })
                    other_box_pic[i].addEventListener('click', function () {
                        article.className = 'article_change'
                        // other.style.display = 'none'
                        // 渲染评论部分
                        review(this.getAttribute('articleId'))
                        var num = this.getAttribute('num')
                        artical_top_imgs.src = response.data.likedArticles[num].avatar
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

