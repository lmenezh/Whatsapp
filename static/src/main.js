/* /whatsapp_connector/static/src/main.js */
odoo.define('@whatsapp_connector/main',async function(require){'use strict';let __exports={};const{registry}=require('@web/core/registry')
const{Chatroom}=require('@42ffbf6224f23aacdf6b9a6289d4e396904ef6225cba7443d521319d2137e2b6')
registry.category('actions').add('acrux.chat.conversation_tag',Chatroom)
return __exports;});
