
import { expect } from "chai"
import UserInfo from "../src/main/model/user-info"

describe('User Info', () => {

    it('should return correct greeting message', () => {
        const userInfo = new UserInfo("Nguyen", "Dat", "SE", "CSE", "ES6", "avatar.png", "dattnguyen");
        expect(userInfo.employeeId.to.equal('dattnguyen'));
    })
});