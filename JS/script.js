holes = []
Processes = [];
var dict = {};
var i = 0;
var deallocationList = [];

function addHole()
{
    function hole(start , size ,id = i, full = false , filled = 0)
    {
        this.start = start;
        this.size = size;
        this.full = full;
        this.id = id;
        this.filled = filled

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

        this.getId = function()
        {
            return this.id;
        }

        this.getFilled = function()
        {
            return this.filled;
        }
        
        holes.push(this);
        i += 1;
    }

    var holeStart = document.getElementById("holeStart").value;
    var holeSize = document.getElementById("holeSize").value;

    var x = new hole(holeStart , holeSize);

    console.log("The hole starts at " + holeStart + " and its size is " + holeSize);

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,holeStart,200,0.8*holeSize);
    ctx.font = "25px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText(holeStart + "-->" + (Number(holeStart)+Number(holeSize)), 20, Number(holeStart)+Number(holeSize)/2);
    
}

function addProcess()
{
    function process(name , size , allocated = false , start = 0)
    {
        this.name = name;
        this.size = size;
        this.allocated = allocated;
        this.start = start;

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

        this.getStart = function()
        {
            return this.start;
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
        for(var i = 0 ;  i < holes.length ; i++)
        {
            holes[i].full = false;
        }
        for(var i = 0 ;  i < holes.length ; i++)
        {
            Processes[i].allocated = false;
        }

        console.log("You have choosen first fit");
        for(var j = 0 ; j < Processes.length ; j++)
        {
            for(var i = 0 ; i < holes.length ; i++)
            {
                if((Number(Processes[j].getSize()) <= Number(holes[i].getSize())) && (Number(holes[i].getSize() - holes[i].getFilled()) > Number(Processes[j].getSize())) && Processes[j].allocated == false)
                {
                    console.log("Process "+Processes[j].getName()+" With a size of "+Processes[j].getSize() + " Has occupied a hole with a size " + holes[i].getSize());
                    holes[i].full = true;
                    Processes[j].allocated = true;
                    console.log("Hole " + holes[i].getId() +  " with size " + holes[i].getSize() + " is now full");

                    dict[Processes[j].getName()] = holes[i].getId();


                    if(deallocationList.indexOf(Processes[j].getName()) == -1)
                    {
                        var x = document.getElementById("deAllocationSelect");
                        var option = document.createElement("option");
                        option.text = Processes[j].getName();
                        x.appendChild(option);
                    }

                    Processes[j].start = holes[i].getFilled()+holes[i].start;

                    deallocationList.push(Processes[j].getName());

                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#0000FF";
                    ctx.fillRect(0,holes[i].getFilled()+holes[i].start,200,0.75*Processes[j].getSize());
                    ctx.fillStyle = "#FFF";
                    ctx.fillText(Processes[j].getName(), 20, Number(holes[i].getFilled())+0.5*Number(Processes[j].getSize()));
                    
                    holes[i].filled += Number(Processes[j].getSize());

                }
            }
        }
    }

    else if(method == "Best Fit")
    {
        for(var i = 0 ;  i < holes.length ; i++)
        {
            holes[i].full = false;
        }
        for(var i = 0 ;  i < holes.length ; i++)
        {
            Processes[i].allocated = false;
        }

        console.log("You have choosen Best fit");
        holes.sort(function(a,b){return a.getSize()-b.getSize()});
        //Processes.sort(function(a,b){return a.getSize()-b.getSize()});

        for(var j = 0 ; j < Processes.length ; j++)
        {
            for(var i = 0 ; i < holes.length ; i++)
            {
                if((Number(Processes[j].getSize()) <= Number(holes[i].getSize())) && (Number(holes[i].getSize() - holes[i].getFilled()) > Number(Processes[j].getSize())) && Processes[j].allocated == false)
                {
                    console.log("Process "+Processes[j].getName()+" With a size of "+Processes[j].getSize() + " Has occupied a hole with a size " + holes[i].getSize());
                    holes[i].full = true;
                    Processes[j].allocated = true;
                    //console.log("Hole " + holes[i].getId() +  " with size " + holes[i].getSize() + " is now full");

                    dict[Processes[j].getName()] = holes[i].getId();


                    if(deallocationList.indexOf(Processes[j].getName()) == -1)
                    {
                        var x = document.getElementById("deAllocationSelect");
                        var option = document.createElement("option");
                        option.text = Processes[j].getName();
                        x.appendChild(option);
                    }

                    Processes[j].start = holes[i].getFilled()+holes[i].start;

                    deallocationList.push(Processes[j].getName());

                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#0000FF";
                    ctx.fillRect(0,holes[i].getFilled()+holes[i].start,200,0.75*Processes[j].getSize());
                    ctx.fillStyle = "#FFF";
                    ctx.fillText(Processes[j].getName(), 20, Number(holes[i].getFilled())+0.5*Number(Processes[j].getSize()));
                    
                    holes[i].filled += Number(Processes[j].getSize());

                }
            }
        }
    }

    else
    {
        alert("Please choose allocation method");
    }

    for(var k = 0 ; k < Processes.length ; k++)
    {
        if(Processes[k].allocated == false)
        {
            console.log(Processes[k].getName() +" With size "+Processes[k].getSize()+ " is not Allocated");
        }
    }
}

// for(var key in dict)
// {
//     console.log(key , dict[key]);
// }

function startdeAllocation()
{
    var deallocate = document.getElementById("deAllocationSelect");
    var process = deallocate.options[deallocate.selectedIndex].value;
    //console.log(process);

    for(var i = 0 ; i < Processes.length ; i++)
    {
        if(process == Processes[i].getName())
        {
            var freeHole = dict[Processes[i].getName()];
            //console.log(freeHole);

            for(var j = 0 ; j < holes.length ; j++)
            {
                if(holes[j].getId() == freeHole)
                {
                    var canvas = document.getElementById("myCanvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "#FF0000";
                    ctx.fillRect(0,Processes[i].start,200,0.75*Processes[i].getSize());
                    ctx.font = "25px Arial";
                    ctx.fillStyle = "#FFF";
                    //ctx.fillText(holes[j].start + "-->" + (Number(holes[j].start)+Number(holes[j].size)), 20, Number(holes[j].start)+Number(holes[i].size)/2);

                    holes[j].full = false;
                    holes[j].filled -= Processes[i].getSize();
                    Processes[i].allocated = false;
                    //console.log("Hole " + holes[j].getId() + " of size " + holes[j].getSize() + " is now free again");
                    console.log("Process " + Processes[i].getName() + " Is now deallocated");

                    // for(var k = 0 ; k < Processes.length ; k++)
                    // {
                    //     if((Number(Processes[k].getSize()) <= Number(holes[j].getSize())) && Processes[k].allocated == false)
                    //     {
                    //         console.log("Process "+Processes[k].getName()+" With a size of "+Processes[k].getSize() + " Has occupied a hole with a size " + holes[j].getSize());
                    //         holes[j].full = true;
                    //         Processes[k].allocated = true;
                    //         console.log("Hole " + holes[j].getId() +  " with size " + holes[j].getSize() + " is now full");

                    //         dict[Processes[k].getName()] = holes[j].getId();
                            
                    //         var x = document.getElementById("deAllocationSelect");
                    //         var option = document.createElement("option");
                    //         option.text = Processes[k].getName();
                    //         x.appendChild(option);

                    //         var canvas = document.getElementById("myCanvas");
                    //         var ctx = canvas.getContext("2d");
                    //         ctx.fillStyle = "#0000FF";
                    //         ctx.fillRect(0,holes[j].start,200,0.75*Processes[k].getSize());
                    //         ctx.fillStyle = "#FFF";
                    //         ctx.fillText(Processes[k].getName(), 20, Number(holes[j].getStart())+0.5*Number(Processes[k].getSize()));
                    //     }
                    // }
                }
            }
        }
    }
}

function doneHoles()
{
    if(holes.length == 0)
    {
        alert("Please add at least one hole");
        return false;
    }
    var x = document.getElementById("Holes");
    x.style.display = "none";
    
    var y = document.getElementById("text_canvas");
    y.style.display = "block";
}

function doneProcesses()
{
    if(Processes.length == 0)
    {
        alert("Please add at least one Process");
        return false;
    }

    var y = document.getElementById("Processes");
    y.style.display = "none";
}

function doneAllocation()
{
    // var x = document.getElementById("AllocationDiv");
    // x.style.display = "none";

    var y = document.getElementById("deAllocation");
    y.style.display = "block";
}