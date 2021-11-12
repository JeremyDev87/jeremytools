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
//현재 URL을 리턴
const GetPresentURL = () => {
    return window.location.href;
}
//현재 브라우저의 언어를 리턴
const GetPresentLanguage = () => {
    return window.navigator.language;
}
//현재 브라우저의 가로사이즈를 리턴
const GetPresentWidth = () => {
    return window.screen.width;
}
//현재 브라우저의 세로사이즈를 리턴
const GetPresentHeight = () => {
    return window.screen.height;
}
//현재 브라우저의 IP를 리턴
//API호출, 비동기 처리
const GetPresentIP = () => {
    return new Promise((resolve,reject)=>{
        fetch('https://ipinfo.io/json')
        .then(result=>{
            resolve(result.json());
        })
    })
}
//Scroll위치를 이동시킨다.
const GoScrollXY = (x,y) => {
    window.scrollTo(x, y);
}
//Scroll위치를 맨 위로 이동시킨다.
const GoScrollTOP = () => {
    window.scrollTo(0, 0);
}
//특수 문자 존재를 확인한다
const CheckSpecialChar = (str) => {
    let specialChar = "`~!@#$%^&*_+=|\\[]{}:;,<.>/?'\"";
    for(let i=0, len=specialChar.length; i<len; i++) {
        if(str.indexOf(specialChar.substr(i,1)) != -1){
            return true;
        }
    }
    return  false;
}
//이메일 형식을 valid한다
const CheckEmailStyle = (str) => {
    if (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    }
    else {
        return false;
    }
}
//소수점 이하 0 찍어서 리턴한다
const TransRoundZero = (num,setLength) => {
    let strNum = ("" + num).replace(/,/g, "");
    let arrNum = strNum.split(".");
    if(arrNum.length<=1) {
        num = arrNum[0]+".";
        for(let i=0;i<setLength;i++){
            num += "0";
        }
    }else if(arrNum[1].length<setLength){
        for(let i=arrNum[1].length;i<setLength;i++){
            num += "0";
        }
    }else{
        num = (Math.round(num*(Math.pow(10,setLength))))/(Math.pow(10, setLength));
    }
    return num;
}
//소수점 자리수 이하 반올림한다.
const TransRound = (num,setLength) => {
    if(!setLength) setLength = 0;
    return (Math.round(num*(Math.pow(10,setLength))))/(Math.pow(10, setLength));
}
//진수 변환기
const TransAntiLog = (num,log) => {
    //11진법 이상 변환
    const CharMaker = (val) => {
        switch(val){
            case '10':
                val='a';
                break;
            case '11':
                val='b';
                break;
            case '12':
                val='c';
                break;
            case '13':
                val='d';
                break;
            case '14':
                val='e';
                break;
            case '15':
                val='f';
                break;
            default:
                break;
        }
        return val;
    }
    num = num+0;
    log = log+0;
    let returnVal = '';
    for(let i=0;(num/log)>=1;i++) {
        returnVal = CharMaker(String(num%log))+returnVal;
        num = parseInt(num/log);
    }
    return CharMaker(String(num)) + returnVal;
}
//배열 정렬 함수
const SortArray = (arr,order) => {
    //a가 크면 true 작으면 false
    const IsABig = (a,b) => {
        a = a+0;
        b = b+0;
        if(a-b>0&&order=='a'){
            return true;
        }else if(a-b<0&&order=='d'){
            return true;
        }else{
            return false;
        }
    }
    let loopArr = arr;
    let needLoop = true;
    for(let j=0;needLoop;j++){
        needLoop = false;
        for(let i=0;i<arr.length;i++){
            if(IsABig(loopArr[i],loopArr[i+1])){
                let temp = loopArr[i];
                loopArr[i]=loopArr[i+1];
                loopArr[i+1]=temp;
                needLoop = true;
            }
        }
    }
    return loopArr;
}