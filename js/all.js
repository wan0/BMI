//Variable
var btn = document.querySelector('.btn.original');
var height = document.querySelector('#height');
var weight = document.querySelector('#weight');
var data = JSON.parse(localStorage.getItem('BMIData')) || [];
var content = document.querySelector('.content');
//監聽
btn.addEventListener('click', addData);
updateData(data);
//Function
function updateData(items){
    str = '';
    for(var i=0; i<items.length; i++) {
        str += '<ol data-index="' + i + '" class="' + items[i].Level_id + '">' + 
                    '<li class="Level">' + items[i].Level + '</li>' + 
                    '<li class="Small">BMI</li>' + 
                    '<li class="Big BMI">' + items[i].BMI + '</li>' + 
                    '<li class="Small">weight</li>' + 
                    '<li class="Big Weight">' + items[i].Weight + 'kg</li>' + 
                    '<li class="Small">height</li>' + 
                    '<li class="Big Height">' + items[i].Height + 'cm</li>' + 
                    '<li class="Small Date">' + items[i].Date + '</li>' + 
                '</ol>'
    }
    content.innerHTML = '<h2>BMI紀錄</h2>' + str;
    height.value = '';
    weight.value = '';
}

function addData(e){
    e.preventDefault();
    var H = parseFloat(height.value);
    var W = parseFloat(weight.value);
    var BMI;
    var Level;
    //日期
    var now = new Date();
    var M = now.getMonth() + 1;
    var D= now.getDate();
    if(M<10) {M = '0' + M;}
    if(D<10) {D = '0' + D;}
    var today = M + '-' + D + '-' + now.getFullYear();
    if(isNaN(H)) {
        alert('請填入正確身高數值');
    }
    else if(isNaN(W)) {
        alert('請填入正確體重數值');
    }
    else {
        BMI = W/(Math.pow(H,2)/10000);
        BMI = BMI.toFixed(2);
        /*
        體重過輕	BMI<18.5	
        健康體位	18.5<=BMI<24
        體位異常	過重：24<=BMI<27
                    輕度肥胖：27 <= BMI < 30
                    中度肥胖：30 <= BMI < 35
                    重度肥胖：BMI >= 35
        */
        if( BMI>0 && BMI<18.5 ) {
            Level_id = 'Underweight';
            Level = "過輕";
        }
        else if( BMI>=18.5 && BMI<24 ) {
            Level_id = 'Normal';
            Level = "理想";
        }
        else if( BMI>=24 && BMI<27) {
            Level_id = 'Obese1';
            Level = "過重";
        }
        else if( BMI>=27 && BMI<30) {
            Level_id = 'Obese2';
            Level = "輕度肥胖";
        }
        else if( BMI>=30 && BMI<35) {
            Level_id = 'Obese3';
            Level = "中度肥胖";
        }
        else if( BMI>=35) {
            Level_id = 'Obese4';
            Level = "重度肥胖";
        }
        //儲存data
        var thisData = {
            Level_id: Level_id,
            Level: Level,
            BMI: BMI,
            Weight: W,
            Height: H,
            Date: today
        };
        data.push(thisData);
        localStorage.setItem('BMIData', JSON.stringify(data));
        updateData(data);
        btn.innerHTML = '<h2>' + BMI + '</h2><h3>BMI</h3><div class="loop"></div>';
        var className = "btn resualt " + Level_id;
        btn.setAttribute('class', className);
    }
}