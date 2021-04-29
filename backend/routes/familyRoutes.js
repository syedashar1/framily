import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Family from '../models/familyModel.js'
import { generateToken, isAuth , isAdmin, isSellerOrAdmin } from '../utils.js';
import bcrypt from 'bcrypt'
import  ObjectId  from 'mongodb';
import _ from'lodash';
import shuffle from 'shuffle-array';

const familyRouter = express.Router();





familyRouter.put( '/imgdelete/:id', expressAsyncHandler(async (req, res) => {
  
    console.log(req.params.id);
    const docid = req.body.x.url

    const user = await Family.findById(req.params.id);

    if( user.image1 === docid ){
      user.image1 = undefined
      console.log('removing image 1');
    }
    if( user.image2 === docid ){
      console.log('removing image 2');
      user.image2 = undefined
    }
    if( user.image3 === docid ){
      user.image3 = undefined
      console.log('removing image 3');
    }
    if( user.image4 === docid ){
      user.image4 = undefined;
      console.log('removing image 4');
    }
    if( user.image5 === docid ){
      user.image5 = undefined
      console.log('removing image 5');
    }
    if( user.image6 === docid ){
      user.image6 = undefined
      console.log('removing image 6');
    }

    await user.save()
    // console.log('no image removed');


    

})
);


familyRouter.put( '/saveAll/:id', expressAsyncHandler(async (req, res) => {
  

  const user = await Family.findById(req.params.id);
  user.conversations = req.body
        res.send({ first : req.body , second : user.conversations });

  

    try {
      await user.save()
      res.send({ first : req.body , second : user.conversations });
      res.send(user.conversations)
    } catch (error) {
          res.status(401).send(error);
    }



})
);





familyRouter.put( '/accept', expressAsyncHandler(async (req, res) => {
  
  console.log(req.body);

  const liker = await Family.findById(req.body.liker);
  const family = await Family.findById(req.body.family);


  if(liker && family){


    liker.forChat.push(req.body.family)
    family.forChat.push(req.body.liker)

    liker.oursLiked = liker.oursLiked.filter(e=>e!== req.body.family )
    family.othersLiked = family.othersLiked.filter(e=>e!== req.body.liker )


    family.conversations.push( {recipients : req.body.liker} )
    liker.conversations.push( {recipients : req.body.family} )


    console.log(family.conversations);


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
  // console.log(users);
  if (users){
    res.send(users)
  }
  else{
    res.status(401).send({ message: 'no users found' });
  }

})
);


familyRouter.get( '/getconversations/:id', expressAsyncHandler(async (req, res) => {
  
  console.log('getting conversations');

  const user = await Family.findById(req.params.id);

  if (user.conversations){
    res.send(user.conversations)
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
  if(user && req.body.docs[0] ){

    if(req.body.docs[0]){
      user.image1 = req.body.docs[0].url
      console.log(user.image1);
    }
    else{
      user.image1 = null
    }


    if(req.body.docs[1]){
      user.image2 = req.body.docs[1].url
      console.log(user.image2);

      

    }
    else{
      user.image2 = null
    }



    if(req.body.docs[2]){
      user.image3 = req.body.docs[2].url
      console.log(user.image3);

    }
    else{
      user.image3 = null
    }



    if(req.body.docs[3]){
      user.image4 = req.body.docs[3].url
      console.log(user.image4);

    }
    else{
      user.image4 = null
    }



    if(req.body.docs[4]){
      user.image5 = req.body.docs[4].url
    }
    else{
      user.image5 = null
    }



    if(req.body.docs[5]){
      user.image6 = req.body.docs[5].url
    }
    else{
      user.image6 = null
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




familyRouter.get( '/temp', expressAsyncHandler(async (req, res) => {
  
  
  const pageSize = 5 ;
  const page = Number(req.query.pageNumber) || 1;

  const families = await Family.find({}).skip(pageSize * (page - 1)).limit(pageSize)
  if (families) {
    res.send(families)
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
        Array.prototype.push.apply(usersP1,usersC3);
        Array.prototype.push.apply(usersP1,usersC4);

        if(interestsdescription !== 'all' && interestsdescription !== '' ){
          Array.prototype.push.apply(usersP1,usersDes);
        }


        console.log(usersDes);

        


        // const send  = usersP1.filter((v,i,a)=>a.findIndex( t =>(t._id === v._id))===i)

        var non_duplidated_data = _.uniqBy(usersP1, 'id'); 


         let i = non_duplidated_data.length - 1;
            for (; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = non_duplidated_data[i];
              non_duplidated_data[i] = non_duplidated_data[j];
              non_duplidated_data[j] = temp;
            }




        // shuffle(non_duplidated_data);



        res.send(non_duplidated_data);












      })
);





    
familyRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
        console.log("getting 1 user");
        const user = await Family.findById(req.params.id);
        console.log(user);
        res.send(user);
      })
);




familyRouter.put( '/update/:id' , expressAsyncHandler(async (req, res) => {
  


  const user = await Family.findById(req.params.id);
  console.log('updating');
  if (user) {

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    user.parent1.name = req.body.parent1.name  || user.parent1.name 
    user.parent1.age = req.body.parent1.age  || user.parent1.age 
    user.parent1.gender = req.body.parent1.gender  || user.parent1.gender 
    user.parent1.ethnicity = req.body.parent1.ethnicity  || user.parent1.ethnicity 
    user.parent1.interests = req.body.parent1.interests  || user.parent1.interests 

    user.parent2.name = req.body.parent2.name  || user.parent2.name 
    user.parent2.age = req.body.parent2.age  || user.parent2.age 
    user.parent2.gender = req.body.parent2.gender  || user.parent2.gender 
    user.parent2.ethnicity = req.body.parent2.ethnicity  || user.parent2.ethnicity 
    user.parent2.interests = req.body.parent2.interests  || user.parent2.interests 




    user.child1.name = req.body.child1.name  || user.child1.name 
    user.child1.age = req.body.child1.age  || user.child1.age 
    user.child1.gender = req.body.child1.gender  || user.child1.gender 
    user.child1.ethnicity = req.body.child1.ethnicity  || user.child1.ethnicity 
    user.child1.interests = req.body.child1.interests  || user.child1.interests

    user.child2.name = req.body.child2.name  || user.child2.name 
    user.child2.age = req.body.child2.age  || user.child2.age 
    user.child2.gender = req.body.child2.gender  || user.child2.gender 
    user.child2.ethnicity = req.body.child2.ethnicity  || user.child2.ethnicity 
    user.child2.interests = req.body.child2.interests  || user.child2.interests

    user.child3.name = req.body.child3.name  || user.child3.name 
    user.child3.age = req.body.child3.age  || user.child3.age 
    user.child3.gender = req.body.child3.gender  || user.child3.gender 
    user.child3.ethnicity = req.body.child3.ethnicity  || user.child3.ethnicity 
    user.child3.interests = req.body.child3.interests  || user.child3.interests

    user.child4.name = req.body.child4.name  || user.child4.name 
    user.child4.age = req.body.child4.age  || user.child4.age 
    user.child4.gender = req.body.child4.gender  || user.child4.gender 
    user.child4.ethnicity = req.body.child4.ethnicity  || user.child4.ethnicity 
    user.child4.interests = req.body.child4.interests  || user.child4.interests

    user.descriptions = req.body.descriptions || user.descriptions


    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }

    const updatedUser = await user.save();

    console.log(updatedUser);
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser),
    });
  }







})
);




familyRouter.put( '/msgtosend/:id' , expressAsyncHandler(async (req, res) => {
        
  console.log('see meeeee');
  console.log(req.body)
  console.log(req.params.id);


  //user req.params.id
  //other user.conversations[i].recipients[0]


  const user = await Family.findById(req.body.recipients[0]);
  const user2 = await Family.findById(req.params.id);



  for(var i = 0 ; i < user.conversations.length ; i++ ){
    console.log(i);
    console.log(user.conversations[i].recipients[0]);
    if (user.conversations[i].recipients[0] === req.params.id ) {
      console.log('found it !  at' , i );
      break
    }
  }
  if (user) {
     user.conversations[i].messages.push({sender : req.params.id , text : req.body.text })
      await user.save()
      }

     

      for(var i = 0 ; i < user2.conversations.length ; i++ ){
        console.log(user2.conversations[i].recipients[0]);
        if (user2.conversations[i].recipients[0] === req.body.recipients[0] ) {
          console.log('found it !  for user 2' , i );
          console.log(user2.conversations[i].messages);
          break
        }
      }
      if (user) {
         user2.conversations[i].messages.push({sender : req.params.id , text : req.body.text })
          await user2.save()
          }  

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
