# Server
<h2>Testing Routes</h2>
    <p>Below is are steps you can use to check if routes work </p>
    <ol>
        <li>download the vscode extension <b>rest Client</b></li>
        <li>click <b>send request</b> right below the commented lines to make that request</li>
    </ol>
<h2>Configuring nodemailer</h2>
<p>Based on my configuration for the nodemailer, follow the steps to set an app password which is used as the password in the mail configurations</p>
<p>Note that the email and password details are in a  <b>.env</b> file for security purposes</p>
<div>
    <ol>
    <li>Go to your Google account at <a href="https://myaccount.google.com/">https://myaccount.google.com/🛡</a></li>
    <li>Go to <b>Security</b></li>
    <li>Choose <b>2-Step Verification</b> - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification</li>
    <li>Visit <a href="https://myaccount.google.com/apppasswords">https://myaccount.google.com/apppasswordse</a> to create your app.</li>
    <li>Put a name e.g. nodemailer to your app and create it</li>
    <li>A modal dialog will appear with the password. Get that password and use it in your code.</li>
    </ol>
</div>