function createEmployeeRecord(arr) {
   return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfArrays){
   return arrOfArrays.map(arr => createEmployeeRecord(arr));
}

function createTimeInEvent(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    empRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    empRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return empRecord
}


function hoursWorkedOnDate(employee, formDate) {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === formDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === formDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, formDate) {
    return (hoursWorkedOnDate(employee, formDate) * employee.payPerHour);
}

function allWagesFor(employee) {
    let availableDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = availableDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return payable
}

function calculatePayroll(empArr) {
    return empArr.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
}
