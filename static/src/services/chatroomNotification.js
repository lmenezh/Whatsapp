/* /whatsapp_connector/static/src/services/chatroomNotification.js */
odoo.define('@whatsapp_connector/services/chatroomNotification',async function(require){'use strict';let __exports={};const{browser}=require('@web/core/browser/browser')
const{registry}=require('@web/core/registry')
const{url}=require('@web/core/utils/urls')
const chatroomNotificationService=__exports.chatroomNotificationService={dependencies:['action','bus_service','notification','user'],start(env,services){this.env=env
this.services=services
this.lastDialog=null
this.env.bus.on('WEB_CLIENT_READY',this,async()=>{this.canPlay=typeof(Audio)!=='undefined'
if(this.canPlay){this.audio=new Audio()
if(this.audio.canPlayType('audio/ogg; codecs=vorbis')){this.audio.src=url('/mail/static/src/audio/ting.ogg')}else{this.audio.src=url('/mail/static/src/audio/ting.mp3')}}
this.notifactionsHash=new Map()
this.services.bus_service.addEventListener('notification',this.onNotifaction.bind(this))
window.addEventListener('storage',this.onStorage.bind(this))})
this.env.bus.on('last-dialog',this,lastDialog=>this.lastDialog=lastDialog)},onNotifaction({detail:notifications}){const data=notifications
if(data&&data.length){let json=JSON.stringify(data)
if(this.isChatroomTab()){browser.localStorage.setItem('chatroom_notification',json);}else{this.notifactionsHash.set(json,setTimeout(async()=>{await this.process(data)
this.notifactionsHash.delete(json)},50))}}},onStorage(event){if(event.key==='chatroom_notification'){const value=JSON.parse(event.newValue)
if(this.notifactionsHash.has(value)){clearTimeout(this.notifactionsHash.get(value))
this.notifactionsHash.delete(value)}}},isChatroomTab(){let out=false
const currentController=this.services.action.currentController
if(currentController){if(currentController.action.tag){out=currentController.action.tag==='acrux.chat.conversation_tag'}else{out=currentController?.props?.context?.is_acrux_chat_room}}
return out},async process(data){let msg=null
for await(const row of data){if(row.type==='new_messages'){msg=await this.processNewMessage({new_messages:row.payload})}else if(row.type==='opt_in'){await this.processOptIn({opt_in:row.payload})}else if(row.type==='error_messages'){await this.processErrorMessage({error_messages:row.payload})}}
if(msg){let message=this.env._t('New Message from ')+msg.name
if(msg.messages&&msg.messages.length&&msg.messages[0].ttype=='text'){this.services.notification.add(msg.messages[0].text,{type:'info',title:message})}else{this.services.notification.add(message,{type:'info'})}
await this.playNotification()}},async processNewMessage(row){row.new_messages.forEach(conv=>{if(conv.messages){conv.messages=conv.messages.filter(msg=>!msg.from_me)}else{conv.messages=[]}})
let msg=row.new_messages.find(conv=>conv.desk_notify=='all'&&conv.messages.length)
if(!msg){msg=row.new_messages.find(conv=>conv.desk_notify=='mines'&&conv.agent_id&&conv.agent_id[0]==this.services.user.userId&&conv.messages.length)}
return msg},async processOptIn(row){const notify={type:row.opt_in.opt_in?'success':'warning',title:this.env._t('Opt-in update'),sticky:true,}
const message=row.opt_in.name+' '+(row.opt_in.opt_in?this.env._t('activate'):this.env._t('deactivate'))+' opt-in.'
this.services.notification.add(message,notify)
if(this.services.action?.currentController){if(this.services.action.currentController.action.res_model==='acrux.chat.conversation'){await this.services.action.loadState()}
if(this?.lastDialog?.props?.actionProps?.resModel==='acrux.chat.message.wizard'){this.lastDialog.render(true)}}},async processErrorMessage(row){const msgList=[]
for(const conv of row.error_messages){for(const msg of conv.messages){if(msg.user_id[0]===this.services.user.userId){const newMsg=Object.assign({},msg)
newMsg.name=conv.name
newMsg.number=conv.number_format
msgList.push(newMsg)}}}
for(const msg of msgList){let complement=''
if(msg.text&&''!==msg.text){complement+=this.env._t('. Message: ')+msg.text}
const notify={type:'danger',title:this.env._t('Message with error in ')+`${msg.name} (${msg.number})`,sticky:true,}
const message=this.env._t('Error: ')+msg.error_msg+complement
this.services.notification.add(message,notify)}
await this.playNotification()},async playNotification(){if(this.canPlay){try{await this.audio.play()}catch{}}},}
registry.category('services').add('chatroomNotification',chatroomNotificationService)
return __exports;});;
