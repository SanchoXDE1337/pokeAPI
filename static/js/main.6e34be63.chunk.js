(this.webpackJsonppokeAPI=this.webpackJsonppokeAPI||[]).push([[0],{36:function(e,t,a){e.exports=a(66)},41:function(e,t,a){},60:function(e,t,a){},66:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(32),i=a.n(c),s=(a(41),a(33)),u=a(19),o=a(2),l=a.n(o),p=a(8),m=a(14),f=a(15),h=a(20),d=a(16),v=a(21),b=a(12),k=a.n(b),O=a(11),E=a(7);a(60);function y(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var j=function(e){var t=e.name,a=e.imgLink,n=e.className,c=e.id;return r.a.createElement(O.b,{to:"/pokeAPI/pokemon/".concat(c),className:n},r.a.createElement("div",null,r.a.createElement("p",null,x(t)),r.a.createElement("img",{src:a,alt:t})))},w=function(e){var t=e.src;return r.a.createElement("img",{src:t,alt:"",style:{width:"",height:"15vh"}})},g=function(e){var t=e.name,a=e.effect;return r.a.createElement("div",{className:"ability"},r.a.createElement("div",{className:"abilityName"},x(t)),r.a.createElement("div",null,a))},x=function(e){return e[0].toUpperCase()+e.slice(1)},P=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).fetchData=function(){var e=Object(p.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return e.next=4,e.sent.json();case 4:return n=e.sent,e.next=7,a.setState({data:n,abilityLink:[],abilities:[]});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.fetchAbilities=Object(p.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r in n=[],t=a.state.data.abilities)n.push(t[r].ability.url);return e.next=5,n.map(function(){var e=Object(p.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k()(t);case 2:return n=e.sent.data,e.next=5,a.setState({abilities:[].concat(Object(u.a)(a.state.abilities),[{name:n.name,effect:n.effect_entries[0].effect}])});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)}))),a.state={},a}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchData(this.props.url);case 2:return e.next=4,this.fetchAbilities();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;if(this.state.abilities){var t=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(a,!0).forEach((function(t){Object(s.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):y(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},this.state.data.sprites),a=[];for(var n in t)null!==t[n]&&a.push(t[n]);return a.reverse(),r.a.createElement("div",{className:"pokeCard"},r.a.createElement("div",{className:"pokeName"},x(this.state.data.name)),r.a.createElement("div",null,a.map((function(t){return r.a.createElement(w,{src:t,alt:e.state.data.name,key:t})}))),r.a.createElement("div",null,r.a.createElement("p",null,"Weight: ",this.state.data.weight/10+"kg"),r.a.createElement("p",null,"Height: ",this.state.data.height/10+"m")),r.a.createElement("div",null,this.state.abilities.map((function(e){var t=e.name,a=e.effect;return r.a.createElement(g,{name:t,effect:a,key:t+a})}))),r.a.createElement(O.b,{to:"/pokeAPI/"},r.a.createElement("div",null,r.a.createElement("button",null,"Back"))))}return null}}]),t}(r.a.Component),N=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={pokemons:[]},a.addCards=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k()("https://pokeapi.co/api/v2/pokemon/");case 2:t=e.sent.data,t.results.map(function(){var e=Object(p.a)(l.a.mark((function e(t){var n,r,c,i,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.name,r=t.url,e.next=3,k()(r);case 3:return c=e.sent.data,i=c.sprites.front_default,s=c.id,e.next=8,a.setState({pokemons:[].concat(Object(u.a)(a.state.pokemons),[{name:n,url:r,imgLink:i,id:s}])});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)}))),a}return Object(v.a)(t,e),Object(f.a)(t,[{key:"componentDidMount",value:function(){var e=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.addCards();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement(O.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement(O.b,{to:"/pokeAPI/"},r.a.createElement("div",{className:"header"}))),r.a.createElement("div",{className:"content"},r.a.createElement(E.a,{exact:!0,path:"/pokeAPI/",component:function(){return e.state.pokemons.map((function(e){var t=e.name,a=e.imgLink,n=e.url,c=e.id;return r.a.createElement(j,{className:"card",name:t,url:n,key:t+a,imgLink:a,id:c})}))}}),this.state.pokemons.map((function(e){var t=e.id,a=e.url;return r.a.createElement(E.a,{path:"/pokeAPI/pokemon/".concat(t),key:t,render:function(){return r.a.createElement(P,{url:a})}})})))))}}]),t}(r.a.Component);i.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.6e34be63.chunk.js.map