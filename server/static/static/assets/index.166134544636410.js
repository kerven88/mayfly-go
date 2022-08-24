var Y=Object.defineProperty,Z=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var ee=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var O=(e,t,m)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:m}):e[t]=m,y=(e,t)=>{for(var m in t||(t={}))ee.call(t,m)&&O(e,m,t[m]);if(K)for(var m of K(t))oe.call(t,m)&&O(e,m,t[m]);return e},q=(e,t)=>Z(e,x(t));import{A as P,r as L,v as H,t as z,_ as N,b as d,d as h,e as b,g as s,w as l,h as o,i as a,F as A,j as k,q as se,E as U,k as w,K as te,z as R,B as f,o as le,G as ue}from"./index.1661345446364.js";import{r as B}from"./api.16613454463645.js";import{p as G}from"./api.16613454463644.js";import{m as ne}from"./api.16613454463643.js";import{R as ae}from"./rsa.1661345446364.js";import"./Api.1661345446364.js";import"./assert.1661345446364.js";const ie=P({name:"Info",props:{visible:{type:Boolean},title:{type:String},info:{type:[Boolean,Object]}},setup(e,{emit:t}){const m=L({dialogVisible:!1});H(()=>e.visible,E=>{m.dialogVisible=E});const p=()=>{t("update:visible",!1),t("close")};return q(y({},z(m)),{close:p})}}),re={class:"row"},de=o("span",{class:"title"},"redis_version(\u7248\u672C):",-1),pe={class:"value"},ce={class:"row"},_e=o("span",{class:"title"},"tcp_port(\u7AEF\u53E3):",-1),me={class:"value"},fe={class:"row"},he=o("span",{class:"title"},"redis_mode(\u6A21\u5F0F):",-1),Fe={class:"value"},ve={class:"row"},ge=o("span",{class:"title"},"os(\u5BBF\u4E3B\u64CD\u4F5C\u7CFB\u7EDF):",-1),Ee={class:"value"},be={class:"row"},we=o("span",{class:"title"},"uptime_in_days(\u8FD0\u884C\u5929\u6570):",-1),Ce={class:"value"},ye={class:"row"},Be=o("span",{class:"title"},"executable(\u53EF\u6267\u884C\u6587\u4EF6\u8DEF\u5F84):",-1),De={class:"value"},Ae={class:"row"},ke=o("span",{class:"title"},"config_file(\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84):",-1),Ie={class:"value"},Ve={class:"row"},$e=o("span",{class:"title"},"connected_clients(\u5DF2\u8FDE\u63A5\u5BA2\u6237\u7AEF\u6570):",-1),Se={class:"value"},je={class:"row"},qe=o("span",{class:"title"},"blocked_clients(\u6B63\u5728\u7B49\u5F85\u963B\u585E\u547D\u4EE4\u5BA2\u6237\u7AEF\u6570):",-1),Ue={class:"value"},Re={class:"title"},Te={class:"value"},Me={class:"row"},Pe=o("span",{class:"title"},"total_commands_processed(\u603B\u5904\u7406\u547D\u4EE4\u6570):",-1),Le={class:"value"},ze={class:"row"},Ne=o("span",{class:"title"},"instantaneous_ops_per_sec(\u5F53\u524Dqps):",-1),Ke={class:"value"},Oe={class:"row"},He=o("span",{class:"title"},"total_net_input_bytes(\u7F51\u7EDC\u5165\u53E3\u6D41\u91CF\u5B57\u8282\u6570):",-1),Ge={class:"value"},Je={class:"row"},Qe=o("span",{class:"title"},"total_net_output_bytes(\u7F51\u7EDC\u51FA\u53E3\u6D41\u91CF\u5B57\u8282\u6570):",-1),We={class:"value"},Xe={class:"row"},Ye=o("span",{class:"title"},"expired_keys(\u8FC7\u671Fkey\u7684\u603B\u6570\u91CF):",-1),Ze={class:"value"},xe={class:"row"},eo=o("span",{class:"title"},"instantaneous_ops_per_sec(\u5F53\u524Dqps):",-1),oo={class:"value"},so={class:"row"},to=o("span",{class:"title"},"aof_enabled(\u662F\u5426\u542F\u7528aof):",-1),lo={class:"value"},uo={class:"row"},no=o("span",{class:"title"},"loading(\u662F\u5426\u6B63\u5728\u8F7D\u5165\u6301\u4E45\u5316\u6587\u4EF6):",-1),ao={class:"value"},io={class:"row"},ro=o("span",{class:"title"},"cluster_enabled(\u662F\u5426\u542F\u7528\u96C6\u7FA4\u6A21\u5F0F):",-1),po={class:"value"},co={class:"row"},_o=o("span",{class:"title"},"used_memory(\u5206\u914D\u5185\u5B58\u603B\u91CF):",-1),mo={class:"value"},fo={class:"row"},ho=o("span",{class:"title"},"maxmemory(\u6700\u5927\u5185\u5B58\u914D\u7F6E):",-1),Fo={class:"value"},vo={class:"row"},go=o("span",{class:"title"},"used_memory_rss(\u5DF2\u5206\u914D\u7684\u5185\u5B58\u603B\u91CF\uFF0C\u64CD\u4F5C\u7CFB\u7EDF\u89D2\u5EA6):",-1),Eo={class:"value"},bo={class:"row"},wo=o("span",{class:"title"},"mem_fragmentation_ratio(used_memory_rss\u548Cused_memory \u4E4B\u95F4\u7684\u6BD4\u7387):",-1),Co={class:"value"},yo={class:"row"},Bo=o("span",{class:"title"},"used_memory_peak(\u5185\u5B58\u6D88\u8017\u5CF0\u503C):",-1),Do={class:"value"},Ao={class:"row"},ko=o("span",{class:"title"},"total_system_memory(\u4E3B\u673A\u603B\u5185\u5B58):",-1),Io={class:"value"},Vo={class:"row"},$o=o("span",{class:"title"},"used_cpu_sys(\u7531Redis\u670D\u52A1\u5668\u6D88\u8017\u7684\u7CFB\u7EDFCPU):",-1),So={class:"value"},jo={class:"row"},qo=o("span",{class:"title"},"used_cpu_user(\u7531Redis\u670D\u52A1\u5668\u6D88\u8017\u7684\u7528\u6237CPU):",-1),Uo={class:"value"},Ro={class:"row"},To=o("span",{class:"title"},"used_cpu_sys_children(\u7531\u540E\u53F0\u8FDB\u7A0B\u6D88\u8017\u7684\u7CFB\u7EDFCPU):",-1),Mo={class:"value"},Po={class:"row"},Lo=o("span",{class:"title"},"used_cpu_user_children(\u7531\u540E\u53F0\u8FDB\u7A0B\u6D88\u8017\u7684\u7528\u6237CPU):",-1),zo={class:"value"};function No(e,t,m,p,E,C){const c=d("el-collapse-item"),g=d("el-collapse"),F=d("el-dialog");return h(),b("div",null,[s(F,{title:e.title,modelValue:e.dialogVisible,"onUpdate:modelValue":t[0]||(t[0]=i=>e.dialogVisible=i),"show-close":!0,width:"35%",onClose:t[1]||(t[1]=i=>e.close())},{default:l(()=>[s(g,null,{default:l(()=>[s(c,{title:"Server(Redis\u670D\u52A1\u5668\u7684\u4E00\u822C\u4FE1\u606F)",name:"server"},{default:l(()=>[o("div",re,[de,o("span",pe,a(e.info.Server.redis_version),1)]),o("div",ce,[_e,o("span",me,a(e.info.Server.tcp_port),1)]),o("div",fe,[he,o("span",Fe,a(e.info.Server.redis_mode),1)]),o("div",ve,[ge,o("span",Ee,a(e.info.Server.os),1)]),o("div",be,[we,o("span",Ce,a(e.info.Server.uptime_in_days),1)]),o("div",ye,[Be,o("span",De,a(e.info.Server.executable),1)]),o("div",Ae,[ke,o("span",Ie,a(e.info.Server.config_file),1)])]),_:1}),s(c,{title:"Clients(\u5BA2\u6237\u7AEF\u8FDE\u63A5)",name:"client"},{default:l(()=>[o("div",Ve,[$e,o("span",Se,a(e.info.Clients.connected_clients),1)]),o("div",je,[qe,o("span",Ue,a(e.info.Clients.blocked_clients),1)])]),_:1}),s(c,{title:"Keyspace(key\u4FE1\u606F)",name:"keyspace"},{default:l(()=>[(h(!0),b(A,null,k(e.info.Keyspace,(i,r)=>(h(),b("div",{class:"row",key:r},[o("span",Re,a(r)+": ",1),o("span",Te,a(i),1)]))),128))]),_:1}),s(c,{title:"Stats(\u7EDF\u8BA1)",name:"state"},{default:l(()=>[o("div",Me,[Pe,o("span",Le,a(e.info.Stats.total_commands_processed),1)]),o("div",ze,[Ne,o("span",Ke,a(e.info.Stats.instantaneous_ops_per_sec),1)]),o("div",Oe,[He,o("span",Ge,a(e.info.Stats.total_net_input_bytes),1)]),o("div",Je,[Qe,o("span",We,a(e.info.Stats.total_net_output_bytes),1)]),o("div",Xe,[Ye,o("span",Ze,a(e.info.Stats.expired_keys),1)]),o("div",xe,[eo,o("span",oo,a(e.info.Stats.instantaneous_ops_per_sec),1)])]),_:1}),s(c,{title:"Persistence(\u6301\u4E45\u5316)",name:"persistence"},{default:l(()=>[o("div",so,[to,o("span",lo,a(e.info.Persistence.aof_enabled),1)]),o("div",uo,[no,o("span",ao,a(e.info.Persistence.loading),1)])]),_:1}),s(c,{title:"Cluster(\u96C6\u7FA4)",name:"cluster"},{default:l(()=>[o("div",io,[ro,o("span",po,a(e.info.Cluster.cluster_enabled),1)])]),_:1}),s(c,{title:"Memory(\u5185\u5B58\u6D88\u8017\u76F8\u5173\u4FE1\u606F)",name:"memory"},{default:l(()=>[o("div",co,[_o,o("span",mo,a(e.info.Memory.used_memory_human),1)]),o("div",fo,[ho,o("span",Fo,a(e.info.Memory.maxmemory),1)]),o("div",vo,[go,o("span",Eo,a(e.info.Memory.used_memory_rss_human),1)]),o("div",bo,[wo,o("span",Co,a(e.info.Memory.mem_fragmentation_ratio),1)]),o("div",yo,[Bo,o("span",Do,a(e.info.Memory.used_memory_peak_human),1)]),o("div",Ao,[ko,o("span",Io,a(e.info.Memory.total_system_memory_human),1)])]),_:1}),s(c,{title:"CPU",name:"cpu"},{default:l(()=>[o("div",Vo,[$o,o("span",So,a(e.info.CPU.used_cpu_sys),1)]),o("div",jo,[qo,o("span",Uo,a(e.info.CPU.used_cpu_user),1)]),o("div",Ro,[To,o("span",Mo,a(e.info.CPU.used_cpu_sys_children),1)]),o("div",Po,[Lo,o("span",zo,a(e.info.CPU.used_cpu_user_children),1)])]),_:1})]),_:1})]),_:1},8,["title","modelValue"])])}var Ko=N(ie,[["render",No]]);const Oo=P({name:"RedisEdit",props:{visible:{type:Boolean},projects:{type:Array},redis:{type:[Boolean,Object]},title:{type:String}},setup(e,{emit:t}){const m=se(null),p=L({dialogVisible:!1,projects:[],envs:[],sshTunnelMachineList:[],form:{id:null,name:null,mode:"standalone",host:"",password:null,project:null,projectId:null,envId:null,env:null,remark:"",enableSshTunnel:null,sshTunnelMachineId:null},pwd:"",btnLoading:!1,rules:{projectId:[{required:!0,message:"\u8BF7\u9009\u62E9\u9879\u76EE",trigger:["change","blur"]}],envId:[{required:!0,message:"\u8BF7\u9009\u62E9\u73AF\u5883",trigger:["change","blur"]}],host:[{required:!0,message:"\u8BF7\u8F93\u5165\u4E3B\u673Aip:port",trigger:["change","blur"]}],db:[{required:!0,message:"\u8BF7\u8F93\u5165\u5E93\u53F7",trigger:["change","blur"]}],mode:[{required:!0,message:"\u8BF7\u8F93\u5165\u6A21\u5F0F",trigger:["change","blur"]}]}});H(e,async _=>{p.dialogVisible=_.visible,p.dialogVisible&&(p.projects=_.projects,_.redis?(C(_.redis.projectId),p.form=y({},_.redis)):(p.envs=[],p.form={db:0,enableSshTunnel:-1}),E())});const E=async()=>{if(p.form.enableSshTunnel==1&&p.sshTunnelMachineList.length==0){const _=await ne.list.request({pageNum:1,pageSize:100});p.sshTunnelMachineList=_.list}},C=async _=>{p.envs=await G.projectEnvs.request({projectId:_})},c=async()=>{p.pwd=await B.getRedisPwd.request({id:p.form.id})},g=_=>{for(let v of p.projects)v.id==_&&(p.form.project=v.name);p.form.envId=null,p.form.env=null,p.envs=[],C(_)},F=_=>{for(let v of p.envs)v.id==_&&(p.form.env=v.name)},i=async()=>{m.value.validate(async _=>{if(_){const v=y({},p.form);if(v.mode=="sentinel"&&v.host.split("=").length!=2){U.error("sentinel\u6A21\u5F0Fhost\u9700\u4E3A: mastername=sentinelhost:sentinelport\u6A21\u5F0F");return}v.password=await ae(v.password),B.saveRedis.request(v).then(()=>{U.success("\u4FDD\u5B58\u6210\u529F"),t("val-change",p.form),p.btnLoading=!0,setTimeout(()=>{p.btnLoading=!1},1e3),r()})}else return U.error("\u8BF7\u6B63\u786E\u586B\u5199\u4FE1\u606F"),!1})},r=()=>{t("update:visible",!1),t("cancel")};return q(y({},z(p)),{redisForm:m,getSshTunnelMachines:E,getPwd:c,changeProject:g,changeEnv:F,btnOk:i,cancel:r})}}),Ho=f("\u539F\u5BC6\u7801"),Go=f(" \u673A\u5668: "),Jo={class:"dialog-footer"},Qo=f("\u53D6 \u6D88"),Wo=f("\u786E \u5B9A");function Xo(e,t,m,p,E,C){const c=d("el-option"),g=d("el-select"),F=d("el-form-item"),i=d("el-input"),r=d("el-link"),_=d("el-popover"),v=d("el-checkbox"),D=d("el-col"),T=d("el-form"),I=d("el-button"),M=d("el-dialog");return h(),b("div",null,[s(M,{title:e.title,modelValue:e.dialogVisible,"onUpdate:modelValue":t[11]||(t[11]=u=>e.dialogVisible=u),"before-close":e.cancel,"close-on-click-modal":!1,"destroy-on-close":!0,width:"38%"},{footer:l(()=>[o("div",Jo,[s(I,{onClick:t[10]||(t[10]=u=>e.cancel())},{default:l(()=>[Qo]),_:1}),s(I,{type:"primary",loading:e.btnLoading,onClick:e.btnOk},{default:l(()=>[Wo]),_:1},8,["loading","onClick"])])]),default:l(()=>[s(T,{model:e.form,ref:"redisForm",rules:e.rules,"label-width":"85px"},{default:l(()=>[s(F,{prop:"projectId",label:"\u9879\u76EE:",required:""},{default:l(()=>[s(g,{style:{width:"100%"},modelValue:e.form.projectId,"onUpdate:modelValue":t[0]||(t[0]=u=>e.form.projectId=u),placeholder:"\u8BF7\u9009\u62E9\u9879\u76EE",onChange:e.changeProject,filterable:""},{default:l(()=>[(h(!0),b(A,null,k(e.projects,u=>(h(),w(c,{key:u.id,label:`${u.name} [${u.remark}]`,value:u.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","onChange"])]),_:1}),s(F,{prop:"envId",label:"\u73AF\u5883:",required:""},{default:l(()=>[s(g,{onChange:e.changeEnv,style:{width:"100%"},modelValue:e.form.envId,"onUpdate:modelValue":t[1]||(t[1]=u=>e.form.envId=u),placeholder:"\u8BF7\u9009\u62E9\u73AF\u5883"},{default:l(()=>[(h(!0),b(A,null,k(e.envs,u=>(h(),w(c,{key:u.id,label:`${u.name} [${u.remark}]`,value:u.id},null,8,["label","value"]))),128))]),_:1},8,["onChange","modelValue"])]),_:1}),s(F,{prop:"mode",label:"mode:",required:""},{default:l(()=>[s(g,{style:{width:"100%"},modelValue:e.form.mode,"onUpdate:modelValue":t[2]||(t[2]=u=>e.form.mode=u),placeholder:"\u8BF7\u9009\u62E9\u6A21\u5F0F"},{default:l(()=>[s(c,{label:"standalone",value:"standalone"}),s(c,{label:"cluster",value:"cluster"}),s(c,{label:"sentinel",value:"sentinel"})]),_:1},8,["modelValue"])]),_:1}),s(F,{prop:"host",label:"host:",required:""},{default:l(()=>[s(i,{modelValue:e.form.host,"onUpdate:modelValue":t[3]||(t[3]=u=>e.form.host=u),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165host:port\uFF1Bsentinel\u6A21\u5F0F\u4E3A: mastername=sentinelhost:port\uFF0C\u82E5\u96C6\u7FA4\u6216\u54E8\u5175\u9700\u8BBE\u591A\u4E2A\u8282\u70B9\u53EF\u4F7F\u7528','\u5206\u5272","auto-complete":"off",type:"textarea"},null,8,["modelValue"])]),_:1}),s(F,{prop:"password",label:"\u5BC6\u7801:"},{default:l(()=>[s(i,{type:"password","show-password":"",modelValue:e.form.password,"onUpdate:modelValue":t[5]||(t[5]=u=>e.form.password=u),modelModifiers:{trim:!0},placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801, \u4FEE\u6539\u64CD\u4F5C\u53EF\u4E0D\u586B",autocomplete:"new-password"},te({_:2},[e.form.id&&e.form.id!=0?{name:"suffix",fn:l(()=>[s(_,{onHide:t[4]||(t[4]=u=>e.pwd=""),placement:"right",title:"\u539F\u5BC6\u7801",width:200,trigger:"click",content:e.pwd},{reference:l(()=>[s(r,{onClick:e.getPwd,underline:!1,type:"primary",class:"mr5"},{default:l(()=>[Ho]),_:1},8,["onClick"])]),_:1},8,["content"])])}:void 0]),1032,["modelValue"])]),_:1}),s(F,{prop:"db",label:"\u5E93\u53F7:",required:""},{default:l(()=>[s(i,{modelValue:e.form.db,"onUpdate:modelValue":t[6]||(t[6]=u=>e.form.db=u),modelModifiers:{number:!0},placeholder:"\u8BF7\u8F93\u5165\u5E93\u53F7"},null,8,["modelValue"])]),_:1}),s(F,{prop:"remark",label:"\u5907\u6CE8:"},{default:l(()=>[s(i,{modelValue:e.form.remark,"onUpdate:modelValue":t[7]||(t[7]=u=>e.form.remark=u),modelModifiers:{trim:!0},"auto-complete":"off",type:"textarea"},null,8,["modelValue"])]),_:1}),s(F,{prop:"enableSshTunnel",label:"SSH\u96A7\u9053:"},{default:l(()=>[s(D,{span:3},{default:l(()=>[s(v,{onChange:e.getSshTunnelMachines,modelValue:e.form.enableSshTunnel,"onUpdate:modelValue":t[8]||(t[8]=u=>e.form.enableSshTunnel=u),"true-label":1,"false-label":-1},null,8,["onChange","modelValue"])]),_:1}),e.form.enableSshTunnel==1?(h(),w(D,{key:0,span:2},{default:l(()=>[Go]),_:1})):R("",!0),e.form.enableSshTunnel==1?(h(),w(D,{key:1,span:19},{default:l(()=>[s(g,{style:{width:"100%"},modelValue:e.form.sshTunnelMachineId,"onUpdate:modelValue":t[9]||(t[9]=u=>e.form.sshTunnelMachineId=u),placeholder:"\u8BF7\u9009\u62E9SSH\u96A7\u9053\u673A\u5668"},{default:l(()=>[(h(!0),b(A,null,k(e.sshTunnelMachineList,u=>(h(),w(c,{key:u.id,label:`${u.ip}:${u.port} [${u.name}]`,value:u.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})):R("",!0)]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue","before-close"])])}var Yo=N(Oo,[["render",Xo]]);const Zo=P({name:"RedisList",components:{Info:Ko,RedisEdit:Yo},setup(){const e=L({projects:[],redisTable:[],total:0,currentId:null,currentData:null,query:{pageNum:1,pageSize:10,prjectId:null,clusterId:null},redisInfo:{url:""},clusterInfoDialog:{visible:!1,redisId:0,info:"",nodes:[]},clusters:[{id:0,name:"\u5355\u673A"}],infoDialog:{title:"",visible:!1,info:{Server:{},Keyspace:{},Clients:{},CPU:{},Memory:{}}},redisEditDialog:{visible:!1,data:null,title:"\u65B0\u589Eredis"}});le(async()=>{c()});const t=i=>{e.query.pageNum=i,c()},m=i=>{!i||(e.currentId=i.id,e.currentData=i)},p=async()=>{try{await ue.confirm("\u786E\u5B9A\u5220\u9664\u8BE5redis?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}),await B.delRedis.request({id:e.currentId}),U.success("\u5220\u9664\u6210\u529F"),e.currentData=null,e.currentId=null,c()}catch{}},E=async i=>{var r=i.host;i.ip&&(r=i.ip.split("@")[0]);const _=await B.redisInfo.request({id:i.id,host:r});e.infoDialog.info=_,e.infoDialog.title=`'${r}' info`,e.infoDialog.visible=!0},C=async i=>{const r=await B.clusterInfo.request({id:i.id});e.clusterInfoDialog.info=r.clusterInfo,e.clusterInfoDialog.nodes=r.clusterNodes,e.clusterInfoDialog.redisId=i.id,e.clusterInfoDialog.visible=!0},c=async()=>{const i=await B.redisList.request(e.query);e.redisTable=i.list,e.total=i.total},g=async(i=!1)=>{e.projects=await G.accountProjects.request(null),i?(e.redisEditDialog.data=null,e.redisEditDialog.title="\u65B0\u589Eredis"):(e.redisEditDialog.data=e.currentData,e.redisEditDialog.title="\u4FEE\u6539redis"),e.redisEditDialog.visible=!0},F=()=>{e.currentId=null,e.currentData=null,c()};return q(y({},z(e)),{search:c,handlePageChange:t,choose:m,info:E,onShowClusterInfo:C,deleteRedis:p,editRedis:g,valChange:F})}}),xo=f("\u6DFB\u52A0"),es=f("\u7F16\u8F91"),os=f("\u5220\u9664"),ss={style:{float:"right"}},ts=o("i",null,null,-1),ls=f("\u5355\u673A\u4FE1\u606F"),us=f("\u96C6\u7FA4\u4FE1\u606F"),ns=f("\u8282\u70B9\u4FE1\u606F"),as=f(" nodeId "),is=f(" ip "),rs=f(" masterSlaveRelation "),ds=f(" configEpoch ");function ps(e,t,m,p,E,C){const c=d("el-button"),g=d("el-option"),F=d("el-select"),i=d("el-radio"),r=d("el-table-column"),_=d("el-link"),v=d("el-table"),D=d("el-pagination"),T=d("el-row"),I=d("el-card"),M=d("info"),u=d("el-input"),J=d("el-divider"),V=d("question-filled"),$=d("el-icon"),S=d("el-tooltip"),Q=d("el-tag"),W=d("el-dialog"),X=d("redis-edit");return h(),b("div",null,[s(I,null,{default:l(()=>[s(c,{type:"primary",icon:"plus",onClick:t[0]||(t[0]=n=>e.editRedis(!0)),plain:""},{default:l(()=>[xo]),_:1}),s(c,{type:"primary",icon:"edit",disabled:e.currentId==null,onClick:t[1]||(t[1]=n=>e.editRedis(!1)),plain:""},{default:l(()=>[es]),_:1},8,["disabled"]),s(c,{type:"danger",icon:"delete",disabled:e.currentId==null,onClick:e.deleteRedis,plain:""},{default:l(()=>[os]),_:1},8,["disabled","onClick"]),o("div",ss,[s(F,{modelValue:e.query.projectId,"onUpdate:modelValue":t[2]||(t[2]=n=>e.query.projectId=n),placeholder:"\u8BF7\u9009\u62E9\u9879\u76EE",filterable:"",clearable:""},{default:l(()=>[(h(!0),b(A,null,k(e.projects,n=>(h(),w(g,{key:n.id,label:`${n.name} [${n.remark}]`,value:n.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),s(c,{class:"ml5",onClick:e.search,type:"success",icon:"search"},null,8,["onClick"])]),s(v,{data:e.redisTable,onCurrentChange:e.choose,stripe:""},{default:l(()=>[s(r,{label:"\u9009\u62E9",width:"60px"},{default:l(n=>[s(i,{modelValue:e.currentId,"onUpdate:modelValue":t[3]||(t[3]=j=>e.currentId=j),label:n.row.id},{default:l(()=>[ts]),_:2},1032,["modelValue","label"])]),_:1}),s(r,{prop:"project",label:"\u9879\u76EE","min-width":"100"}),s(r,{prop:"env",label:"\u73AF\u5883","min-width":"100"}),s(r,{prop:"host",label:"host:port","min-width":"150","show-overflow-tooltip":""}),s(r,{prop:"mode",label:"mode","min-width":"100"}),s(r,{prop:"remark",label:"\u5907\u6CE8","min-width":"120","show-overflow-tooltip":""}),s(r,{prop:"createTime",label:"\u521B\u5EFA\u65F6\u95F4","min-width":"160"},{default:l(n=>[f(a(e.$filters.dateFormat(n.row.createTime)),1)]),_:1}),s(r,{prop:"creator",label:"\u521B\u5EFA\u4EBA","min-width":"100"}),s(r,{label:"\u66F4\u591A","min-width":"130",fixed:"right"},{default:l(n=>[n.row.mode=="standalone"||n.row.mode=="sentinel"?(h(),w(_,{key:0,type:"primary",onClick:j=>e.info(n.row),underline:!1},{default:l(()=>[ls]),_:2},1032,["onClick"])):R("",!0),n.row.mode=="cluster"?(h(),w(_,{key:1,onClick:j=>e.onShowClusterInfo(n.row),type:"success",underline:!1},{default:l(()=>[us]),_:2},1032,["onClick"])):R("",!0)]),_:1})]),_:1},8,["data","onCurrentChange"]),s(T,{style:{"margin-top":"20px"},type:"flex",justify:"end"},{default:l(()=>[s(D,{style:{"text-align":"right"},onCurrentChange:e.handlePageChange,total:e.total,layout:"prev, pager, next, total, jumper","current-page":e.query.pageNum,"onUpdate:current-page":t[4]||(t[4]=n=>e.query.pageNum=n),"page-size":e.query.pageSize},null,8,["onCurrentChange","total","current-page","page-size"])]),_:1})]),_:1}),s(M,{visible:e.infoDialog.visible,"onUpdate:visible":t[5]||(t[5]=n=>e.infoDialog.visible=n),title:e.infoDialog.title,info:e.infoDialog.info},null,8,["visible","title","info"]),s(W,{width:"1000px",title:"\u96C6\u7FA4\u4FE1\u606F",modelValue:e.clusterInfoDialog.visible,"onUpdate:modelValue":t[7]||(t[7]=n=>e.clusterInfoDialog.visible=n)},{default:l(()=>[s(u,{type:"textarea",autosize:{minRows:12,maxRows:12},modelValue:e.clusterInfoDialog.info,"onUpdate:modelValue":t[6]||(t[6]=n=>e.clusterInfoDialog.info=n)},null,8,["modelValue"]),s(J,{"content-position":"left"},{default:l(()=>[ns]),_:1}),s(v,{data:e.clusterInfoDialog.nodes,stripe:"",size:"small",border:""},{default:l(()=>[s(r,{prop:"nodeId",label:"nodeId","min-width":"300"},{header:l(()=>[as,s(S,{class:"box-item",effect:"dark",content:"\u8282\u70B9id",placement:"top"},{default:l(()=>[s($,null,{default:l(()=>[s(V)]),_:1})]),_:1})]),_:1}),s(r,{prop:"ip",label:"ip","min-width":"180"},{header:l(()=>[is,s(S,{class:"box-item",effect:"dark",content:"ip:port1@port2\uFF1Aport1\u6307redis\u670D\u52A1\u5668\u4E0E\u5BA2\u6237\u7AEF\u901A\u4FE1\u7684\u7AEF\u53E3\uFF0Cport2\u5219\u662F\u96C6\u7FA4\u5185\u90E8\u8282\u70B9\u95F4\u901A\u4FE1\u7684\u7AEF\u53E3",placement:"top"},{default:l(()=>[s($,null,{default:l(()=>[s(V)]),_:1})]),_:1})]),default:l(n=>[s(Q,{onClick:j=>e.info({id:e.clusterInfoDialog.redisId,ip:n.row.ip}),effect:"plain",type:"success",size:"small",style:{cursor:"pointer"}},{default:l(()=>[f(a(n.row.ip),1)]),_:2},1032,["onClick"])]),_:1}),s(r,{prop:"flags",label:"flags","min-width":"110"}),s(r,{prop:"masterSlaveRelation",label:"masterSlaveRelation","min-width":"300"},{header:l(()=>[rs,s(S,{class:"box-item",effect:"dark",content:"\u5982\u679C\u8282\u70B9\u662Fslave\uFF0C\u5E76\u4E14\u5DF2\u77E5master\u8282\u70B9\uFF0C\u5219\u4E3Amaster\u8282\u70B9ID\uFF1B\u5426\u5219\u4E3A\u7B26\u53F7'-'",placement:"top"},{default:l(()=>[s($,null,{default:l(()=>[s(V)]),_:1})]),_:1})]),_:1}),s(r,{prop:"pingSent",label:"pingSent","min-width":"130","show-overflow-tooltip":""},{default:l(n=>[f(a(n.row.pingSent==0?0:new Date(parseInt(n.row.pingSent)).toLocaleString()),1)]),_:1}),s(r,{prop:"pongRecv",label:"pongRecv","min-width":"130","show-overflow-tooltip":""},{default:l(n=>[f(a(n.row.pongRecv==0?0:new Date(parseInt(n.row.pongRecv)).toLocaleString()),1)]),_:1}),s(r,{prop:"configEpoch",label:"configEpoch","min-width":"130"},{header:l(()=>[ds,s(S,{class:"box-item",effect:"dark",content:"\u8282\u70B9\u7684epoch\u503C\uFF08\u5982\u679C\u8BE5\u8282\u70B9\u662F\u4ECE\u8282\u70B9\uFF0C\u5219\u4E3A\u5176\u4E3B\u8282\u70B9\u7684epoch\u503C\uFF09\u3002\u6BCF\u5F53\u8282\u70B9\u53D1\u751F\u5931\u8D25\u5207\u6362\u65F6\uFF0C\u90FD\u4F1A\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\uFF0C\u72EC\u7279\u7684\uFF0C\u9012\u589E\u7684epoch\u3002",placement:"top"},{default:l(()=>[s($,null,{default:l(()=>[s(V)]),_:1})]),_:1})]),_:1}),s(r,{prop:"linkState",label:"linkState","min-width":"100"}),s(r,{prop:"slot",label:"slot","min-width":"100"})]),_:1},8,["data"])]),_:1},8,["modelValue"]),s(X,{onValChange:e.valChange,projects:e.projects,title:e.redisEditDialog.title,visible:e.redisEditDialog.visible,"onUpdate:visible":t[8]||(t[8]=n=>e.redisEditDialog.visible=n),redis:e.redisEditDialog.data,"onUpdate:redis":t[9]||(t[9]=n=>e.redisEditDialog.data=n)},null,8,["onValChange","projects","title","visible","redis"])])}var Es=N(Zo,[["render",ps]]);export{Es as default};
