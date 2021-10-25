taskName = textContains("去逛小鹏汽车(2/7)").findOnce();
let taskTag = taskName.parent().child(2).text();
console.log(taskTag);