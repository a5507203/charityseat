import { HttpRequest } from './HttpRequest.js';

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function generateEvent(eventId){
    var jsonData = [];
    var total_guests = 100+Math.floor(Math.random() * 300);
    var  i = 0;
    console.log(total_guests);

    
    while (total_guests !=0) {
    
        var num_in_team = Math.floor(Math.random() * 20);

        if (total_guests - num_in_team<0) {
            num_in_team = total_guests;

        }
        total_guests = total_guests - num_in_team;
        var teamId = generateUUID();
        for (let j = 0; j < num_in_team; j++) {
            var guest = {
                "avatar": "",
                "first_name": String(j),
                "last_name": String(i),
                "group_id":teamId,
                "group_name":"Oli"+String(i),
                "name": "NULL",
                "seat_num":"NULL",
                "id":getRandomInt(1000000),
        
            }
            jsonData.push(guest);
        }
        i += 1;

    }
    scope.signals.dataUpdated.dispatch(JSON.stringify(jsonData));
    }


function SeatConfigAPI( editor ) { 

    this.signals = editor.signals;

    this.signals.rendererCreated.add(function(){

        console.log("rendered");
    })


}
SeatConfigAPI.prototype = { 

    preprocess: function(){


    },

    getConfig: function( eventId ){
        var http = new HttpRequest();
        var scope = this;
        http.init();
        http.eventsId = 43;
        http.token ="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGNkNTAxYTM2N2JkZmUxMDg2NTFjZWNmMzJlMWZjOWQ1MTFmNTI5MmQ4NDY1ZjEyOGVhOGRlYjFiOGVlZGIwNmM5YzgwNjdkNTJjMmQzNWYiLCJpYXQiOjE2NDY5NzUwNjcuNzc4ODMxLCJuYmYiOjE2NDY5NzUwNjcuNzc4ODM0LCJleHAiOjE2Nzg1MTEwNjcuNzYwOTgxLCJzdWIiOiIxMiIsInNjb3BlcyI6WyJwbGFjZS1jaGFyaXR5Il19.VPmUco0o-5bCYRC5Xc2TEn3uQ7VPcvezxlm68W_JSD_F4U5uzw4NBbaA_slzwJMUnojm4UtojlEuGJ0FTq2pz5LGawFW1CbHsKRcZ0QVN2Fr2bcmHidUe_isSC0m1Dy5ByyqDqBR0C1ZonZHk4ZX1xyKXjHY9Rm6sI9P-1Ptz7fnrxjcZDRC-OonuOmCSAftyNxIXGmyrnHtZwwVL17E2f3db2mPO9KBQIswDLYztk_evaIz-5Z_gWjphzhkFIzPdeiEMR-bMVLzdhiMaM08x-OTGl4LGsRMZwMOTE1bOaF7maw7VdOEYXiMeMwd7yO8fuJsI77cSxK3P4oovu1W5UszGEmf023AKisRc7_Q-1xxDGHZVYnej81JbvnbwebicltAVwf68jpCfbJmAyDL0pJmWLKCkIf0k8s2mPnu8EDsBPNPBPBm782rHfFNOsI8ObT7DNB1OQVrZoBUGuR8B-95WH8XsQCmY6Wn5qSh9eMKKsKa29dCsUnniy3mtRwpm2tjhel6a4FiBXiX-cmmQPOjC8jAyJamSDhTrwRscK3aogmawye1IYTbqtZ1SboL1YGaVjTYhmcLUZ-hCah4-hChEoMsT19G-HhpInlxDM4w90GgBLhfHdZ4qS5ilJ2U0ePbTLyjRP933_lZYrmqrj-vBEPvWKZs5r76Qv1NLro";

              
        http.get(`https://api.olicharity.org/charity/v1/events/${http.eventsId}/seat-config`)
        // http.get(`/api/v1/events/${http.eventsId}/seat-config`)
            .then((res) => {
            // 座位分配配置数据
            console.log(res);
            scope.preprocessing();
            })
            .catch((err) => {
            // 错误信息反馈
            console.log(err);
            })

    },


    setConfig: function( jsonStr ){
        var http = new HttpRequest();
        http.init();
        http.eventsId = 5;
        http.token ="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGNkNTAxYTM2N2JkZmUxMDg2NTFjZWNmMzJlMWZjOWQ1MTFmNTI5MmQ4NDY1ZjEyOGVhOGRlYjFiOGVlZGIwNmM5YzgwNjdkNTJjMmQzNWYiLCJpYXQiOjE2NDY5NzUwNjcuNzc4ODMxLCJuYmYiOjE2NDY5NzUwNjcuNzc4ODM0LCJleHAiOjE2Nzg1MTEwNjcuNzYwOTgxLCJzdWIiOiIxMiIsInNjb3BlcyI6WyJwbGFjZS1jaGFyaXR5Il19.VPmUco0o-5bCYRC5Xc2TEn3uQ7VPcvezxlm68W_JSD_F4U5uzw4NBbaA_slzwJMUnojm4UtojlEuGJ0FTq2pz5LGawFW1CbHsKRcZ0QVN2Fr2bcmHidUe_isSC0m1Dy5ByyqDqBR0C1ZonZHk4ZX1xyKXjHY9Rm6sI9P-1Ptz7fnrxjcZDRC-OonuOmCSAftyNxIXGmyrnHtZwwVL17E2f3db2mPO9KBQIswDLYztk_evaIz-5Z_gWjphzhkFIzPdeiEMR-bMVLzdhiMaM08x-OTGl4LGsRMZwMOTE1bOaF7maw7VdOEYXiMeMwd7yO8fuJsI77cSxK3P4oovu1W5UszGEmf023AKisRc7_Q-1xxDGHZVYnej81JbvnbwebicltAVwf68jpCfbJmAyDL0pJmWLKCkIf0k8s2mPnu8EDsBPNPBPBm782rHfFNOsI8ObT7DNB1OQVrZoBUGuR8B-95WH8XsQCmY6Wn5qSh9eMKKsKa29dCsUnniy3mtRwpm2tjhel6a4FiBXiX-cmmQPOjC8jAyJamSDhTrwRscK3aogmawye1IYTbqtZ1SboL1YGaVjTYhmcLUZ-hCah4-hChEoMsT19G-HhpInlxDM4w90GgBLhfHdZ4qS5ilJ2U0ePbTLyjRP933_lZYrmqrj-vBEPvWKZs5r76Qv1NLro";

        http.post(`https://api.olicharity.org/charity/v1/events/${http.eventsId}/seat-allocation`, {
            // http.post(`http://yapi.valsn.com/mock/42/charity/v1/events/${http.eventsId}/seat-allocation`, {
            // http.post(`/api/v1/events/${http.eventsId}/seat-allocation`, {
              // 座位配置JSON字符串
              // config:
              // 数组: [{ id: 门票id, seat_num: 座位编号 }]
              // seats:
            })
              .then((res) => {
                // 这里调用则成功
              })
              .catch((err) => {
                // 错误信息反馈
                console.log(err)
              })
          
          
       
    },
}



export { SeatConfigAPI };