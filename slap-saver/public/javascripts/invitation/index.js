let selects;
let categories;
let approved_list;
let declined_list;
let list;
let not_decided_people = [];
list = document.querySelector(".standby-user-body");

function inviteList() {
    axios({
        method: "POST",
        url: '/author/_admin/inviteList',
    }).then((res) => {
        for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].state == 0) //결정이 되지않은 사람들의 이메일을 배열에 기록함
                not_decided_people.push(res.data[i].email);
            let txt = `<tr id="next" scope="row">
        <td> ${res.data[i].id} </td>
        <td> ${res.data[i].email} </td>
        <td> ${res.data[i].name}</td>
         `
            if (res.data[i].state > 2) {//회원가입의 단계를 뜻함 1 2 3 4
                txt += `<td>
                <div>
                <progress class="declined" value=${res.data[i].state} max="2"></progress>
              </div>
              </td>
        `
            } else {
                txt += `<td>
                    <div>
                        <progress value=${res.data[i].state}   max="2"></progress>
                    </div>
                </td>`
            }
            if (res.data[i].state == 0) { //결정이 되지 않은 사람들만 포지션, 카테고리 수락 거절 버튼을 그려줌
                txt += `<td>
            <select name="select_position" id="select_position">
              <option value="1" selected>편집장</option>
              <option value="2">데스크</option>
              <option value="3">일반기자</option>
            </select>
          </td>
            <td>
              <select name="select_category" id="select_category" required disabled>
                <option value="1" selected>전체</option>
                <option value="2">정책</option>
                <option value="3">경제</option>
                <option value="4">사회</option>
                <option value="5">국제</option>
                <option value="6">문화</option>
              </select>
            </td>
          <td>
            <button class="btn btn-success" id="approved" name="approved">승인</button>
          </td>
          <td>
            <button class="btn btn-danger" id="declined" name="declined">거절</button>
          </td> `
            }
            txt += '</tr>';
            list.innerHTML += txt;
        }
        //돔 객체에서 지정한 id들을 가져와 배열로 만듬
        selects = Array.from(document.querySelectorAll('#select_position')); 
        categories = Array.from(document.querySelectorAll('#select_category'));
        categories_first_childs = Array.from(document.querySelectorAll('#select_category option:first-child'));
        approved_list = Array.from(document.querySelectorAll('#approved'));
        declined_list = Array.from(document.querySelectorAll('#declined'));
        EventListener();
    }).catch(error => {
        alert(error.res.data.message);
    });
}
inviteList();

function EventListener() {
    selects.map((el, index) => { //직급이 편집장이 아닐때 카테고리 전체 버튼 잠금 함수
        el.addEventListener('change', (e) => {
            const { target: { value } } = e;
            const category = categories[index];
            const first_child = categories_first_childs[index];
            if (e.target.value === '1') {
                category.value = '1';
                category.disabled = true;
            } else {
                first_child.disabled = true;
                category.value = '2';
                category.disabled = false;
            }
        })
    })
    approved_list.map((el, index) => {  //수락버튼 이벤트 
        el.addEventListener('click', (e) => {
            axios({
                method: "POST",
                url: '/author/_admin/decision',
                data: {
                    "approved": 1,
                    "select_position": selects[index].value,
                    "select_category": categories[index].value,
                    "email": not_decided_people[index],
                }
            }).then((res) => {
                location.reload();
            }).catch(error => {
                console.error(error)
                alert(error.response.data.message);
            });
        })
    })
    declined_list.map((el, index) => { //거절버튼 이벤트
        el.addEventListener('click', (e) => {
            axios({
                method: "POST",
                url: '/author/_admin/decision',
                data: {
                    "declined": 1,
                    "email": not_decided_people[index],
                }
            }).then((res) => {
                location.reload();
                console.log(res);
            }).catch(error => {
                alert(error.response.data.message);
            });
        })
    })
}



