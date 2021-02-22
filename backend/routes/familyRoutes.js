import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Family from '../models/familyModel.js'
import { generateToken, isAuth , isAdmin, isSellerOrAdmin } from '../utils.js';
import bcrypt from 'bcrypt'


const familyRouter = express.Router();





familyRouter.put( '/accept', expressAsyncHandler(async (req, res) => {
  
  console.log(req.body);

  const liker = await Family.findById(req.body.liker);
  const family = await Family.findById(req.body.family);


  if(liker && family){


    liker.forChat.push(req.body.family)
    family.forChat.push(req.body.liker)

    liker.oursLiked = liker.oursLiked.filter(e=>e!== req.body.family )
    family.othersLiked = family.othersLiked.filter(e=>e!== req.body.liker )
    


    try {
      await liker.save()
      await family.save()
    } catch (error) {
      console.log(error.message);
    }


    res.send({ message: 'Accepted'})

  }


})
);



familyRouter.put( '/reject', expressAsyncHandler(async (req, res) => {
  

  const liker = await Family.findById(req.body.liker);
  const family = await Family.findById(req.body.family);


  if(liker && family){ 

    liker.oursLiked = liker.oursLiked.filter(e=>e!== req.body.family )
    family.othersLiked = family.othersLiked.filter(e=>e!== req.body.liker )


    try {
      await liker.save()
      await family.save()
    } catch (error) {
      console.log(error.message);
    }

    res.send({ message: 'Rejected'})

  }


})
);


// familyRouter.get( '/otherslike/:id', expressAsyncHandler(async (req, res) => {
//   const user = await Family.findById(req.params.id);
//   if(user){  res.send(user.othersLiked) }
// })
// );



familyRouter.get( '/forchat/:id', expressAsyncHandler(async (req, res) => {
  
  console.log('listssss of chat ');

  const user = await Family.findById(req.params.id);
  const users = await Family.find({  '_id': { $in: user.forChat} });
  console.log(users);
  if (users){
    res.send(users)
  }
  else{
    res.status(401).send({ message: 'no users found' });
  }

})
);




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



familyRouter.get( '/otherslike/:id', expressAsyncHandler(async (req, res) => {
  
  console.log('listssss of ----------');

  const user = await Family.findById(req.params.id);
  const users = await Family.find({  '_id': { $in: user.othersLiked} });
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
    user.newLikes = 0
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
                family.newLikes = family.newLikes + 1 
        }



        if (liker && (liker.oursLiked.indexOf(req.body.family) === -1 ) ){
                liker.oursLiked.push(req.body.family)
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
        // console.log("getting users ");
        // const users = await Family.find({});
        // res.send(users);


        const interestsdescription = req.query.interestsdescription || '';
        const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
        const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
        const ethinicity = req.query.ethinicity || '';

        const interestsdescriptionFilterP1 = interestsdescription ? { 'parent1.interests' : { $regex: interestsdescription=== "all" ? '' : interestsdescription , $options: 'i' }} : {};
        const ethnicityFilterP1 = ethinicity ? { 'parent1.ethnicity' : { $regex: ethinicity=== "all" ? '' : ethinicity , $options: 'i' } } : {};
        const ageFilterP1 = min && max ? { 'parent1.age': { $gte: min, $lte: max } } : {};


        const interestsdescriptionFilterP2 = interestsdescription ? { 'parent2.interests' : { $regex: interestsdescription=== "all" ? '' : interestsdescription , $options: 'i' }} : {};
        const ethnicityFilterP2 = ethinicity ? { 'parent2.ethnicity' : { $regex: ethinicity=== "all" ? '' : ethinicity , $options: 'i' } } : {};
        const ageFilterP2 = min && max ? { 'parent2.age': { $gte: min, $lte: max } } : {};


        const interestsdescriptionFilterC1 = interestsdescription ? { 'child1.interests' : { $regex: interestsdescription=== "all" ? '' : interestsdescription , $options: 'i' }} : {};
        const ethnicityFilterC1 = ethinicity ? { 'child1.ethnicity' : { $regex: ethinicity=== "all" ? '' : ethinicity , $options: 'i' } } : {};
        const ageFilterC1 = min && max ? { 'child1.age': { $gte: min, $lte: max } } : {};


        const interestsdescriptionFilterC2 = interestsdescription ? { 'child2.interests' : { $regex: interestsdescription=== "all" ? '' : interestsdescription , $options: 'i' }} : {};
        const ethnicityFilterC2 = ethinicity ? { 'child2.ethnicity' : { $regex: ethinicity=== "all" ? '' : ethinicity , $options: 'i' } } : {};
        const ageFilterC2 = min && max ? { 'child2.age': { $gte: min, $lte: max } } : {};


        const interestsdescriptionFilterC3 = interestsdescription ? { 'child3.interests' : { $regex: interestsdescription=== "all" ? '' : interestsdescription , $options: 'i' }} : {};
        const ethnicityFilterC3 = ethinicity ? { 'child3.ethnicity' : { $regex: ethinicity=== "all" ? '' : ethinicity , $options: 'i' } } : {};
        const ageFilterC3 = min && max ? { 'child3.age': { $gte: min, $lte: max } } : {};

        const interestsdescriptionFilterC4 = interestsdescription ? { 'child4.interests' : { $regex: interestsdescription=== "all" ? '' : interestsdescription , $options: 'i' }} : {};
        const ethnicityFilterC4 = ethinicity ? { 'child4.ethnicity' : { $regex: ethinicity=== "all" ? '' : ethinicity , $options: 'i' } } : {};
        const ageFilterC4 = min && max ? { 'child4.age': { $gte: min, $lte: max } } : {};

        const interestsdescriptionFilterDes = interestsdescription ? { 'descriptions' : { $regex: interestsdescription=== "all" ? '' : interestsdescription , $options: 'i' }} : {};
        const ethnicityFilterDes = ethinicity ? { 'parent1.ethnicity' : { $regex: ethinicity=== "all" ? '' : ethinicity , $options: 'i' } } : {};
        const ageFilterDes = min && max ? { 'parent1.age': { $gte: min, $lte: max } } : {};


 
        const usersP1 = await Family.find({ 
          ...interestsdescriptionFilterP1 ,
          ...ethnicityFilterP1 ,
          ...ageFilterP1 
        });

        const usersP2 = await Family.find({ 
          ...interestsdescriptionFilterP2 ,
          ...ethnicityFilterP2 ,
          ...ageFilterP2 
        });

        const usersC1 = await Family.find({ 
          ...interestsdescriptionFilterC1 ,
          ...ethnicityFilterC1 ,
          ...ageFilterC1 
        });

        const usersC2 = await Family.find({ 
          ...interestsdescriptionFilterC2 ,
          ...ethnicityFilterC2 ,
          ...ageFilterC2 
        });

        const usersC3 = await Family.find({ 
          ...interestsdescriptionFilterC3 ,
          ...ethnicityFilterC3 ,
          ...ageFilterC3 
        });

        const usersC4 = await Family.find({ 
          ...interestsdescriptionFilterC4 ,
          ...ethnicityFilterC4 ,
          ...ageFilterC4 
        });

        const usersDes = await Family.find({ 
          ...interestsdescriptionFilterDes ,
          ...ethnicityFilterDes ,
          ...ageFilterDes
        });


        
        Array.prototype.push.apply(usersP1,usersP2);
        Array.prototype.push.apply(usersP1,usersC1);
        Array.prototype.push.apply(usersP1,usersC2);

        if(interestsdescription !== 'all' && interestsdescription !== '' ){
          Array.prototype.push.apply(usersP1,usersDes);
        }


        console.log(usersDes);

        res.send(usersP1);












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
