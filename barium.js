let regexTagTypes=[],regex="";const keys={},barium={tags:[],add:(Function.prototype,function(t){if(!t.name||"string"!=typeof t.name)throw new Error("inputted tag doesn't have a tag type or the tag type isn't a string");if(!t.func||"function"!=typeof t.func)throw new Error("inputted tag doesn't have a tag function or the inputted tag function isn't a function");regexTagTypes.push(`(<${t.name}>(.*?)</${t.name}>)`),barium.tags.push(t);const n=barium.tags.indexOf(t);barium.tags[n].multiplier=n+1}),replace:(Function.prototype,function(t,n){const e=barium.tags.find((t=>t.name===n));if(!e)return console.warn("no tag exists with type "+n),[t.replace(regex,"$1"),"p"];const r=e.func(t.replace(regex,"$"+2*e.multiplier));if(!r[0]||"string"!=typeof r[0])throw new Error("no valid content was returned from "+n+"'s function");if(!r[1]||"string"!=typeof r[1])throw new Error("no valid tag type was returned from "+n+"'s function");return[r[0],r[1]]}),initial:(Function.prototype,function(){regex=new RegExp(regexTagTypes.join("|"),"g");const t=document.body.innerHTML.toString();let n=0;const e=t.replace(regex,(t=>{const e=t.replace(/<(.*?)>(.*?)<\/(.*?)>/g,"$1"),r=barium.replace(t,e);if("object"!=typeof r||2!=r.length)throw new Error("replace function didn't return a 2 long array\nreplace() returned: "+r.join(" | "));const o=`<${r[1]}>${r[0]}</${r[1]}>`;return keys[n]=[e,`<${e}>${r[0]}</${e}>`,o],n++,o}));document.body.innerHTML=e}),reapply:(Function.prototype,function(){for(const t in keys){const n=document.body.innerHTML.toString(),e=barium.replace(keys[t][1],keys[t][0]),r=`<${e[1]}>${e[0]}</${e[1]}>`,o=keys[t][1].replace(/<(.*?)>(.*?)<\/(.*?)>/g,"$1");document.body.innerHTML=n.replace(keys[t][2],r),keys[t]=[o,`<${o}>${e[0]}</${o}>`,r]}}),addMultiple:(Function.prototype,function(t){if(!t||"object"!=typeof t)throw new Error("no tags inputted or the function input isn't an array");for(let n=0;n<t.length;n++)barium.add(t[n])}),tag:class{constructor(t,n){if("string"!=typeof t)throw new Error(`tag type ${t} isn't a string`);if("function"!=typeof n)throw new Error("inputed tag function isn't a function");this.name=t,this.func=n,this.multiplier=1}}};