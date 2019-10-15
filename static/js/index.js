

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

let dic = []
function getStudent() {
    let url = "table?sentence=select * from students"
    ajax(url).then((res) => {
        dic = res
        let t = ""
        for (let i = 0; i < res.length; i++) {
            t +=
                `
                <tr align="left">
                                <td class="sid">
                                    <div class="td_container">
                                        <span>${res[i].sid}</span>
                                    </div>
                                </td>
                                <td class="name">
                                    <div class="td_container">
                                        <span>${res[i].name}</span>
                                    </div>
                                </td>
                                <td class="gender">
                                    <div class="td_container">
                                        <span>${res[i].gender}</span>
                                    </div>
                                </td>
                                <td class="age">
                                    <div class="td_container">
                                        <span>${res[i].age}</span>
                                    </div>
                                </td>
                                <td class="phone_number">
                                    <div class="td_container">
                                        <span>${res[i].phone_number}</span>
                                        <i class="edit"></i>
                                        </div>
                                </td>
                                <td class="address">
                                    <div class="td_container">
                                        <span>${res[i].address}</span>
                                        <i class="edit"></i>
                                        </div>
                                </td>
                                <td class="remark">
                                    <div class="td_container">
                                        <span>${res[i].remark}</span>
                                        <i class="edit"></i>
                                        </div>
                                </td>
                            </tr>
                `

        }
        $('.table').html(t)
    })
}







$(".table").click(function (event) {
    // console.log(event.target.closest('div').parentNode.className == "phone_number" || "address")
    console.log()
    if (event.target.nodeName == "I") {
        let sid = $(event.target.closest("tr").children[0]).find('span').html()
        let item = event.target.closest("td").className
        let tips = $(event.target).prev().html()
        let par = $(event.target.closest("td"))
        par.children().remove()
        let inpu = `
                    <div class="change_bar">
                        <input class="change_input" type="text"  placeholder="${tips}">
                        <input class="change_btn" type="button" value="确认">
                    </div>
                   `

        // par.remove(par.children()[0])
        par.html(inpu)
        let change_input = document.querySelector('.change_input')
        let change_btn = document.querySelector('.change_btn')
        if (change_input) {
            change_input.oninput = function () {
                change_btn.title = change_input.value
            }
            change_btn.addEventListener('click', function () {
                let text = change_input.value.replace(/(^\s*)|(\s*$)/g, "").replace(/<|>|%|\\|"|=|'|{|}|!|\?|\(|\)|\*/, "-")
                // /(^\s*)|(\s*$)/g, ""
                if (item == "phone_number") {
                    if (Boolean(Number(text))) {

                    } else {
                        alert("必须是数字呢")
                        return
                    }
                }
                if (item == "address") {
                    console.log(Boolean(String(text)))

                }
                if (item == "remark") {
                    console.log(Boolean(String(text)))

                }











                let newtext = `
                <div class="td_container">
                                            <span>${text}</span>
                                            <i class="edit"></i>
                                        </div>`
                par.children().remove()
                par.html(newtext)
            })

        }

    }
})














// .addEventListener('mouserover', function () {
//     console.log(1)
// })





window.onload = function () {
    // $(".background").hide()
    getStudent()
}