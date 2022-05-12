var home_Head_Publish = document.querySelector('.home-head-publish')
var home_Head_Search = document.querySelector('.home-head-search')
var publish = document.querySelector('.publish')
var home_foot_page = document.getElementsByClassName('home-foot-page')
var search = document.querySelector('.search')
var lis_homeHeadClass = document.getElementsByClassName('tag')
// 推荐里面的每一个小卡片
var home_main1_recommend = document.querySelector('.home-main1-recommend')
var recommend_box1 = document.querySelector('.recommend-box1')
var recommend_box_pic = document.getElementsByClassName('recommend-box-pics')
var recommend_box_title = document.getElementsByClassName('recommend-box-title')
var recommend_foot_pic = document.getElementsByClassName('recommend-foot-pics')
var recommend_foot_author = document.getElementsByClassName('recommend-foot-author')
var recommend_foot_icon = document.getElementsByClassName('recommend-foot-icon')
var recommend_foot_like = document.getElementsByClassName('recommend-foot-like')
//点击加号进入发表文章界面
home_Head_Publish.addEventListener('click', function () {
    homepage.style.display = 'none';
    publish.style.display = 'block'
})
//点击搜索符号进入搜索界面
home_Head_Search.addEventListener('click', function () {
    homepage.style.display = 'none';
    search.style.display = 'block';
    getfollows(yourId)
})
//获取关注的人的清单 获取喜欢的文章的清单
var followsLists = [];
var follow_num = 0;
var fansLists = [];
var likeArticleList = [];
var like_num = 0
var starArticleList = [];
var star_num = 0
//获取喜欢的文章的列表
function getLikeArticle(yourId) {
    axios.get('http://175.178.193.182:8080/article/getLike?userId=' + yourId,)
        .then(function (response) {
            likeArticleList = [];
            for (var i = 0; i < response.data.likedArticles.length; i++) {
                likeArticleList[i] = response.data.likedArticles[i].articleId
            }
            like_num = likeArticleList.length;
            center_like_num.innerHTML = like_num
        })
        .catch(function (error) {
            console.log(error);
        });
}
//获得关注的人的数组 并且渲染到个人主页
function getfollows(yourId) {
    axios.get('http://175.178.193.182:8080/user/followerList?userId=' + yourId,)
        .then(function (response) {
            followsLists = [];
            for (var i = 0; i < response.data.followsList.length; i++) {
                followsLists[i] = response.data.followsList[i].userId
            }
            center_attent_num.innerHTML = followsLists.length
            follow_num = followsLists.length
        })
        .catch(function (error) {
            console.log(error);
        });
}
//获得粉丝的人的数组 并且渲染到个人主页
function getfans(yourId) {
    axios.get('http://175.178.193.182:8080/user/fanList?userId=' + yourId,)
        .then(function (response) {
            fansLists = [];
            for (var i = 0; i < response.data.fansList.length; i++) {
                fansLists[i] = response.data.fansList[i].userId
            }
            center_fans_num.innerHTML = fansLists.length
        })
        .catch(function (error) {
            console.log(error);
        });
}
//获取收藏文章的列表
function getstar(yourId) {
    axios.get('http://175.178.193.182:8080/article/getStar?userId=' + yourId,)
        .then(function (response) {
            starArticleList = [];
            for (var i = 0; i < response.data.staredArticles.length; i++) {
                starArticleList[i] = response.data.staredArticles[i].articleId
            }
            star_num = starArticleList.length
        })
        .catch(function (error) {
            console.log(error);
        });
}
//点击首页回到首页
home_foot_page[1].addEventListener('click', function () {
    message.style.display = 'none';
    homepage.style.display = 'block';
})
home_foot_page[2].addEventListener('click', function () {
    center.style.display = 'none';
    homepage.style.display = 'block';
})
//点击每一个不同类型的标签页下面的盒子渲染不同的内容
clickTag()
function clickTag() {
    for (var i = 0; i < lis_homeHeadClass.length; i++) {
        lis_homeHeadClass[i].addEventListener('click', function () {
            for (var j = 0; j < lis_homeHeadClass.length; j++) {
                lis_homeHeadClass[j].className = 'tag'
            }
            this.className = 'tag-change tag'
        })
    }
}
//动态生成这么多的卡片
//将首页中每个小盒子的内容渲染进去 点击的时候才会调用这个函数 点击过后清空之前盒子里面的所有东西 重新渲染 

// 这个函数是用于中间核心的盒子中删除所有小卡片 最后只剩下一个卡片  并且将这个卡片的内容清空 作为下一次复制的模板
function remove_recommend() {
    var childs = home_main1_recommend.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        home_main1_recommend.removeChild(childs[i]);
    }
    recommend_box_pic[0].src = ''
    recommend_box_title[0].innerHTML = ''
    recommend_foot_author[0].innerHTML = ''
    recommend_foot_like[0].innerHTML = ''
    recommend_foot_pic[0].src = ''
}
// 第一个卡片在一打开的时候就会执行一次这个函数
lis_homeHeadClass[0].addEventListener('click', recommend_tag)
function recommend_tag() {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/getHomePage')
        .then(function (response) {
            console.log(response);
            remove_recommend()
            var boxnum1 = response.data.pages.推荐.length
            for (var i = 0; i < response.data.pages.推荐.length; i++) {
                home_main1_recommend.appendChild(home_main1_recommend.children[0].cloneNode(true));
                recommend_box_pic[i].src = response.data.pages.推荐[i].images[0]
                recommend_box_pic[i].setAttribute('num', i)
                recommend_box_pic[i].setAttribute('articleId', response.data.pages.推荐[i].articleId)
                recommend_box_title[i].innerHTML = response.data.pages.推荐[i].title
                recommend_foot_author[i].innerHTML = response.data.pages.推荐[i].authorName
                recommend_foot_like[i].innerHTML = response.data.pages.推荐[i].likes
                recommend_foot_pic[i].src = response.data.pages.推荐[i].avatar
                recommend_foot_pic[i].setAttribute('articleId', response.data.pages.推荐[i].authorId)
                recommend_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.pages.推荐[i].articleId) {
                        recommend_foot_icon[i].style.color = 'red'
                    }
                }

                recommend_foot_icon[i].setAttribute('articleId', response.data.pages.推荐[i].articleId)
            }
            home_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum1; i++) {
                recommend_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                //点击头像进入作者页面
                recommend_foot_pic[i].addEventListener('click', function () {
                    other.style.display = 'block'

                    showother(this.getAttribute('articleId'))

                })
                //点击后进入这篇文章并且渲染出来
                recommend_box_pic[i].addEventListener('click', function () {
                    //渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = response.data.pages.推荐[num].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    artical_top_imgs.setAttribute('index', response.data.pages.推荐[num].authorId)
                    artical_top_name.innerHTML = response.data.pages.推荐[num].authorName
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.pages.推荐[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'

                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.pages.推荐[num].authorId)
                    })
                    artical_imgs.src = response.data.pages.推荐[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.pages.推荐[num].title
                    article_main_content.innerHTML = response.data.pages.推荐[num].content
                    article_main_tag.innerHTML = '#' + response.data.pages.推荐[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.pages.推荐[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.pages.推荐[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.pages.推荐[num].likes
                    article_like.setAttribute('articleId', response.data.pages.推荐[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.pages.推荐[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.pages.推荐[num].stars
                    article_collect.setAttribute('articleId', response.data.pages.推荐[num].articleId)
                    article_comment_num.innerHTML = response.data.pages.推荐[num].reviews
                    article_comment_top.innerHTML = '共有' + response.data.pages.推荐[num].reviews + '条评论'
                    showData(yourId)
                    article.style.display = 'block'
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
//点击第二个
lis_homeHeadClass[1].addEventListener('click', travel_tag)
function travel_tag() {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/getHomePage')
        .then(function (response) {
            remove_recommend()
            var boxnum2 = response.data.pages.旅行.length
            for (var i = 0; i < response.data.pages.旅行.length; i++) {
                home_main1_recommend.appendChild(home_main1_recommend.children[0].cloneNode(true));
                recommend_box_pic[i].src = response.data.pages.旅行[i].images[0]
                recommend_box_pic[i].setAttribute('num', i)
                recommend_box_title[i].innerHTML = response.data.pages.旅行[i].title
                recommend_foot_author[i].innerHTML = response.data.pages.旅行[i].authorName
                recommend_foot_like[i].innerHTML = response.data.pages.旅行[i].likes
                recommend_foot_pic[i].src = response.data.pages.旅行[i].avatar
                recommend_foot_pic[i].setAttribute('articleId', response.data.pages.旅行[i].articleId)
                recommend_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.pages.旅行[i].articleId) {
                        recommend_foot_icon[i].style.color = 'red'
                    }
                }
                recommend_foot_icon[i].setAttribute('articleId', response.data.pages.旅行[i].articleId)
            }
            home_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum2; i++) {
                recommend_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                //点击头像进入作者页面
                recommend_foot_pic[i].addEventListener('click', function () {
                    other.style.display = 'block'

                    showother(this.getAttribute('articleId'))

                })
                //点击进入这篇文章并且渲染
                recommend_box_pic[i].addEventListener('click', function () {
                    //渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = response.data.pages.旅行[num].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    artical_top_imgs.setAttribute('index', response.data.pages.旅行[num].authorId)
                    artical_top_name.innerHTML = response.data.pages.旅行[num].authorName
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.pages.旅行[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'
                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.pages.旅行[num].authorId)
                    })
                    artical_imgs.src = response.data.pages.旅行[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.pages.旅行[num].title
                    article_main_content.innerHTML = response.data.pages.旅行[num].content
                    article_main_tag.innerHTML = '#' + response.data.pages.旅行[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.pages.旅行[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.pages.旅行[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.pages.旅行[num].likes
                    article_like.setAttribute('articleId', response.data.pages.旅行[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.pages.旅行[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.pages.旅行[num].stars
                    article_collect.setAttribute('articleId', response.data.pages.旅行[num].articleId)
                    article_comment_num.innerHTML = response.data.pages.旅行[num].reviews
                    article_comment_top.innerHTML = '共有' + response.data.pages.旅行[num].reviews + '条评论'
                    article.style.display = 'block'

                })

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// 点击第三个
lis_homeHeadClass[2].addEventListener('click', food_tag)
function food_tag() {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/getHomePage')
        .then(function (response) {
            remove_recommend()
            var boxnum3 = response.data.pages.美食.length
            for (var i = 0; i < response.data.pages.美食.length; i++) {
                home_main1_recommend.appendChild(home_main1_recommend.children[0].cloneNode(true));
                recommend_box_pic[i].src = response.data.pages.美食[i].images[0]
                recommend_box_pic[i].setAttribute('num', i)
                recommend_box_title[i].innerHTML = response.data.pages.美食[i].title
                recommend_foot_author[i].innerHTML = response.data.pages.美食[i].authorName
                recommend_foot_like[i].innerHTML = response.data.pages.美食[i].likes
                recommend_foot_pic[i].src = response.data.pages.美食[i].avatar
                recommend_foot_pic[i].setAttribute('articleId', response.data.pages.美食[i].articleId)
                recommend_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.pages.美食[i].articleId) {
                        recommend_foot_icon[i].style.color = 'red'
                    }
                }
                recommend_foot_icon[i].setAttribute('articleId', response.data.pages.美食[i].articleId)
            }
            home_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum3; i++) {
                recommend_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                //点击头像进入作者页面
                recommend_foot_pic[i].addEventListener('click', function () {
                    other.style.display = 'block'

                    showother(this.getAttribute('articleId'))

                })
                recommend_box_pic[i].addEventListener('click', function () {
                    //渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = response.data.pages.美食[num].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    artical_top_imgs.setAttribute('index', response.data.pages.美食[num].authorId)

                    artical_top_name.innerHTML = response.data.pages.美食[num].authorName
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.pages.美食[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'
                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.pages.美食[num].authorId)
                    })
                    artical_imgs.src = response.data.pages.美食[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.pages.美食[num].title
                    article_main_content.innerHTML = response.data.pages.美食[num].content
                    article_main_tag.innerHTML = '#' + response.data.pages.美食[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.pages.美食[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.pages.美食[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.pages.美食[num].likes
                    article_like.setAttribute('articleId', response.data.pages.美食[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.pages.美食[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.pages.美食[num].stars
                    article_collect.setAttribute('articleId', response.data.pages.美食[num].articleId)
                    article_comment_num.innerHTML = response.data.pages.美食[num].reviews
                    article_comment_top.innerHTML = '共有' + response.data.pages.美食[num].reviews + '条评论'
                    article.style.display = 'block'

                })

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// 点击第四个
lis_homeHeadClass[3].addEventListener('click', fashion_tag)
function fashion_tag() {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/getHomePage')
        .then(function (response) {
            remove_recommend()
            var boxnum4 = response.data.pages.时尚.length
            for (var i = 0; i < response.data.pages.时尚.length; i++) {
                home_main1_recommend.appendChild(home_main1_recommend.children[0].cloneNode(true));
                recommend_box_pic[i].src = response.data.pages.时尚[i].images[0]
                recommend_box_pic[i].setAttribute('num', i)
                recommend_box_title[i].innerHTML = response.data.pages.时尚[i].title
                recommend_foot_author[i].innerHTML = response.data.pages.时尚[i].authorName
                recommend_foot_like[i].innerHTML = response.data.pages.时尚[i].likes
                recommend_foot_pic[i].src = response.data.pages.时尚[i].avatar
                recommend_foot_pic[i].setAttribute('articleId', response.data.pages.时尚[i].articleId)
                recommend_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.pages.时尚[i].articleId) {
                        recommend_foot_icon[i].style.color = 'red'
                    }
                }
                recommend_foot_icon[i].setAttribute('articleId', response.data.pages.时尚[i].articleId)
            }
            home_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum4; i++) {
                recommend_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                //点击头像进入作者页面
                recommend_foot_pic[i].addEventListener('click', function () {
                    other.style.display = 'block'

                    showother(this.getAttribute('articleId'))

                })
                recommend_box_pic[i].addEventListener('click', function () {
                    //渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = response.data.pages.时尚[num].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    artical_top_imgs.setAttribute('index', response.data.pages.时尚[num].authorId)

                    artical_top_name.innerHTML = response.data.pages.时尚[num].authorName
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.pages.时尚[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'
                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.pages.时尚[num].authorId)
                    })
                    artical_imgs.src = response.data.pages.时尚[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.pages.时尚[num].title
                    article_main_content.innerHTML = response.data.pages.时尚[num].content
                    article_main_tag.innerHTML = '#' + response.data.pages.时尚[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.pages.时尚[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.pages.时尚[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.pages.时尚[num].likes
                    article_like.setAttribute('articleId', response.data.pages.时尚[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.pages.时尚[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.pages.时尚[num].stars
                    article_collect.setAttribute('articleId', response.data.pages.时尚[num].articleId)
                    article_comment_num.innerHTML = response.data.pages.时尚[num].reviews
                    article_comment_top.innerHTML = '共有' + response.data.pages.时尚[num].reviews + '条评论'
                    article.style.display = 'block'

                })

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// 点击第五个
lis_homeHeadClass[4].addEventListener('click', makeup_tag)
function makeup_tag() {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/getHomePage')
        .then(function (response) {
            remove_recommend()
            var boxnum5 = response.data.pages.彩妆.length
            for (var i = 0; i < response.data.pages.彩妆.length; i++) {
                home_main1_recommend.appendChild(home_main1_recommend.children[0].cloneNode(true));
                recommend_box_pic[i].src = response.data.pages.彩妆[i].images[0]
                recommend_box_pic[i].setAttribute('num', i)
                recommend_box_title[i].innerHTML = response.data.pages.彩妆[i].title
                recommend_foot_author[i].innerHTML = response.data.pages.彩妆[i].authorName
                recommend_foot_like[i].innerHTML = response.data.pages.彩妆[i].likes
                recommend_foot_pic[i].src = response.data.pages.彩妆[i].avatar
                recommend_foot_pic[i].setAttribute('articleId', response.data.pages.彩妆[i].articleId)
                recommend_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.pages.彩妆[i].articleId) {
                        recommend_foot_icon[i].style.color = 'red'
                    }
                }
                recommend_foot_icon[i].setAttribute('articleId', response.data.pages.彩妆[i].articleId)
            }
            home_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum5; i++) {
                recommend_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                //点击头像进入作者页面
                recommend_foot_pic[i].addEventListener('click', function () {
                    other.style.display = 'block'

                    showother(this.getAttribute('articleId'))

                })
                recommend_box_pic[i].addEventListener('click', function () {
                    //渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = response.data.pages.彩妆[num].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    artical_top_imgs.setAttribute('index', response.data.pages.彩妆[num].authorId)

                    artical_top_name.innerHTML = response.data.pages.彩妆[num].authorName
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.pages.彩妆[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'
                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.pages.彩妆[num].authorId)
                    })
                    artical_imgs.src = response.data.pages.彩妆[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.pages.彩妆[num].title
                    article_main_content.innerHTML = response.data.pages.彩妆[num].content
                    article_main_tag.innerHTML = '#' + response.data.pages.彩妆[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.pages.彩妆[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.pages.彩妆[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.pages.彩妆[num].likes
                    article_like.setAttribute('articleId', response.data.pages.推荐[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.pages.彩妆[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.pages.彩妆[num].stars
                    article_collect.setAttribute('articleId', response.data.pages.彩妆[num].articleId)
                    article_comment_num.innerHTML = response.data.pages.彩妆[num].reviews
                    article_comment_top.innerHTML = '共有' + response.data.pages.彩妆[num].reviews + '条评论'
                    article.style.display = 'block'

                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// 点击第六个
lis_homeHeadClass[5].addEventListener('click', efficient_tag)
function efficient_tag() {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/getHomePage')
        .then(function (response) {
            remove_recommend()
            var boxnum6 = response.data.pages.高效.length
            for (var i = 0; i < response.data.pages.高效.length; i++) {
                home_main1_recommend.appendChild(home_main1_recommend.children[0].cloneNode(true));
                recommend_box_pic[i].src = response.data.pages.高效[i].images[0]
                recommend_box_pic[i].setAttribute('num', i)
                recommend_box_title[i].innerHTML = response.data.pages.高效[i].title
                recommend_foot_author[i].innerHTML = response.data.pages.高效[i].authorName
                recommend_foot_like[i].innerHTML = response.data.pages.高效[i].likes
                recommend_foot_pic[i].src = response.data.pages.高效[i].avatar
                recommend_foot_pic[i].setAttribute('articleId', response.data.pages.高效[i].articleId)
                recommend_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.pages.高效[i].articleId) {
                        recommend_foot_icon[i].style.color = 'red'
                    }
                }
                recommend_foot_icon[i].setAttribute('articleId', response.data.pages.高效[i].articleId)
            }
            home_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum6; i++) {
                recommend_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                //点击头像进入作者页面
                recommend_foot_pic[i].addEventListener('click', function () {
                    other.style.display = 'block'

                    showother(this.getAttribute('articleId'))

                })
                recommend_box_pic[i].addEventListener('click', function () {
                    //渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = response.data.pages.高效[num].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    artical_top_imgs.setAttribute('index', response.data.pages.高效[num].authorId)

                    artical_top_name.innerHTML = response.data.pages.高效[num].authorName
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.pages.高效[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'
                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.pages.高效[num].authorId)
                    })
                    artical_imgs.src = response.data.pages.高效[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.pages.高效[num].title
                    article_main_content.innerHTML = response.data.pages.高效[num].content
                    article_main_tag.innerHTML = '#' + response.data.pages.高效[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.pages.高效[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.pages.高效[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.pages.高效[num].likes
                    article_like.setAttribute('articleId', response.data.pages.高效[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.pages.高效[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.pages.高效[num].stars
                    article_collect.setAttribute('articleId', response.data.pages.高效[num].articleId)
                    article_comment_num.innerHTML = response.data.pages.高效[num].reviews
                    article_comment_top.innerHTML = '共有' + response.data.pages.高效[num].reviews + '条评论'
                    article.style.display = 'block'

                })

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// 点击第七个
lis_homeHeadClass[6].addEventListener('click', skincare_tag)
function skincare_tag() {
    getLikeArticle(yourId)
    getfollows(yourId)
    getstar(yourId)
    axios.get('http://175.178.193.182:8080/article/getHomePage')
        .then(function (response) {
            remove_recommend()
            var boxnum7 = response.data.pages.护肤.length
            for (var i = 0; i < response.data.pages.护肤.length; i++) {
                home_main1_recommend.appendChild(home_main1_recommend.children[0].cloneNode(true));
                recommend_box_pic[i].src = response.data.pages.护肤[i].images[0]
                recommend_box_pic[i].setAttribute('num', i)
                recommend_box_title[i].innerHTML = response.data.pages.护肤[i].title
                recommend_foot_author[i].innerHTML = response.data.pages.护肤[i].authorName
                recommend_foot_like[i].innerHTML = response.data.pages.护肤[i].likes
                recommend_foot_pic[i].src = response.data.pages.护肤[i].avatar
                recommend_foot_pic[i].setAttribute('articleId', response.data.pages.护肤[i].articleId)
                recommend_foot_icon[i].style.color = 'black'
                //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                //添加自定义属性为了点击喜欢和取消喜欢
                for (var j = 0; j <= like_num; j++) {
                    if (likeArticleList[j] == response.data.pages.护肤[i].articleId) {
                        recommend_foot_icon[i].style.color = 'red'
                    }
                }
                recommend_foot_icon[i].setAttribute('articleId', response.data.pages.护肤[i].articleId)
            }
            home_main1_recommend.lastElementChild.style.display = 'none'
            for (var i = 0; i < boxnum7; i++) {
                recommend_foot_icon[i].addEventListener('click', function () {
                    like_btn = this
                    likeArticle(this.getAttribute('articleId'))
                })
                //点击头像进入作者页面
                recommend_foot_pic[i].addEventListener('click', function () {
                    other.style.display = 'block'

                    showother(this.getAttribute('articleId'))

                })
                recommend_box_pic[i].addEventListener('click', function () {
                    //渲染评论部分
                    review(this.getAttribute('articleId'))
                    var num = this.getAttribute('num')
                    artical_top_imgs.src = response.data.pages.护肤[num].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    artical_top_imgs.setAttribute('index', response.data.pages.护肤[num].authorId)

                    artical_top_name.innerHTML = response.data.pages.护肤[num].authorName
                    artical_top_attent.innerHTML = '未关注'
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.pages.护肤[num].authorId) {
                            artical_top_attent.innerHTML = '已关注'
                        }
                    }
                    //右上角点击关注或者取消关注作者
                    artical_top_attent.addEventListener('click', function () {
                        cancelFollow3(response.data.pages.护肤[num].authorId)
                    })
                    artical_imgs.src = response.data.pages.护肤[num].images[0]
                    //详情页面的照片下面的内容
                    article_main_title.innerHTML = response.data.pages.护肤[num].title
                    article_main_content.innerHTML = response.data.pages.护肤[num].content
                    article_main_tag.innerHTML = '#' + response.data.pages.护肤[num].tags.join(' #')
                    article_main_time.innerHTML = response.data.pages.护肤[num].postDate.substr(0, 10)
                    //评论部分
                    //判断是否已经喜欢这篇文章
                    article_like.style.color = 'black'
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.pages.护肤[num].articleId) {
                            article_like.style.color = 'red'
                        }
                    }
                    article_like_num.innerHTML = response.data.pages.护肤[num].likes
                    article_like.setAttribute('articleId', response.data.pages.护肤[num].articleId)
                    //判断是否收藏了这篇文章
                    article_collect.style.color = 'black'
                    for (var j = 0; j <= star_num; j++) {
                        if (starArticleList[j] == response.data.pages.护肤[num].articleId) {
                            article_collect.style.color = 'red'
                        }
                    }
                    article_collect_num.innerHTML = response.data.pages.护肤[num].stars
                    article_collect.setAttribute('articleId', response.data.pages.护肤[num].articleId)
                    article_comment_num.innerHTML = response.data.pages.护肤[num].reviews
                    article.style.display = 'block'

                })

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

//写一个函数用来喜欢和取消喜欢文章(在首页中)
function likeArticle(articleId) {
    axios.post('http://175.178.193.182:8080/article/like', {
        userId: yourId,
        articleId: articleId
    })
        .then(function (response) {
            if (response.data.status == 200) {
                like_btn.style.color = 'red'
                console.log(response);
                like_btn.nextElementSibling.innerHTML -= -1
                article_like.style.color = 'red'
                article_like.nextElementSibling.innerHTML -= - 1
            } else {
                unlikeArticle(articleId)
                //这个函数用来取消点赞
                function unlikeArticle(articleId) {
                    axios.post('http://175.178.193.182:8080/article/unlike', {
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







