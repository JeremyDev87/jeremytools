//범위 제한한 난수 생성
const MakeRandom = (min,max) => {
    return Math.floor(Math.random() * (max-min +1))+min;
}
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