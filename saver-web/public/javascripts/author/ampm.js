const getParameterByName = (name) => {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const date = document.getElementById('date');
const selectDate = getParameterByName('date');
const ampm = document.getElementById('ampm');
const selectAMPM = getParameterByName('ampm');

if (selectDate) {
    date.value = selectDate;
} else{
    date.valueAsDate = new Date();
}

if (selectAMPM) {
    ampm.value = selectAMPM;
}
