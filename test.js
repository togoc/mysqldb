var x = 1

function s() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(11)
        }, 1000);
    })
}

function say(x) {
    console.log("Hello" + x)
}

;
console.log(x);
(async function () {
    console.log(await s())
    console.log(112)
})();
console.log(11)