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
                "firstName": String(j),
                "lastName": String(i),
                "teamId":teamId,
                "teamName":"Oli"+String(i),
                "seatNumber": "NULL",
                "tableNumber":"NULL",
                "ticketNumber":generateUUID(),
        
            }
            jsonData.push(guest);
        }
        i += 1;

    }
    scope.signals.dataUpdated.dispatch(JSON.stringify(jsonData));
    }


function SeatConfigAPI(  ) { 



}
SeatConfigAPI.prototype = { 
    getConfig: function( eventId ){
        var http = new HttpRequest();
        http.init();
        http.eventsId = 5;
        http.token ="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTE1ZGE0OTQ3YTYwNGQyODg1NWIyZGIyMGQ2ZmE5MzQyOTc3MzQ1MjgyNjgyMTdiMzQxMTQ2NjY2YTY1NTQyYWQ5MDA0NzZlYTI5MDY1YTIiLCJpYXQiOjE2NDM0MjMxNzMuNTgzNjg2LCJuYmYiOjE2NDM0MjMxNzMuNTgzNjg5LCJleHAiOjE2NzQ5NTkxNzMuNTcyMzk0LCJzdWIiOiIyIiwic2NvcGVzIjpbInBsYWNlLWNoYXJpdHkiXX0.CgfB6fFzbFht3WIID72ge4A2vVd8gUhhXrOsy6O7OgleTksJ-PhqX5hsJFfM1y-sxoQ7-G2fbyeAH0GPhmXDPuu7YivlVEGgRXjhs3_ohqbHiOe1pWc_czcS9meaW5dZUziTmdOve_UeFd1LyE5WbMb3l2A91u_Pcgz3SUh-Liy-Q5TnSFFBMW9romAXAnyq06DB2h9Ght8TrMe1xuk6Us6QxaNaTDf0aSsuoiTr8PssWOUQ6mPRqW4gvS0e1u2IVec7U9Qk4y8fEnT5Sym2GiJn3S8EPikA2YSqW7pqmLTruOoL6GalaXki2o4s3cWEKwe0-tYVukvOjyMNrbEDBkjaSTj2S0D1hA7gyJQTO8Wwoj42xAHWb535O_1EK_Tcz0Q3NrXe4He7Ly_YBehsvcv1x7yCF2KEpAaltIeirRymPsB1Tcj1yY13dvuioW8qXuk3mqEANZwQB7ou1lhkQVXcWef_wKQLSrTL9Ji1vCHO_ySPqxcKbocwWDhMG1dl2N-SB9OTedZXb32P4yTDFrvPa9EZNWMCN6RnPFKCrGBhMT6qGuFH46RULQ2KMAOESjb2bxxDEYjLFcYJJ8v2iXyuj9Dv9tyJWBPt2iLDUf3ZnOIsYQziwmkkd7jWJAXpZA9MdQN77_L0cIF9FcNTnRzSvd0UskxPOjyI-07QJKk";

              
        http.get(`https://dev-api.olicharity.org/charity/v1/events/${http.eventsId}/seat-config`)
        // http.get(`/api/v1/events/${http.eventsId}/seat-config`)
            .then((res) => {
            // 座位分配配置数据
            console.log(res);
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
        http.token ="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTE1ZGE0OTQ3YTYwNGQyODg1NWIyZGIyMGQ2ZmE5MzQyOTc3MzQ1MjgyNjgyMTdiMzQxMTQ2NjY2YTY1NTQyYWQ5MDA0NzZlYTI5MDY1YTIiLCJpYXQiOjE2NDM0MjMxNzMuNTgzNjg2LCJuYmYiOjE2NDM0MjMxNzMuNTgzNjg5LCJleHAiOjE2NzQ5NTkxNzMuNTcyMzk0LCJzdWIiOiIyIiwic2NvcGVzIjpbInBsYWNlLWNoYXJpdHkiXX0.CgfB6fFzbFht3WIID72ge4A2vVd8gUhhXrOsy6O7OgleTksJ-PhqX5hsJFfM1y-sxoQ7-G2fbyeAH0GPhmXDPuu7YivlVEGgRXjhs3_ohqbHiOe1pWc_czcS9meaW5dZUziTmdOve_UeFd1LyE5WbMb3l2A91u_Pcgz3SUh-Liy-Q5TnSFFBMW9romAXAnyq06DB2h9Ght8TrMe1xuk6Us6QxaNaTDf0aSsuoiTr8PssWOUQ6mPRqW4gvS0e1u2IVec7U9Qk4y8fEnT5Sym2GiJn3S8EPikA2YSqW7pqmLTruOoL6GalaXki2o4s3cWEKwe0-tYVukvOjyMNrbEDBkjaSTj2S0D1hA7gyJQTO8Wwoj42xAHWb535O_1EK_Tcz0Q3NrXe4He7Ly_YBehsvcv1x7yCF2KEpAaltIeirRymPsB1Tcj1yY13dvuioW8qXuk3mqEANZwQB7ou1lhkQVXcWef_wKQLSrTL9Ji1vCHO_ySPqxcKbocwWDhMG1dl2N-SB9OTedZXb32P4yTDFrvPa9EZNWMCN6RnPFKCrGBhMT6qGuFH46RULQ2KMAOESjb2bxxDEYjLFcYJJ8v2iXyuj9Dv9tyJWBPt2iLDUf3ZnOIsYQziwmkkd7jWJAXpZA9MdQN77_L0cIF9FcNTnRzSvd0UskxPOjyI-07QJKk";

        http.post(`https://dev-api.olicharity.org/charity/v1/events/${http.eventsId}/seat-allocation`, {
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