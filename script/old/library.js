// Optimalworks Ltd JS Library (c) optimalworks.net
Object.prototype.toInt=function(){
var str=String(this);str=str.replace(/[^0-9-.]/g, "");var ret=parseInt(str, 10);
if(isNaN(ret))ret=0;
return ret;}
String.prototype.Trim=function(){return this.replace(/^\s*|\s*$/g, "");}
String.prototype.Clean=function(){return this.replace(/[^\w|\s|@|&|.|,|!|%|(|)|+|-]/g, "").replace(/_/g, " ").replace(/\s+/g, " ").Trim();}
String.prototype.Pad=function(length, padChar){
var str=String(this);
length=length.toInt();
if(typeof padChar=='undefined')padChar=" ";
else{
padChar=String(padChar);
if(padChar.length<1)padChar=" ";}
while(str.length<length)str=padChar+str;
return str;}
String.prototype.SerialToDate=function(){
var d=String(this);
d=d.Trim();
var date=(d.length>=8?new Date(d.substr(0,4).toInt(), d.substr(4,2).toInt()-1, d.substr(6,2).toInt()):new Date());
return date;}
Date.prototype.DateToSerial=function(){
return String(this.getFullYear()).Pad(4,"0")+String(this.getMonth()+1).Pad(2,"0")+String(this.getDate()).Pad(2,"0");}
if(!Array.prototype.push){Array.prototype.push=function(element){this[this.length]=element;}}
if(!Array.prototype.pop){
Array.prototype.pop=function(){
var ret;
if(this.length>0){
ret=this[this.length-1];
this.length--;}
return ret;}}
Array.prototype.Exists=function(key){
var type=typeof(this[key]);
return(type!='undefined'&&type!='function');}
Array.prototype.StoreAll=function(name, minutes){
var values="";
for(var key in this)if(typeof(this[key])!='function')values+=(values==""?"":"[:]")+key+"[=]"+String(this[key]);
CookieSet(name, values, minutes);}
Array.prototype.LoadAll=function(name){
var allValues=CookieGet(name);
var values=allValues.split("[:]");
var thisValue;
for(var i=0;i<values.length;i++){
thisValue=values[i].split("[=]");
if(thisValue.length==2){
if(thisValue[1]=="true"||thisValue[1]=="false")this[thisValue[0]]=(thisValue[1]=="true");
else this[thisValue[0]]=thisValue[1];}}}
function HTTParguments(){
var args=new Array();
var arglist=location.search.Trim();
if(arglist.charAt(0)=='?')arglist=arglist.substr(1);
var argsep=arglist.split('&');
var thisValue;
for(var i=0;i<argsep.length;i++){
thisValue=argsep[i].split("=");
if(thisValue.length==2)args[unescape(thisValue[0])]=unescape(thisValue[1]);}
return args;}
function CookieSet(name, value, minutes){
value=String(value).replace(/\r/g, "").replace(/\n/g, "[#]");
if(minutes){
var date=new Date();
date.setTime(date.getTime()+(minutes*60000));
var expires=";expires="+date.toGMTString();}
else expires="";
document.cookie=name+"="+String(value)+expires+";path="+location.pathname.substr(0, location.pathname.indexOf("/",1)+1);}
function CookieGet(name){
var ret="";name+="=";
var allCookies=document.cookie.split(';');
var thisCookie;
for(var i=0;i<allCookies.length&&ret=="";i++){
thisCookie=allCookies[i].Trim();
if(thisCookie.indexOf(name)==0)ret=thisCookie.substring(name.length).replace(/\[#\]/g, "\n");}
return ret;}
function CookiesEnabled(){
CookieSet("testcookie", "testvalue", 0.05);
return(CookieGet("testcookie")=="testvalue");}
var DOM=new function(){
this.ElementNode=1;this.AttributeNode=2;this.TextNode=3;this.CommentNode=8;
this.Enabled=(document.getElementById&&document.getElementsByTagName);
this.Id=function(id, rootElement){
var element=null;
if(this.Enabled){
if(typeof rootElement=='string')rootElement=this.Id(rootElement);
if(!rootElement)rootElement=document;
element=rootElement.getElementById(String(id));}
return element;}
this.Tags=function(tag, rootElement){
var elements=new Array(0);
if(this.Enabled){
if(typeof rootElement=='string')rootElement=this.Id(rootElement);
if(!rootElement)rootElement=document;
elements=rootElement.getElementsByTagName(String(tag));}
return elements;}
this.Class=function(className, tag, rootElement){
className=" "+className.Trim()+" ";
var thisClass;
var classNodes=new Array();
var allNodes=(typeof tag=='string'&&tag.length>0?this.Tags(tag, rootElement):this.AllElements(rootElement));
for(var i=0;i<allNodes.length;i++){
thisClass=" "+allNodes[i].className+" ";
if(thisClass.indexOf(className)>=0)classNodes.push(allNodes[i]);}
return classNodes;}
this.AllElements=function(rootElement){
var nl=new Array(0);
if(this.Enabled){
var RecurseElements=function(element){
var cnodes=DOM.ChildElements(element);
for(var i=0;i<cnodes.length;i++){
nl.push(cnodes[i]);
RecurseElements(cnodes[i]);}}
if(typeof rootElement=='string')rootElement=this.Id(rootElement);
if(!rootElement)rootElement=document;
RecurseElements(rootElement);}
return nl;}
this.ChildElements=function(element){
var ce=new Array();
if(typeof element=='string')element=this.Id(element);
if(element){
for(var i=0;i<element.childNodes.length;i++){
if(element.childNodes[i].nodeType==this.ElementNode&&element.childNodes[i].nodeName!="!")ce.push(element.childNodes[i]);}}
return ce;}
this.FindNodeType=function(element, ntype){
var found=null;
if(typeof element=='string')element=this.Id(element);
if(element){
var thisNode;
for(var i=0;i<element.childNodes.length&&found==null;i++){
thisNode=element.childNodes[i];
if(thisNode.nodeType==ntype)found=thisNode;
else found=this.FindNodeType(thisNode, ntype);}}
return found;}
this.Text=function(element){
var text="";
if(typeof element=='string')element=this.Id(element);
if(element){
var tNode=this.FindNodeType(element, this.TextNode);
if(tNode)text=tNode.nodeValue;}
return text;}
this.SetText=function(element, text){
if(typeof element=='string')element=this.Id(element);
if(element){
var tNode=this.FindNodeType(element, this.TextNode);
if(tNode)tNode.nodeValue=text;
else element.appendChild(document.createTextNode(text));}}
this.Copy=function(fromNode, toNode){
if(typeof fromNode=='string')fromNode=this.Id(fromNode);
if(typeof toNode=='string')toNode=this.Id(toNode);
if(fromNode&&toNode){
for(var i=0;i<fromNode.childNodes.length;i++)toNode.appendChild(fromNode.childNodes[i].cloneNode(true));}}
this.RemoveChildren=function(element){
if(typeof element=='string')element=this.Id(element);
if(element)while(element.lastChild)element.removeChild(element.lastChild);}
this.RemoveID=function(element){
if(typeof element=='string')element=this.Id(element);
if(element.getAttribute("id"))element.removeAttribute('id');
for(var i=0;i<element.childNodes.length;i++)if(element.childNodes[i].nodeType==this.ElementNode)this.RemoveID(element.childNodes[i]);
return element;}
this.AbsoluteX=function(element){
var pos=0;
if(typeof element=='string')element=this.Id(element);
if(element&&typeof element.offsetLeft!='undefined'){
pos=element.offsetLeft;
while((element=element.offsetParent))pos+=element.offsetLeft;}
return pos;}
this.AbsoluteY=function(element){
var pos=0;
if(typeof element=='string')element=this.Id(element);
if(element&&typeof element.offsetTop!='undefined'){
pos=element.offsetTop;
while((element=element.offsetParent))pos+=element.offsetTop;}
return pos;}
this.CreateFragment=function(ob, node){
var key, vtype, idk, cnode;
for(key in ob){
if(typeof ob[key]!='function'){
vtype=typeof(ob[key]);
idk=key.charAt(0);
if(vtype=='object'){
cnode=this.CreateFragment(ob[key], document.createElement(key));
if(cnode){
if(node)node.appendChild(cnode);
else node=cnode;}}
if(node&&vtype=='string'&&idk!='#'){
node.setAttribute(key, ob[key]);
switch(key.toLowerCase()){
case 'class':node.className=ob[key];break;
case 'for':node.htmlFor=ob[key];break;}}
if(node&&vtype=='string'&&idk=='#')node.appendChild(document.createTextNode(ob[key]));}}
return node;}
this.HeadAppend=function(element){
var head=this.Tags("head");
return(head.length==1?head[0].appendChild(element):null);}
this.HeadRemove=function(element){
var head=this.Tags("head");
return(head.length==1?head[0].removeChild(element):null);}
this.LoadJS=function(file){
var jsfrag=document.createElement("script");
jsfrag.setAttribute("type", "text/javascript");
jsfrag.setAttribute("src", file);
return this.HeadAppend(jsfrag);}
this.LoadCSS=function(file){
var cssfrag=document.createElement("link");
cssfrag.setAttribute("type", "text/css");cssfrag.setAttribute("rel", "stylesheet");cssfrag.setAttribute("media", "screen");cssfrag.setAttribute("href", file);
return this.HeadAppend(cssfrag);}}
function Event(element, type, handler){
this.Raised=null;
if(typeof element.AttachedEvents=='undefined'||element.AttachedEvents==null){
element.AttachedEvents=new EventStore();
var existingEvent=element["on"+type];
if(existingEvent)new Event(element, type, existingEvent);
EventStore.ElementList[EventStore.ElementList.length]=element;
if(EventStore.ElementList.length==1)new Event(window, "unload", EventStore.CleanUp);}
var hIndex=element.AttachedEvents.Add(element, type, this);
this.Handler=function(evtinfo){
this.Raised=evtinfo;
return handler(this);}
this.Detach=function(){element.AttachedEvents.Detach(type, hIndex);}}
function EventStore(){this.Type=[];}
EventStore.prototype.Add=function(element, type, EventObj){
if(typeof this.Type[type]=='undefined'){
this.Type[type]=[];
element["on"+type]=EventStore.Handler;}
var hIndex=this.Type[type].length;
this.Type[type][hIndex]=EventObj;
return hIndex;}
EventStore.prototype.Detach=function(type, hIndex){
if(typeof this.Type[type][hIndex]=='object')delete this.Type[type][hIndex];}
EventStore.prototype.RunEvents=function(evtinfo){
var ret=true;
if(typeof this.Type[evtinfo.Type]!='undefined'){
var EventObj;
for(var h=0;h<this.Type[evtinfo.Type].length;h++){
EventObj=this.Type[evtinfo.Type][h];
if(typeof EventObj=='object')ret&=(EventObj.Handler(evtinfo)!==false);}}
return ret;}
EventStore.Handler=function(evt){
return(this.AttachedEvents?this.AttachedEvents.RunEvents(new EventInformation(evt)):null);}
EventStore.ElementList=[];
EventStore.CleanUp=function(){
for(var e=0;e<EventStore.ElementList.length;e++)EventStore.ElementList[e].AttachedEvents=null;
EventStore.ElementList=null;}
function EventInformation(event){
if(event){
this.Event=event;this.StopPropagation=function(){this.Event.stopPropagation();};this.StopDefaultAction=function(){this.Event.preventDefault();}}
else{
this.Event=window.event;this.StopPropagation=function(){this.Event.cancelBubble=true;};this.StopDefaultAction=function(){this.Event.returnValue=false;}}
this.Type="";this.Element=null;this.Key="";this.ControlKey="";this.Shift=false;this.Ctrl=false;this.Alt=false;this.MouseX=0;this.MouseY=0;
if(this.Event){
this.Type=String(this.Event.type).toLowerCase();
this.Element=(this.Event.target?this.Event.target:this.Event.srcElement);
this.Ctrl=this.Event.ctrlKey;this.Alt=this.Event.altKey;this.Shift=this.Event.shiftKey;
if(this.Type.indexOf("key")==0){
var keyCode=this.Event.keyCode;var charCode=(typeof this.Event.charCode!='undefined'?this.Event.charCode:null);
if(charCode>0)this.Key=String.fromCharCode(charCode);
else{
if(Event.CK[keyCode]&&(charCode!=null||keyCode<32||(this.Type!="keypress"||(!this.Shift&&keyCode<112&&keyCode!=35&&keyCode!=39&&keyCode!=45&&keyCode!=46))))this.ControlKey=Event.CK[keyCode];
else if(keyCode>=32)this.Key=String.fromCharCode(keyCode);}}
var mre=/mouse|click/i;
if(mre.test(this.Type)){
this.MouseX=(this.Event.pageX?this.Event.pageX:this.Event.clientX+Math.max(document.documentElement.scrollLeft, document.body.scrollLeft));
this.MouseY=(this.Event.pageY?this.Event.pageY:this.Event.clientY+Math.max(document.documentElement.scrollTop, document.body.scrollTop));}}}
Event.CK=[];Event.CK[8]="backspace";Event.CK[9]="tab";Event.CK[13]="enter";Event.CK[19]="break";Event.CK[27]="esc";Event.CK[33]="pageup";Event.CK[34]="pagedown";Event.CK[35]="end";Event.CK[36]="home";Event.CK[37]="left";Event.CK[38]="up";Event.CK[39]="right";Event.CK[40]="down";Event.CK[45]="insert";Event.CK[46]="delete";Event.CK[112]="f1";Event.CK[113]="f2";Event.CK[114]="f3";Event.CK[115]="f4";Event.CK[116]="f5";Event.CK[117]="f6";Event.CK[118]="f7";Event.CK[119]="f8";Event.CK[120]="f9";Event.CK[121]="f10";Event.CK[122]="f11";Event.CK[123]="f12";Event.CK[144]="numlock";Event.CK[145]="scrolllock";
var Graphic=new function(){
if(typeof window.innerWidth!='undefined'){
this.ViewportWidth=function(){return window.innerWidth;}
this.ViewportHeight=function(){return window.innerHeight;}}
else{
this.ViewportWidth=function(){
if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0)return document.documentElement.clientWidth;
else return DOM.Tags("body")[0].clientWidth;}
this.ViewportHeight=function(){
if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientHeight!='undefined'&&document.documentElement.clientHeight!=0)return document.documentElement.clientHeight;
else return DOM.Tags("body")[0].clientHeight;}}
if(typeof window.pageXOffset!='undefined'){
this.ViewportScrollX=function(){return window.pageXOffset;}
this.ViewportScrollY=function(){return window.pageYOffset;}}
else{
this.ViewportScrollX=function(){
if(typeof document.documentElement.scrollLeft!='undefined'&&document.documentElement.scrollLeft>0)return document.documentElement.scrollLeft;
else if(typeof document.body.scrollLeft!='undefined')return document.body.scrollLeft;
else return 0;}
this.ViewportScrollY=function(){
if(typeof document.documentElement.scrollTop!='undefined'&&document.documentElement.scrollTop>0)return document.documentElement.scrollTop;
else if(typeof document.body.scrollTop!='undefined')return document.body.scrollTop;
else return 0;}}
this.Opacity=function(element, oVal, autoHide){
if(typeof element=='string')element=DOM.Id(element);
if(element){
oVal=(oVal<0?0:(oVal>100?100:oVal));
if(autoHide){
var visibility=element.style.visibility;
if(oVal==0&&visibility!="hidden")element.style.visibility="hidden";
if(oVal>0&&visibility!="visible")element.style.visibility="visible";}
if(oVal==100)oVal=99.999;
var oVal1=oVal / 100;
element.style.opacity=oVal1;element.style.MozOpacity=oVal1;element.style.filter="alpha(opacity:"+oVal+")";element.style.KHTMLOpacity=oVal1;}}
this.ClassApply=function(element, cname){
if(typeof element=='string')element=DOM.Id(element);
if(element&&cname.length>0){
var cc=" "+element.className+" ";
if(cc.indexOf(" "+cname+" ")<0)cc+=cname;
element.className=cc.Trim();}}
this.ClassRemove=function(element, cname){
if(typeof element=='string')element=DOM.Id(element);
if(element&&cname.length>0){
var cc=" "+element.className+" ";
cc=cc.replace(new RegExp(" "+cname+" ", "gi"), " ");
element.className=cc.Trim();}}
this.PositionViewport=function(element, vtop, vbottom, absolute){
if(absolute!==true){
var vh=this.ViewportHeight();
vtop=Math.floor((vtop/100)* vh);
vbottom=Math.ceil((vbottom/100)* vh);}
var ey=DOM.AbsoluteY(element);
var vy=this.ViewportScrollY();
if(ey<vy+vtop)this.ScrollViewport(ey-vtop);
else if(ey>vy+vbottom)this.ScrollViewport(ey-vbottom);}
this.AnimationFrames=10;
this.AnimationPause=300;
this.ScrollViewport=function(moveTo, frame, pause){
if(isNaN(frame)){var cTime=new Date();frame=this.AnimationFrames;}
var moveFrom=this.ViewportScrollY();
window.scrollTo(0, moveFrom+Math.floor((moveTo-moveFrom)/ frame));
if(frame>1&&moveFrom!=this.ViewportScrollY()){
if(isNaN(pause)){
pause=((new Date()-cTime)+8)* 2;
frame=Math.floor(this.AnimationPause / pause);}
else frame--;
setTimeout(function(){Graphic.ScrollViewport(moveTo, frame, pause);}, pause);}}
this.ComputedStyle=function(element, rule){
if(typeof element=='string')element=DOM.Id(element);
var value="";
if(element){
if(document.defaultView&&document.defaultView.getComputedStyle)value=document.defaultView.getComputedStyle(element, "").getPropertyValue(rule);
else if(element.currentStyle){
rule=rule.replace(/\-(\w)/g, function(m,c){return c.toUpperCase();});
value=element.currentStyle[rule];}}
return value;}
this.IFrameRequired=function(){
var ret=false;
var nav=navigator.userAgent.toLowerCase();
if(window.ActiveXObject&&(nav.indexOf("msie 5.5")>=0||nav.indexOf("msie 6.0")>=0)){
var tags=["select", "iframe", "applet"];
for(var i=0;i<tags.length&&!ret;i++)ret=(DOM.Tags(tags[i]).length>0);}
return ret;}
var Hidden=new Array();
this.HideElements=function(node, x1, y1, w, h){
if(window.ActiveXObject&&navigator.userAgent.toLowerCase().indexOf("msie 5.0")>=0){
var i, j, e;
for(i=0;i<Hidden.length;i++)Hidden[i].style.visibility="visible";
var intersect=function(element){
var rx1=DOM.AbsoluteX(element);var ry1=DOM.AbsoluteY(element);
var rx2=rx1+element.offsetWidth+1;var ry2=ry1+element.offsetHeight;
if(element!=node&&rx2>x1&&ry2>y1&&x2>rx1&&y2>ry2){
Hidden.push(element);
element.style.visibility="hidden";}}
Hidden=new Array();
var x2=x1+Math.abs(w);var y2=y1+Math.abs(h);
var tags=["select", "iframe", "applet"];
for(i=0;i<tags.length;i++){
e=DOM.Tags(tags[i]);
for(j=0;j<e.length;j++)intersect(e[j]);}}}}
var Locale=new function(){
var reNumLeadZeros, reNumDP, reNumInvalid, reNumNeg, reNumNegTest;
var dateIndexD, dateIndexM, dateIndexY;
var reValidCharacter=new Array();
this.Initialise=function(){
var neg=this.NegativePre+(this.NegativePre!=this.NegativePost?this.NegativePost:"");
reNumLeadZeros=new RegExp("^0+", "");
reNumDP=new RegExp("["+this.DecimalPoint+"]", "g");
reNumInvalid=new RegExp("[^0-9"+this.DecimalPoint+neg+"]", "g");
reNumNeg=new RegExp("["+neg+"]", "g");
reNumNegTest=new RegExp((this.NegativePre!=""?"^["+this.NegativePre+"]":"")+".+"+(this.NegativePost!=""?"["+this.NegativePost+"]$":""));
var df=this.DateFormat.toLowerCase();
df=df.replace(/[^dmy]/g, "");dateIndexD=df.indexOf("d");dateIndexM=df.indexOf("m");dateIndexY=df.indexOf("y");
if(dateIndexD<0||dateIndexM<0||dateIndexY<0){dateIndexD=0;dateIndexM=1;dateIndexY=2;}
reValidCharacter.string=new RegExp(".", "i");
reValidCharacter.alpha=new RegExp("[a-z|\\-|\\'| ]", "i");
reValidCharacter.text=new RegExp("[\\w|\\s|,|\\.|?|!|\\'|\\\"|&|%|\\-|+|*|=|:|;|@|#|(|)]", "i");
var num="0-9"+(this.NegativePre!=""?"|\\"+this.NegativePre:"")+(this.NegativePost!=""?"|\\"+this.NegativePost:"")+(this.ThousandsSep!=""?"|\\"+this.ThousandsSep:"")+(this.DecimalPoint!=""?"|\\"+this.DecimalPoint:"");
reValidCharacter.digit=new RegExp("[0-9]", "i");
reValidCharacter.number=new RegExp("["+num+"]", "i");
reValidCharacter.currency=new RegExp("["+num+(this.CurrencyPre!=""?"|"+this.CurrencyPre:"")+(this.CurrencyPost!=""?"|"+this.CurrencyPost:"")+"]", "i");
reValidCharacter.percent=new RegExp("["+num+(this.PercentPre!=""?"|"+this.PercentPre:"")+(this.PercentPost!=""?"|"+this.PercentPost:"")+"]", "i");
reValidCharacter.date=new RegExp("[0-9|\\-|\\/|\\\\|.| ]", "i");}
this.toNumber=function(num){
var neg, bdp, adp;
num=String(num);num=num.replace(reNumInvalid, "");neg=(reNumNegTest.test(num)?-1:1);num=num.replace(reNumNeg, "");var p=num.indexOf(this.DecimalPoint);
if(p>=0){
bdp=num.substr(0, p);adp=num.substr(p+1);adp=adp.replace(reNumDP, "");}
else{bdp=num;adp="";}
num=bdp+"."+adp;
if(isNaN(num))num=null;
else num=parseFloat(num)* neg;
return num;}
this.toDate=function(str){
var date=null;str=String(str).Trim();str=str.replace(/^\D+|\D+$/g, "");str=str.replace(/\D+/g, "-");var dig=str.split("-", 3);
if(dig.length==3){
var d=(dig[dateIndexD]).toInt();var m=(dig[dateIndexM]).toInt();var y=(dig[dateIndexY]).toInt();
y+=(y<=30?2000:(y>30&&y<100?1900:0));
var vDate=new Date(y,(m-1), d);
if(d==vDate.getDate()&&(m-1)==vDate.getMonth()&&y==vDate.getFullYear())date=vDate;}
return date;}
this.formatNumeric=function(num, dp, type){
var neg, bdp, adp, obdp;
if(isNaN(num))num=0;
dp=Math.abs(dp.toInt());neg=(num<0);num=String(Math.round(Math.abs(num)* Math.pow(10, dp))).Pad(dp, '0');bdp=num.substr(0, num.length-dp);adp=num.substr(num.length-dp);
if(bdp=="")bdp="0";
else{
do{
obdp=bdp;
bdp=bdp.replace(/(\d+)(\d{3})/g, "$1"+this.ThousandsSep+"$2");}while(bdp!=obdp);}
num=bdp+(dp>0?this.DecimalPoint+adp:"");
switch(type.Trim().toLowerCase()){
case "currency":num=this.CurrencyPre+num+this.CurrencyPost;break;
case "percent":num=this.PercentPre+num+this.PercentPost;break;}
if(neg)num=this.NegativePre+num+this.NegativePost;
return num;}
this.formatNumber=function(num, dp){return this.formatNumeric(num, dp, "number");};this.formatCurrency=function(num, dp){return this.formatNumeric(num, dp, "currency");};this.formatPercent=function(num, dp){return this.formatNumeric(num, dp, "percent");};
this.formatDate=function(date){
var ret="";
if(typeof date!='date')this.toDate(date);
if(date!=null){
ret=this.DateFormat.replace(/[d]/i, String(date.getDate()).Pad(2, 0));ret=ret.replace(/[m]/i, String(date.getMonth()+1).Pad(2, 0));ret=ret.replace(/[y]/i, String(date.getFullYear()));}
return ret;}
this.validCharacter=function(str, type){
str=String(str);
var reTest=(typeof reValidCharacter[type]!='undefined'?reValidCharacter[type]:reValidCharacter.string);
return reTest.test(str);}
this.SetUK=function(){this.ThousandsSep=",";this.DecimalPoint=".";this.NegativePre="-";this.NegativePost="";this.CurrencyPre="\u00a3";this.CurrencyPost="";this.PercentPre="";this.PercentPost="%";this.DateFormat="d-m-y";this.Initialise();}
this.SetUK();}
String.prototype.toNumber=function(){return Locale.toNumber(this);}
String.prototype.toDate=function(){return Locale.toDate(this);}
String.prototype.toEmail=function(){
var email=this.Trim().toLowerCase();
if(email=="")email=null;
else if(email.replace(/^[^@]+@[a-z0-9]+([_\.\-]{0,1}[a-z0-9]+)*([\.]{1}[a-z0-9]+)+$/, "")!="")email=null;
return email;}
String.prototype.toURL=function(){
var url=this.Trim();
url=url.replace(/\\/g, "/");
if(url=="")url=null;
else{
if(url.toLowerCase().indexOf("http://")!=0&&url.toLowerCase().indexOf("https://")!=0)url="http://"+url;
if(url.replace(/^((http(s){0,1}:\/\/){0,1}[a-z0-9]+([_\.\-]{0,1}[a-z0-9]+)*([\.]{1}[a-z0-9]+)+)(\:\d{1,5}){0,1}([\/]{1}[a-z0-9_\.\-]+)*[\/]{0,1}(\?.*){0,1}$/, "")!="")url=null
}
return url;}
Number.prototype.formatNumber=function(dp){return Locale.formatNumber(this, dp);}
Number.prototype.formatCurrency=function(dp){return Locale.formatCurrency(this, dp);}
Number.prototype.formatPercent=function(dp){return Locale.formatPercent(this, dp);}
Date.prototype.formatDate=function(){return Locale.formatDate(this);}
String.prototype.validStringCharacter=function(){return Locale.validCharacter(this, "string");}
String.prototype.validAlphaCharacter=function(){return Locale.validCharacter(this, "alpha");}
String.prototype.validTextCharacter=function(){return Locale.validCharacter(this, "text");}
String.prototype.validDigitCharacter=function(){return Locale.validCharacter(this, "digit");}
String.prototype.validNumberCharacter=function(){return Locale.validCharacter(this, "number");}
String.prototype.validCurrencyCharacter=function(){return Locale.validCharacter(this, "currency");}
String.prototype.validPercentCharacter=function(){return Locale.validCharacter(this, "percent");}
String.prototype.validDateCharacter=function(){return Locale.validCharacter(this, "date");}
new Event(window, "load", FormValidatorSetup);
function FormValidatorSetup(){
var forms=DOM.Class("validate", "form");
for(var i=0;i<forms.length;i++)new FormValidator(forms[i]);}
function FormValidator(form){
this.ReportingFunction=ValidationReport;this.ValidForm=false;this.Element=new Array();this.ElementLength=0;this.InvalidCount=0;this.FirstElement=null;this.LastElement=null;this.Form=(typeof form=="string"?DOM.Id(form):form);
if(this.Form&&this.Form.getAttribute("validated")!="true")this.Initialise();}
FormValidator.prototype.Initialise=function(){
this.Form.setAttribute("validated", "true");
this.FindInputs(this.Form);
var FV=this;
new Event(this.Form, "submit", function(evt){FV.ValidateForm(evt);});
new Event(window, "unload", function(evt){FV.ValidateForm("unload");});
this.ValidateForm("load");
this.Highlight();}
FormValidator.prototype.Highlight=function(eName){
if(!eName&&this.FirstElement!=null)eName=this.FirstElement;
if(eName&&this.Element.Exists(eName)){
var input=this.Element[eName].InputNode;
var type=input.nodeName.toLowerCase();
var subtype=(type=="input"?String(input.getAttribute("type")).Trim().toLowerCase():"");
if(subtype=="null"||subtype=="password")subtype="text";
var cauto=input.getAttribute("autocomplete");if(!cauto)cauto="on";
input.setAttribute("autocomplete", "off");
if((type=="input"&&subtype=="text")||type=="textarea"){try{input.select();}catch(e){};}
try{input.focus();}catch(e){};
input.setAttribute("autocomplete", cauto);}}
FormValidator.prototype.FindInputs=function(node){
var cnode=DOM.ChildElements(node);
for(var i=0;i<cnode.length;i++){
var type=cnode[i].nodeName.toLowerCase();
if(type=="input"||type=="select"||type=="textarea"){
this.ElementLength++;
var eName=cnode[i].id;
if(eName==""||this.Element.Exists(eName))eName="element"+this.ElementLength;
this.Element[eName]=this.ParseInput(cnode[i]);
if(this.FirstElement==null)this.FirstElement=eName;
this.LastElement=eName;
var FV=this;
var handle=function(evt){FV.EventHandler(eName, evt);}
new Event(this.Element[eName].InputNode, "focus", handle);
new Event(this.Element[eName].InputNode, "blur", handle);
var subtype=(type=="input"?String(cnode[i].getAttribute("type")).Trim().toLowerCase():"");
if(subtype=="null"||subtype=="password")subtype="text";
if((type=="input"&&subtype=="text")||type=="textarea")new Event(this.Element[eName].InputNode, "keypress", handle);}
var cDef=" "+cnode[i].className.toLowerCase()+" ";
if(cDef.indexOf(" fieldhelp ")>=0&&this.LastElement!=null){
this.Element[this.LastElement].HelpNode=cnode[i];}
this.FindInputs(cnode[i]);}}
FormValidator.prototype.ParseInput=function(node){
var eId, eName, i;eId=node.id;eName=node.name;var fe;
switch(this.GetClassValue(node, "valid")){
case "string":fe=new StringElement();break;case "alpha":fe=new AlphaElement();break;case "text":fe=new TextElement();break;case "email":fe=new EmailElement();break;case "url":fe=new UrlElement();break;case "date":fe=new DateElement();break;case "digit":fe=new DigitElement();break;case "number":fe=new NumberElement();break;case "currency":fe=new CurrencyElement();break;case "percent":fe=new PercentElement();break;default:fe=new NullElement();break;}
fe.InputNode=node;
if(fe.InputNode.parentNode.nodeName.toLowerCase()=="label")fe.LabelNode=fe.InputNode.parentNode;
else{
var labels=DOM.Tags("label", this.Form);
var lfor;
for(i=0;i<labels.length&&!fe.LabelNode;i++){
lfor=labels[i].getAttribute("for");
if(!lfor&&labels[i].attributes["for"])lfor=labels[i].attributes["for"].nodeValue;
if(lfor==eId||lfor==eName)fe.LabelNode=labels[i];}}
var title=fe.InputNode.getAttribute("title");
if(!title&&fe.LabelNode)title=fe.LabelNode.getAttribute("title");
if(title){
fe.TitleText=title;
fe.InputNode.setAttribute("title", title);
if(fe.LabelNode)fe.LabelNode.setAttribute("title", title);}
fe.Required=(this.GetClassValue(fe.InputNode, "req")!=null);
fe.DP=this.GetClassValue(fe.InputNode, "dp");if(fe.DP==null)fe.DP=0;else fe.DP=fe.DP.toNumber().toInt();
fe.SetLimits(this.GetClassValue(fe.InputNode, "min"), this.GetClassValue(fe.InputNode, "max"));
return fe;}
FormValidator.prototype.GetClassValue=function(input, find){
var iClass=" "+input.className.toLowerCase()+" ";
find=find.toLowerCase();
var ret=null;
var ps=iClass.lastIndexOf(" "+find);
if(ps>=0){
if(find=="req")ret="req";
else{
var pe=iClass.indexOf(" ", ps+1);
if(pe>=ps)ret=iClass.substring(ps+find.length+1, pe);}}
return ret;}
FormValidator.prototype.EventHandler=function(eName, evt){
var eType=(typeof evt=="string"?evt:evt.Raised.Type);
if(eType=="keypress"){
var k=evt.Raised.Key;
if(k!=""&&!this.Element[eName].KeyCheck(k))evt.Raised.StopDefaultAction();}
else{
this.Element[eName].EventType=eType;
this.Element[eName].Validate();
if(this.Element[eName].Value!=this.Element[eName].ValueLast&&eType!="load")this.Element[eName].UserChanged=true;
if(this.Element[eName].Valid||eType=="load")this.Element[eName].ValueLast=this.Element[eName].Value;
this.ValidForm=(this.ValidForm&&this.Element[eName].Valid);
if(!this.Element[eName].Valid)this.Element[eName].InvalidIndex=this.InvalidCount;
if(typeof this.ReportingFunction=="function")this.ReportingFunction(this.Element[eName]);}}
FormValidator.prototype.ValidateForm=function(evt){
var eType=(typeof evt=='undefined'?'check':(typeof evt=='string'?evt:evt.Raised.Type));
this.ValidForm=true;var firstInvalid;this.InvalidCount=1;
for(e in this.Element){
if(this.Element.Exists(e)){
this.EventHandler(e, eType);
if(!this.Element[e].Valid){
if(this.InvalidCount==1)firstInvalid=e;
this.InvalidCount++;}}}
this.InvalidCount=0;
if(!this.ValidForm){
if(eType!="load")this.Highlight(firstInvalid);
if(eType=="submit")evt.Raised.StopDefaultAction();}
return this.ValidForm;}
function StringElement(){
this.InputNode=null;this.LabelNode=null;this.HelpNode=null;this.TitleText=null;this.Required=null;this.Min=null;this.Max=null;this.DP=null;this.MaxLength=null;this.Value=null;this.ValueLast=null;this.Valid=null;this.InvalidIndex=null;this.EventType=null;this.UserChanged=false;}
StringElement.prototype.KeyCheck=function(key, noLimitTest){
var keyOK=this.KeyValid(key);
if(keyOK&&noLimitTest!=true&&this.MaxLength>0){
var sChars=0;
if(typeof(this.InputNode.selectionStart)!='undefined')sChars=this.InputNode.selectionEnd-this.InputNode.selectionStart;
else if(document.selection)sChars=document.selection.createRange().text.length;
keyOK=(this.InputNode.value.length-sChars+1<=this.MaxLength);}
return keyOK;}
StringElement.prototype.KeyValid=function(key){return key.validStringCharacter();}
StringElement.prototype.Validate=function(){
var realVal=this.InputNode.value.Trim();
if(realVal!=''&&this.Min!=null&&realVal.length<this.Min)realVal=null;
if(realVal!=''&&realVal!=null&&this.Max!=null&&realVal.length>this.Max)realVal=null;
for(var i=0;realVal!=null&&i<realVal.length;i++)if(!this.KeyCheck(realVal.charAt(i), true))realVal=null;
this.UpdateField(realVal);}
StringElement.prototype.UpdateField=function(newValue){
this.Value=newValue;
this.Valid=((newValue!=null&&newValue!='')||(newValue==''&&!this.Required));
if(this.Valid&&this.InputNode.value!=newValue)this.InputNode.value=newValue;}
StringElement.prototype.FormatValue=function(newValue){return newValue;}
StringElement.prototype.SetLimits=function(minV, maxV){
if(typeof(minV)!='undefined'&&minV!=null)this.Min=minV.toNumber().toInt();
if(typeof(maxV)!='undefined'&&maxV!=null)this.Max=maxV.toNumber().toInt();
this.SetMaxLength();}
StringElement.prototype.SetMaxLength=function(){
this.MaxLength=this.FindMaxlength();}
StringElement.prototype.FindMaxlength=function(){
var minL=(this.Min!=null?this.Min:0);
var maxL=(this.Max!=null?this.Max:0);
return Math.max(minL, maxL);}
function AlphaElement(){}
AlphaElement.prototype=new StringElement;
AlphaElement.prototype.KeyValid=function(key){return key.validAlphaCharacter();}
function TextElement(){}
TextElement.prototype=new StringElement;
TextElement.prototype.KeyValid=function(key){return key.validTextCharacter();}
function EmailElement(){}
EmailElement.prototype=new StringElement;
EmailElement.prototype.Validate=function(){
var value=this.InputNode.value.Trim();
if(value=="")this.UpdateField("");
else{
var realVal=value.toEmail();
if(realVal!=null&&this.Min!=null&&realVal.length<this.Min)realVal=null;
if(realVal!=null&&this.Max!=null&&realVal.length>this.Max)realVal=null;
this.UpdateField(realVal);}}
function UrlElement(){}
UrlElement.prototype=new StringElement;
UrlElement.prototype.Validate=function(){
var value=this.InputNode.value.Trim();
if(value=="")this.UpdateField("");
else{
var realVal=value.toURL();
if(realVal!=null&&this.Min!=null&&realVal.length<this.Min)realVal=null;
if(realVal!=null&&this.Max!=null&&realVal.length>this.Max)realVal=null;
this.UpdateField(realVal);}}
function DateElement(){}
DateElement.prototype=new StringElement;
DateElement.prototype.KeyValid=function(key){return key.validDateCharacter();}
DateElement.prototype.Validate=function(){
var value=this.InputNode.value.Trim();
if(value=="")this.UpdateField("");
else{
var realVal=value.toDate();
if(realVal!=null&&this.Min!=null&&realVal<this.Min)realVal=null;
if(realVal!=null&&this.Max!=null&&realVal>this.Max)realVal=null;
this.UpdateField(this.FormatValue(realVal));}}
DateElement.prototype.FormatValue=function(newValue){return(newValue==null?null:newValue.formatDate());}
DateElement.prototype.SetLimits=function(minV, maxV){
var StrToDate=function(dstr){
dstr=String(dstr);
var d=dstr.toDate();
if(d==null&&dstr.length==8)d=dstr.SerialToDate();
return d;}
if(typeof(minV)!='undefined'&&minV!=null)this.Min=StrToDate(minV);
if(typeof(maxV)!='undefined'&&maxV!=null)this.Max=StrToDate(maxV);
this.SetMaxLength();}
DateElement.prototype.FindMaxlength=function(){
var minL=(this.Min!=null?String(this.Min.formatDate()).length:0);
var maxL=(this.Max!=null?String(this.Max.formatDate()).length:0);
return Math.max(minL, maxL);}
function DigitElement(){}
DigitElement.prototype=new StringElement;
DigitElement.prototype.KeyValid=function(key){return key.validDigitCharacter();}
function NumberElement(){}
NumberElement.prototype=new StringElement;
NumberElement.prototype.KeyValid=function(key){return key.validNumberCharacter();}
NumberElement.prototype.Validate=function(){
var value=this.InputNode.value.Trim();
if(value=="")this.UpdateField("");
else{
var realVal=value.toNumber();
if(realVal!=null&&this.Min!=null&&realVal<this.Min)realVal=null;
if(realVal!=null&&this.Max!=null&&realVal>this.Max)realVal=null;
this.UpdateField(this.FormatValue(realVal));}}
NumberElement.prototype.FormatValue=function(newValue){return(newValue==null?null:newValue.formatNumber(this.DP));}
NumberElement.prototype.SetLimits=function(minV, maxV){
if(typeof(minV)!='undefined'&&minV!=null)this.Min=minV.toNumber();
if(typeof(maxV)!='undefined'&&maxV!=null)this.Max=maxV.toNumber();
this.SetMaxLength();}
NumberElement.prototype.FindMaxlength=function(){
var minL=(this.Min!=null?String(this.FormatValue(this.Min)).length:0);
var maxL=(this.Max!=null?String(this.FormatValue(this.Max)).length:0);
return Math.max(minL, maxL);}
function CurrencyElement(){}
CurrencyElement.prototype=new NumberElement;
CurrencyElement.prototype.KeyValid=function(key){return key.validCurrencyCharacter();}
CurrencyElement.prototype.FormatValue=function(newValue){return(newValue==null?null:newValue.formatCurrency(this.DP));}
function PercentElement(){}
PercentElement.prototype=new NumberElement;
PercentElement.prototype.KeyValid=function(key){return key.validPercentCharacter();}
PercentElement.prototype.FormatValue=function(newValue){return(newValue==null?null:newValue.formatPercent(this.DP));}
function NullElement(){}
NullElement.prototype=new StringElement;
NullElement.prototype.KeyValid=function(key){return true;}
NullElement.prototype.Validate=function(){this.Value=this.InputNode.value;this.Valid=true;}
var FocusStyle="focus";var ErrorStyle="inputerror";var DisabledStyle="disabled";function ElementEnable(Element, enable){
enable=(enable||typeof enable=="undefined");
Element.InputNode.disabled=!enable;Element.InputNode.readOnly=!enable;
if(enable){
Graphic.ClassRemove(Element.InputNode, DisabledStyle);Graphic.ClassRemove(Element.LabelNode, DisabledStyle);}
else{
Graphic.ClassApply(Element.InputNode, DisabledStyle);Graphic.ClassApply(Element.LabelNode, DisabledStyle);}}
function ValidationReport(Element){
var event=Element.EventType;
var input=Element.InputNode;
var iType=input.getAttribute("type");
var label=Element.LabelNode;
var help=Element.HelpNode;
if(event=="load"&&help)help.style.display="none";
if(event=="focus"){
if(iType!="checkbox"&&iType!="radio")Graphic.ClassApply(input, FocusStyle);
if(label)Graphic.ClassApply(label, FocusStyle);
input.setAttribute("title", "");}
else if(event=="blur"){
if(iType!="checkbox"&&iType!="radio")Graphic.ClassRemove(input, FocusStyle);
if(label)Graphic.ClassRemove(label, FocusStyle);
input.setAttribute("title", Element.TitleText);}
if(!Element.Valid){
if(iType!="checkbox"&&iType!="radio")Graphic.ClassApply(input, ErrorStyle);
if(label)Graphic.ClassApply(label, ErrorStyle);}
else{
if(iType!="checkbox"&&iType!="radio")Graphic.ClassRemove(input, ErrorStyle);
if(label)Graphic.ClassRemove(label, ErrorStyle);}
if(event=="focus")FieldHelpBox(input, help);else FieldHelpBox();}
function FieldHelpBox(InputNode, HelpNode){
var boxid="fieldhelpbox";var iframeid="fieldhelpiframe";var box=DOM.Id(boxid);var ibox=DOM.Id(iframeid);
if(!box){
var body=DOM.Tags('body');
if(body.length>0){
if(Graphic.IFrameRequired()){
var ifBox=document.createElement("iframe");
ifBox.id=iframeid;ifBox.src="none";ifBox.frameBorder="0";ifBox.scrolling="no";ifBox.style.position="absolute";ifBox.style.width="1px";ifBox.style.height="1px";ifBox.style.top="0px";ifBox.style.left="0px";ifBox.style.filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
body[0].appendChild(ifBox);
ibox=DOM.Id(iframeid);}
var fhBox=document.createElement("div");fhBox.id=boxid;
var div=document.createElement("div");div.id="fht";fhBox.appendChild(div);div=document.createElement("div");div.id="fhc";fhBox.appendChild(div);div=document.createElement("div");div.id="fhb";fhBox.appendChild(div);div=document.createElement("div");div.id="fhs";fhBox.appendChild(div);body[0].appendChild(fhBox);
box=DOM.Id(boxid);}}
if(box){
if(ibox)ibox.style.visibility="hidden";
box.style.visibility="hidden";Graphic.HideElements(null,-1,-1,-1,-1);
if(InputNode&&HelpNode){
DOM.RemoveChildren(box.childNodes[1]);DOM.Copy(HelpNode, box.childNodes[1]);
var vw=600;var viewport=DOM.Tags("html");
if(viewport.length>0)vw=viewport[0].offsetWidth-24;
var xOffset=-7;var yOffset=1;var bw=box.offsetWidth;var bh=box.offsetHeight;
var bx=DOM.AbsoluteX(InputNode)+InputNode.offsetWidth+xOffset;
if(bx+bw>vw)bx=vw-bw;
var by=DOM.AbsoluteY(InputNode);
if(by-bh+yOffset>0)by+=yOffset-bh;else by+=InputNode.offsetHeight-yOffset;
bx-=DOM.AbsoluteX(box.offsetParent);by-=DOM.AbsoluteY(box.offsetParent);
if(ibox){ibox.style.left=bx+"px";ibox.style.top=by+"px";ibox.style.width=bw;ibox.style.height=bh;ibox.style.visibility="visible";}
Graphic.HideElements(InputNode, bx, by, bw, bh);box.style.left=bx+"px";box.style.top=by+"px";
box.style.visibility="visible";}}}