//webhook
function sendMessage(params) {
  const request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1277242406047322122/QgJnmWYTa8Wvp6s_Y5q1Wwd2xFVY5fMKGqqzk5tyjKBXKYwt8SsywIFfWjTU8w0Ac-ds");
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(params));
}




//fetch api
var ip;
async function getData() {
  const url = "https://api.ipify.org?format=json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    ip = await json.ip
  } catch (error) {
    console.error(error.message);
  }
}
getData()





const countDown = () => {
 
  var x = setInterval(function() {
   let date = new Date();
   let year = date.getFullYear();
    var times = new Date(`Dec 17, ${year}   00:00:00`).getTime()
    var now = new Date().getTime();
  

    var distance = times - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("date").innerHTML = seconds%10<=5?`|17/12/${year}`:"| SupperSun";
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    if (distance < 0) {

      clearInterval(x);

      document.getElementById("days").innerHTML = 00;
    document.getElementById("hours").innerHTML = 00;
    document.getElementById("minutes").innerHTML = 00;
    document.getElementById("seconds").innerHTML = 00; 
      
    }
  }, 1000);
}
countDown() 

setTimeout(() => {
  sendMessage({
  content: `**User: ${ip} Opened The Web!**!`,
  })
},1000)