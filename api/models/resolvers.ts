export default {
    Query: {
        allUsers: async (parent, args, { User } ) => {
           let users = await  User.find();
           return users; 
        }
    },
    Mutation: {
        createUser: async (parent, args, { User } ) => {
            let user = await new User(args).save()
            return user
        }
    }
}