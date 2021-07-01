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
            if (res.data[i].state == 3) {//회원가입의 단계를 뜻함 0 1 2 3
                txt += `<td>
                <div>
                <progress class="declined" value=${res.data[i].state} max="2"></progress>
              </div>
              가입 거절
              </td>`
            } else if (res.data[i].state == 0) {
                txt += `<td>
                    <div>
                        <progress value=${res.data[i].state}  max="2"></progress>
                    </div>
                    가입 대기
                </td>`
            }
            else if (res.data[i].state == 1) {
                txt += `<td>
                    <div>
                        <progress value=${res.data[i].state}  max="2"></progress>
                    </div>
                    가입 승인
                </td>`
            }
            else if (res.data[i].state == 2) {
                txt += `<td>
                    <div>
                        <progress value=${res.data[i].state}  max="2"></progress>
                    </div>
                    가입 완료
                </td>`
            }
            if (res.data[i].state == 0) { //결정이 되지 않은 사람들만 포지션, 카테고리 수락 거절 버튼을 그려줌
                const position = Object.entries(position_options).map(([key, value]) => {
                    return `<option value="${value}" ${value === 1 ? 'selected' : ''}>${key}</option>`
                }).join('')
                const category = Object.entries(category_options).map(([key, value]) => {
                    return `<option value="${value}" ${value === 1 ? 'selected' : ''} ${value === 0 ? 'disabled' : ''}>${key}</option>`
                }).join('')
                txt += `<td>
            <select name="select_position" id="select_position">
              ${position}
            </select>
          </td>
            <td>
              <select name="select_category" id="select_category" required >
              ${category}
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
            if (e.target.value === `${position_options['편집장']}` || e.target.value === `${position_options['관리자']}`) {
        category.value = category_options['전체'].toString();
        category.disabled = true;
            } else {
        document.querySelector('#category option:first-child').disabled = true;
        category.value = category_options['경제'].toString();
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



