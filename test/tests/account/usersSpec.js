/**
 * Created by Answer1215 on 5/15/2015.
 */
describe('User Resource', function() {
    beforeEach(module('app'));

    describe('isAdmin', function() {
        it('should return false if the role array does not have an admin entry', inject(function(UserResource) {
            var user = new UserResource();
            user.role = ['not admin'];
            expect(user.isAdmin()).to.be.false;
        }));

        it('should return true if the role array has an admin entry', inject(function(UserResource) {
            var user = new UserResource();
            user.role = ['admin'];
            expect(user.isAdmin()).to.be.true;
        }));
    })
})