let dic = []


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
        console.log(this.id)
        switch (this.id) {
            case "students":
                // let t = `  
                // <col width="10%" height="40px">
                // <col width="10%" height="40px">
                // <col width="10%" height="40px">
                // <col width="10%" height="40px">
                // <col width="20%" height="40px">
                // <col width="20%" height="40px">
                // <col width="20%" height="40px">`
                // $('table').append(t)
                // console.log($('col').remove())//删除所有
                getTable("table?code=select&sentence=select * from students")
                break;
            case "teacher":
                getTable("table?code=select&sentence=select * from teacher")
                break;
            case "course":
                getTable("table?code=select&sentence=select * from course")
                break;
            default: alert("错误");
        }
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
                console.log(res.data)
                dic = res.data
                resolve(res)
                $(".background").hide()
            }
        )
    })
}

function getTable(url) {
    ajax(url).then((res) => {
        let t = ""
        let arr = []
        for (const i in dic[0]) {
            arr.push(i)
        }
        console.log(arr)
        for (let i = 0; i < dic.length; i++) {
            t +=
                `
                <tr align="left">
                                <td class="${arr[0]}">
                                    <div class="td_container">
                                        <span>${dic[i][arr[0]]}</span>
                                    </div>
                                </td>
                                <td class="${arr[1]}">
                                    <div class="td_container">
                                        <span>${dic[i][arr[1]]}</span>
                                    </div>
                                </td>
                                <td class="${arr[2]}">
                                    <div class="td_container">
                                        <span>${dic[i][arr[2]]}</span>
                                    </div>
                                </td>
                                <td class="${arr[3]}">
                                    <div class="td_container">
                                        <span>${dic[i][arr[3]]}</span>
                                    </div>
                                </td>
                                <td class="${arr[4]}">
                                    <div class="td_container">
                                        <span>${dic[i][arr[4]]}</span>
                                        <i class="edit"></i>
                                        </div>
                                </td>
                                <td class="${arr[5]}">
                                    <div class="td_container">
                                        <span>${dic[i][arr[5]]}</span>
                                        <i class="edit"></i>
                                        </div>
                                </td>
                                <td class="${arr[6]}">
                                    <div class="td_container">
                                        <span>${dic[i][arr[6]]}</span>
                                        <i class="edit"></i>
                                        </div>
                                </td>
                            </tr>
                `
        }
        $('.table').html(t)
        let allTr = $("tr")
        arr.map((val, index) => {
            if (val == "name")
                val = "姓名"
            if (val.indexOf("id") != -1)
                (val == "sid") ? (val = "学号") : ((val == "tid") ? (val = "工号") : (val = "课号"));
            if (val == 'age')
                val = "年龄"
            if (val == 'gender')
                val = "性别"
            if (val == 'phone_number')
                val = "电话"
            if (val == 'address')
                val = "住址"
            if (val == 'remark')
                val = "备注"
            if (val == 'teacher')
                val = "任课教师"
            arr[index] = val
        })

        for (let i = 0; i < allTr.length; i++) {
            for (let x = 0; x < arr.length; x++) {
                $(allTr[i].children[x]).show()
                $($("tr")[0]).children()[x].innerHTML = arr[x]
            }
        }
        for (let i = 0; i < allTr.length; i++) {
            for (let j = 6; j >= arr.length; j--) {
                $(allTr[i].children[j]).hide()
            }
        }
    })
}




// function connectTable(sql, options = {}) {
//     let options = {}
//     let sql = ""
//     let url = "table?code=select&sentence=select * from students"

// }














$(".table").click(function (event) {
    if (event.target.nodeName == "I") {
        let id = $(event.target.closest("tr").children[0]).find('span').html()
        let rootid = $(event.target.closest("tr").children[0]).attr('class')
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
        par.html(inpu)
        let change_input = document.querySelector('.change_input')
        let change_btn = document.querySelector('.change_btn')
        if (change_input) {
            change_input.oninput = function () {
                change_btn.title = change_input.value
            }
            change_btn.addEventListener('click', function () {
                let text = change_input.value.replace(/(^\s*)|(\s*$)/g, "").replace(/<|>|%|\\|"|=|'|{|}|!|\?|\(|\)|\*/, "-")
                //数字待处理
                let table = $(".select_active").attr('id')
                let sql = `update ${table} set ${item}='${text}' where ${rootid}='${id}'`
                ajax("/table?code=update&sentence=" + sql).then((res) => {
                    if (res.code == 1) {
                        alert("修改成功!")
                    } else {
                        alert("未知错误!")
                    }
                })





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






window.onload = function () {
    getTable("table?code=select&sentence=select * from students")
    // $(".background").hide()
}

let id = "cid"
let name = null;
