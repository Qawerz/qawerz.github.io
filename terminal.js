//setup globals
var term = {};
term.prompt = "$ ";
term.in = document.getElementById('cmdinput');
term.out = document.getElementById('out');
term.pr = document.getElementById('prompt');
term.lk = document.getElementById('link');
term.in_p = "$ ";
term.out_p = "> ";
term.commands = [];
var prj = [
  ['Matrix Screensaver PHP', 'https://qawerz.github.io/Matrix.html'],
  ['School Project 8 class', 'https://qawerz.github.io/412proj/GW.html'],
  ['Real Time Editor', 'https://qawerz.github.io/RTE.html'],
  ['GLChat', 'https://github.com/Qawerz/qawerz.github.io/blob/master/GFChat.rar'],
  ['Simple JS Terminal', 'https://github.com/Qawerz/js-terminal'],
]

var err = "<span red>Unknown command. Use help command.</span><br />"

//function
//execution
function results(args){
  for (var i = 0; i < term.commands.length; i++){
    var arg = [];
    var argum = "";
    arg = args.split(' ');
    if (arg[0] == term.commands[i][0]){

        if (arg.length >= 3){
            for (var j = 1; j < arg.length; j++){
                argum = argum+" "+arg[j]
            }
            return term.commands[i][1](argum)
        }
        if (arg[1] !== ""){
            return term.commands[i][1](arg[1])
        }
        return term.commands[i][1]()
    }

  }

     return "<span red>Unknown command: " + args.split(' ')[0] + ". Use 'help' command</span> <br />";
}

//keypress event
function keypress_handle(e, el){
  if (e.keyCode === 13){
    if (el.value === ""){
      term.out.innerHTML += term.in_p +"<br/>"+"<br>"
      el.value = '';
      return ""
    }
    if (el.value === "cls") {
      term.out.innerHTML = "";
      el.value = '';
      return ""
    }

    term.out.innerHTML += term.in_p + el.value + "<br />" + term.out_p + results(el.value) + "<br/>"+"<br>";
    el.value = '';
  }
}


///////////////
//  Commands //
///////////////


term.commands.push(['help',  
	function(){														
		var help_str = '<ul>';										
		for (var i = 0; i < term.commands.length; i++){				
      help_str += '<li>'+term.commands[i][0]+term.commands[i][2]+"</li>";	
  }
  help_str += '</ul>';																
  return help_str			
}, ' - show all commands' 
]);

term.commands.push(['echo',
  function(arg) {
  var echo_str = '';
  if (arg === undefined){
    return "Empty value"
  }
  return echo_str += arg
  return echo_str;
},' - repeat your text']);



term.commands.push(['color', function (arg) {
        if (arg === undefined){
          return "Empty value"
        }
        if (arg === "red") {
          term.out.style.color = 'red';
          term.in.style.color = 'red';
          term.pr.style.color = 'red';
          term.lk.style.color = 'red';
          return "Color is now " + arg;
        }
        if (arg === "white") {
          term.out.style.color = 'white';
          term.in.style.color = 'white';
          term.pr.style.color = 'white';
          term.lk.style.color = 'white';
          return "Color is now " + arg;
        }
        if (arg === "rainbow") {
            term.out.classList.toggle('rainbow')
            term.in.classList.toggle('rainbow')
            term.pr.classList.toggle('rainbow')
            term.lk.style.color = 'rainbow';
            return "Color is now " + arg;   

        }
        if (arg === "lime") {
            term.out.style.color = 'lime';
            term.in.style.color = 'lime';
            term.pr.style.color = 'lime';
            term.lk.style.color = 'lime';
            return "Color is now " + arg;
        }

        if (arg.length<=6) {
            if (arg.length > 0){
                term.out.style.color = '#' + arg;
                term.in.style.color = '#' + arg;
                term.pr.style.color = '#' + arg;
                term.lk.style.color = '#';
                return "Color is now " + arg;
            }

        }
        
        else {
          return "<span red>Color is not founded</span>"
        }        }, ' - changing color of the terminal (white, red, lime, rainbow or HEX(without #))']);


term.commands.push(['alert', function (arg) {
    alert(arg)
    return ""
}, " - alert in browser"])

term.commands.push(['time', function () {
    var now = new Date();
    return now;
}, ' - date and time at this moment'])

term.commands.push(['about',
 function () {
	var about_str = '<p>Creator: <a style="color: white" href="https://github.com/Qawerz">Qawerz</a><br>Create date : 2-Oct-2020</p>';
    return about_str;
}, ' - some info about creator'])

term.commands.push(['ls', function(){
  var ls_str = '<br><ol>'
  console.log(...prj + '-prj')
  console.log(...prj.length + '-prj.lengh')

  for (var i = 0; i < prj.length; i++){ 
    ls_str += '<li>' + prj[i][0] + '</li>'
  }
  ls_str += '</ol>'
  return ls_str
},
" - show list of my projcts"
])

term.commands.push(['open', function(args){
  console.log(args)
  for (var i = 0; i < prj.length; i++){
      if (args <= prj.length){
        var win = window.open(prj[args - 1][1], "_self");
        win.focus();
        return win
      }

      if (args === undefined){
        return "Empty value"
      }
        
    return "<span red>Unknown project <br />";
  }    
}, " - open page with one of my projects. List of them - 'ls' command."])

term.commands.push(['cls', function(){},' - clear terminal'
])
