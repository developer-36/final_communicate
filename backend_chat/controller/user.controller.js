import User from "../model/user.model.js";
import bcrypt from 'bcrypt'
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async(req, res) => {
try {
    
    const {name, email, password, confirmPassword} = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({message: "Passwords do not match"});
    }

    const user = await User.findOne({email});

    if (user) {
        return res.status(400).json({message: "Email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
        name, email, password : hashedPassword,
    });

  await newUser.save(); 
  if (newUser) {
    const newToken = createTokenAndSaveCookie(newUser._id, res);
    console.log("newToken ===========> ", newToken);
      res.status(201).json({message:"User registered successfully", newUser})
  }

} catch (error) {
    console.log(error);
    res.status(500).json({message: "server error"});
}
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Invalid User or Password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({ message: "Invalid User or Password" });
        }

        createTokenAndSaveCookie(user._id, res);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const logout = async(req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({message: "User logged out successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"});
    }
}


export const getUserProfile = async(req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const loggedInUser = req.user._id;
        const filteredUser = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        res.status(201).json({filteredUser});
    } catch (error) {
        console.log("Error in allUsers Controller: " + error);
        res.status(500).json({message: "Server error"})
    }
}