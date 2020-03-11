/* [QUIZ ENGINE] */
var quiz = {
  draw : function () {
  // quiz.draw() : draw the quiz

    var wrapper = document.getElementById("quiz-wrap");

 
    
    for (var index in questions) {
      var number = parseInt(index) + 1;
      var qwrap = document.createElement("div"); 
      qwrap.classList.add("question"); 

      // The question - <h1> header
      var question = document.createElement("h1");
      question.innerHTML = number + ") " + questions[index]['q'];
      qwrap.appendChild(question);

      // The options - <input> radio buttons and <label>
      for (var oindex in questions[index]['o']) {
        // The <label> tag
        var label = document.createElement("label");
        qwrap.appendChild(label);

        // The <option> tag
        var option = document.createElement("input");
        option.type = "radio";
        option.value = oindex;
        option.required = true;
        option.classList.add("oquiz"); // Will explain this later in function submit below
        
       
        option.name = "quiz-" + number;
        label.appendChild(option);

      
        var otext = document.createTextNode(questions[index]['o'][oindex]);
        label.appendChild(otext);
      }

      wrapper.appendChild(qwrap);
    }

    var submitbutton = document.createElement("input");
    submitbutton.type = "submit";
    wrapper.appendChild(submitbutton);
    wrapper.addEventListener("submit", quiz.submit);
  },

  submit : function (evt) {

    evt.preventDefault();
    evt.stopPropagation();

    var selected = document.querySelectorAll(".oquiz:checked");


    var score = 0;
    for (var index in questions) {
      if (selected[index].value == questions[index]['a']) {
        score++;
      }
    }

  
    var total = selected.length;
    var percent = score / total ;

 
    var html = "<h1>";
    if (percent>=0.7) {
      html += "GREAT JOB!";
    } else if (percent>=0.4) {
      html += "OOPS, YOU ALMOST HAD IT!";
    } else {
      html += "TRY HARDER NEXT TIME!";
    }
    html += "</h1>";
    html += "<div>You scored " + score + " out of " + total + ".</div>";
    document.getElementById("quiz-wrap").innerHTML = html;
  }
};

/* [INIT] */
window.addEventListener("load", quiz.draw);