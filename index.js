var successValue = "DONE";



// Handle success and fail class
function success(thisEvent) {
    if (!(thisEvent.target.parentNode.classList.contains("fail")||thisEvent.target.parentNode.classList.contains("uncertain"))) {
        thisEvent.target.parentNode.classList.add("success");
    }
}

function fail(thisEvent) {
    if (!(thisEvent.target.parentNode.classList.contains("success")||thisEvent.target.parentNode.classList.contains("uncertain"))) {
        thisEvent.target.parentNode.classList.add("fail");
    }
}

function uncertain(thisEvent) {
    if (!(thisEvent.target.parentNode.classList.contains("success")||thisEvent.target.parentNode.classList.contains("fail"))) {
        thisEvent.target.parentNode.classList.add("uncertain");
    }
}

function addSuccessFailEvent(){
    var allSuccess = document.querySelectorAll(".successButton");
    allSuccess.forEach(element => {
       element.addEventListener("click",function(thisEvent){ success(thisEvent)});
    });

    var allFail = document.querySelectorAll(".failButton");
    allFail.forEach(element => {
       element.addEventListener("click",function(thisEvent){ fail(thisEvent)});
    });

    var allUncertain = document.querySelectorAll(".uncertainButton");
    allUncertain.forEach(element => {
       element.addEventListener("click",function(thisEvent){ uncertain(thisEvent)});
    });
}


function cspBreach(thisEvent){
    thisEvent.target.closest('.mainbox').querySelector(".CSPbox").textContent = "CSP breach : " + thisEvent.target.outerHTML + " >>> "  + thisEvent.blockedURI + " >>> " + thisEvent.violatedDirective;
}
function addCSPCheck(){ //TO BE CALLED ON WINDOW LOAD - see all window.addEventListener('load'...
    var allMainbox = document.querySelectorAll(".mainbox");
    allMainbox.forEach(element => {
        element.addEventListener("securitypolicyviolation",function(thisEvent){ cspBreach(thisEvent)});
     });
}

// <!--## WAIT FOR ITEM ###################################################-->
function appendChilditemToBeWaited(){
    if(!document.getElementById("waitItem")){
        const element = document.createElement("div");
        element.setAttribute("id","waitItem");
        element.textContent = "DONE";
        element.setAttribute("class","whateverbox inlinebox")
        document.getElementById("appendNextToHere").closest("div.testbox").appendChild(element);
    }
}
function addClickOnButtonToAppendChild(){ //TO BE CALLED ON WINDOW LOAD - see all window.addEventListener('load'...
    var thisButton = document.getElementById("appendNextToHere");
    thisButton.addEventListener("click",function(){setTimeout(appendChilditemToBeWaited, 1000)});
}





// <!--## CSP CHECK ##############################################-->
function cspNOTBreached(thisEvent){
    var elem = thisEvent.target.closest('.mainbox').querySelector("#CSPCheck");
    elem.textContent = successValue;
    elem.classList.add("whateverbox", "inlinebox");
}


// <!--## TRIGGER JS ADDED CHANGE EVENT ##############################################-->
function addChangeTrigger(){ //TO BE CALLED ON WINDOW LOAD - see all window.addEventListener('load'...
    document.getElementById("changeEvent").addEventListener("change", function (thisEvent) {
        thisEvent.target.parentNode.querySelector("#resultChangeEvent").textContent = thisEvent.target.value;
    })
}


// <!--## TRIGGER INLINE CHANGE EVENT ##############################################-->
function changeValueOnChangeAttribute(thisEvent) {
    thisEvent.target.parentNode.querySelector("#resultCallInlineChange").textContent = thisEvent.target.value;
}


// <!--## TRIGGER JS ADDED KEYUP EVENT ##############################################-->
function addKeyupTrigger(){ //TO BE CALLED ON WINDOW LOAD - see all window.addEventListener('load'...
    document.getElementById("keyupEvent").addEventListener("keyup", function (thisEvent) {
        if(thisEvent.key == "Enter"){
            thisEvent.target.parentNode.querySelector("#resultKeyupEvent").textContent = thisEvent.target.value;
        }
        
    })
}


// <!--## INJECT FUNCTION ###############################################-->
//Nothing TODO - automation will do


// <!--## EXECUTE FUNCTION ###############################################-->
function existingFunctionBeforeLoad(){
    document.getElementById("executeExistingFunction").textContent = successValue;
}



window.addEventListener('load', (event) => {
    console.log('La page est complètement chargée');
    addSuccessFailEvent();
    addChangeTrigger();
    addKeyupTrigger()
    addCSPCheck();
    addClickOnButtonToAppendChild();
});





// LOL