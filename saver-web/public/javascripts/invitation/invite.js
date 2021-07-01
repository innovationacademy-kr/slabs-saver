document.querySelector('#position').addEventListener('change', (e) => {
    const { target: { value } } = e;
    // const value = e.target.value;
    const category = document.querySelector('#category');
    if (e.target.value === position_options['편집장'].toString() || e.target.value === position_options['관리자'].toString()) {
        category.value = category_options['전체'].toString();
        category.disabled = true;
    } else {
        document.querySelector('#category option:first-child').disabled = true;
        category.value = category_options['경제'].toString();
        category.disabled = false;
    }
})

document.getElementById("invite").onclick = function invite() {
    let email = document.getElementById("email");
    let name = document.getElementById('name')
    let position = document.getElementById("position");
    let category = document.getElementById("category");
    position = position.selectedIndex;
    category = category.selectedIndex;
    axios({
        method: "POST",
        url: '/author/_admin/invitation',
        data: {
            "email": email.value,
            "name": name.value,
            "position": position.selectedIndex,
            "category": category.selectedIndex
        }
    }).then((res) => {
        alert('메일을 전송했습니다');
        console.log(res);
        location.href="/author/_admin/invitation";
    }).catch(error => {
        alert(error.response.data.message);
    });
}
