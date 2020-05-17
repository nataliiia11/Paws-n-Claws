const mongoose = require('mongoose');
const UserModel = require('../../../model/User');
const userData = { username: 'sample', email: 'sample', password:'123' };

describe('User Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            
        });
    });
  
    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        
    });

    // Test Schema is working!!!
    // Shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserModel({ username: 'sample2', email:'sample@gmail.com',password:'1234',add:'str54' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.add).toBeUndefined();
        
    });

    // Test Validation is working!!!
    // Should show errors in mail field.
    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new UserModel({ username: 'sample3' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.email).toBeDefined();
        
    });

    
})