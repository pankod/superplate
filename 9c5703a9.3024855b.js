(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{104:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return d}));var a=n(3),i=n(7),r=(n(0),n(122)),o=n(126),c=n(127),s={id:"tailwind",title:"Tailwind CSS",sidebar_label:"Tailwind CSS",description:"How to use Tailwind CSS in Next.js?"},l={unversionedId:"tailwind",id:"tailwind",isDocsHomePage:!1,title:"Tailwind CSS",description:"How to use Tailwind CSS in Next.js?",source:"@site/docs/tailwind.md",slug:"/tailwind",permalink:"/superplate/docs/tailwind",editUrl:"https://github.com/pankod/superplate/tree/master/documentation/docs/tailwind.md",version:"current",lastUpdatedBy:"Ali Emir \u015een",lastUpdatedAt:1612506169,sidebar_label:"Tailwind CSS",sidebar:"someSidebar",previous:{title:"Getting started",permalink:"/superplate/docs/"},next:{title:"Bootstrap",permalink:"/superplate/docs/bootstrap"}},u=[{value:"Configuration files",id:"configuration-files",children:[]},{value:"Include Tailwind in your CSS",id:"include-tailwind-in-your-css",children:[]},{value:"Purging unused styles",id:"purging-unused-styles",children:[]},{value:"Configuring PostCSS",id:"configuring-postcss",children:[]},{value:"Adding Tailwind CSS to your project later",id:"adding-tailwind-css-to-your-project-later",children:[]}],p={toc:u};function d(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",Object(r.b)("br",{parentName:"p"}),"\n",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://tailwindcss.com/docs"}),"Go to Docs ","\u2192")),Object(r.b)("h2",{id:"configuration-files"},"Configuration files"),Object(r.b)("p",null,"Tailwind plugin produces the two ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://tailwindcss.com/docs/guides/nextjs#create-your-configuration-files"}),"necessary config files:")," ",Object(r.b)("inlineCode",{parentName:"p"},"tailwind.config.js")," and ",Object(r.b)("inlineCode",{parentName:"p"},"postcss.config.js"),Object(r.b)("br",{parentName:"p"}),"\n",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://tailwindcss.com/docs/configuration"}),"See Tailwind configuration docs ","\u2192")),Object(r.b)("h2",{id:"include-tailwind-in-your-css"},"Include Tailwind in your CSS"),Object(r.b)("p",null,"Tailwind is imported directly in ",Object(r.b)("inlineCode",{parentName:"p"},"_app.tsx")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="pages/_app.tsx"',title:'"pages/_app.tsx"'}),'import "tailwindcss/tailwind.css";\n')),Object(r.b)("p",null,Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://tailwindcss.com/docs/guides/nextjs#include-tailwind-in-your-css"}),"You can also include tailwind in your custom css ","\u2192")),Object(r.b)("h2",{id:"purging-unused-styles"},"Purging unused styles"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"tailwind.config.js")," is configured to purge unused styles in pages and components."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="tailwind.config.js"',title:'"tailwind.config.js"'}),'module.exports = {\n    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"]\n}\n')),Object(r.b)("p",null,Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://tailwindcss.com/docs/optimizing-for-production"}),"See guide on optimizing for production on Tailwind docs ","\u2192")),Object(r.b)("h2",{id:"configuring-postcss"},"Configuring PostCSS"),Object(r.b)("p",null,"Finally, we need to create a ",Object(r.b)("inlineCode",{parentName:"p"},"postcss.config.js")," file to set up Tailwind with Next.js properly."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js",metastring:'title="postcss.config.js"',title:'"postcss.config.js"'}),"module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}\n")),Object(r.b)("h2",{id:"adding-tailwind-css-to-your-project-later"},"Adding Tailwind CSS to your project later"),Object(r.b)(o.a,{defaultValue:"npm",values:[{label:"npm",value:"npm"},{label:"yarn",value:"yarn"}],mdxType:"Tabs"},Object(r.b)(c.a,{value:"npm",mdxType:"TabItem"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"npm install tailwindcss@latest postcss@latest autoprefixer@latest\n"))),Object(r.b)(c.a,{value:"yarn",mdxType:"TabItem"},Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),"yarn add tailwindcss@latest postcss@latest autoprefixer@latest\n")))),Object(r.b)("p",null,Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://tailwindcss.com/docs/installation"}),"Refer to official documentation for detailed installation. ","\u2192")))}d.isMDXComponent=!0},122:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var a=n(0),i=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),u=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),b=a,f=p["".concat(o,".").concat(b)]||p[b]||d[b]||r;return n?i.a.createElement(f,c(c({ref:t},l),{},{components:n})):i.a.createElement(f,c({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<r;l++)o[l]=n[l];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},123:function(e,t,n){"use strict";function a(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}t.a=function(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(i&&(i+=" "),i+=t);return i}},124:function(e,t,n){"use strict";var a=n(0),i=n(125);t.a=function(){var e=Object(a.useContext)(i.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},125:function(e,t,n){"use strict";var a=n(0),i=Object(a.createContext)(void 0);t.a=i},126:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(124),o=n(123),c=n(55),s=n.n(c),l=37,u=39;t.a=function(e){var t=e.lazy,n=e.block,c=e.defaultValue,p=e.values,d=e.groupId,b=e.className,f=Object(r.a)(),m=f.tabGroupChoices,j=f.setTabGroupChoices,g=Object(a.useState)(c),O=g[0],y=g[1],w=a.Children.toArray(e.children);if(null!=d){var v=m[d];null!=v&&v!==O&&p.some((function(e){return e.value===v}))&&y(v)}var h=function(e){y(e),null!=d&&j(d,e)},x=[];return i.a.createElement("div",null,i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(o.a)("tabs",{"tabs--block":n},b)},p.map((function(e){var t=e.value,n=e.label;return i.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":O===t,className:Object(o.a)("tabs__item",s.a.tabItem,{"tabs__item--active":O===t}),key:t,ref:function(e){return x.push(e)},onKeyDown:function(e){!function(e,t,n){switch(n.keyCode){case u:!function(e,t){var n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()}(e,t);break;case l:!function(e,t){var n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,t)}}(x,e.target,e)},onFocus:function(){return h(t)},onClick:function(){h(t)}},n)}))),t?Object(a.cloneElement)(w.filter((function(e){return e.props.value===O}))[0],{className:"margin-vert--md"}):i.a.createElement("div",{className:"margin-vert--md"},w.map((function(e,t){return Object(a.cloneElement)(e,{key:t,hidden:e.props.value!==O})}))))}},127:function(e,t,n){"use strict";var a=n(3),i=n(0),r=n.n(i);t.a=function(e){var t=e.children,n=e.hidden,i=e.className;return r.a.createElement("div",Object(a.a)({role:"tabpanel"},{hidden:n,className:i}),t)}}}]);