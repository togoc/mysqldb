let arr = []
let dic = []



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
    selectItems[i].addEventListener("click", function() {
        toggleClassPlu(selectItems, "select_active")
        this.classList.add("select_active")
        switch (this.id) {
            case "students":
                getTable("students");
                break;
            case "teacher":
                getTable("teacher")
                break;
            case "course":
                getTable("course")
                break;
            default:
                alert("错误");
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
    if (method.processData) {
        delete method.processData
    }
    $(".background").show()
    return new Promise((resolve, reject) => {
        $.ajax(method).done(
            function(res) {
                dic = res.data
                resolve(res)
                $(".background").hide()
            }
        )
    })
}


function check(str) {
    if (str.indexOf("students") != -1) {
        location.hash = "/p=students";
        $('.select').children().find("a")[0].classList.add("select_active")
    }
    if (str.indexOf("teacher") != -1) {
        location.hash = "/p=teacher";
        $('.select').children().find("a")[1].classList.add("select_active")
    }
    if (str.indexOf("course") != -1) {
        location.hash = "/p=course";
        $('.select').children().find("a")[2].classList.add("select_active")
    }
}


function getTable(str) {
    //重载
    let url = ""
    if (str == "") {
        if (!localStorage.getItem("table")) {
            url = "table/select?code=select&sentence=select * from students"
        } else {
            url = "table/select?code=select&sentence=select * from " + localStorage.getItem("table")
        }
    } else {
        url = "table/select?code=select&sentence=select * from " + str
        localStorage.setItem("table", str)
    }
    ajax(url).then((res) => {
        // 修改hash
        check(url)
        let tr = ""
        let td = ""
        let titleArr = []
        arr = []
        for (const i in dic[0]) {
            arr.push(i)
        }
        arr.map((val, index) => {
                if (val.indexOf("name") != -1)
                    (val == "name") ? (val = "姓名") : (val = "课程名称")
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
                titleArr[index] = val
            })
            //清空表头再插入
        $(".thead").html("")
        for (let i = 0; i < titleArr.length; i++) {
            tr = `<th class="${arr[i]}">${titleArr[i]}</th>`
            $(".thead").append(tr)
        }
        //清空table再插入
        $(".table").html(" ")
        for (let i = 0; i < dic.length; i++) {
            if (i < dic.length)
                tr = `<tr align="left"></tr>`
            $(".table").append(tr)
            for (let j = 0; j < arr.length; j++) {
                td = `
                <td class="${arr[j]}">
                    <div class="td_container">
                        <span>${dic[i][arr[j]]}</span>
                        <i class="edit"></i>
                    </div>
                </td>
                `
                $($(".table").children()[i]).append(td)
            }
        }


        //添加insert按钮并添加行

        tr = `
            <tr align="center">
                <td class="insert" colspan="${arr.length}">添加 + </td>
            </tr>
        `
        $(".table").append(tr)
        insert()

    })
}

function insert() {
    let obj = Object.create(dic[0])
    $(".insert").click((event) => {
        if (event.target.innerHTML === "添加 + " && event.target.className === "insert") {
            if (document.querySelector(".change_input")) {
                alert("请输入")
                return
            }
            tr = `<tr align="left" class="add_row"></tr>`
            $(event.target.closest('tr')).before(tr)
            for (let i = 0; i < arr.length; i++) {
                td = `
                <td class="${arr[i]}">
                    <div class="change_bar">
                        <input class="change_input" type="text" placeholder="广西">
                    </div>
                </td>
                 `
                $(".add_row").append(td)
            }
            $(".insert").html("确认")


            for (const key in obj) {
                obj[key] = ""
            }
            document.querySelector('.table').addEventListener('change', function(ev) {
                obj[ev.target.closest("td").className] = ev.target.value
            })

        } else if (event.target.innerHTML === "确认" && event.target.className === "insert") {
            for (const key in obj) {
                obj[key] = obj[key].replace(/(^\s*)|(\s*$)/g, "").replace(/<|>|%|\\|"|=|'|{|}|!|\?|\(|\)|\*/, "-")
                if (key.indexOf("id") != -1) {
                    if (obj[key] == "") {
                        alert("id不能空")
                        return
                    }
                    if (Boolean(Number(obj[key]))) {
                        for (let i = 0; i < dic.length; i++) {
                            if (dic[i][key] == Number(obj[key])) {
                                alert("id重复请重新输入")
                                return
                            }
                            obj[key] = Number(obj[key])
                        }
                    } else {
                        alert("id必须为数字int")
                        return
                    }
                }
                if (obj[key] != "") {
                    console.log(key)
                    if (key.indexOf("age") != -1 || key.indexOf("phone_number") != -1) {

                        if (!Boolean(Number(obj[key]))) {
                            alert("年龄/电话号码必须为数字")
                            return
                        }
                    }
                }
                if (obj[key] == "") {
                    delete obj[key]
                    delete obj.__proto__[key]
                }
            }
            let table = $(".select_active").attr('id')
            let url = `/table/insert?code=insert&sentence=insert into ${table} set ?`
            document.querySelector('.table').removeEventListener('change', function(ev) {
                obj[ev.target.closest("td").className] = ev.target.value
            })
            console.log(obj)
            ajax(url, type = "post", obj, true, true).then((res) => {
                console.log(obj)
                if (res.code === 1)
                    alert("添加成功")
                    // location.reload()
            })
        }
    })
}

// 检查输入格式
function format(obj) {
    for (const key in obj) {
        obj[key] = obj[key].replace(/(^\s*)|(\s*$)/g, "").replace(/<|>|%|\\|"|=|'|{|}|!|\?|\(|\)|\*/, "-")
        if (key.indexOf("id") != -1) {
            if (obj[key] == "") {
                alert("id不能空")
                return
            }

            if (Boolean(Number(obj[key]))) {
                for (let i = 0; i < dic.length; i++) {
                    if (dic[i][key] == Number(obj[key])) {
                        alert("id重复请重新输入")
                        return
                    }
                    obj[key] = Number(obj[key])
                }
            } else {
                alert("id必须为数字int")
                return
            }
        }
    }

}


$(".table").click(function(event) {
    if (event.target.nodeName == "I") {
        let id = $(event.target.closest("tr").children[0]).find('span').html()
        let rootid = $(event.target.closest("tr").children[0]).attr('class')
        let item = event.target.closest("td").className
        let tips = $(event.target).prev().html()
        let par = $(event.target.closest("td"))
        if (document.querySelector('.change_input')) {
            alert("请修改")
            return
        } else {
            par.children().remove()
            let inpu = `
            <div class="change_bar">
                <input class="change_input" type="text"  placeholder="${tips}">
                <input class="change_btn" type="button" value="确认">
            </div>
           `
            par.html(inpu)
        }

        let change_input = document.querySelector('.change_input')
        let change_btn = document.querySelector('.change_btn')
        change_input.oninput = function(ev) {
            change_btn.title = change_input.value
        }

        change_btn.addEventListener('click', function() {
            let text = change_input.value.replace(/(^\s*)|(\s*$)/g, "").replace(/<|>|%|\\|"|=|'|{|}|!|\?|\(|\)|\*/, "-")
                //数字待处理
            let table = $(".select_active").attr('id')
            let sql = `update ${table} set ${item}='${text}' where ${rootid}='${id}'`
            ajax("/table/update?code=update&sentence=" + sql).then((res) => {
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
})

// 滚动进化
window.addEventListener("mousewheel", function(event) {
    /**
     * 0
     * 1002
     */
    let clientHeight = document.body.clientHeight
    setTimeout(() => {
        if (event.wheelDeltaY < 0 && scrollY > 0 && scrollY < clientHeight / 4)
            scrollTo(0, clientHeight / 2)
        if (event.wheelDeltaY > 0 && scrollY > clientHeight / 4)
            scrollTo(0, 0)

    }, 100);


})


//监听窗口大小
window.onresize = function() {
    if (document.querySelector(".insert")) {
        if (innerWidth > 800)
            $(".insert").attr("colspan", arr.length)
        if (innerWidth < 800) {
            if ($(".select_active").html() === "学生")
                $(".insert").attr("colspan", 4)
            if ($(".select_active").html() === "教师")
                $(".insert").attr("colspan", 3)
            if ($(".select_active").html() === "课程")
                $(".insert").attr("colspan", 3)
        }
    }
}

//监听hash
window.onhashchange = function() {
    if (document.querySelector(".insert")) {
        if (innerWidth > 800)
            $(".insert").attr("colspan", arr.length)
        if (innerWidth < 800) {
            if ($(".select_active").html() === "学生")
                $(".insert").attr("colspan", 4)
            if ($(".select_active").html() === "教师")
                $(".insert").attr("colspan", 3)
            if ($(".select_active").html() === "课程")
                $(".insert").attr("colspan", 3)
        }
    }
}

window.onload = function() {
    getTable("")
}