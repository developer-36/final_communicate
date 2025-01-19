import jwt from "jsonwebtoken"

const createTokenAndSaveCookie =(userId, res)=>  {
  const token = jwt.sign({userId}, process.env.JWT_TOKEN, {
    expiresIn:"5d",
  });

  console.log("tokenbearer", token);

  res.cookie("jwt_token", token, {
    httpOnly: false,// xss
    secure: true,
    sameSite: "strict", //csrf
  })
}

export default createTokenAndSaveCookie