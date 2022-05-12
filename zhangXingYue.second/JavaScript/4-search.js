var search_head_back = document.querySelector('.search-head-back')
var lis_searchTags = document.getElementsByClassName('tag-search')
var lis_searchBoxs = document.getElementsByClassName('search-box')
var search_head_main = document.querySelector('.search-head-main')
var search_btn = document.querySelector('.search-btn')
var search_main = document.querySelector('.search-main')
var search_blank1 = document.querySelector('.search-blank1')
var search_blank2 = document.querySelector('.search-blank2')
var btn_num2 = ''
//获取文章里面每个小卡片的模板
var search_main1_artical = document.querySelector('.search-main1-artical')
var artical_box1 = document.querySelector('.artical-box1')
var artical_box_pic = document.getElementsByClassName('artical-box-pics')
var artical_box_title = document.getElementsByClassName('artical-box-title')
var artical_foot_pic = document.getElementsByClassName('artical-foot-pics')
var artical_foot_author = document.getElementsByClassName('artical-foot-author')
var artical_foot_icon = document.getElementsByClassName('artical-foot-icon')
var artical_foot_like = document.getElementsByClassName('artical-foot-like')
//获取用户的每一条的模板
var search_main2_user = document.querySelector('.search-main2-user')
var search_user_box1 = document.querySelector('.search-user-box1')
var search_user_pic = document.getElementsByClassName('search-user-pics')
var search_user_name = document.getElementsByClassName('search-user-name')
var search_user_foci = document.getElementsByClassName('search-user-foci')


//点击不同的tag显示不同的盒子 并且tag的样式也要改变
clickTag_Search()
function clickTag_Search() {
    for (var i = 0; i < lis_searchTags.length; i++) {
        lis_searchTags[i].setAttribute('index', i)
        lis_searchTags[i].addEventListener('click', function () {
            for (var j = 0; j < lis_searchTags.length; j++) {
                lis_searchTags[j].className = 'tag-search'
            }
            this.className = 'tag-change tag-search'
            // 出现下面的盒子
            var index = this.getAttribute('index')
            for (var j = 0; j < lis_searchBoxs.length; j++) {
                lis_searchBoxs[j].style.display = 'none'
            }
            lis_searchBoxs[index].style.display = 'block'
        })
    }
}
// 这个函数是用于搜索文章的盒子中删除所有小卡片 最后只剩下一个卡片  并且将这个卡片的内容清空 作为下一次渲染的模板
function remove_artical() {
    var childs = search_main1_artical.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        search_main1_artical.removeChild(childs[i]);
    }
    artical_box_pic[0].src = ''
    artical_box_title[0].innerHTML = ''
    artical_foot_author[0].innerHTML = ''
    artical_foot_like[0].innerHTML = ''
    artical_foot_pic[0].src = ''
}

function remove_user() {
    var childs = search_main2_user.childNodes;
    for (var i = childs.length - 1; i >= 2; i--) {
        search_main2_user.removeChild(childs[i]);
    }
    search_user_pic[0].src = ''
    search_user_name[0].innerHTML = ''
    search_user_foci[0].innerHTML = ''
}

//输入关键词 进行搜索查找相关文章
search_btn.addEventListener('click', function () {
    lis_searchBoxs[1].style.display = 'none'
    lis_searchTags[0].className = 'tag-change tag-search'
    lis_searchTags[1].className = 'tag-search'
    //执行下面两个函数
    getfollows(yourId)
    search_Artical(search_head_main.value);
    search_User(search_head_main.value);
})

function search_Artical(keyWord) {
    axios.get('http://175.178.193.182:8080/search/byArticle?keyWord=' + keyWord,)
        .then(function (response) {
            var search_num = response.data.articles.length
            if (response.data.articles.length == 0 || keyWord == '') {
                lis_searchBoxs[0].style.display = 'block'
                search_main1_artical.style.display = 'none'
                search_blank1.style.display = 'block'
            } else {
                search_main.style.display = 'block'
                lis_searchBoxs[0].style.display = 'block'
                search_blank1.style.display = 'none'
                remove_artical()
                search_main1_artical.style.display = 'block'
                for (var i = 0; i < response.data.articles.length; i++) {
                    search_main1_artical.appendChild(search_main1_artical.children[0].cloneNode(true));
                    artical_box_pic[i].src = response.data.articles[i].images[0]
                    artical_box_pic[i].setAttribute('num', i)
                    artical_box_pic[i].setAttribute('articleId', response.data.articles[i].articleId)
                    artical_box_title[i].innerHTML = response.data.articles[i].title
                    artical_foot_author[i].innerHTML = response.data.articles[i].authorName
                    artical_foot_like[i].innerHTML = response.data.articles[i].likes
                    artical_foot_pic[i].src = response.data.articles[i].avatar
                    artical_foot_icon[i].style.color = 'black'
                    //判断是否已经喜欢了这篇文章 如果已经喜欢则是红色
                    //添加自定义属性为了点击喜欢和取消喜欢
                    for (var j = 0; j <= like_num; j++) {
                        if (likeArticleList[j] == response.data.articles[i].articleId) {
                            artical_foot_icon[i].style.color = 'red'
                        }
                    }
                    artical_foot_icon[i].setAttribute('articleId', response.data.articles[i].articleId)
                }
                // 那个模板的卡片
                search_main1_artical.lastElementChild.style.display = 'none'
                //具体的每一个文章
                for (var i = 0; i < search_num; i++) {
                    artical_foot_icon[i].addEventListener('click', function () {
                        like_btn = this
                        likeArticle(this.getAttribute('articleId'))
                    })
                    artical_box_pic[i].addEventListener('click', function () {
                        //渲染评论部分
                        review(this.getAttribute('articleId'))
                        var num = this.getAttribute('num')
                        artical_top_imgs.src = response.data.articles[num].avatar
                        //添加自定义属性index 为了点击进入个人主页
                        artical_top_imgs.setAttribute('index', response.data.articles[num].authorId)

                        artical_top_name.innerHTML = response.data.articles[num].authorName
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

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
function search_User(keyWord) {
    axios.get('http://175.178.193.182:8080/search/byUser?keyWord=' + keyWord,)
        .then(function (response) {
            if (response.data.users.length == 0 || keyWord == '') {
                search_main2_user.style.display = 'none'
                search_blank2.style.display = 'block'
            } else {
                //调用这个函数获得关注的人的清单
                remove_user()
                search_main2_user.style.display = 'block'
                search_main.style.display = 'block'
                search_blank2.style.display = 'none'
                for (var i = 0; i < response.data.users.length; i++) {
                    search_main2_user.appendChild(search_main2_user.children[0].cloneNode(true));
                    search_user_pic[i].src = response.data.users[i].avatar
                    //添加自定义属性index 为了点击进入个人主页
                    search_user_pic[i].setAttribute('index', response.data.users[i].userId)
                    search_user_name[i].innerHTML = response.data.users[i].nickname
                    search_user_foci[i].innerHTML = '未关注'
                    search_user_foci[i].style.backgroundColor = '#fff'
                    search_user_foci[i].style.color = 'rgb(115, 13, 210)'
                    //添加自定义属性index 为了点击关注或者取消关注
                    search_user_foci[i].setAttribute('index', response.data.users[i].userId)
                    //在渲染是否关注的时候 遍历它是否被本人关注
                    for (var j = 0; j <= follow_num; j++) {
                        if (followsLists[j] == response.data.users[i].userId) {
                            search_user_foci[i].innerHTML = '已关注'
                            search_user_foci[i].style.backgroundColor = 'rgb(115, 13, 210)'
                            search_user_foci[i].style.color = '#fff'
                        }
                    }
                }
                search_main2_user.lastElementChild.style.display = 'none'
                // 这里已经渲染出来了所有盒子 可以进行关注和取消关注了
                for (var i = 0; i < search_user_foci.length; i++) {
                    search_user_foci[i].addEventListener('click', function () {
                        btn_num2 = this
                        cancelFollow2(this.getAttribute('index'))
                    })
                    //点击这个作者的头像可以进入这个作者的主页
                    search_user_pic[i].addEventListener('click', function () {
                        // search.style.display = 'none'
                        other.style.display = 'block'
                        othersId = this.getAttribute('index')
                        showother(this.getAttribute('index'))
                    })
                }

            }

        })
        .catch(function (error) {
            console.log(error);
        });
}
//点击后回到首页部分 并且搜索的内容全部清空
search_head_back.addEventListener('click', function () {
    search.style.display = 'none'
    homepage.style.display = 'block';
    search_head_main.value = ''
    search_Artical(search_head_main.value);
    search_User(search_head_main.value);
    search_main.style.display = 'none'
    getfollows(yourId)
})

//用这个函数来取消关注
function cancelFollow2(followerIds2) {
    axios.post('http://175.178.193.182:8080/user/cancelFollow', {
        userId: yourId,
        followerId: followerIds2
    })
        .then(function (response) {
            if (response.data.status == 200) {
                btn_num2.innerHTML = '未关注'
                btn_num2.style.backgroundColor = '#fff'
                btn_num2.style.color = 'rgb(115, 13, 210)'

            } else {
                followOther2(followerIds2)
                //这个函数用来关注别人
                function followOther2(followerIds2) {
                    axios.post('http://175.178.193.182:8080/user/follow', {
                        userId: yourId,
                        followerId: followerIds2
                    })
                        .then(function (response) {
                            if (response.data.status == 200) {
                                btn_num2.innerHTML = '已关注'
                                btn_num2.style.backgroundColor = 'rgb(115, 13, 210)'
                                btn_num2.style.color = '#fff'

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
