// script.js
document.getElementById('surveyForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const discordId = document.getElementById('discordId').value;
    const help = document.getElementById('help').value;

    // استخدام خدمة خارجية للحصول على عنوان IP
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp = ipData.ip;

        // التحقق مما إذا كان عنوان IP موجودًا في Local Storage
        const submittedIps = JSON.parse(localStorage.getItem('submittedIps')) || [];
        if (submittedIps.includes(userIp)) {
            document.getElementById('result').innerHTML = "Thank you! You have entered data before ";
            document.getElementById('surveyForm').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            return;
        }

        // إرسال البيانات إلى Discord Webhook
        const webhookUrl = 'https://discord.com/api/webhooks/1241528396308152362/WKRos5NyHtbpQcsd_gCPRR2Uj_0A-bj1Dd5We22EUWWYIyXTgcGu2bRGum3aCGwx0_3Q';
        const data = {
            content: `
            Your name : ${name}
            Your Phone : ${phone}
            Your Email : ${email}
            What your from : ${location}
            Discord ID : ${discordId}
            How will you help us? : ${help}
            `,
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // حفظ عنوان IP في Local Storage
            submittedIps.push(userIp);
            localStorage.setItem('submittedIps', JSON.stringify(submittedIps));

            // عرض رسالة الشكر وإخفاء النموذج
            document.getElementById('surveyForm').style.display = 'none';
            document.getElementById('result').innerHTML = "Thank you for entering the data. Regards, Rage Team ";
            document.getElementById('result').style.display = 'block';
        } else {
            document.getElementById('result').innerHTML = "Thank you for entering the data.";
            document.getElementById('result').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = "Thank you for entering the data.";
        document.getElementById('result').style.display = 'block';
    }
});
