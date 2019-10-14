

// let login_tip_button = document.querySelector('.login_tip_button input')
// login_tip_button.addEventListener('click',function(){
//     console.log('login_tip_button')
// })



// 滚动进化
window.addEventListener("mousewheel", function (event) {
    /**
     * 0
     * 1002
     */
    let clientHeight = document.body.clientHeight
    setTimeout(() => {
        // console.log(scrollY)
        console.log(clientHeight)
        if (event.wheelDeltaY < 0 && scrollY > 0 && scrollY < clientHeight / 4)
            scrollTo(0, clientHeight / 2)
        if (event.wheelDeltaY > 0 && scrollY > clientHeight / 4)
            scrollTo(0, 0)

    }, 100);


})

//选择动画
function toggleClassPlu(elem, name) {
    for (let i = 0; i < elem.length; i++) {
        if (elem[i].classList.contains(name)) {
            elem[i].classList.remove(name)
        }
    }
}
let selectItems = document.querySelectorAll('.select a')
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        toggleClassPlu(selectItems, "select_active")
        this.classList.add("select_active")
    })
}

//查询

/**
 * @param {string} url 请求地址
 * @param {string} type 请求方式
 * @param {object} data post 发送数据
 * @param {Boolean} processData 发送文件选false,默认true
 * @param {Boolean} contentType 发送文件选false,默认true
 */
function ajax(url, type = "get", data = {}, processData = true, contentType = true) {
    let method = { url, type, data, processData, contentType }
    if (method.contentType)
        delete method.contentType
    $(".background").show()
    return new Promise((resolve, reject) => {
        $.ajax(method).done(
            function (res) {
                resolve(res)
                $(".background").hide()
            }
        )
    })
}


function getStudent() {
    let url = "table?sentence=select * from students"
    ajax(url).then((res) => {
        let t = ""
        for (let i = 0; i < res.length; i++) {
            t +=
                `
                <tr align="center">
                <td class="sid">${res[i].sid}</td>
                <td class="name">${res[i].name}</td>
                <td class="gender">${res[i].gender}</td>
                <td class="age">${res[i].age}</td>
                <td class="phone_number">${res[i].phone_number}</td>
                <td class="address">${res[i].address}</td>
                <td class="remaek">${res[i].remaek}</td>
                </tr>
                `

        }
        $('.table').html(t)
    })
}

window.onload = function () {
    getStudent()
}