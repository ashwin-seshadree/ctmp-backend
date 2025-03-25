module.exports = {
  "user-created": (data) => {
    const { first_name, last_name, user_name, email, password } = data;
    let html = `<div>
      <p>Welcome to the platform</p>
      <br>
      <p>Dear ${first_name} ${last_name},</p>
      <p>We are delighted to let you know that your registration with our platform is successful.</p>
      <br>
      <div style="background-color:rgb(188, 242, 255); padding: 10px;">
      <h5>Login Credentials</h5>
      <p>User Name: ${user_name}</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      </div>
      <br>
      <p>Note: Please reset your password as soon as you login for more security.</p>
      </div>`;
    return getLayout(html);
  },
};

function getLayout(content) {
  return `<div style="background-color:rgb(69, 198, 207); padding: 50px;">${content}<br><p>Regards,</p><p><b>Team CTMP</b></p><div style="text-align: center;">&copy; CTM Platform - 2025</div></div>`;
  // return `<html><head></head><body><div style="background-color:rgb(69, 198, 207); padding: 50px;">${content}<br><p>Regards,</p><p><b>Team CTMP</b></p><div style="text-align: center;">&copy; CTM Platform - 2025</div></div></body></html>`;
}
