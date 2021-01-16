import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Family from '../models/familyModel.js'
import { generateToken, isAuth , isAdmin, isSellerOrAdmin } from '../utils.js';
import bcrypt from 'bcrypt'


const familyRouter = express.Router();

familyRouter.put( '/addimages/:id' , expressAsyncHandler(async (req, res) => {
  
  console.log('addig images');
  // console.log(req.body.docs[0].url);
  const user = await Family.findById(req.params.id);
  // console.log(user);
  // console.log(docs);
  if(user){

    if(req.body.docs[0]){
      user.image1 = req.body.docs[0].url
      console.log(user.image1);
    }
    if(req.body.docs[1]){
      user.image2 = req.body.docs[1].url
      console.log(user.image2);

    }
    if(req.body.docs[2]){
      user.image3 = req.body.docs[2].url
      console.log(user.image3);

    }
    if(req.body.docs[3]){
      user.image4 = req.body.docs[3].url
      console.log(user.image4);

    }
    if(req.body.docs[4]){
      user.image5 = req.body.docs[4].url
    }
    if(req.body.docs[5]){
      user.image6 = req.body.docs[5].url
    }

    try {
      await user.save()
      console.log('everything gone well');
    } catch (error) {
      console.log(error);
    }

  }
  

  
})
);



familyRouter.post( '/listofusersMatched/:id', expressAsyncHandler(async (req, res) => {
  
  console.log('listssss of ----------');



  const user = await Family.findById(req.params.id);


  const users = await Family.find({  '_id': { $in: user.Matched} });

  console.log(users);

  if (users){
    res.send(users)
  }
  else{
    res.status(401).send({ message: 'no users found' });
  }

})
);






familyRouter.put( '/notificationremover/:id' , expressAsyncHandler(async (req, res) => {
  
  console.log('removinggg');
  const user = await Family.findById(req.params.id);
  if(user){
    user.newMatches = 0
    const x = await user.save()
    res.send({x})
  }
  

  
})
);









familyRouter.put( '/liked' , expressAsyncHandler(async (req, res) => {
        console.log(req.body);
        const liker = await Family.findById(req.body.liker);
        const family = await Family.findById(req.body.family);
        

        
        if (family && (family.othersLiked.indexOf(req.body.liker) === -1 )  ){

                family.othersLiked.push(req.body.liker)
        }



        if (liker && (liker.oursLiked.indexOf(req.body.family) === -1 ) ){
                liker.oursLiked.push(req.body.family)
        }



        if((family.oursLiked.indexOf(req.body.liker) !== -1)  && (family.Matched.indexOf(req.body.liker) === -1 )  ){
                family.Matched.push(req.body.liker)
                family.newMatches = family.newMatches + 1
        }


        if((liker.othersLiked.indexOf(req.body.family) !== -1) && (liker.Matched.indexOf(req.body.family) === -1 )){
                liker.Matched.push(req.body.family)
                liker.newMatches = liker.newMatches + 1
        }



        await liker.save()
        await family.save()

        console.log(family.othersLiked);
        console.log(liker.oursLiked);

        res.send({ message: 'Liked'})




      })
);
    


familyRouter.post( '/signin', expressAsyncHandler(async (req, res) => {
          
        

          const user = await Family.findOne({ email: req.body.email });
          if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              res.send({
                _id: user._id,
                email: user.email,
                token: generateToken(user),
              });
              return;
            }
          }
          res.status(401).send({ message: 'Invalid email or password' });
        })
);


familyRouter.get( '/' , expressAsyncHandler(async (req, res) => {
        console.log("getting users ");
        const users = await Family.find({});
        res.send(users);
      })
);
    
familyRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
        console.log("getting 1 user");
        const user = await Family.findById(req.params.id);
        res.send(user);
      })
);
    


familyRouter.post('/register' , expressAsyncHandler( async (req , res) => {
        console.log('regiter');
        // console.log(req.body);
        const newUser = new Family(req.body);
      
        const alreadyEmail = await Family.findOne({ email: req.body.email });
        
        if( alreadyEmail ) {
          res.status(401).send({ message: 'email already used' });
        }
      
        if( !newUser.password ) {
          res.send("enter password")
        }
      
        
        newUser.password = bcrypt.hashSync( newUser.password , 8 )
      
        const createdUser = await newUser.save();
        console.log(createdUser);
        res.send({
          _id: createdUser._id,
          email: createdUser.email,
          token: generateToken(createdUser),
        });

}))


export default familyRouter;
