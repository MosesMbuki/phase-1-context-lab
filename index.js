//  We're giving you this function. Take a look at it, you might see some usage
//  that's new and different. That's because we're avoiding a well-known, but
//  sneaky bug that we'll cover in the next few lessons!

//  As a result, the lessons for this function will pass *and* it will be available
//  for you to use if you need it!

// Create an employee record from an array of details
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Create multiple employee records from an array of arrays
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Create a time-in event for an employee
function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}

// Create a time-out event for an employee
function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Calculate all wages for an employee (all dates)
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Calculate payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function (total, employee) {
        return total + allWagesFor.call(employee);
    }, 0);
}