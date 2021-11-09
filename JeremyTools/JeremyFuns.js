//범위 제한한 난수 생성
const GetRandom = (min,max) => {
    return Math.floor(Math.random() * (max-min +1))+min;
}
//ymdt 값에 대한 표출 형태의 변경
const TransDatetime = (inDate,type) => {
    let year = inDate.getFullYear() +'';
    let month =  inDate.getMonth()+1 +'';
    let date = inDate.getDate() +'';
    let hour = inDate.getHours() +'';
    let min = inDate.getMinutes() +'';
    let sec = inDate.getSeconds() +'';

    if(month<10){
        month = '0'+month;
    }
    if(date<10){
        date = '0'+date;
    }
    if(hour<10){
        hour = '0'+hour;
    }
    if(min<10){
        min = '0'+min;
    }
    if(sec<10){
        sec = '0'+sec;
    }

    let time = `${hour}:${min}:${sec}`;
    const typeMaker = type.split('');
    let result='';
    typeMaker.forEach((t)=>{
        switch (t) {
            case 'y':
                result += year;
                break;
            case 'm':
                result += month;
                break;
            case 'd':
                result += date;
                break;
            case 't':
                result += time;
                break;
            default:
                result += t;
                break;
        }
    })
    return result;
}
//숫자 3번째 자리에 콤마(,) 추가 
const AddNumberComma = (num) => {
    let regexp = /\B(?=(\d{3})+(?!\d))/g; 
    return num.toString().replace(regexp, ",");
}
//숫자 3번째 자리에 콤마(,) 삭제 
const DelNumberComma = (num) => {
    return ("" + num).replace(/,/g, "");
}
//받은 숫자를 전화번호 형태로 변경
const TransPhoneNumStyle = (num) => {
    var regexp = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/; 
    return num.replace(regexp, "$1-$2-$3");
}
const GetPresentURL = () => {
    return window.location.href;
}
const GetPresentLanguage = () => {
    return window.navigator.language;
}
const GetPresentWidth = () => {
    return window.screen.width;
}
const GetPresentHeight = () => {
    return window.screen.height;
}
const GetPresentIP = async () => {
    return new Promise((resolve,reject)=>{
        fetch('https://ipinfo.io/json')
        .then(result=>{
            resolve(result.json());
        })
    })
}