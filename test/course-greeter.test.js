import { expect } from 'chai';
import CourseGreeter from '../src/course-greeter';

describe('Course Greeter', () => {

    it('should return correct greeting message', () => {
        const greeter = new CourseGreeter('Course Name');
        expect(greeter.getGreetingMsg()).to.equal('Welcome to Course Name Technical Challenge');
    })
});