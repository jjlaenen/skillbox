(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){e.exports=a.p+"static/media/skillbox.a07b6d2f.png"},18:function(e,t,a){e.exports=a(35)},23:function(e,t,a){},24:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(9),r=a.n(i),c=(a(23),a(10)),s=a(11),o=a(12),u=a(17),m=a(13),p=a(4),v=a(16),d=(a(24),a(7)),h=a.n(d);h.a.initializeApp({apiKey:"AIzaSyCDEBPky0YohO1YG3L0ubJrI0pV1B5CnOo",authDomain:"skillbox-9fa58.firebaseapp.com",databaseURL:"https://skillbox-9fa58.firebaseio.com",projectId:"skillbox-9fa58",storageBucket:"skillbox-9fa58.appspot.com",messagingSenderId:"621423399264",appId:"1:621423399264:web:20c417aa3770a43b"});var E=h.a,b=a(15),g=a.n(b),f=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={Description:"",DescriptionC:"",customAct:[],Category:"",Level:"",Source:"",Time:"",Step:"",addCustom:"",custom:"",initial:"",currentLevel:"",finished:"",start:"",random:"",step:"",trainingSubject:"",hasDescription:!1,inputOptions:[],Activities:[]},a.handleChange=a.handleChange.bind(Object(p.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(p.a)(a)),a.handleSelect=a.handleSelect.bind(Object(p.a)(a)),a.handleInitial=a.handleInitial.bind(Object(p.a)(a)),a}return Object(v.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(c.a)({},e.target.name,e.target.value))}},{key:"handleSelect",value:function(e){e.preventDefault();var t=E.database().ref("inputOptions"),a={currentLevel:this.state.currentLevel,trainingSubject:this.state.trainingSubject,initial:this.state.initial};t.update(a),this.setState({currentLevel:"",trainingSubject:"",initial:"no"})}},{key:"handleInitial",value:function(e){e.preventDefault();var t=E.database().ref("inputOptions"),a={initial:this.state.initial};t.update(a),this.setState({initial:"yes"})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=E.database().ref("Activities"),a={Description:this.state.Description,Category:this.state.Category,Level:this.state.Level,Source:this.state.Source,Time:this.state.Time,Step:parseInt(this.state.Step)};t.push(a),this.setState({Description:"",Category:"",Level:"",Source:"",Time:"",Step:""})}},{key:"componentDidMount",value:function(){var e=this;E.database().ref("randomAct/DescriptionR").on("value",function(t){var a=t.val();e.setState({rDesc:a})}),E.database().ref("inputOptions/step").on("value",function(t){var a=t.val();e.setState({currentStep:a})}),E.database().ref("inputOptions/random").on("value",function(t){var a=t.val();e.setState({Random:a})}),E.database().ref("inputOptions/trainingSubject").on("value",function(t){var a=t.val();e.setState({showSubject:a})}),E.database().ref("inputOptions/currentLevel").on("value",function(t){var a=t.val();e.setState({showTheLevel:a})});var t=E.database().ref("Activities"),a=E.database().ref("inputOptions");t.on("value",function(t){var a=t.val(),n=[];for(var l in a)n.push({id:l,Description:a[l].Description,Category:a[l].Category,Level:a[l].Level,Source:a[l].Source,Time:a[l].Time,Step:a[l].Step});e.setState({Activities:n})}),a.on("value",function(t){var a=t.val(),n=[];n.push({currentLevel:a.currentLevel,finished:a.finished,initial:a.initial,start:a.start,trainingSubject:a.trainingSubject}),e.setState({inputOptions:n,trainingSubject:a.trainingSubject})})}},{key:"componentDidUpdate",value:function(){var e=this,t=E.database().ref("inputOptions/done"),a=E.database().ref("inputOptions/notUse"),n=E.database().ref("inputOptions/random"),l=E.database().ref("Activities"),i="",r="",c="";a.on("value",function(e){c=e.val()}),t.on("value",function(e){r=e.val()});var s=[];n.on("value",function(e){i=e.val()}),l.on("value",function(t){var a=t.val();for(var n in a){if(a.hasOwnProperty(n)){if(s.push(a[n].Description),"yes"===r){var l=E.database().ref("inputOptions");if(e.state.rDesc===a[n].Description)console.log("test"),E.database().ref("/Activities/".concat(n)).update({Step:9}),l.update({done:"no"})}if("yes"===c){var o=E.database().ref("inputOptions");if(e.state.rDesc===a[n].Description)console.log("test"),E.database().ref("/Activities/".concat(n)).update({Step:0}),o.update({notUse:"no"})}}if("yes"===i&&a[n].Step===e.state.currentStep){var u=s[Math.floor(Math.random()*s.length)];console.log(e.state.currentStep);var m=E.database().ref("randomAct"),p=E.database().ref("inputOptions");m.update({DescriptionR:u}),p.update({random:"no"})}}})}},{key:"removeItem",value:function(e){E.database().ref().child("/Activities/".concat(e,"/Step")).set(0)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"app"},l.a.createElement("header",null,l.a.createElement("div",{className:"wrapper"},l.a.createElement("img",{id:"logo",src:g.a,width:"60px"}))),l.a.createElement("div",{className:"container"},this.state.inputOptions.map(function(t){if("no"==t.initial)return l.a.createElement("section",{className:"add-item"},l.a.createElement("form",{onSubmit:e.handleSubmit},l.a.createElement("h3",{class:"title"},"Add a custom activity if you want"),l.a.createElement("select",{class:"select",name:"Category",onChange:e.handleChange,value:e.state.Category},l.a.createElement("option",{value:""},"select the category"),l.a.createElement("option",{value:"3d-modeling"},"3d modeling in 3ds max"),l.a.createElement("option",{value:"leadership"},"Leadership")),l.a.createElement("input",{class:"select",type:"text",name:"Description",placeholder:"Describe the activity",onChange:e.handleChange,value:e.state.Description}),l.a.createElement("select",{class:"select",name:"Level",onChange:e.handleChange,value:e.state.Level},l.a.createElement("option",{value:""},"Select your level"),l.a.createElement("option",{value:"beginner    "},"beginner"),l.a.createElement("option",{value:"intermediate"},"intermediate"),l.a.createElement("option",{value:"advanced"},"advanced")),l.a.createElement("select",{class:"select",type:"number",name:"Step",onChange:e.handleChange,value:parseInt(e.state.Step)},l.a.createElement("option",{value:""},"Select the step"),l.a.createElement("option",{value:1},"1"),l.a.createElement("option",{value:2},"2"),l.a.createElement("option",{value:3},"3"),l.a.createElement("option",{value:4},"4"),l.a.createElement("option",{value:5},"5"),l.a.createElement("option",{value:6},"6"),l.a.createElement("option",{value:7},"7"),l.a.createElement("option",{value:8},"8")),l.a.createElement("input",{class:"select",type:"text",name:"Source",placeholder:"Where can you find the resources?",onChange:e.handleChange,value:e.state.Source}),l.a.createElement("input",{class:"select",type:"text",name:"Time",placeholder:"How long will the activity take?",onChange:e.handleChange,value:e.state.Time}),l.a.createElement("button",{class:"button1"},"Add Item")),l.a.createElement("form",{onSubmit:e.handleInitial},l.a.createElement("button",{class:"button1",name:"initial",onClick:e.handleChange,value:"yes"},"Start new learning goal")))}),this.state.inputOptions.map(function(t){if("yes"==t.initial)return l.a.createElement("section",{className:"add-item"},l.a.createElement("h3",{class:"title"},"Select your learning goal"),l.a.createElement("form",{onSubmit:e.handleSelect},l.a.createElement("select",{name:"trainingSubject",onChange:e.handleChange,value:e.state.trainingSubject},l.a.createElement("option",{value:""},"select your learning goal"),l.a.createElement("option",{value:"3d-modeling"},"3d modeling in 3ds max"),l.a.createElement("option",{value:"leadership"},"Leadership")),l.a.createElement("select",{name:"currentLevel",onChange:e.handleChange,value:e.state.currentLevel},l.a.createElement("option",{value:""},"Select your level"),l.a.createElement("option",{value:"beginner    "},"beginner"),l.a.createElement("option",{value:"intermediate"},"intermediate"),l.a.createElement("option",{value:"advanced"},"advanced")),l.a.createElement("button",{class:"button1",name:"initial",onClick:e.handleChange,value:"no"},"Submit")))}),l.a.createElement("section",{className:"display-item"},l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 1 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&1==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 2 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&2==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 3 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&3==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 4 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&4==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 5 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&5==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 6 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&6==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 7 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&7==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"step 8 options"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&t.Level==e.state.showTheLevel&&8==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category),l.a.createElement("p",null,"level: ",t.Level),l.a.createElement("p",null,"step: ",t.Step),l.a.createElement("p",null,"required time: ",t.Time,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("a",{class:"button2",href:t.Source,target:"_blank"},"Visit training"),l.a.createElement("a",{class:"buttonRemove",onClick:function(){return e.removeItem(t.id)}},"Remove Item"))))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"Finished items"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&9==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category)))}))),l.a.createElement("div",{className:"wrapper"},l.a.createElement("h3",null,"Removed items"),l.a.createElement("ul",null,this.state.Activities.map(function(t){if(t.Category==e.state.showSubject&&0==t.Step)return l.a.createElement("div",{className:"display-item"},l.a.createElement("li",{key:t.id},l.a.createElement("h4",null,t.Description),l.a.createElement("p",null,"category: ",t.Category)))}))))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,1,2]]]);
//# sourceMappingURL=main.27cc16c1.chunk.js.map