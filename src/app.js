import CourseGreeter from './course-greeter';

const greeter = new CourseGreeter('My Assignment');

document.getElementById('greeting-msg').innerHTML = greeter.getGreetingMsg();