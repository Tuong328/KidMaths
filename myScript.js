//"Sally has %%x: 1,5%% Apples, she gets %%y: 2,3%% more, how many does she have now?"

var scoreCount = 0;

function getInput() {
    var userInput = document.getElementById("inputProblem").value;
    console.log(userInput);
    return userInput;
}

function getSolution() {
    var solutionInput = document.getElementById("inputSolution").value;
    console.log(solutionInput);
    return solutionInput;
}

var solution;
function createProblem() {
    var problem1 = new Problem(getInput(), getSolution());
    var prob = problem1.genRandomProblem();
    document.getElementById("myTextArea").innerHTML = prob.problemString;

    console.log(prob.solution);
    solution = prob.solution;
    return false;
}

var answer;
function enterAnswer() {
    answer = document.getElementById("answer").value;
    var score = "Score: ";
    if (answer == solution) {
        alert("CORRECT");
        scoreCount++;
        createProblem();
    } else {
        alert("WRONG");
        scoreCount--;
    }
    score += scoreCount;
    document.getElementById("score").innerHTML = score;
    return false;
}

class Problem {
    
    constructor(problem_str, solution_str) {
        this.problem_str = problem_str;
        this.solution_str = solution_str;
        this.parameters = [];
        this.texts = [];
        this.parseProblem(problem_str);
    }
    
    parseProblem(str) {
        var split_str = str.split('%%');
        var flag = false;
        for (var i in split_str) {
            if (flag) {
                this.parameters.push(parseParameter(split_str[i]));
                flag = false;
            }
            else {
                this.texts.push(split_str[i]);
                flag = true;
            }
        }
    }
    
    genRandomProblem() {
        var nums = [];
        var str = this.solution_str;
        
        for (var i = 0; i < this.parameters.length; i++) {
            var num = randRange(this.parameters[i].lo, this.parameters[i].hi);
            nums.push(num);
            str = str.replace(this.parameters[i].name, num);
        }
        
        return new Random_Problem(this.texts, nums, eval(str));
    }

}

class Random_Problem {
    constructor(texts, nums, solution){
        this.texts = texts;
        this.nums = nums;
        this.solution = solution;
        this.problemString = "";
        this.insert();
    }

    insert() {
        for (var i = 0; i < this.nums.length; i++) {
            this.problemString += this.texts[i];
            this.problemString += this.nums[i];
        }
        this.problemString += this.texts[this.texts.length - 1];
    }
}

class Parameter {
    constructor(name, lo, hi) {
        this.name = name;
        this.lo = lo;
        this.hi = hi;
    }
}

function parseParameter(str) {
    str = str.trim();
    str = str.replace(/\s/g, "");
    
    var split_str = str.split(':');

    var name = split_str[0];
    split_str = split_str[1].split(',');
    var lo = parseInt(split_str[0]);
    var hi = parseInt(split_str[1]);

    return new Parameter(name, lo, hi);
}

function randRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

