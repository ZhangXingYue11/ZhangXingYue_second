var publish_head_back = document.querySelector('.publish-head-back')
var publish_foot = document.querySelector('.publish-foot')
var publish_title = document.querySelector('.publish-title')
var publish_maintext = document.querySelector('.publish-maintext')
var upload_file = document.querySelector('.upload-file')
var upload_imgs = document.querySelector('.upload-imgs')
//点击后回到首页部分
publish_head_back.addEventListener('click', function () {
    publish.style.display = 'none'
    homepage.style.display = 'block';
})

//点击添加tag
var btn_topic = document.querySelector('.btn-topic')
var topic_box = document.querySelector('.topic-box')
var publish_tag_mask = document.querySelector('.publish-tag-mask')
var tag_cancle = document.querySelector('.tag-cancle')
var tag_ensuer = document.querySelector('.tag-ensuer')
var publish_tag = document.querySelector('.publish-tag')
btn_topic.addEventListener('click', function () {
    topic_box.style.display = 'block'
    publish_tag_mask.style.display = 'block'

})
tag_cancle.addEventListener('click', function () {
    publish_tag.value = ''
    topic_box.style.display = 'none'
    publish_tag_mask.style.display = 'none'
})
tag_ensuer.addEventListener('click', function () {
    topic_box.style.display = 'none'
    publish_tag_mask.style.display = 'none'

})
var pic_url = []
//上传图片后显示图片
function previewFile() {
    pic_url = []
    var preview = document.querySelector('.upload-imgs')
    preview.style.display = 'block'
    var fileDom = document.querySelector('.upload-file')
    var file = fileDom.files[0]
    if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过2MB')
        return false
    }
    var imgUrl = window.URL.createObjectURL(file)
    preview.setAttribute('src', imgUrl)
    preview.onload = function () {
        URL.revokeObjectURL(imgUrl)
    }
    // 通过这个来获得发布文章的那个图片的返回的url
    getPicUrl(file)
    function getPicUrl(file) {
        const aforms = new FormData()
        aforms.append('image', file)

        const aoptions = {
            method: 'POST',
            data: aforms,
            url: " http://175.178.193.182:8080/upload/image",

        }
        axios(aoptions)
            .then(function (response) {
                console.log(response);
                pic_url[0] = response.data.url

            })
    }
    // 发布文章！！！
    publish_foot.addEventListener('click', function () {
        const forms = new FormData()
        forms.append('title', publish_title.value)
        forms.append('content', publish_maintext.value)
        forms.append('tags', publish_tag.value)
        forms.append('userId', yourId)
        forms.append('images', pic_url[0])

        const options = {
            method: 'POST',
            data: forms,
            url: "http://175.178.193.182:8080/article",
        }
        axios(options)
        publish.style.display = 'none'
        //将刚刚的内容清空
        publish_title.value = ''
        publish_maintext.value = ''
        publish_tag.value = ''
        preview.src = ''
        homepage.style.display = 'block'

    })
}

