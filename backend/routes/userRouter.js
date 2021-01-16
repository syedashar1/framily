import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../userdata.js';
import User from '../models/userModel.js';
import { generateToken, isAuth , isAdmin, isSellerOrAdmin } from '../utils.js';
import bcrypt from 'bcrypt'

const userRouter = express.Router();

// userRouter.get(
//   '/seed',
//   expressAsyncHandler(async (req, res) => {
//     // await User.remove({});
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
//   })
// );





userRouter.get( '/profile', isAuth, expressAsyncHandler(async (req, res) => {

  // console.log(req.user);
  const user = await User.findOne({ _id: req.user._id });
  res.send(user)

})
);


userRouter.post( '/profileAdmin', isAuth , expressAsyncHandler(async (req, res) => {

  console.log(req.body);
  const user = await User.findOne({ _id: req.body._id });
  res.send(user)

})
);


userRouter.post('/register' , expressAsyncHandler( async (req , res) => {
  console.log(req.body);
  const newUser = new User(req.body);

  const alreadyEmail = await User.findOne({ email: req.body.email });
  
  if( alreadyEmail ) {
    res.status(401).send({ message: 'email already used' });
  }

  if( !newUser.password ) {
    res.send("enter password")
  }

  
  newUser.password = bcrypt.hashSync( newUser.password , 8 )

  const createdUser = await newUser.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    isSeller: newUser.isSeller,
    token: generateToken(createdUser),
  });
}))












userRouter.post(
        '/signin',
        expressAsyncHandler(async (req, res) => {
          const user = await User.findOne({ email: req.body.email });
          if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user),
              });
              return;
            }
          }
          res.status(401).send({ message: 'Invalid email or password' });
        })
      );




userRouter.put( '/profile', isAuth, expressAsyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    console.log('this');
    console.log(req.body);
    if (user) {

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (user.isSeller) {
        console.log('he is seller');
        user.seller.name = req.body.seller.name || user.seller.name;
        user.seller.logo = req.body.seller.logo || user.seller.logo;
        user.seller.description = req.body.seller.description || user.seller.description;
      }

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();

      console.log(updatedUser);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: updatedUser.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);



userRouter.get( '/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);



userRouter.delete( '/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);



userRouter.put( '/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    // console.log(req.body);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller ;
      user.isAdmin = req.body.isAdmin ;
      
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);








export default userRouter;