import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
    const { id, gender, name, age, user_interest } = await readBody(event);

    // Step 1: Find or Create Interests
    const interests = await Promise.all(
        user_interest.map(async (name) =>
          prisma.interest.create({
            data: { name },
          })
        )
      );
  
      // Step 2: Assign the Interests to the User in UserInterest
      await prisma.userInterest.createMany({
        data: interests.map((interest) => ({
          userId: id,
          interestId: interest.id,
        })),
        skipDuplicates: true, // Prevent errors if the relationship already exists
      });
      
    // const createInterest = await prisma.interest.createMany({
    //     data:
    //         user_interest.map((interest)=>({
    //             name:interest,
    //         }))
    //     }
    // )
    // console.log(createInterest);
    return await prisma.user.update({
        where: { id: id },  // Use username or another unique identifier
        data: {
        gender,
        name,
        age,        },
    });

});
