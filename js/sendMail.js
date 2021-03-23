function sendMail(params){
    let tempParams = {
        to_name: document.getElementById("name").value,
        to_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    emailjs.send('service_o66kxx7','template_05mom3j',tempParams)
    .then(function(res){
        console.log("success",res.status);
    })
}