// $.ajax({ url: "/test#" }).then((res) => {
//     console.log(res)
//  })

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