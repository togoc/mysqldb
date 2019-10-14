// $.ajax({ url: "/test#" }).then((res) => {
//     console.log(res)
//  })

// let login_tip_button = document.querySelector('.login_tip_button input')
// login_tip_button.addEventListener('click',function(){
//     console.log('login_tip_button')
// })


document.querySelectorAll('a')[1].onclick = () => {
    console.log(scrollY)
}


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
