holes = []
Processes = [];
var dict = {};

function addHole()
{
    function hole(start , size , full = false)
    {
        this.start = start;
        this.size = size;
        this.full = full;

        this.getStart = function()
        {
            return this.start;
        }

        this.getSize = function()
        {
            return this.size;
        }

        this.Check = function()
        {
            return this.full
        }
        
        holes.push(this);
    }

    var holeStart = document.getElementById("holeStart").value;
    var holeSize = document.getElementById("holeSize").value;

    var x = new hole(holeStart , holeSize);

    console.log("The hole starts at " + holeStart + " and its size is " + holeSize);

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,holeStart,200,0.75*holeSize);
    ctx.font = "25px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText(holeStart + "-->" + holeSize, 20, Number(holeStart)+Number(holeSize)/2);
    
}

function addProcess()
{
    function process(name , size , allocated = false)
    {
        this.name = name;
        this.size = size;
        this.allocated = allocated;

        this.getName = function()
        {
            return this.name;
        }

        this.getSize = function()
        {
            return this.size;
        }

        this.Check = function()
        {
            return this.allocated;
        }
        
        Processes.push(this);
    }

    var processName = document.getElementById("processName").value;
    var processSize = document.getElementById("processSize").value;

    var y = new process(processName , processSize);

    console.log("The Process is " + processName + " and its size is " + processSize);

    //console.log(Processes.length);
}

function startAllocation()
{
    var methodolgy = document.getElementById("Allocation");
    var method = methodolgy.options[methodolgy.selectedIndex].value;

    if(method == "First Fit")
    {
        console.log("You have choosen first fit");
        for(var j = 0 ; j < Processes.length ; j++)
        {
            for(var i = 0 ; i < holes.length ; i++)
            {
                if((Number(Processes[j].getSize()) <= Number(holes[i].getSize())) && holes[i].full == false && Processes[j].allocated == false)
                {
                    console.log("Process "+Processes[j].getName()+" With a size of "+Processes[j].getSize() + " Has occupied a hole with a size" + holes[i].getSize());
                    holes[i].full = true;
                    Processes[j].allocated = true;
                    console.log("Hole with size " + holes[i].getSize() + " is now full");

                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#0000FF";
                    ctx.fillRect(0,holes[i].start,200,0.75*Processes[j].getSize());
                    ctx.fillStyle = "#FFF";
                    ctx.fillText(Processes[j].getName(), 20, Number(holes[i].getStart())+0.5*Number(Processes[j].getSize()));
                }
            }
        }
    }
    else
    {
        console.log("You have choosen Best fit");
        holes.sort(function(a,b){return a.getSize()-b.getSize()});
        Processes.sort(function(a,b){return a.getSize()-b.getSize()});

        for(var j = 0 ; j < Processes.length ; j++)
        {
            for(var i = 0 ; i < holes.length ; i++)
            {
                if((Number(Processes[j].getSize()) <= Number(holes[i].getSize())) && holes[i].full == false && Processes[j].allocated == false)
                {
                    console.log("Process "+Processes[j].getName()+" With a size of "+Processes[j].getSize() + " Has occupied a hole with a size" + holes[i].getSize());
                    holes[i].full = true;
                    Processes[j].allocated = true;
                    console.log("Hole with size " + holes[i].getSize() + " is now full");

                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#0000FF";
                    ctx.fillRect(0,holes[i].start,200,0.75*Processes[j].getSize());
                    ctx.fillStyle = "#FFF";
                    ctx.fillText(Processes[j].getName(), 20, Number(holes[i].getStart())+0.5*Number(Processes[j].getSize()));
                }
            }
        }
    }
}