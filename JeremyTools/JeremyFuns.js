//범위 제한한 난수 생성
const GetRandom = (min,max) => {
    return Math.floor(Math.random() * (max-min +1))+min;
}
const GetRandomStr = (length) => {
    let result ='';
    for(let i=0;i<length;i++){
        let randChar = Math.random().toString(36).substr(2,1);
        result +=randChar;
    }
    return result;
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
//SHA256 암호화 - 퍼왔음
//  Secure Hash Algorithm (SHA256)
// http://www.webtoolkit.info/
//
// Original code by Angel Marin, Paul Johnston.
function SHA256(s){
    
    var chrsz   = 8;
    var hexcase = 0;
    
    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    
    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
    
    function core_sha256 (m, l) {
            
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 
                    0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
    
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
    
        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
    
            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
    
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
    
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
    
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }
    
    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }
    
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
    
        for (var n = 0; n < string.length; n++) {
    
            var c = string.charCodeAt(n);
    
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
    
        }
    
        return utftext;
    }
    
    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
            hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }
    
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
//숫자만 있는지 판단해 bool return
const CheckOnlyNum = (value) => {
    let regexp = /^[0-9]*$/;
    return regexp.test(value);
}
//팝업 생성
const MakePopup = (URL,winName,width,height,remFeatures) => {
    let features = "";
    if (typeof winName == "undefined") winName = "";
    if (typeof width != "undefined") features += ((features) ? "," : "")+"width="+width;
    if (typeof height != "undefined") features += ((features) ? "," : "")+"height="+height;
    if (typeof remFeatures != "undefined") features += ((features) ? "," : "")+remFeatures;
    if (features.indexOf("status") < 0) features += ",status=yes";
    let popup = window.open(URL, winName, features);
    popup.focus();
    return popup;
}
//공백 여부 판단 함수
const CheckEmpty = (str) => {
    return str == str.replace(/ /g, "") ? true : false;
}
//문자열 양 끝 공백 제거 함수
const TransTrim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//문자열 중간 공백 제거 함수
const TransReplaceAll = (str,target,replace) => {
    let n1, n2, s1, s2;
    while (true) {
        if ( str=="" || target=="" ) break;
        n1 = str.indexOf(target);
        if ( n1 < 0 ) break;
        n2 = n1 + target.length;
        if ( n1==0 ) {
            s1 = replace;
        }else {
            s1 = str.substring(0, n1) + replace;
        }
        if ( n2 >= str.length ) {
            s2 = "";
        }else {
            s2 = str.substring(n2, str.length);
        }
        str = s1 + s2;
    }
    return str;
}
//UTF8 Endcoding 함수
const TransUTF8FromStr = (str) => {
    return encodeURIComponent(str); 
}
//UTF8 Decoding 함수
const TransStrFromUTF8 = (str) => {
    return decodeURIComponent(str); 
}
//문자열 ASCII코드 변환 함수
const TransASCIIFromStr = (str) => {
    let returnVal = "";
    let strArr = str.split("");
    strArr.forEach((a)=>{
        returnVal += a.charCodeAt(0);
    })
    return returnVal
}
//ASCII코드 문자 변환 함수
const TransCharFromASCII = (char) => {
    return String.fromCharCode(char);
}
//자릿수 0 추가 함수
const TransZeroAdd = (value,maxLen) => {
    value += '';
    let valLen = value.length;
    while(valLen<maxLen) {
        value = '0'+value;
        valLen = value.length;
    }
    return value;
}
//한글 확인 함수 
const CheckHangul = (value) => {
    let bit = '';
    value += '';

    for(let i=0;i<value.length;i++) {
        bit = value.charAt(i);
        if(escape(bit).length <= 4){
            return false;
        }
    }
    return true;
}
//입력값이 Null인지 확인
const CheckNull = (value) => {
    return value == null || value == "" ? true : false;
}
//숫자특수기호 차단
const CheckNameType = (value) => {
    let regexp = '0123456789~!#$%^&*()_-+=|{}[]<>,./?@';
    for (var i = 0; i < value.length; i++) {
        if (regexp.indexOf(value.charAt(i)) != -1) {
            return false;
        }
    }
    return true;
}

// 포함 문자 변환 함수
const TransStrFromRange = (str,target,range) => {
    var returnVal = "";
    for(let i = 0; i < str.length; i++) {
        let value = str.charAt(i);
        let index = target.indexOf(value);
        if(index >= 0){
            value = range.charAt(index);
        } 
        returnVal += value;
    }
    return returnVal;
}

// 소 --> 대문자 변환 함수
const TransUpper = (str) => {
    let str1 = "abcdefghijklmnopqrstuvwxyz";
    let str2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return TransStrFromRange(str,str1,str2);
}

// 대 --> 소문자 변환 함수
const TransLower = (str) => {
    let str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let str2 = "abcdefghijklmnopqrstuvwxyz";
    return TransStrFromRange(str,str1,str2);
}

const BlockRightBtn = () => {
    document.oncontextmenu  = () => {
        alert("BlockRightBtn에 의한 우클릭 차단")
        return false;
    }
}